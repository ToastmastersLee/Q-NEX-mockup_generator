"""Device configuration, status, and recording catalog."""

import ast
import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timedelta
import hashlib
from ipaddress import IPv4Address
import json
from pathlib import Path
import re
import time

from protocol import Connection, DeviceError, RECORDINGS

BASE = Path(__file__).resolve().parent
MIME = {".mp4": "video/mp4", ".mov": "video/quicktime", ".webm": "video/webm", ".m4v": "video/mp4"}
PAGE_SIZE = 15
MAX_PAGES = 400


@dataclass(frozen=True)
class Device:
    id: str
    room: str
    ip: str = ""
    tcp_port: int = 6558
    http_port: int = 9090
    auth: str = ""
    username: str = ""
    password: str = field(default="", repr=False)


def read_config(path):
    example = json.loads((BASE / "config.example.json").read_text(encoding="utf-8"))
    config = json.loads(path.read_text(encoding="utf-8-sig")) if path.exists() else example
    devices = [Device(**item) for item in config["devices"]]
    if [d.id for d in devices] != ["a", "b"] or not all(d.room.strip() for d in devices):
        raise ValueError("devices 必须依次配置 a、b 两台设备，并填写房间名")
    ips = [IPv4Address(d.ip) for d in devices if d.ip]
    if len(set(ips)) != len(ips):
        raise ValueError("两台设备必须使用不同 IP")
    for device in devices:
        if not all(type(port) is int and 1 <= port <= 65535 for port in (device.tcp_port, device.http_port)):
            raise ValueError("设备端口无效")
        if device.auth not in ("", "basic", "digest"):
            raise ValueError("auth 必须留空或为 basic、digest")
    return config.get("host", "0.0.0.0"), config.get("port", 8088), devices


def now():
    return datetime.now().astimezone().isoformat(timespec="seconds")


def integer(value):
    raw = str(value)
    return int(raw) if re.fullmatch(r"[0-9]{1,18}", raw) else None


def safe_segment(value):
    return (
        isinstance(value, str) and 0 < len(value) <= 255
        and value not in (".", "..")
        and not any(ch in value for ch in "/\\%")
        and not any(ord(ch) < 32 or ord(ch) == 127 for ch in value)
    )


def metadata(value):
    if isinstance(value, str) and len(value) <= 16_384:
        try:
            value = json.loads(value)
        except ValueError:
            try:
                value = ast.literal_eval(value)
            except (ValueError, SyntaxError, RecursionError):
                return {}
    return value if isinstance(value, dict) else {}


def label(value):
    if not isinstance(value, str) or value.strip().casefold() in {
        "", "未知", "未标注", "unknown", "unkown", "null", "none",
    }:
        return "未标注"
    return value.strip()


def normalize_status(device, msg):
    total, free = (integer(msg.get(k)) for k in ("diskTotalSize", "diskFreeSize"))
    used = total - free if total is not None and free is not None and free <= total else None
    if total is not None and free is not None and free > total:
        free = None
    record = msg.get("recordStatus")
    return {
        "id": device.id, "room": device.room, "ip": device.ip, "connection": "online",
        "total_mb": total, "free_mb": free, "used_mb": used,
        "recording": {"0": "空闲", "1": "录制中", "2": "已暂停", "3": "录制中"}.get(
            str(record.get("record")) if isinstance(record, dict) else "", "未获取"
        ),
        "model": msg.get("serverModel") if isinstance(msg.get("serverModel"), str) else None,
        "updated_at": now(), "error": None,
    }


def records_from_dir(device, directory):
    name = directory.get("Dir")
    files = directory.get("Files")
    if not safe_segment(name) or not isinstance(files, list):
        raise DeviceError("录像目录结构无效")
    meta = metadata(directory.get("MetaInfo"))
    start = directory.get("StartTime")
    try:
        start = datetime.strptime(start, "%Y-%m-%d %H:%M:%S").isoformat(sep=" ")
    except (TypeError, ValueError):
        start = None
    for entry in files:
        if not isinstance(entry, dict):
            raise DeviceError("录像文件结构无效")
        filename = entry.get("Name")
        if not isinstance(filename, str):
            raise DeviceError("录像文件缺少文件名")
        if Path(filename).suffix.lower() not in MIME or not safe_segment(filename):
            continue
        unique = json.dumps([device.id, name, filename], ensure_ascii=False).encode("utf-8")
        yield {
            "id": hashlib.sha256(unique).hexdigest(), "device_id": device.id,
            "room": device.room, "directory": name, "filename": filename,
            "title": label(meta.get("Title")), "teacher": label(meta.get("Teacher")),
            "start_time": start, "size_bytes": integer(entry.get("Size")),
        }


class Source:
    def __init__(self, device):
        self.device = device
        self.status_lock = asyncio.Lock()
        self.catalog_lock = asyncio.Lock()
        self.status_cache = None
        self.catalog_cache = None
        self.status_expiry = self.catalog_expiry = 0

    async def status(self, refresh=False):
        async with self.status_lock:
            if not refresh and self.status_cache and time.monotonic() < self.status_expiry:
                return self.status_cache
            device = self.device
            connection, error = "unconfigured", "未配置设备 IP"
            if device.ip:
                connection = "offline"
                try:
                    async with Connection(device.ip, device.tcp_port) as client:
                        connection = "error"
                        msg = await client.status()
                    self.status_cache = normalize_status(device, msg)
                    self.status_expiry = time.monotonic() + 10
                    return self.status_cache
                except TimeoutError:
                    error = "状态查询超时" if connection == "error" else "TCP 连接超时"
                except OSError:
                    error = "设备连接中断" if connection == "error" else "无法连接 TCP 端口"
                except DeviceError as exc:
                    error = str(exc)
            self.status_cache = {
                "id": device.id, "room": device.room, "ip": device.ip, "connection": connection,
                "total_mb": None, "free_mb": None, "used_mb": None,
                "recording": "未获取", "updated_at": now(), "error": error,
            }
            self.status_expiry = time.monotonic() + 10
            return self.status_cache

    async def catalog(self, refresh=False):
        device = self.device
        async with self.catalog_lock:
            status = await self.status()
            previous = self.catalog_cache
            if not refresh and previous and time.monotonic() < self.catalog_expiry:
                if status["connection"] not in ("offline", "unconfigured") or previous["error"]:
                    return previous
            rows, directories, expected, error = {}, set(), None, None
            try:
                if status["connection"] in ("offline", "unconfigured"):
                    raise DeviceError(status["error"])
                async with asyncio.timeout(30):
                    async with Connection(device.ip, device.tcp_port) as client:
                        for page in range(1, MAX_PAGES + 1):
                            result = await client.read(RECORDINGS, {
                                "PageIndex": str(page), "PageSize": str(PAGE_SIZE),
                                "Key": "", "From": "", "To": "",
                            })
                            items = result.get("Dirs")
                            if not isinstance(items, list) or result.get("Root") != "record":
                                raise DeviceError("设备未返回有效的录像目录")
                            if expected is None:
                                expected = integer(result.get("AllTotal"))
                            if not items:
                                if expected is not None and len(directories) < expected:
                                    raise DeviceError("分页提前结束")
                                break
                            before = len(directories)
                            for directory in items:
                                if not isinstance(directory, dict):
                                    raise DeviceError("录像目录结构无效")
                                parsed = list(records_from_dir(device, directory))
                                directories.add(directory["Dir"])
                                rows.update((row["id"], row) for row in parsed)
                            if len(directories) == before:
                                raise DeviceError("设备返回了重复分页")
                            if expected is not None and len(directories) >= expected:
                                break
                        else:
                            raise DeviceError("超过单次查询页数限制")
            except TimeoutError:
                error = "录像列表查询超时"
            except OSError:
                error = "读取录像列表时连接中断"
            except DeviceError as exc:
                error = str(exc)
            stale = bool(error and not rows and previous and previous["rows"])
            self.catalog_cache = {
                "device_id": device.id, "complete": error is None, "error": error,
                "updated_at": previous["updated_at"] if stale else now(), "stale": stale,
                "rows": previous["rows"] if stale else rows,
                "directories": previous["directories"] if stale else len(directories),
                "expected_directories": previous["expected_directories"] if stale else expected,
            }
            self.catalog_expiry = time.monotonic() + (10 if error else 60)
            return self.catalog_cache


DEMO_DEVICES = [Device("a", "三楼 · 演示"), Device("b", "一楼 · 演示")]


def demo_rows():
    today = datetime.now().date()
    rows = {}
    for device in DEMO_DEVICES:
        for index, (title, teacher, filename) in enumerate([
            ("智慧教室培训", "张老师", "Lecture.mp4"),
            ("课堂录制实训", "李老师", "实训.mp4"),
            (None, None, "PGM.mp4"),
        ]):
            row, = records_from_dir(device, {
                "Dir": f"demo_{index}", "MetaInfo": {"Title": title, "Teacher": teacher},
                "StartTime": f"{today - timedelta(days=index)} 09:{index * 10:02}:00",
                "Files": [{"Name": filename, "Size": (BASE / "static" / f"sample-{device.id}.mp4").stat().st_size}],
            })
            rows[row["id"]] = row
    return rows
