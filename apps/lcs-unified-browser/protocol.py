"""Framed local control protocol for the LCS810."""

import asyncio
import json
import secrets
import struct
import time

STATUS = 0x3106
RECORDINGS = 0x3149
DETAIL = 0x3153
HEADER = struct.Struct("<HHIQH22s")
VERSION = 0x6635
APPLICATION = 0x2802
MAX_BODY = 8 * 1024 * 1024
TIMEOUT = 3


class DeviceError(Exception):
    pass


class Connection:
    def __init__(self, ip, port):
        self.ip = ip
        self.port = port
        self.buffer = bytearray()
        self.last_status = None
        self.next_id = time.time_ns() // 1_000_000 * 10_000 + secrets.randbelow(10_000)

    async def __aenter__(self):
        self.reader, self.writer = await asyncio.wait_for(
            asyncio.open_connection(self.ip, self.port), TIMEOUT
        )
        return self

    async def __aexit__(self, *_):
        self.writer.close()
        try:
            await asyncio.wait_for(self.writer.wait_closed(), 1)
        except (OSError, TimeoutError):
            pass

    async def frame(self):
        while True:
            if len(self.buffer) >= HEADER.size:
                version, _, length, identity, command, _ = HEADER.unpack_from(self.buffer)
                if version != VERSION or length > MAX_BODY:
                    raise DeviceError("设备响应包头无效")
                end = HEADER.size + length
                if len(self.buffer) >= end:
                    body = bytes(self.buffer[HEADER.size:end])
                    del self.buffer[:end]
                    return command, identity, body
            chunk = await self.reader.read(65536)
            if not chunk:
                raise DeviceError("设备关闭连接")
            self.buffer.extend(chunk)

    @staticmethod
    def payload(command, body):
        try:
            result = json.loads(body.rstrip(b"\0").decode("utf-8"))
        except (UnicodeError, ValueError) as error:
            raise DeviceError(f"0x{command:04X} 返回的 JSON 无效") from error
        if not isinstance(result, dict) or str(result.get("code")) != "200":
            code = str(result.get("code", "")) if isinstance(result, dict) else ""
            suffix = f"（{code}）" if code.isascii() and code.isdecimal() and len(code) <= 6 else ""
            raise DeviceError(f"0x{command:04X} 设备拒绝请求{suffix}")
        if command in (STATUS, RECORDINGS, DETAIL) and not isinstance(result.get("msg"), dict):
            raise DeviceError(f"0x{command:04X} 缺少结果")
        return result.get("msg", {})

    async def receive(self, command, identity=None):
        while True:
            received, reply_id, body = await self.frame()
            if received == command and (command == STATUS or reply_id == identity):
                return self.payload(received, body)
            if received == STATUS:
                self.last_status = body

    async def read(self, command, params=None):
        if command not in (STATUS, RECORDINGS, DETAIL):
            raise ValueError("Unsupported read command")
        return await self.request(command, params)

    async def request(self, command, params=None):
        if command == 0x3105 and params != {"power": 2}:
            raise ValueError("Only power-on is supported")
        if command not in (STATUS, RECORDINGS, DETAIL, 0x3101, 0x3105, 0x4403, 0x4409,
                           0x440A, 0x440B, 0x440C, 0x4411, 0x4412, 0x4414, 0x4418):
            raise ValueError("Unsupported classroom command")
        self.next_id += 1
        body = (
            json.dumps({"param": params}, ensure_ascii=False).encode("utf-8")
            if params is not None else b""
        )
        self.writer.write(
            HEADER.pack(VERSION, APPLICATION, len(body), self.next_id, command, b"") + body
        )
        await asyncio.wait_for(self.writer.drain(), TIMEOUT)
        return await asyncio.wait_for(self.receive(command, self.next_id), TIMEOUT)

    async def status(self):
        if self.last_status is not None:
            return self.payload(STATUS, self.last_status)
        try:
            return await asyncio.wait_for(self.receive(STATUS), 0.4)
        except TimeoutError:
            return await self.read(STATUS)
