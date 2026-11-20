"""Browser monitoring of local channels and the two interaction receive feeds."""

import asyncio
from functools import partial
import hashlib
import shutil
import subprocess
import time
from typing import Literal
from urllib.parse import urlsplit

import anyio
import httpx
from fastapi import HTTPException, Request
from fastapi.responses import Response, StreamingResponse

from protocol import Connection, DeviceError


SDK_SHA256 = "a29f2881657b550a1d008a8caae7cfdd873025a39a390232db26caf219e0ecfb"
FRAME_LIMIT = 2 * 1024 * 1024
BOUNDARY = b"--lcsframe"
Room = Literal["a", "b"]
Output = Literal["out1", "out2"]


def choose_route(layout, logical_output, peer_account):
    """Only a single full-frame remote feed can represent an assigned output."""
    if not isinstance(layout, list):
        return None
    layers = [row for row in layout if isinstance(row, dict)
              and row.get("onHDMIType") == logical_output]
    if len(layers) != 1:
        return None
    row = layers[0]
    pos = row.get("pos")
    if (row.get("account") != peer_account or row.get("streamChn") not in (0, 1)
            or pos != [0, 0, 1920, 1080]):
        return None
    return row["streamChn"], row.get("streamId", 0)


def stream_url(info, route, ip):
    if not isinstance(info, dict):
        return None
    for entry in info.get("streamInfo", []):
        if (not isinstance(entry, dict) or entry.get("type") != 0
                or (entry.get("streamChn"), entry.get("streamId", 0)) != route):
            continue
        url = entry.get("rtspUrl")
        if not isinstance(url, str) or any(ord(ch) < 33 for ch in url):
            continue
        try:
            address = urlsplit(url)
            if (address.scheme == "rtsp" and address.hostname == ip
                    and (address.port or 554) in (554, 9954) and not address.fragment):
                return url
        except ValueError:
            continue
    return None


async def receive_route(device, peer, logical_output):
    # The peer's configured account is the same identifier that the receiver
    # returns in its active layout. Do not infer a feed from stream order.
    async with httpx.AsyncClient(verify=False, timeout=3, trust_env=False) as http:
        reply = await http.post(f"https://{peer.ip}/action/InteractiveSvc",
                                params={"cmd": "0x5110"})
        reply.raise_for_status()
        peer_info = reply.json()
    account = (peer_info.get("msg") or {}).get("account")
    if peer_info.get("code") != 200 or not account:
        raise HTTPException(503, "peer_unavailable")
    async with Connection(device.ip, device.tcp_port) as conn:
        layout = await conn.request(0x4403)
        route = choose_route(layout, logical_output, account)
        if not route:
            raise HTTPException(409, "unassigned")
        info = await conn.request(0x4414, {"account": account})
    url = stream_url(info, route, device.ip)
    if not url:
        raise HTTPException(409, "no_stream")
    return account, route, url


def read_jpeg(pipe):
    # FFmpeg's multipart muxer provides a byte count; JPEG data is binary.
    size = 0
    for _ in range(8):
        line = pipe.readline(1024)
        if not line:
            raise EOFError
        if line.lower().startswith(b"content-length:"):
            size = int(line.split(b":", 1)[1].strip())
            if not 0 < size <= FRAME_LIMIT:
                raise ValueError("frame size")
        if size and not line.strip():
            data = pipe.read(size)
            if len(data) != size or not data.startswith(b"\xff\xd8"):
                raise EOFError
            return data
    raise ValueError("multipart header")


def install_media(app, devices):
    by_id = {d.id: d for d in devices}
    sdk_cache = {}
    active = set()

    @app.get("/api/preview/{room}/sdk")
    async def preview_sdk(room: Room):
        device = by_id[room]
        if not device.ip:
            raise HTTPException(503, "offline")
        if device.ip not in sdk_cache:
            try:
                async with httpx.AsyncClient(verify=False, timeout=4, trust_env=False) as http:
                    r = await http.get(f"https://{device.ip}/static/js/r3ci.js")
                    r.raise_for_status()
                if hashlib.sha256(r.content).hexdigest() != SDK_SHA256:
                    raise HTTPException(409, "unsupported_player")
                sdk_cache[device.ip] = r.content
            except httpx.HTTPError:
                raise HTTPException(503, "offline") from None
        return Response(sdk_cache[device.ip], media_type="text/javascript")

    @app.get("/api/preview/{room}/{output}")
    async def receiver_output(request: Request, room: Room, output: Output):
        device = by_id[room]
        peer = by_id["b" if room == "a" else "a"]
        logical = 1 if output == "out1" else 0
        if not device.ip or not peer.ip:
            raise HTTPException(503, "offline")
        ffmpeg = shutil.which("ffmpeg")
        if not ffmpeg:
            raise HTTPException(503, "missing_ffmpeg")
        try:
            route = await receive_route(device, peer, logical)
        except (OSError, DeviceError, httpx.HTTPError, ValueError, TimeoutError):
            raise HTTPException(409, "unavailable") from None

        async def frames():
            if len(active) >= 8:
                return
            process = None
            try:
                args = [ffmpeg, "-hide_banner", "-loglevel", "error", "-nostdin",
                        "-rtsp_transport", "tcp", "-timeout", "5000000",
                        "-analyzeduration", "600000", "-probesize", "256k",
                        "-i", route[-1], "-map", "0:v:0", "-an",
                        "-vf", "fps=6,scale=640:-2", "-threads", "1",
                        "-c:v", "mjpeg", "-q:v", "5", "-f", "mpjpeg",
                        "-boundary_tag", "lcsframe", "pipe:1"]
                # Popen also works under Uvicorn's Windows SelectorEventLoop.
                process = subprocess.Popen(
                    args, stdin=subprocess.DEVNULL, stdout=subprocess.PIPE,
                    stderr=subprocess.DEVNULL,
                    creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
                )
                active.add(process)
                check_at = time.monotonic() + 5
                while not await request.is_disconnected():
                    if time.monotonic() >= check_at:
                        if await receive_route(device, peer, logical) != route:
                            break
                        check_at = time.monotonic() + 5
                    jpeg = await asyncio.wait_for(asyncio.to_thread(read_jpeg, process.stdout), 8)
                    stamp = int(time.time() * 1000)
                    header = f"\r\nContent-Type: image/jpeg\r\nContent-Length: {len(jpeg)}\r\nX-Time: {stamp}\r\n\r\n"
                    yield BOUNDARY + header.encode("ascii") + jpeg + b"\r\n"
            except (EOFError, OSError, TimeoutError, ValueError, DeviceError, HTTPException, httpx.HTTPError):
                return
            finally:
                if process is not None:
                    if process.poll() is None:
                        try:
                            process.kill()
                        except OSError:
                            pass
                    with anyio.CancelScope(shield=True):
                        try:
                            await asyncio.to_thread(partial(process.wait, timeout=4))
                        finally:
                            process.stdout.close()
                            active.discard(process)

        return StreamingResponse(frames(), media_type="multipart/x-mixed-replace; boundary=lcsframe")
