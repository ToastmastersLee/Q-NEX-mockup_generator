import asyncio
import unittest
from unittest.mock import AsyncMock, patch

import httpx

from app import create_app
from catalog import Device
from classroom import Command, DemoRecorder, Desk
from recorder import ClassroomError, Recorder, merge_settings, read_settings
from protocol import Connection


class ClassroomTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.devices = {}
        for key in ("a", "b"):
            self.devices[key] = DemoRecorder(key, self.devices)
        self.desk = Desk(self.devices)

    async def action(self, name, host="a", **args):
        return await self.desk.operate(Command(action=name, host=host, **args))

    async def test_power_on_targets_one_offline_room(self):
        gate = asyncio.Event()
        async def send():
            await gate.wait()
        for id in ("a", "b"):
            self.devices[id].inspect = AsyncMock(side_effect=TimeoutError)
            self.devices[id].power_on = AsyncMock(side_effect=send)
        with patch("classroom.POWER_CHECK_SECONDS", .01):
            first = asyncio.create_task(self.action("powerOn", room="b"))
            await asyncio.sleep(0)
            await self.action("powerOn", room="b")
            self.devices["a"].inspect.assert_not_awaited()
            self.devices["a"].power_on.assert_not_awaited()
            second = asyncio.create_task(self.action("powerOn", room="a"))
            await asyncio.sleep(0)
            gate.set()
            await asyncio.gather(first, second)
            state = self.desk.public(await self.desk.inspect())
            self.assertEqual([r["powerState"] for r in state["rooms"]], ["powerWaiting"] * 2)
            await self.action("powerOn", room="b")
            self.devices["b"].inspect.side_effect = None
            self.devices["b"].inspect.return_value = self.devices["b"].values
            await asyncio.wait_for(self.desk.power_tasks["b"], 1)
            self.assertEqual(set(self.desk.power_states), {"a"})
            with self.assertRaisesRegex(ClassroomError, "alreadyOnline"):
                await self.action("powerOn", room="b")
            for dev in self.devices.values():
                dev.power_on.assert_awaited_once()

    async def test_power_no_ack_and_connection_failure(self):
        dev = self.devices["a"]
        dev.inspect = AsyncMock(side_effect=TimeoutError)
        dev.power_on = AsyncMock(side_effect=ClassroomError("powerUnsent", "a"))
        with patch("classroom.POWER_CHECK_SECONDS", .01):
            await self.action("powerOn", room="a")
            await self.action("powerOn", room="a")
            dev.power_on.assert_awaited_once()
            await asyncio.wait_for(self.desk.power_tasks["a"], 1)
            dev.power_on.side_effect = ClassroomError("powerUnconfirmed", "a")
            await self.action("powerOn", room="a")
            await asyncio.sleep(.05)
            self.assertEqual(self.desk.power_states["a"], "powerUnconfirmed")
            self.assertEqual(dev.power_on.await_count, 2)

    async def test_power_command_is_on_only(self):
        with patch("recorder.Connection") as connection:
            recorder = Recorder(Device("b", "1F", "127.0.0.1"))
            await recorder.power_on()
            connection.return_value.__aenter__.return_value.request.assert_awaited_once_with(0x3105, {"power": 2})
        for power in (0, 1):
            with self.assertRaises(ValueError):
                await Connection("127.0.0.1", 6558).request(0x3105, {"power": power})

    async def test_join_retry_and_independent_routing(self):
        guest = self.devices["b"]
        original_join = guest.join
        guest.join = AsyncMock(side_effect=ClassroomError("playbackBusy","b"))
        with self.assertRaisesRegex(ClassroomError,"playbackBusy"):
            await self.action("start")
        self.assertEqual(self.devices["a"].values["role"], "host")
        guest.join = original_join
        state = await self.action("rejoin")
        self.assertEqual([step["key"] for step in state["steps"]],["join"])
        state = await self.action("route",room="b",port=2,value=6)
        self.assertEqual([out["channel"] for out in state["rooms"][1]["outputs"]], [3,6])
        self.assertTrue(state["sameClass"])
        self.devices["b"].values["placement"].append(dict(onHDMIType=1,streamChn=-1))
        with self.assertRaisesRegex(ClassroomError,"noMapping"):
            await self.action("route",room="b",port=1,value=2)

    async def test_role_reversal_and_retry_after_partial_settings(self):
        await self.action("start")
        cmd = dict(changes={"a":{"local":1},"b":{"speaker":1,"mics":4}},restart=True)
        guest = self.devices["b"]
        original_prefs = guest.prefs
        guest.prefs = AsyncMock(side_effect=ClassroomError("deviceRejected","b"))
        with self.assertRaisesRegex(ClassroomError,"deviceRejected"):
            await self.action("apply","b",**cmd)
        self.assertEqual(self.devices["a"].values["settings"]["local"],1)
        guest.prefs = original_prefs
        state = await self.action("apply","b",**cmd)
        self.assertTrue(state["sameClass"])
        self.assertEqual(state["host"], "b")
        self.assertEqual(state["rooms"][0]["mute"],0)
        self.assertEqual([s["key"] for s in state["steps"]], ["settings","start","join"])
        with self.assertRaisesRegex(ClassroomError,"restartRequired"):
            await self.action("start","a")
        # A retry with the same desired configuration must leave this class running.
        self.assertEqual((await self.action("apply","b",**cmd))["steps"], [])

    async def test_validation_precedes_ending_class(self):
        await self.action("start")
        with self.assertRaisesRegex(ClassroomError,"invalidSetting"):
            await self.action("apply",changes={"a":{"mics":8}},restart=True)
        self.assertEqual(self.devices["a"].values["role"],"host")
        self.devices["a"].values["meeting"]["member"].append({"account":"another-room"})
        with self.assertRaisesRegex(ClassroomError,"anotherClass"):
            await self.action("end")

    async def test_operator_boundary(self):
        app = create_app([Device("a","3F"),Device("b","1F")])
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app),
                                     base_url="http://127.0.0.1:8088") as client:
            bad = await client.post("/api/classroom/action?mode=demo",json={"action":"start","host":"a"},
                                    headers={"Origin":"https://unrelated.example"})
            self.assertEqual(bad.status_code,403)
            good = await client.post("/api/classroom/action?mode=demo",json={"action":"start","host":"a"})
            self.assertTrue(good.json()["sameClass"])
            state = await client.get("/api/classroom?mode=live")
            self.assertFalse(any(r["online"] for r in state.json()["rooms"]))

    def test_preserve_native_settings(self):
        layout = {"type":"none","chn":[{"chnId":1}]}
        codec = {"width":1920,"height":1080,"bitrate":2048,"fps":25,"codec":0}
        native = {"director":{"enable":1}, "devInfo":{"autoJoin":1,"splitScreenType":0},
                  "senderCreatorLayout":[layout,layout],"senderJoinerLayout":[layout],
                  "videoCreatorInfo":[codec,codec],"videoJoinerInfo":[codec]}
        changed = merge_settings(native,{"mics":3,"quality2":"hd","send2":4})
        self.assertEqual(changed["devInfo"]["autoJoin"],1)
        self.assertEqual(changed["director"],{"enable":1})
        self.assertEqual(changed["videoCreatorInfo"][1]["fps"],25)
        self.assertEqual(native["videoCreatorInfo"][1]["width"],1920)
        selected = read_settings(changed)
        self.assertEqual((selected["mics"],selected["quality2"],selected["send2"]),(3,"hd",4))

