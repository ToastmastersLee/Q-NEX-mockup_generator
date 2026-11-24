"""The two classroom recorders. Native web settings and local transport have distinct APIs."""
import copy
import re
import secrets
import time

import httpx

from protocol import Connection, DeviceError, DeviceRejected, STATUS


CHANNELS = ["film", "computer", "computer2", "teacher", "student", "teacher_full", "student_full", "interactive"]
QUALITIES = {"sd": (640, 360, 512), "hd": (1280, 720, 1024),
             "fhd": (1920, 1080, 2048), "fhd4": (1920, 1080, 4096), "fhd8": (1920, 1080, 8192)}
LAYOUTS = {"send1": ("senderCreatorLayout", 0), "send2": ("senderCreatorLayout", 1),
           "returnSource": ("senderJoinerLayout", 0)}
ENCODERS = {"quality1": ("videoCreatorInfo", 0), "quality2": ("videoCreatorInfo", 1),
            "qualityReturn": ("videoJoinerInfo", 0)}
FLAGS = {"dual": "screenType", "speaker": "speakerFullScreen", "local": "showSelf",
         "mics": "defaultOpenMicNum", "split": "splitScreenType"}


class ClassroomError(Exception):
    def __init__(self, key, room=None, detail=None):
        super().__init__(key)
        self.key, self.room, self.detail = key, room, detail


def source_id(layout):
    channels = layout.get("chn") or []
    return channels[0].get("chnId") if len(channels) == 1 and layout.get("type") == "none" else None


def read_settings(raw):
    options = {key: raw["devInfo"].get(field) for key, field in FLAGS.items()}
    options["split"] = 4 if options["split"] == 1 else 9
    for key, (field, index) in LAYOUTS.items():
        options[key] = source_id(raw[field][index])
    for key, (field, index) in ENCODERS.items():
        enc = raw[field][index]
        actual = tuple(enc.get(k) for k in ("width", "height", "bitrate"))
        options[key] = next((name for name, values in QUALITIES.items() if values == actual), None)
    return options


def merge_settings(raw, changes):
    updated = copy.deepcopy(raw)
    for key, value in changes.items():
        if key in FLAGS:
            updated["devInfo"][FLAGS[key]] = int(value == 4) if key == "split" else value
        elif key in LAYOUTS:
            field, index = LAYOUTS[key]
            updated[field][index] = {"type": "none", "streamChn": index, "chn": [{"chnId": value}]}
        elif key in ENCODERS:
            field, index = ENCODERS[key]
            updated[field][index].update(zip(("width", "height", "bitrate"), QUALITIES[value]))
    return updated


class Recorder:
    def __init__(self, device):
        self.device, self.id = device, device.id
        self.channels = None
        self.identity = self.config = None
        self.identity_until = self.config_until = 0

    async def native(self, cmd, param=None, *, client=None):
        if client is None:
            async with httpx.AsyncClient(verify=False, trust_env=False, timeout=5) as session:
                return await self.native(cmd, param, client=session)
        response = await client.post(f"https://{self.device.ip}/action/InteractiveSvc",
                                     params={"cmd": f"0x{cmd:04X}"},
                                     json={"param": param} if param is not None else None)
        response.raise_for_status()
        reply = response.json()
        if str(reply.get("code")) != "200":
            if "uvc occupied" in str(reply.get("res")).lower():
                raise ClassroomError("playbackBusy", self.id)
            if cmd == 0x5108 and reply.get("code") == 403 and "meeting" in str(reply.get("res")).lower():
                return {}
            raise ClassroomError("deviceRejected", self.id, f"0x{cmd:04X} / {reply.get('code')}")
        return reply.get("msg") or {}

    async def tcp(self, cmd, params=None):
        async with Connection(self.device.ip, self.device.tcp_port) as conn:
            return await conn.request(cmd, params)

    async def channel_names(self):
        if self.channels is None:
            async with httpx.AsyncClient(verify=False, trust_env=False, timeout=4) as client:
                response = await client.post(f"https://{self.device.ip}/GetChnSynTopic")
            response.raise_for_status()
            match = re.search(r"chnName\[([^\]]+)\]", response.text)
            if not match:
                raise ClassroomError("noChannels", self.id)
            self.channels = [s.strip() for s in match[1].split(",")]
        return self.channels

    async def inspect(self):
        if not self.device.ip:
            raise ClassroomError("unconfigured", self.id)
        async with Connection(self.device.ip, self.device.tcp_port) as conn:
            status = await conn.status()
            active = bool(status["interactiveStatus"]["interactive"])
            first = await conn.request(0x440A)
            second = await conn.request(0x440C)
            audio = await conn.request(0x4418)
            dual = await conn.request(0x4412)
            placement = await conn.request(0x4403) if active else []
        channels = await self.channel_names()
        now = time.monotonic()
        async with httpx.AsyncClient(verify=False, trust_env=False, timeout=5) as client:
            if now >= self.identity_until:
                self.identity = await self.native(0x5110, client=client)
                self.identity_until = now + 30
            if now >= self.config_until:
                self.config = await self.native(0x5111, client=client)
                self.config_until = now + 5
            meeting = await self.native(0x5108, client=client) if active else {}
        identity, raw = self.identity, self.config
        local = next((p for p in meeting.get("member", []) if p.get("account") == identity["account"]), {})
        return dict(id=self.id, ip=self.device.ip, online=True, model=status["serverModel"],
                    name=identity.get("name") or self.device.room, account=identity["account"],
                    meeting=meeting, role=("host" if meeting.get("creatorAccount") == identity["account"]
                                            else "guest") if meeting else "idle",
                    record=status["recordStatus"]["record"], mute=audio.get("audioIn", {}).get("mute"),
                    speak=local.get("speak"), channels=[dict(id=i, key=k) for i,k in enumerate(channels)],
                    settings=read_settings(raw), enabled=dual.get("enableScreen2"),
                    sends=[source_id(first.get("layout", {})), second.get("type")], placement=placement)

    async def create(self):
        await self.native(0x5100, {"password": str(secrets.randbelow(900000) + 100000),
                                   "meetingMode": 0, "inviteMember": []})

    async def join(self, meeting):
        await self.native(0x5101, {key: meeting[key] for key in ("meetingId", "password")})

    async def stop(self):
        await self.native(0x5102)

    async def prefs(self, changes):
        if changes:
            self.config_until = 0
            raw = await self.native(0x5111)
            desired = merge_settings(raw, changes)
            if desired != raw:
                await self.native(0x5112, desired)
                self.config_until = 0
        if "dual" in changes:
            await self.dual(changes["dual"])

    async def dual(self, value):
        if (await self.tcp(0x4412)).get("enableScreen2") != value:
            await self.tcp(0x4411, {"enableScreen2": value})

    async def route(self, stream, channel):
        if stream == 0:
            await self.tcp(0x4409, {"layout": {"type": "none", "chn": [{"chnId": channel}]}})
        else:
            await self.tcp(0x440B, {"type": channel})

    async def member(self, target, field, value):
        cmd, key = (0x5106, "muteMic") if field == "mute" else (0x5107, "speak")
        await self.native(cmd, {"account": target, key: value})

    async def recording(self, value):
        await self.tcp(0x3101, {"record": value})

    async def power_on(self):
        if not self.device.ip:
            raise ClassroomError("unconfigured", self.id)
        try:
            async with Connection(self.device.ip, self.device.tcp_port) as conn:
                try:
                    await conn.request(0x3105, {"power": 2})
                except (OSError, TimeoutError) as exc:
                    raise ClassroomError("powerUnconfirmed", self.id) from exc
                except DeviceRejected:
                    raise
                except DeviceError as exc:
                    raise ClassroomError("powerUnconfirmed", self.id) from exc
        except (OSError, TimeoutError) as exc:
            raise ClassroomError("powerUnsent", self.id) from exc

