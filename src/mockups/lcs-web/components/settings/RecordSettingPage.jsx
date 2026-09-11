import { useState } from 'react';
import {
  CircleMinus,
  Clock,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function RecordSettingPage() {
  const { t } = useTranslation('record');
  const { t: tCommon } = useTranslation('common');
  const [autoRecord, setAutoRecord] = useState(false);
  const [segmentDuration, setSegmentDuration] = useState('none');
  const [maxDuration, setMaxDuration] = useState('4h');
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const segmentOptions = [
    { value: 'none', label: t('noSegment', '不分段') },
    { value: '30m', label: t('min30', '30分钟') },
    { value: '1h', label: t('hour1', '1小时') },
    { value: '2h', label: t('hour2', '2小时') },
  ];

  const maxDurationOptions = [
    { value: '4h', label: t('hours4', '4小时') },
    { value: '6h', label: t('hours6', '6小时') },
    { value: '8h', label: t('hours8', '8小时') },
    { value: '12h', label: t('hours12', '12小时') },
  ];

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
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleRecord', '录制设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th>{t('colChannel', '录制通道')}</th>
                <th>{t('colName', '录制名称')}</th>
                <th>{t('colFormat', '录制格式')}</th>
                <th>{t('colResolution', '录制分辨率')}</th>
                <th>{t('colBitrate', '录制码率')}</th>
                <th>{t('colFramerate', '录制帧率')}</th>
                <th>{t('colEncoding', '录制编码')}</th>
                <th>{t('colIsRecord', '是否录制')}</th>
              </tr>
            </thead>
            <tbody>
              {channelRows.map((row, idx) => (
                <tr key={row.id}>
                  <td>{tCommon('channels.' + row.id, row.channel)}</td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input"
                      value={row.name}
                      onChange={e => {
                        const val = e.target.value;
                        setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, name: val } : r));
                      }}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.format}
                      options={['MP4', 'TS']}
                      onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, format: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.res}
                      options={['3840*2160', '1920*1080', '1280*720']}
                      onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, res: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.bitrate}
                      options={['4096Kbps', '2048Kbps', '1024Kbps', '512Kbps']}
                      onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, bitrate: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.fps}
                      options={['30fps', '25fps', '60fps']}
                      onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, fps: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.codec}
                      options={['H265', 'H264']}
                      onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, codec: val } : r))}
                    />
                  </td>
                  <td>
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={row.isRecord}
                        onChange={e => {
                          const checked = e.target.checked;
                          setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, isRecord: checked } : r));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 2: 定时录制 */}
      <div className="lcs-web-card mb-4">
        <div className="lcs-web-schedule-top-bar">
          <div className="lcs-web-schedule-control-item">
            <span>{t('autoRecordBoot', '开机自动开启录制')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={autoRecord} onChange={e => setAutoRecord(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="lcs-web-schedule-control-item">
            <span>{t('segmentDuration', '录制分段时长')}</span>
            <NativeSelect
              value={segmentDuration}
              options={segmentOptions}
              onChange={setSegmentDuration}
            />
          </div>

          <div className="lcs-web-schedule-control-item">
            <span>{t('maxDuration', '单次录制最大时长')}</span>
            <NativeSelect
              value={maxDuration}
              options={maxDurationOptions}
              onChange={setMaxDuration}
            />
          </div>

          <span className="lcs-web-schedule-top-tip">{t('tipMaxDuration', '操作提示: 单次录制最大时长超过6个小时, 所录制文件会变更为TS格式')}</span>
        </div>

        <div className="lcs-web-table-card mt-3">
          <table className="lcs-web-data-table lcs-web-schedule-table">
            <thead>
              <tr>
                <th>{t('colOp', '操作')}</th>
                <th>{t('colEnable', '开启')}</th>
                <th>{t('colStartTime', '开始时间')}</th>
                <th>{t('colEndTime', '结束时间')}</th>
                <th>{t('colDuration', '时长')}</th>
                <th>{t('colOnce', '仅一次')}</th>
                <th>{t('colDaily', '每日')}</th>
                <th>{t('colMon', '周一')}</th>
                <th>{t('colTue', '周二')}</th>
                <th>{t('colWed', '周三')}</th>
                <th>{t('colThu', '周四')}</th>
                <th>{t('colFri', '周五')}</th>
                <th>{t('colSat', '周六')}</th>
                <th>{t('colSun', '周日')}</th>
              </tr>
            </thead>
            <tbody>
              {scheduleRows.map((s, idx) => (
                <tr key={s.id}>
                  <td>
                    <button
                      type="button"
                      className="lcs-web-btn-minus-circle"
                      onClick={() => setScheduleRows(curr => curr.filter((_, i) => i !== idx))}
                    >
                      <CircleMinus size={15} color="#e11d48" />
                    </button>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={s.enabled}
                      onChange={e => {
                        const checked = e.target.checked;
                        setScheduleRows(curr => curr.map((r, i) => i === idx ? { ...r, enabled: checked } : r));
                      }}
                    />
                  </td>
                  <td>
                    <div className="lcs-web-time-input-box">
                      <Clock size={13} className="text-slate-400" />
                      <input
                        type="text"
                        value={s.start}
                        onChange={e => {
                          const val = e.target.value;
                          setScheduleRows(curr => curr.map((r, i) => i === idx ? { ...r, start: val } : r));
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="lcs-web-time-input-box">
                      <Clock size={13} className="text-slate-400" />
                      <input
                        type="text"
                        value={s.end}
                        onChange={e => {
                          const val = e.target.value;
                          setScheduleRows(curr => curr.map((r, i) => i === idx ? { ...r, end: val } : r));
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input w-20 text-center"
                      value={s.duration}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={s.once}
                      onChange={e => {
                        const checked = e.target.checked;
                        setScheduleRows(curr => curr.map((r, i) => i === idx ? { ...r, once: checked, daily: false } : r));
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={s.daily}
                      onChange={e => {
                        const checked = e.target.checked;
                        setScheduleRows(curr => curr.map((r, i) => i === idx ? { ...r, daily: checked, once: false } : r));
                      }}
                    />
                  </td>
                  {[0, 1, 2, 3, 4, 5, 6].map(dIdx => (
                    <td key={dIdx}>
                      <input
                        type="checkbox"
                        checked={s.days[dIdx]}
                        onChange={e => {
                          const checked = e.target.checked;
                          setScheduleRows(curr => curr.map((r, i) => {
                            if (i !== idx) return r;
                            const nextDays = [...r.days];
                            nextDays[dIdx] = checked;
                            return { ...r, days: nextDays, once: false, daily: false };
                          }));
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lcs-web-schedule-bottom-tips mt-3">
          <strong>{t('tipTitle', '操作提示:')}</strong>
          <div className="grid grid-cols-2 gap-2 mt-1 text-xs text-slate-500">
            <div>{t('tip1', '1.定时录像任务启动后, 可以点击录像结束按钮来终止本次定时任务。')}</div>
            <div>{t('tip2', '2.定时录像任务启动时, 录像已经开始了, 这时本次定时任务失效。')}</div>
            <div>{t('tip3', '3.在设置录像相关参数期间, 有定时任务启动, 这时设置的参数会失效。')}</div>
            <div>{t('tip4', '4.定时录像持续时间包括暂停时间。')}</div>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('scheduleSaved', '定时录制设置已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {/* Card 3: RTSP音频输入设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleRtspAudio', 'RTSP音频输入设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th className="w-32">{t('colRecChannel', '录制通道')}</th>
                <th>{t('colMixChannel', '混音通道')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tCommon('channels.film', '电影')}</td>
                <td>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.pc1} onChange={e => setRtspMix(c => ({ ...c, pc1: e.target.checked }))} /><span>{tCommon('channels.pc1', '电脑')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.pc2} onChange={e => setRtspMix(c => ({ ...c, pc2: e.target.checked }))} /><span>{tCommon('channels.pc2', '电脑2')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.tch} onChange={e => setRtspMix(c => ({ ...c, tch: e.target.checked }))} /><span>{tCommon('channels.tch', '教师')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.stu} onChange={e => setRtspMix(c => ({ ...c, stu: e.target.checked }))} /><span>{tCommon('channels.stu', '学生')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.tch_p} onChange={e => setRtspMix(c => ({ ...c, tch_p: e.target.checked }))} /><span>{tCommon('channels.tch_p', '教师全景')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={rtspMix.stu_p} onChange={e => setRtspMix(c => ({ ...c, stu_p: e.target.checked }))} /><span>{tCommon('channels.stu_p', '学生全景')}</span></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">{t('tipRtspAudio', '提示: 混音通道中的按钮为禁用状态表示未开启该通道的RTSP音频输入。')}</p>
        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('rtspAudioSaved', 'RTSP音频设置已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {/* Card 4: 数字音频输入设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleDigitalAudio', '数字音频输入设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th className="w-32">{t('colRecChannel', '录制通道')}</th>
                <th>{t('colMixChannel', '混音通道')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tCommon('channels.film', '电影')}</td>
                <td>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.pc1} onChange={e => setDigitalMix(c => ({ ...c, pc1: e.target.checked }))} /><span>{tCommon('channels.pc1', '电脑')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.pc2} onChange={e => setDigitalMix(c => ({ ...c, pc2: e.target.checked }))} /><span>{tCommon('channels.pc2', '电脑2')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.tch} onChange={e => setDigitalMix(c => ({ ...c, tch: e.target.checked }))} /><span>{tCommon('channels.tch', '教师')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.stu} onChange={e => setDigitalMix(c => ({ ...c, stu: e.target.checked }))} /><span>{tCommon('channels.stu', '学生')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.tch_p} onChange={e => setDigitalMix(c => ({ ...c, tch_p: e.target.checked }))} /><span>{tCommon('channels.tch_p', '教师全景')}</span></label>
                    <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={digitalMix.stu_p} onChange={e => setDigitalMix(c => ({ ...c, stu_p: e.target.checked }))} /><span>{tCommon('channels.stu_p', '学生全景')}</span></label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">{t('tipDigitalAudio', '提示: 混音通道中的按钮为禁用状态表示未开启该通道的数字音频输入。')}</p>
        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('digitalAudioSaved', '数字音频设置已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
