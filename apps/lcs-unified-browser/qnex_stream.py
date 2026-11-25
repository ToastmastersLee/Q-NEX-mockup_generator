"""Authenticated Q-NEX room distribution from the local classroom console."""
import asyncio
import base64
import hashlib
import shutil
import subprocess
import time
from typing import Literal
from urllib.parse import urljoin, urlsplit

import httpx
from fastapi import HTTPException, Request
from pydantic import BaseModel, Field, SecretStr
from protocol import Connection, DeviceError

GATEWAY = "https://mg.qnextech.com/openApi/consoleGateway/"
INGEST = "rtmp://27.151.53.58:21935"
ROOM_KEYS = {"Lee": "live/av21", "Codex": "live/av43"}
RECEIVERS = {"LQ Test": 90, "1F NDP600": 96}
FLAGS = getattr(subprocess, "CREATE_NO_WINDOW", 0)


class Command(BaseModel):
    action: Literal["inspect", "start", "stop"]
    room: Literal["Lee", "Codex"] = "Lee"
    floor: Literal["a", "b"] = "b"
    channel: Literal["film", "teacher", "existing"] = "film"
    target: Literal["solo", "both"] = "solo"
    volume: int = Field(default=30, ge=0, le=100)


class Login(BaseModel):
    username: str
    password: SecretStr
    code: str = ""


class Issue(Exception):
    pass


class Gateway:
    def __init__(self):
        self.client = httpx.Client(base_url=GATEWAY, timeout=9.0)
        self.token = None
        self.challenge = None

    def post(self, path, body=None, *, auth=True):
        payload = {"jsonBody": body} if body is not None else {}
        if auth:
            if not self.token:
                raise Issue("login")
            payload["jsonHead"] = {"accessToken": self.token}
        response = self.client.post(path, json=payload)
        response.raise_for_status()
        result = response.json()["jsonBody"]
        code = int(result["rtnCode"])
        if code in (1005, -3) and auth:
            self.token = None
            raise Issue("login")
        if code:
            raise Issue(f"platform:{code}")
        return result

    def login(self, login):
        username = login.username.strip()
        validation = self.post("validate/selectDisVerificationCode", {"userName": username}, auth=False)
        challenge_key = ""
        if int(validation["rtnResult"]) == 0 and login.code and self.challenge and self.challenge[0] == username:
            challenge_key = self.challenge[1]
        elif int(validation["rtnResult"]) == 0:
            response = self.client.get("validate/getVerificationCodeData")
            response.raise_for_status()
            result = response.json()["jsonBody"]
            image_url = urljoin(GATEWAY, result.get("msg", ""))
            parts = urlsplit(image_url)
            if result.get("rtnCode") != 0 or (parts.scheme, parts.netloc) != ("https", "mg.qnextech.com"):
                raise Issue("challenge")
            image = self.client.get(image_url)
            image.raise_for_status()
            mime = image.headers.get("Content-Type", "").split(";")[0]
            if mime not in ("image/png", "image/jpeg", "image/gif"):
                raise Issue("challenge")
            self.challenge = (username, parts.path.rsplit("/", 1)[-1].rsplit(".", 1)[0])
            return {"state": "challenge", "image": f"data:{mime};base64," + base64.b64encode(image.content).decode()}
        password = login.password.get_secret_value().encode()
        result = self.post("userInfoController/loginValidate", {
            "userName": username, "userPwd": hashlib.sha1(password).hexdigest(),
            "userOtherPwd": hashlib.md5(password).hexdigest(),
            "verCode": login.code, "verKeyCode": challenge_key,
        }, auth=False)
        token = result["msgBody"]["accessToken"]
        if not token:
            raise Issue("login")
        self.token = token
        self.challenge = None
        return {"state": "authenticated"}

    def room(self, name):
        rows = self.post("equipmentController/selectLiveRoomList")["msgBody"]
        found = [r for r in rows if r["liveName"] == name]
        if len(found) != 1:
            raise Issue("room")
        row = found[0]
        if row["address"].rstrip("/") != INGEST or row["key"] != ROOM_KEYS[name]:
            raise Issue("room")
        return row

    def receivers(self):
        tree = self.post("equipmentController/selectUserOrgEquipmentTree",
                         {"typeList": list(range(11)), "isBroardcast": True})["msgBody"]
        stack, found = [tree], {}
        while stack:
            node = stack.pop()
            stack.extend(node.get("children") or [])
            name = node.get("orgName")
            if name in RECEIVERS and node.get("orgType") == RECEIVERS[name]:
                found.setdefault(name, []).append(node)
        return found

    def update(self, row, ids, state, audio_only, volume):
        return self.post("equipmentController/updateLiveState", {
            "liveId": row["liveId"], "orgIdAndEquipmentIdList": ids, "state": state,
            "type": int(audio_only), "vol": volume,
        })


def tracks(url):
    probe = shutil.which("ffprobe")
    if not probe:
        raise Issue("ffmpeg")
    try:
        result = subprocess.run([probe, "-v", "debug", "-rtmp_live", "live",
            "-rw_timeout", "4000000", "-analyzeduration", "800000", "-probesize", "262144",
            "-show_entries", "stream=codec_type", "-of", "csv=p=0", url],
            capture_output=True, timeout=7, creationflags=FLAGS)
    except subprocess.TimeoutExpired:
        raise Issue("media") from None
    if result.returncode == 0:
        kinds = set(result.stdout.decode().split())
        if kinds & {"audio", "video"}:
            return kinds
    # This media server closes an idle playback request immediately after PLAY.
    error = result.stderr
    if b"Sending play command for" in error and error.rstrip().endswith(b"I/O error"):
        return set()
    raise Issue("media")


async def live_command(device, command, params=None):
    async with Connection(device.ip, device.tcp_port) as conn:
        return await conn.request(command, params)


def recorder_command(device, command, params=None):
    try:
        return asyncio.run(live_command(device, command, params))
    except (OSError, TimeoutError, DeviceError):
        raise Issue("recorder") from None


def recorder_source(device, channel, destination):
    group, index, key = ("filmChn", 0, "filmChn1") if channel == "film" else ("resChn", 2, "resChn3")
    status = recorder_command(device, 0x3104)
    try:
        row = status[group][index]
        info = row["streamInfo"]
        address = info["url"]
        parsed = urlsplit(address)
        active = int(row["play"]) == 1
    except (IndexError, KeyError, TypeError, ValueError):
        raise Issue("recorder") from None
    if info.get("enableAudio") == 0:
        raise Issue("sourceAudio")
    if address == destination:
        return key, address, active
    if parsed.scheme == "rtmp" and parsed.hostname == device.ip and (parsed.port or 1935) == 1935:
        return key, address, active
    if info.get("dupRtsp") == 1 and active:
        return key, f"rtsp://{device.ip}/live_{channel}", active
    raise Issue("sourceRoute")


class Distribution:
    def __init__(self, devices):
        self.devices = {d.id: d for d in devices}
        self.api = Gateway()
        self.relays = {}
        self.owned = {}
        self.inputs = {}
        self.opened_inputs = set()

    def release(self, name):
        process = self.relays.pop(name, None)
        if process:
            if process.poll() is None:
                process.kill()
            process.wait(timeout=5)
        self.owned.pop(name, None)
        source = self.inputs.get(name)
        if source and source in self.opened_inputs and not any(
                other != name and key == source for other, key in self.inputs.items()):
            floor, key = source
            recorder_command(self.devices[floor], 0x3103, {key: {"play": 0}})
            self.opened_inputs.discard(source)
        self.inputs.pop(name, None)

    def publish(self, cmd, url):
        device = self.devices[cmd.floor]
        if not device.ip:
            raise Issue("config")
        ffmpeg = shutil.which("ffmpeg")
        if not ffmpeg:
            raise Issue("ffmpeg")
        key, source, active = recorder_source(device, cmd.channel, url)
        self.inputs[cmd.room] = (cmd.floor, key)
        if not active:
            recorder_command(device, 0x3103, {key: {"play": 1}})
            self.opened_inputs.add((cmd.floor, key))
        direct = source == url
        process = None
        if not direct:
            if source.startswith("rtmp://"):
                self.wait_tracks(source, "sourceUnavailable")
                options = ["-rw_timeout", "8000000"]
            else:
                options = ["-rtsp_transport", "tcp", "-timeout", "8000000"]
            process = subprocess.Popen([ffmpeg, "-nostdin", "-loglevel", "error", *options,
                "-i", source, "-map", "0:v:0", "-map", "0:a:0", "-c", "copy", "-f", "flv", url],
                stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=FLAGS)
            self.relays[cmd.room] = process
        self.wait_tracks(url, "publishFailed", process)

    @staticmethod
    def wait_tracks(url, error, process=None):
        deadline = time.monotonic() + 17
        while time.monotonic() < deadline:
            if process and process.poll() is not None:
                raise Issue(error)
            try:
                kinds = tracks(url)
            except Issue as exc:
                if str(exc) != "media":
                    raise
                kinds = set()
            if {"video", "audio"} <= kinds:
                return
            time.sleep(.4)
        raise Issue(error)

    def run(self, cmd):
        name = cmd.room
        row = self.api.room(name)
        ids = set(row.get("orgIdAndEquipmentIdList") or [])
        active = int(row["state"]) == 1
        if not active:
            self.release(name)
        owner = self.owned.get(name)
        owned = bool(owner and owner["ids"] == ids and owner["user"] == row.get("userName"))
        if cmd.action == "inspect":
            devices = self.api.receivers()
            names = {n["orgId"]: label for label, nodes in devices.items() for n in nodes}
            return {"state": "active" if active else "idle", "targets": [names.get(x,x) for x in sorted(ids)], "owned": owned}
        if cmd.action == "stop":
            if not active:
                return {"state": "idle", "targets": []}
            if not owned:
                raise Issue("external")
            try:
                self.api.update(row, sorted(ids), 0, row["type"], owner["volume"])
                if int(self.api.room(name)["state"]) != 0:
                    raise Issue("unconfirmed")
            except (httpx.HTTPError, KeyError, ValueError):
                raise Issue("unconfirmed") from None
            self.release(name)
            return {"state": "stopped", "targets": []}
        if active:
            raise Issue("external")
        names = list(RECEIVERS) if cmd.target == "both" else ["LQ Test"]
        choices = self.api.receivers()
        targets = []
        for label in names:
            nodes = choices.get(label, [])
            if len(nodes) != 1 or nodes[0].get("isOnline") != 1 or nodes[0]["orgId"] in (row.get("unControIdList") or []):
                raise Issue("targets")
            targets.append(nodes[0]["orgId"])
        url = f"{INGEST}/{ROOM_KEYS[name]}"
        kinds = tracks(url)
        if cmd.channel == "existing" and not kinds:
            raise Issue("empty")
        if cmd.channel != "existing" and kinds:
            raise Issue("occupied")
        sent = False
        try:
            if cmd.channel != "existing":
                self.publish(cmd, url)
            row = self.api.room(name)
            if int(row["state"]) != 0:
                raise Issue("external")
            sent = True
            response = self.api.update(row, targets, 1, cmd.channel == "existing" and "video" not in kinds, cmd.volume)
            user = (response.get("msgBody") or {}).get("userName")
            self.owned[name] = {"ids": set(targets), "user": user, "volume": cmd.volume}
            updated = self.api.room(name)
            if int(updated["state"]) != 1 or set(updated.get("orgIdAndEquipmentIdList") or []) != set(targets) or updated.get("userName") != user:
                raise Issue("unconfirmed")
            return {"state": "started", "targets": names, "owned": True}
        except Issue as exc:
            if not sent or str(exc).startswith("platform:") or str(exc) == "login" and name not in self.owned:
                self.release(name)
            raise
        except Exception:
            if sent:
                raise Issue("unconfirmed") from None
            self.release(name)
            raise

    def close(self):
        for name in set(self.inputs) | set(self.relays):
            self.release(name)
        self.api.client.close()


def install_streaming(app, devices):
    service = Distribution(devices)
    lock = asyncio.Lock()

    async def execute(request, callback, command):
        if request.headers.get("x-requested-with") != "IQVideo":
            raise HTTPException(403)
        if lock.locked():
            raise HTTPException(409, "busy")
        async with lock:
            try:
                return await asyncio.to_thread(callback, command)
            except Issue as exc:
                raise HTTPException(409, str(exc)) from None
            except (httpx.HTTPError, OSError, ValueError, KeyError, TypeError):
                raise HTTPException(502, "gateway") from None

    @app.post("/api/classroom/streaming/login")
    async def login(cmd: Login, request: Request, mode: Literal["live"]):
        return await execute(request, service.api.login, cmd)

    @app.post("/api/classroom/streaming")
    async def streaming(cmd: Command, request: Request, mode: Literal["live"]):
        return await execute(request, service.run, cmd)

    @app.on_event("shutdown")
    async def shutdown():
        async with lock:
            await asyncio.to_thread(service.close)
