"""Windows LAN entry point for 双录播机统一录像浏览."""

import asyncio
from datetime import date
import os
from pathlib import Path
from typing import Literal
from urllib.parse import quote

import httpx
import uvicorn
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from starlette.background import BackgroundTask

from catalog import BASE, DEMO_DEVICES, MIME, Source, demo_rows, now, read_config
from protocol import Connection, DETAIL, DeviceError

Mode = Literal["demo", "live"]


def create_app(devices):
    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    sources = {device.id: Source(device) for device in devices}
    samples = demo_rows()
    static = BASE / "static"
    app.mount("/static", StaticFiles(directory=static), name="static")

    @app.middleware("http")
    async def response_headers(request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; style-src 'self' 'unsafe-inline'; "
            "object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
        )
        if request.url.path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
        return response

    @app.get("/")
    async def index():
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
                    "stale": False, "updated_at": now(), "directories": 3, "expected_directories": 3,
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
            return FileResponse(static / f"sample-{row['device_id']}.mp4", media_type="video/mp4")
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


if __name__ == "__main__":
    config_path = Path(os.environ.get("LCS_DEMO_CONFIG", str(BASE / "config.local.json")))
    try:
        host, port, configured_devices = read_config(config_path)
    except (OSError, KeyError, TypeError, ValueError) as exc:
        raise SystemExit(f"无法读取配置，请核对 {config_path} 的设备、IP、端口和 JSON 格式。") from exc
    print(f"双录播机统一录像浏览  http://localhost:{port}", flush=True)
    uvicorn.run(create_app(configured_devices), host=host, port=port, access_log=False)
