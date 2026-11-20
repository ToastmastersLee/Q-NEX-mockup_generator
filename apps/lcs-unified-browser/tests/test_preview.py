import io
import unittest

from classroom_media import choose_route, read_jpeg, stream_url


class PreviewTests(unittest.TestCase):
    def test_physical_outputs_use_the_active_receiver_layout(self):
        def tile(hdmi_type, channel, owner="host"):
            return dict(onHDMIType=hdmi_type, streamChn=channel, account=owner,
                        streamId=0, pos=[0, 0, 1920, 1080])
        layout = [tile(1, 0), tile(0, 1)]
        self.assertEqual(choose_route(layout, 1, "host"), (0, 0))
        self.assertEqual(choose_route(layout, 0, "host"), (1, 0))
        self.assertIsNone(choose_route(layout, 0, "another classroom"))
        self.assertIsNone(choose_route([*layout, tile(0, 2)], 0, "host"))
        self.assertIsNone(choose_route([tile(0, -1)], 0, "host"))
        layout[0]["pos"] = [0, 0, 960, 540]
        self.assertIsNone(choose_route(layout, 1, "host"))

    def test_rtsp_uses_receiver_reported_video_and_destination(self):
        selected = "rtsp://192.0.2.2:9954/receiver"
        row = {"type": 0, "streamChn": 1, "streamId": 0, "rtspUrl": selected}
        candidates = [
            {**row, "type": 1}, {**row, "streamId": 1}, {**row, "streamChn": 0},
            {**row, "rtspUrl": "rtsp://192.0.2.2@192.0.2.1:9954/other"},
            {**row, "rtspUrl": "rtsp://192.0.2.2:80/control"},
        ]
        self.assertIsNone(stream_url({"streamInfo": candidates}, (1, 0), "192.0.2.2"))
        self.assertEqual(stream_url({"streamInfo": [*candidates, row]}, (1, 0), "192.0.2.2"), selected)

    def test_multipart_frame_is_length_delimited(self):
        frame = b"\xff\xd8anything\xff\xd9"
        packet = (b"--lcsframe\r\nContent-Type: image/jpeg\r\nContent-length: "
                  + str(len(frame)).encode() + b"\r\n\r\n" + frame + b"\r\n")
        pipe = io.BytesIO(packet + packet)
        self.assertEqual(read_jpeg(pipe), frame)
        self.assertEqual(read_jpeg(pipe), frame)
        with self.assertRaises(EOFError):
            read_jpeg(pipe)
