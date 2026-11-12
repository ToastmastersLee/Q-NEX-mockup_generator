import asyncio
import json
import unittest

import httpx

from app import create_app
from catalog import Device
from protocol import APPLICATION, DETAIL, HEADER, RECORDINGS, STATUS, VERSION


def packet(command, identity, msg):
    body = json.dumps({"code": 200, "msg": msg}, ensure_ascii=False).encode()
    return HEADER.pack(VERSION, APPLICATION, len(body), identity, command, b"") + body


STATUS_REPLY = packet(STATUS, 0, {
    "diskTotalSize": "10000", "diskFreeSize": "6000", "recordStatus": {"record": 2},
})


class DemoTests(unittest.IsolatedAsyncioTestCase):
    async def test_filters_and_mode_separation(self):
        app = create_app([Device("a", "三楼"), Device("b", "一楼")])
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://app") as client:
            demo = (await client.get("/api/recordings", params={"mode": "demo", "q": "LECTURE"})).json()
            self.assertEqual(len(demo["recordings"]), 2)
            first, second = demo["recordings"]
            self.assertNotEqual(first["id"], second["id"])
            path = f"/api/recordings/{first['id']}/media"
            response = await client.get(path, params={"mode": "demo"}, headers={"Range": "bytes=0-31"})
            self.assertEqual(response.status_code, 206)
            self.assertIn(b"ftyp", response.content)
            self.assertEqual((await client.get(path, params={"mode": "live"})).status_code, 404)
            live = (await client.get("/api/recordings", params={"mode": "live"})).json()
            self.assertEqual(live["recordings"], [])
            self.assertTrue(all(not result["complete"] for result in live["devices"]))


class DeviceTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.page_numbers = []
        self.repeat_page = False
        self.http_status = 206
        self.http_request = b""
        self.tcp = await asyncio.start_server(self.serve_tcp, "127.0.0.1", 0)
        self.http = await asyncio.start_server(self.serve_http, "127.0.0.1", 0)
        tcp_port = self.tcp.sockets[0].getsockname()[1]
        http_port = self.http.sockets[0].getsockname()[1]
        app = create_app([
            Device("a", "三楼", "127.0.0.1", tcp_port, http_port),
            Device("b", "一楼", "127.0.0.2", tcp_port, http_port),
        ])
        self.client = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app), base_url="http://app", params={"mode": "live"}
        )
        self.addAsyncCleanup(self.client.aclose)

    async def asyncTearDown(self):
        for server in (self.tcp, self.http):
            server.close()
            await server.wait_closed()

    async def serve_tcp(self, reader, writer):
        try:
            writer.write(STATUS_REPLY[:17])
            await writer.drain()
            await asyncio.sleep(.01)
            writer.write(STATUS_REPLY[17:])
            await writer.drain()
            while True:
                _, _, length, identity, command, _ = HEADER.unpack(await reader.readexactly(40))
                param = json.loads(await reader.readexactly(length))["param"]
                if command == DETAIL:
                    msg = {"duration": "00:05:00", "code": "H.264"}
                else:
                    self.assertEqual(command, RECORDINGS)
                    self.assertEqual(param["PageSize"], "15")
                    page = int(param["PageIndex"])
                    self.page_numbers.append(page)
                    suffix = 1 if self.repeat_page else page
                    msg = {
                        "AllTotal": "2", "Total": "1", "Root": "record",
                        "Dirs": [{
                            "Dir": f"录制 {suffix}",
                            "StartTime": "2026-11-10 09:00:00",
                            "MetaInfo": "{'Title': '应用课', 'Teacher': '未知'}" if page == 1 else "{invalid",
                            "Files": [
                                {"Name": "课堂.mp4", "Size": "4093819930"},
                                {"Name": "snapshot.jpg", "Size": "20"},
                                {"Name": "../outside.mp4", "Size": "20"},
                            ],
                        }],
                    }
                writer.write(STATUS_REPLY + packet(command, identity, msg))
                await writer.drain()
        except (asyncio.IncompleteReadError, ConnectionError):
            pass
        finally:
            writer.close()
            await writer.wait_closed()

    async def serve_http(self, reader, writer):
        try:
            self.http_request = await reader.readuntil(b"\r\n\r\n")
            response = {
                206: b"206 Partial Content\r\nContent-Range: bytes 10-13/60\r\nContent-Length: 4\r\n"
                     b"Content-Type: application/octet-stream\r\n\r\nclip",
                416: b"416 Range Not Satisfiable\r\nContent-Range: bytes */60\r\nContent-Length: 0\r\n\r\n",
                401: b"401 Unauthorized\r\nWWW-Authenticate: Basic realm=record\r\nContent-Length: 0\r\n\r\n",
                302: b"302 Found\r\nLocation: http://127.0.0.2/other\r\nContent-Length: 0\r\n\r\n",
            }
            writer.write(b"HTTP/1.1 " + response[self.http_status])
            await writer.drain()
        finally:
            writer.close()
            await writer.wait_closed()

    async def test_device_isolation_pagination_and_media(self):
        status = (await self.client.get("/api/devices")).json()["devices"]
        self.assertEqual((status[0]["used_mb"], status[0]["recording"]), (4000, "已暂停"))
        self.assertEqual(status[1]["connection"], "offline")
        data = (await self.client.get("/api/recordings", params={
            "start": "2026-11-10", "end": "2026-11-10", "q": "课堂",
        })).json()
        self.assertEqual(self.page_numbers, [1, 2])
        self.assertEqual(len(data["recordings"]), 2)
        self.assertEqual({row["title"] for row in data["recordings"]}, {"应用课", "未标注"})
        self.assertEqual({row["teacher"] for row in data["recordings"]}, {"未标注"})
        self.assertTrue(data["devices"][0]["complete"])
        self.assertFalse(data["devices"][1]["complete"])
        path = "/api/recordings/" + data["recordings"][0]["id"]
        self.assertEqual((await self.client.get(path + "/details")).json()["duration"], "00:05:00")
        response = await self.client.get(path + "/media", headers={"Range": "bytes=10-13", "If-Range": '"key"'})
        self.assertEqual(response.status_code, 206)
        self.assertEqual(response.headers["content-type"], "video/mp4")
        self.assertEqual(response.headers["content-range"], "bytes 10-13/60")
        self.assertEqual(response.content, b"clip")
        self.assertIn(b"/record/%E5%BD%95%E5%88%B6%20", self.http_request)
        self.assertIn(b'range: bytes=10-13\r\n', self.http_request.lower())
        self.assertIn(b'if-range: "key"\r\n', self.http_request.lower())
        for upstream, downstream in [(416, 416), (401, 401), (302, 502)]:
            self.http_status = upstream
            self.assertEqual((await self.client.get(path + "/media")).status_code, downstream)
        self.assertEqual((await self.client.get("/api/recordings/fake/media")).status_code, 404)

    async def test_duplicate_page_is_incomplete(self):
        self.repeat_page = True
        result = (await self.client.get("/api/recordings", params={"room": "a"})).json()
        self.assertEqual(len(result["recordings"]), 1)
        self.assertFalse(result["devices"][0]["complete"])
        self.assertEqual(result["devices"][0]["expected_directories"], 2)
