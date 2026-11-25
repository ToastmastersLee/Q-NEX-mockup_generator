"""Windows LAN entry point for 双录播机统一录像浏览."""

import asyncio
from datetime import date
import os
from pathlib import Path
from ipaddress import ip_address
from typing import Literal
from urllib.parse import quote, urlsplit

import httpx
import uvicorn
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from starlette.background import BackgroundTask

from catalog import BASE, DEMO_DEVICES, MIME, Source, demo_rows, now, read_config
from protocol import Connection, DETAIL, DeviceError
from classroom import install_classroom
from classroom_media import install_media
from qnex_stream import install_streaming

Mode = Literal["demo", "live"]


def create_app(devices):
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    sources = {device.id: Source(device) for device in devices}
    samples = demo_rows()
    static = BASE / "static"
    app.mount("/static", StaticFiles(directory=static), name="static")
    install_classroom(app, devices)
    install_media(app, devices)
    install_streaming(app, devices)
    preview_hosts = " ".join(f"ws://{device.ip}:9898" for device in devices if device.ip)

    @app.middleware("http")
    async def response_headers(request, call_next):
        if request.url.path.startswith(("/api/classroom", "/api/preview/")):
            # Device control is local to the operator PC; the existing LAN library stays accessible.
            needs_local = request.query_params.get("mode") != "demo" or request.method == "POST" or request.url.path.startswith("/api/preview/")
            origin = request.headers.get("origin")
            try:
                local_peer = request.client and ip_address(request.client.host).is_loopback
                local_host = request.url.hostname in ("127.0.0.1", "localhost", "::1")
                same_origin = not origin or (urlsplit(origin).netloc == request.url.netloc and
                                              urlsplit(origin).scheme == request.url.scheme)
            except ValueError:
                local_peer = local_host = same_origin = False
            if needs_local and not (local_peer and local_host and same_origin):
                return JSONResponse({"detail": {"key": "localOnly"}}, status_code=403)
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; style-src 'self' 'unsafe-inline'; "
            f"connect-src 'self' {preview_hosts}; media-src 'self' blob:; img-src 'self' blob: data:; "
            "object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
        )
        if request.url.path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
        elif request.url.path in ("/", "/library") or request.url.path.endswith((".js", ".html")):
            response.headers["Cache-Control"] = "no-cache"
        return response

    @app.get("/")
    async def index():
        return FileResponse(static / "console.html")

    @app.get("/library")
    async def original_library():
        return FileResponse(static / "index.html")

    @app.get("/api/devices")
    async def status(mode: Mode, refresh: bool = False):
        if mode == "live":
            return {"mode": mode, "devices": await asyncio.gather(
                *(source.status(refresh) for source in sources.values())
            )}
        return {"mode": mode, "devices": [
            {
                "id": device.id, "room": device.room, "ip": "",
                "model": "LCS810", "connection": "online", "recording": recording,
                "total_mb": 960000, "used_mb": 960000 - free, "free_mb": free,
                "updated_at": now(), "error": None,
            }
            for device, recording, free in zip(DEMO_DEVICES, ("录制中", "空闲"), (380000, 715000))
        ]}

    @app.get("/api/recordings")
    async def recordings(
        mode: Mode, room: Literal["a", "b"] | None = None,
        start: date | None = None, end: date | None = None,
        q: str = Query("", max_length=150), refresh: bool = False,
    ):
        if start and end and start > end:
            raise HTTPException(422, "起始日期不能晚于结束日期")
        selected = [source for key, source in sources.items() if room in (None, key)]
        if mode == "live":
            results = await asyncio.gather(*(source.catalog(refresh) for source in selected))
            rows = [row for result in results for row in result["rows"].values()]
            summaries = [
                {key: val for key, val in result.items() if key != "rows"} for result in results
            ]
        else:
            rows = [row for row in samples.values() if room in (None, row["device_id"])]
            summaries = [
                {
                    "device_id": source.device.id, "complete": True, "error": None,
                    "stale": False, "updated_at": now(), "directories": 4, "expected_directories": 4,
                }
                for source in selected
            ]
        keyword = q.strip().casefold()
        start_key, end_key = start.isoformat() if start else "", end.isoformat() if end else ""

        def matches(row):
            day = (row["start_time"] or "")[:10]
            return (
                (not start_key or day >= start_key)
                and (not end_key or bool(day) and day <= end_key)
                and (not keyword or any(
                    keyword in row[key].casefold() for key in ("title", "teacher", "filename")
                ))
            )

        filtered = sorted(
            (row for row in rows if matches(row)),
            key=lambda row: (row["start_time"] or "", row["id"]), reverse=True,
        )
        return {"mode": mode, "recordings": filtered, "devices": summaries}

    async def lookup(recording_id, mode):
        if mode == "demo":
            if recording_id in samples:
                return samples[recording_id], None
        else:
            for source in sources.values():
                cache = source.catalog_cache
                if cache and recording_id in cache["rows"]:
                    status = await source.status()
                    if status["connection"] in ("offline", "unconfigured"):
                        raise HTTPException(503, "来源设备离线或未配置")
                    return cache["rows"][recording_id], source.device
        raise HTTPException(404, "录像不在当前列表，请重新查询")

    @app.get("/api/recordings/{recording_id}/details")
    async def details(recording_id: str, mode: Mode):
        row, device = await lookup(recording_id, mode)
        if device is None:
            return {"duration": "00:00:12", "code": "H.264", "audioCode": "AAC"}
        try:
            async with Connection(device.ip, device.tcp_port) as client:
                msg = await client.read(DETAIL, {"dir": row["directory"], "fileName": row["filename"]})
        except (OSError, TimeoutError, DeviceError) as exc:
            raise HTTPException(502, "未能读取录像详情") from exc
        return {
            key: msg[key] for key in ("duration", "code", "resolution", "audioCode")
            if isinstance(msg.get(key), str)
        }

    @app.get("/api/recordings/{recording_id}/media")
    async def media(request: Request, recording_id: str, mode: Mode):
        row, device = await lookup(recording_id, mode)
        if device is None:
            sample = row.get("sample", row["device_id"])
            return FileResponse(static / f"sample-{sample}.mp4", media_type="video/mp4")
        directory, filename = (quote(row[key], safe="") for key in ("directory", "filename"))
        url = f"http://{device.ip}:{device.http_port}/record/{directory}/{filename}"
        headers = {
            key: request.headers[key] for key in ("range", "if-range") if key in request.headers
        }
        headers["Accept-Encoding"] = "identity"
        auth = None
        if device.auth:
            cls = httpx.BasicAuth if device.auth == "basic" else httpx.DigestAuth
            auth = cls(device.username, device.password)
        client = httpx.AsyncClient(
            auth=auth, timeout=httpx.Timeout(12, connect=3),
            follow_redirects=False, trust_env=False,
        )
        try:
            response = await client.send(client.build_request("GET", url, headers=headers), stream=True)
        except httpx.HTTPError as exc:
            await client.aclose()
            raise HTTPException(502, "无法连接来源设备的录像服务") from exc

        async def close():
            await response.aclose()
            await client.aclose()

        if response.status_code not in (200, 206, 416):
            await close()
            if response.status_code in (401, 403):
                raise HTTPException(response.status_code, "来源设备要求认证或拒绝访问")
            if response.status_code == 404:
                raise HTTPException(404, "来源设备上找不到该录像")
            raise HTTPException(502, "来源设备返回了异常的播放响应")
        content_type = response.headers.get("content-type", "").split(";", 1)[0].lower()
        if response.status_code != 416 and content_type not in (
            "", "application/octet-stream", "binary/octet-stream"
        ) and not content_type.startswith("video/"):
            await close()
            raise HTTPException(502, "来源设备未返回视频，可能需要设备认证")
        passthrough = {
            key: response.headers[key] for key in (
                "content-range", "content-length", "content-encoding", "accept-ranges",
                "last-modified", "etag",
            ) if key in response.headers
        }
        if response.status_code == 206:
            passthrough.setdefault("accept-ranges", "bytes")

        async def stream():
            try:
                async for chunk in response.aiter_raw():
                    yield chunk
            finally:
                await close()

        return StreamingResponse(
            stream(), status_code=response.status_code, headers=passthrough,
            media_type=MIME[Path(row["filename"]).suffix.lower()], background=BackgroundTask(close),
        )

    return app


def run_console(devices, host, port):
    server = uvicorn.Server(uvicorn.Config(create_app(devices), host=host, port=port,
                                            access_log=False, timeout_graceful_shutdown=8))
    if os.name == "nt":
        import ctypes
        from ctypes import wintypes
        from threading import Thread

        kernel = ctypes.WinDLL("kernel32", use_last_error=True)
        kernel.CreateEventW.argtypes = [wintypes.LPVOID, wintypes.BOOL, wintypes.BOOL, wintypes.LPCWSTR]
        kernel.CreateEventW.restype = wintypes.HANDLE
        kernel.WaitForSingleObject.argtypes = [wintypes.HANDLE, wintypes.DWORD]
        kernel.WaitForSingleObject.restype = wintypes.DWORD
        handle = kernel.CreateEventW(None, True, False, f"Local\\IQVideo.Console.Stop.{os.getpid()}")
        if not handle:
            raise ctypes.WinError(ctypes.get_last_error())

        def wait_for_stop():
            if kernel.WaitForSingleObject(handle, 0xFFFFFFFF) == 0:
                server.should_exit = True

        # This event belongs to the service process and is released by Windows on exit.
        Thread(target=wait_for_stop, daemon=True).start()
    server.run()


if __name__ == "__main__":
    config_path = Path(os.environ.get("LCS_DEMO_CONFIG", str(BASE / "config.local.json")))
    try:
        host, port, configured_devices = read_config(config_path)
    except (OSError, KeyError, TypeError, ValueError) as exc:
        raise SystemExit(f"无法读取配置，请核对 {config_path} 的设备、IP、端口和 JSON 格式。") from exc
    print(f"LCS810 Classroom Console  http://localhost:{port}", flush=True)
    run_console(configured_devices, host, port)
