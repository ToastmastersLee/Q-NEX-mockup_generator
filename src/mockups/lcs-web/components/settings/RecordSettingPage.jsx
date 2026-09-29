import React, { useState } from 'react';
import { useTranslation } from '../../i18n';
import { RecordChannelTable } from './record/RecordChannelTable';
import { RecordScheduleTable } from './record/RecordScheduleTable';
import { RecordAudioMixCard } from './record/RecordAudioMixCard';

export function RecordSettingPage() {
  const { t } = useTranslation('record');
  const [autoRecord, setAutoRecord] = useState(false);
  const [segmentDuration, setSegmentDuration] = useState('none');
  const [maxDuration, setMaxDuration] = useState('4h');
  const [toastMessage, setToastMessage] = useState('');

  const [channelRows, setChannelRows] = useState([
    { id: 'film', channel: '电影', name: 'PGM', format: 'MP4', res: '3840*2160', bitrate: '4096Kbps', fps: '30fps', codec: 'H265', isRecord: true },
    { id: 'pc1', channel: '电脑', name: 'Lecture', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'pc2', channel: '电脑2', name: 'Lecture2', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'tch', channel: '教师', name: 'Teacher_C', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'stu', channel: '学生', name: 'Student_C', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'tch_p', channel: '教师全景', name: 'Teacher_P', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'stu_p', channel: '学生全景', name: 'Student_P', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
    { id: 'inter', channel: '互动', name: 'Interactive', format: 'MP4', res: '1920*1080', bitrate: '4096Kbps', fps: '25fps', codec: 'H264', isRecord: true },
  ]);

  const [scheduleRows, setScheduleRows] = useState([
    { id: 1, enabled: false, start: '08:00:00', end: '08:10:00', duration: '00:10:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 2, enabled: false, start: '09:00:00', end: '09:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 3, enabled: false, start: '10:00:00', end: '10:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 4, enabled: false, start: '11:00:00', end: '11:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 5, enabled: false, start: '13:00:00', end: '13:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 6, enabled: false, start: '14:00:00', end: '14:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 7, enabled: false, start: '15:00:00', end: '15:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 8, enabled: false, start: '16:00:00', end: '16:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
  ]);

  const [rtspMix, setRtspMix] = useState({ pc1: false, pc2: false, tch: true, stu: false, tch_p: false, stu_p: false });
  const [digitalMix, setDigitalMix] = useState({ pc1: false, pc2: false, tch: true, stu: false, tch_p: false, stu_p: false });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-record-setting-page">
      <div className="lcs-web-section-title">{t('pageTitle', '录像设置')}</div>

      {/* Card 1: 录制设置 */}
      <RecordChannelTable
        channelRows={channelRows}
        setChannelRows={setChannelRows}
      />

      {/* Card 2: 定时录制 */}
      <RecordScheduleTable
        autoRecord={autoRecord}
        setAutoRecord={setAutoRecord}
        segmentDuration={segmentDuration}
        setSegmentDuration={setSegmentDuration}
        maxDuration={maxDuration}
        setMaxDuration={setMaxDuration}
        scheduleRows={scheduleRows}
        setScheduleRows={setScheduleRows}
        onSave={() => showToast(t('scheduleSaved', '定时录制设置已保存'))}
      />

      {/* Cards 3 & 4: 音频输入设置 */}
      <RecordAudioMixCard
        rtspMix={rtspMix}
        setRtspMix={setRtspMix}
        digitalMix={digitalMix}
        setDigitalMix={setDigitalMix}
        onSaveRtsp={() => showToast(t('rtspAudioSaved', 'RTSP音频设置已保存'))}
        onSaveDigital={() => showToast(t('digitalAudioSaved', '数字音频设置已保存'))}
      />

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}