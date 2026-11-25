import unittest
from unittest.mock import Mock, patch

import httpx

from qnex_stream import Command, Distribution, Gateway, INGEST, Issue, Login, ROOM_KEYS


class DistributionTests(unittest.TestCase):
    def setUp(self):
        self.service = Distribution([Mock(id="b", ip="192.168.1.80")])
        self.service.api.client.close()
        self.service.api = Mock()
        self.row = dict(state=0, liveId="room-id", type=0, userName="", orgIdAndEquipmentIdList=[])
        self.service.api.room.side_effect = lambda name: self.row.copy()
        self.service.api.receivers.return_value = {
            label: [dict(orgId=key, isOnline=1)] for label,key in [("LQ Test","one"),("1F NDP600","two")]}
        def update(row, ids, state, audio_only, volume):
            self.row.update(state=state, orgIdAndEquipmentIdList=ids, userName="operator", type=int(audio_only))
            return {"msgBody": {"userName": "operator"}}
        self.service.api.update.side_effect = update

    @patch("qnex_stream.tracks", return_value={"audio"})
    def test_audio_only_and_both_receivers_without_preview(self, probe):
        result = self.service.run(Command(action="start", room="Codex", channel="existing", target="both", volume=38))
        probe.assert_called_once_with(INGEST + "/" + ROOM_KEYS["Codex"])
        args = self.service.api.update.call_args.args
        self.assertEqual(args[1:], (["one","two"], 1, True, 38))
        self.assertEqual(result["state"],"started")
        self.assertTrue(self.service.run(Command(action="inspect", room="Codex"))["owned"])
        self.assertEqual(self.service.run(Command(action="stop", room="Codex"))["state"],"stopped")

    @patch("qnex_stream.tracks", return_value=set())
    def test_new_recorder_feed_and_unconfirmed_command(self, probe):
        self.service.publish = Mock()
        self.service.api.update.side_effect = httpx.ReadTimeout("timeout")
        with self.assertRaisesRegex(Issue,"unconfirmed"):
            self.service.run(Command(action="start",channel="teacher"))
        self.service.publish.assert_called_once()
        self.service.api.update.assert_called_once()

    @patch("qnex_stream.tracks", return_value={"video","audio"})
    def test_preserve_occupied_room_and_external_session(self, probe):
        with self.assertRaisesRegex(Issue,"occupied"):
            self.service.run(Command(action="start"))
        self.row.update(state=1)
        for action in ["start","stop"]:
            with self.assertRaisesRegex(Issue,"external"):
                self.service.run(Command(action=action))
        self.service.api.update.assert_not_called()

    def test_offline_target(self):
        self.service.api.receivers.return_value["1F NDP600"][0]["isOnline"]=0
        with self.assertRaisesRegex(Issue,"targets"):
            self.service.run(Command(action="start", target="both"))
        self.service.api.update.assert_not_called()

    @patch("qnex_stream.subprocess.Popen")
    @patch("qnex_stream.recorder_command")
    @patch("qnex_stream.tracks")
    def test_inactive_film_uses_configured_rtmp_and_restores_only_film(self, probe, command, popen):
        self.service.devices["b"].ip = "192.168.1.80"
        local = "rtmp://192.168.1.80:1935/live/stream"
        command.return_value = {"filmChn": [{"play": 0, "streamInfo": {
            "url": local, "dupRtsp": 0, "type": 2, "enableAudio": 1}}]}
        popen.return_value.poll.return_value = None
        probe.side_effect = [set(), {"video","audio"}, {"video","audio"}]
        with patch("qnex_stream.shutil.which", return_value="ffmpeg"):
            self.service.run(Command(action="start"))
        self.assertIn(local, popen.call_args.args[0])
        self.service.run(Command(action="stop"))
        writes = [call.args[2] for call in command.call_args_list if call.args[1] == 0x3103]
        self.assertEqual(writes, [{"filmChn1": {"play": 1}}, {"filmChn1": {"play": 0}}])
        popen.return_value.kill.assert_called_once()

    @patch("qnex_stream.recorder_command")
    def test_existing_native_feed_remains_on(self, command):
        source = INGEST + "/" + ROOM_KEYS["Lee"]
        command.return_value = {"filmChn": [{"play": 1, "streamInfo": {"url": source}}]}
        with patch("qnex_stream.shutil.which", return_value="ffmpeg"), patch("qnex_stream.tracks", return_value={"video","audio"}):
            self.service.publish(Command(action="start"), source)
            self.service.release("Lee")
        self.assertEqual([c.args[1] for c in command.call_args_list], [0x3104])

    def test_gateway_expired_authentication(self):
        api = Gateway()
        self.addCleanup(api.client.close)
        api.token = "test"
        with patch.object(api.client,"post",return_value=Mock(json=lambda: {"jsonBody":{"rtnCode":1005}})):
            with self.assertRaisesRegex(Issue,"login"):
                api.room("Lee")
            self.assertIsNone(api.token)

    def test_login_challenge_never_sends_password_before_code(self):
        api = Gateway()
        self.addCleanup(api.client.close)
        with patch.object(api,"post",return_value={"rtnResult":0}) as post, patch.object(api.client,"get",side_effect=[
            Mock(json=lambda:{"jsonBody":{"rtnCode":0,"msg":"/captcha/example.png"}}),
            Mock(headers={"Content-Type":"image/png"},content=b"image")]):
            result = api.login(Login(username="test",password="local-test"))
            self.assertEqual(result["state"],"challenge")
            self.assertEqual(api.challenge,("test","example"))
            self.assertEqual(post.call_count,1)
