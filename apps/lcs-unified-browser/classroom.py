"""Classroom state machine shared by the real devices and the offline demonstration."""
import asyncio
import copy
from datetime import datetime
import time
from typing import Literal

import httpx
from fastapi import HTTPException
from pydantic import BaseModel, ConfigDict, Field

from protocol import DeviceError
from classroom_media import choose_route
from recorder import CHANNELS, ENCODERS, FLAGS, LAYOUTS, QUALITIES, ClassroomError, Recorder

Room = Literal["a", "b"]
ROOMS = ("a", "b")
PORT_STREAM = {1: 1, 2: 0}
TRANSIENT = (ClassroomError, DeviceError, OSError, TimeoutError, httpx.HTTPError, ValueError, KeyError, IndexError, TypeError)


class Command(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    action: Literal["start", "end", "rejoin", "route", "mute", "speak", "record", "apply"]
    host: Room
    room: Room | None = None
    port: Literal[1, 2] | None = None
    value: int | None = None
    changes: dict[Room, dict[str, int | str]] = Field(default_factory=dict)
    restart: bool = False


def other(room):
    return "b" if room == "a" else "a"


class DemoRecorder:
    def __init__(self, id, network):
        self.id, self.network = id, network
        self.values = dict(id=id, name="3F" if id == "a" else "1F", ip="", online=True,
                           model="LCS810", account=id, role="idle", meeting={}, record=0, mute=1, speak=0,
                           placement=[], sends=[2, 3], enabled=1,
                           channels=[dict(id=i,key=k) for i,k in enumerate(CHANNELS)],
                           settings=dict(dual=1, local=0, speaker=0, mics=0, split=9, send1=2, send2=3,
                                         returnSource=4, quality1="fhd", quality2="fhd", qualityReturn="hd"))

    async def inspect(self):
        return copy.deepcopy(self.values)

    async def create(self):
        self.values.update(role="host", meeting={"creatorAccount": self.id, "meetingId": self.id,
                                                  "member": [{"account": self.id}]},
                           sends=[self.values["settings"][k] for k in ("send1", "send2")])

    async def join(self, meeting):
        host = self.network[meeting["creatorAccount"]].values
        host["meeting"]["member"] = [{"account": host["account"]}, {"account": self.id}]
        self.values.update(role="guest", meeting=copy.deepcopy(host["meeting"]),
                           mute=int(host["settings"]["mics"] == 0), speak=0,
                           placement=[dict(account=host["account"], streamChn=i, onHDMIType=i,
                                           pos=[0,0,1920,1080]) for i in range(2 if self.values["enabled"] and host["enabled"] else 1)])

    async def stop(self):
        room = self.values
        if room["role"] == "host":
            for dev in self.network.values():
                if dev.values["meeting"].get("creatorAccount") == self.id:
                    dev.values.update(meeting={}, placement=[], role="idle", speak=0)
        else:
            self.values.update(meeting={}, placement=[], role="idle", speak=0)

    async def prefs(self, changes):
        self.values["settings"].update(changes)
        if "dual" in changes:
            await self.dual(changes["dual"])

    async def dual(self, value):
        self.values["enabled"] = value

    async def route(self, stream, channel):
        self.values["sends"][stream] = channel

    async def member(self, target, field, value):
        self.network[target].values[field] = value
        if field == "speak" and value:
            self.network[target].values["mute"] = 0

    async def recording(self, value):
        self.values["record"] = value


class Desk:
    def __init__(self, devices):
        self.devices = devices
        self.lock = asyncio.Lock()
        self.read_lock = asyncio.Lock()
        self.last_rooms = None
        self.read_time = 0
        self.steps = []

    async def inspect(self, cached=False):
        async def inspect_one(id):
            try:
                return await self.devices[id].inspect()
            except TRANSIENT as exc:
                return dict(id=id, online=False, ip="", error=exc.key if isinstance(exc, ClassroomError) else "offline")
        async with self.read_lock:
            if cached and self.last_rooms and time.monotonic() - self.read_time < 1.5:
                return self.last_rooms
            rooms = await asyncio.gather(*(inspect_one(i) for i in ROOMS))
            self.last_rooms = {r["id"]: r for r in rooms}
            self.read_time = time.monotonic()
            return self.last_rooms

    @staticmethod
    def pair(rooms, host):
        guest = rooms[other(host)]
        return (rooms[host].get("role") == "host" and guest.get("role") == "guest" and
                guest["meeting"].get("meetingId") == rooms[host]["meeting"].get("meetingId") and
                guest["meeting"].get("creatorAccount") == rooms[host]["account"])

    def public(self, rooms):
        hosts = [i for i in ROOMS if rooms[i].get("role") == "host"]
        result = []
        for id, r in rooms.items():
            if not r["online"]:
                result.append(r)
                continue
            entry = {k: r[k] for k in ("id","online","ip","model","name","role","record","mute","speak","settings","channels")}
            entry.update(inMeeting=bool(r["meeting"]), outputs=[])
            peer = rooms[other(id)]
            paired = self.pair(rooms,other(id))
            for port, logical in PORT_STREAM.items():
                tile = choose_route(r["placement"], logical, peer.get("account")) if paired else None
                stream = tile[0] if tile else logical
                entry["outputs"].append(dict(port=port, stream=stream, mapped=bool(tile),
                                             source=other(id) if tile else None,
                                             channel=peer["sends"][stream] if tile else None))
            result.append(entry)
        host = hosts[0] if len(hosts) == 1 else None
        return dict(rooms=result,host=host,sameClass=bool(host and self.pair(rooms,host)),
                    steps=self.steps.copy(),updated=datetime.now().astimezone().isoformat(timespec="seconds"))

    async def wait(self, predicate, key, room):
        for _ in range(12):
            rooms = await self.inspect()
            if predicate(rooms):
                return rooms
            await asyncio.sleep(.45)
        raise ClassroomError(key, room)

    async def step(self, name, room, func, *args):
        try:
            await func(*args)
        except TRANSIENT as exc:
            if isinstance(exc,ClassroomError):
                raise
            raise ClassroomError("deviceRejected",room,str(exc) if isinstance(exc,DeviceError) else None) from exc
        self.steps.append(dict(key=name, room=room, ok=True))

    def validate(self, cmd, rooms):
        for id in ROOMS:
            if not rooms[id]["online"] and (cmd.action != "record" or cmd.room == id):
                raise ClassroomError("offline",id)
        if cmd.action in ("record","mute","speak","route") and cmd.room is None:
            raise ClassroomError("invalidTarget")
        for id, edits in cmd.changes.items():
            for k,v in edits.items():
                channel_ids = [x["id"] for x in rooms[id]["channels"] if x["key"] != "interactive"
                               and (k != "send2" or x["key"] != "film")]
                if k in LAYOUTS:
                    valid = type(v) is int and v in channel_ids
                elif k in ENCODERS:
                    valid = v in QUALITIES
                elif k in FLAGS:
                    values = range(5) if k == "mics" else (4,9) if k == "split" else (0,1)
                    valid = type(v) is int and v in values
                else:
                    valid = False
                if not valid:
                    raise ClassroomError("invalidSetting",id,k)

    async def ensure_idle(self, rooms):
        for id in ROOMS:
            r = rooms[id]
            if r["role"] == "guest" and not self.pair(rooms,other(id)):
                raise ClassroomError("anotherClass",id)
            if r["role"] == "host":
                known = {x["account"] for x in rooms.values() if x["online"]}
                if any(m.get("account") not in known for m in r["meeting"].get("member", [])):
                    raise ClassroomError("anotherClass",id)
        for id in ROOMS:
            if rooms[id]["role"] == "host":
                await self.step("end",id,self.devices[id].stop)
        return await self.wait(lambda rs: all(x.get("role")=="idle" for x in rs.values()), "endTimeout", None)

    async def ensure_pair(self, rooms, host):
        guest = other(host)
        if self.pair(rooms,host):
            return rooms
        if rooms[guest]["role"] != "idle" or rooms[host]["role"] == "guest":
            raise ClassroomError("anotherClass",guest)
        for id in (host,guest):
            r = rooms[id]
            if r["role"] == "idle" and r["enabled"] != r["settings"]["dual"]:
                await self.step("dual",id,self.devices[id].dual,r["settings"]["dual"])
        if rooms[host]["role"] == "idle":
            await self.step("start",host,self.devices[host].create)
            rooms = await self.wait(lambda rs: rs[host].get("role")=="host","startTimeout",host)
        if not self.pair(rooms,host):
            await self.step("join",guest,self.devices[guest].join,rooms[host]["meeting"])
            rooms = await self.wait(lambda rs: self.pair(rs,host),"joinTimeout",guest)
        return rooms

    async def operate(self, cmd):
        if self.lock.locked():
            raise ClassroomError("busy")
        async with self.lock:
            self.steps = []
            try:
                return await self.perform(cmd)
            except ClassroomError as exc:
                self.steps.append(dict(key=exc.key,room=exc.room,ok=False))
                raise

    async def perform(self, cmd):
        rooms = await self.inspect()
        self.validate(cmd,rooms)
        action,host,id,value = cmd.action,cmd.host,cmd.room,cmd.value
        if action in ("start","apply","rejoin","end"):
            if action == "rejoin" and rooms[host]["role"] != "host":
                raise ClassroomError("noClass",host)
            edits = {r:{k:v for k,v in patch.items() if rooms[r]["settings"].get(k)!=v
                        or (k=="dual" and rooms[r]["enabled"]!=v)} for r,patch in cmd.changes.items()}
            active = any(x["meeting"] for x in rooms.values())
            need_stop = active and (action=="end" or any(edits.values()) or rooms[other(host)]["role"]=="host")
            if need_stop:
                if action != "end" and not cmd.restart:
                    raise ClassroomError("restartRequired",host)
                rooms = await self.ensure_idle(rooms)
            if action != "end":
                for r,patch in edits.items():
                    if patch:
                        await self.step("settings",r,self.devices[r].prefs,patch)
                        await self.wait(lambda rs: rs[r].get("online") and all(
                            rs[r]["settings"].get(k)==v for k,v in patch.items()) and (
                            "dual" not in patch or rs[r]["enabled"]==patch["dual"]), "verifySettings",r)
                rooms = await self.ensure_pair(rooms,host)
        elif action == "record":
            previous = rooms[id]["record"]
            allowed = {0:(1,2,3),1:(0,),2:(1,3),3:(2,)}
            if value not in allowed:
                raise ClassroomError("invalidSetting",id)
            if previous != value and not (previous in (1,3) and value in (1,3)):
                if previous not in allowed[value]:
                    raise ClassroomError("recordState",id)
                await self.step("record",id,self.devices[id].recording,value)
                expected = (1,3) if value in (1,3) else (value,)
                rooms = await self.wait(lambda rs: rs[id].get("record") in expected,"verifyRecord",id)
        else:
            if not self.pair(rooms,host):
                raise ClassroomError("noClass",host)
            if action=="route":
                if id != other(host) or cmd.port not in PORT_STREAM:
                    raise ClassroomError("invalidTarget",id)
                out = self.public(rooms)["rooms"][ROOMS.index(id)]["outputs"][cmd.port-1]
                if not out["mapped"]:
                    raise ClassroomError("noMapping",id)
                stream = out["stream"]
                options = [c["id"] for c in rooms[host]["channels"] if c["key"]!="interactive"
                           and (stream==0 or c["key"]!="film")]
                if value not in options:
                    raise ClassroomError("invalidSetting",id)
                if rooms[host]["sends"][stream] != value:
                    await self.step("route",id,self.devices[host].route,stream,value)
                rooms = await self.wait(lambda rs: self.pair(rs,host) and rs[host]["sends"][stream]==value,
                                        "verifyRoute",id)
            else:
                if value not in (0,1) or (action=="speak" and id==host):
                    raise ClassroomError("invalidTarget",id)
                if action=="mute" and value and rooms[id]["speak"]:
                    raise ClassroomError("revokeFirst",id)
                if rooms[id][action] != value:
                    await self.step(action,id,self.devices[host].member,rooms[id]["account"],action,value)
                rooms = await self.wait(lambda rs: rs[id].get(action)==value, "verifyMember",id)
        return self.public(rooms)


def install_classroom(app, devices):
    simulated = {}
    for id in ROOMS:
        simulated[id] = DemoRecorder(id,simulated)
    desks = {"live": Desk({d.id: Recorder(d) for d in devices}), "demo": Desk(simulated)}

    @app.get("/api/classroom")
    async def state(mode: Literal["live","demo"]):
        desk = desks[mode]
        return desk.public(await desk.inspect(cached=True))

    @app.post("/api/classroom/action")
    async def action(mode: Literal["live","demo"], cmd: Command):
        desk = desks[mode]
        try:
            return await desk.operate(cmd)
        except ClassroomError as exc:
            raise HTTPException(409,dict(key=exc.key,room=exc.room,note=exc.detail,steps=desk.steps)) from exc

