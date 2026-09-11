import { useState } from 'react';
import {
  CircleMinus,
  Clock,
  Share2,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function LiveSettingPage() {
  const { t } = useTranslation('live');
  const { t: tCommon } = useTranslation('common');
  const [autoLive, setAutoLive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;
  const [activeTooltipChannel, setActiveTooltipChannel] = useState(null);

  const [liveRows, setLiveRows] = useState([
    { id: 'film1', channel: '电影 1', mode: 'RTMP', res: '1920*1080', bitrate: '2048Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/film', isLive: true, rtspLive: true, rtspUrl: 'rtsp://192.168.3.50/live_film' },
    { id: 'film2', channel: '电影 2', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/film2', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_film2' },
    { id: 'pc1', channel: '电脑', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/courseware', isLive: true, rtspLive: true, rtspUrl: 'rtsp://192.168.3.50/live_courseware' },
    { id: 'pc2', channel: '电脑2', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/courseware2', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_courseware2' },
    { id: 'tch', channel: '教师', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/teacher', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_teacher' },
    { id: 'stu', channel: '学生', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/student', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_student' },
    { id: 'tch_p', channel: '教师全景', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/teacher_full', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_teacher_full' },
    { id: 'stu_p', channel: '学生全景', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/student_full', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_student_full' },
    { id: 'inter', channel: '互动', mode: 'RTMP', res: '640*360', bitrate: '512Kbps', fps: '25fps', pushUrl: '192.168.3.50', playUrl: 'rtmp://192.168.3.50:1935/live/interactive', isLive: false, rtspLive: false, rtspUrl: 'rtsp://192.168.3.50/live_interactive' },
  ]);

  const [scheduleRows, setScheduleRows] = useState([
    { id: 1, enabled: false, start: '08:00:00', end: '08:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 2, enabled: false, start: '09:00:00', end: '09:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 3, enabled: false, start: '10:00:00', end: '10:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 4, enabled: false, start: '11:00:00', end: '11:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 5, enabled: false, start: '13:00:00', end: '13:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 6, enabled: false, start: '14:00:00', end: '14:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 7, enabled: false, start: '15:00:00', end: '15:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
    { id: 8, enabled: false, start: '16:00:00', end: '16:45:00', duration: '00:45:00', once: true, daily: false, days: [false, false, false, false, false, false, false] },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    showToast(t('copied', '已复制到剪贴板: ') + text);
  };

  return (
    <section className="lcs-web-page lcs-web-live-setting-page">
      <div className="lcs-web-section-title">{t('pageTitle', '直播设置')}</div>

      {/* Card 1: 直播设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleLive', '直播设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th>{t('colChannel', '直播通道')}</th>
                <th>{t('colMode', '直播模式')}</th>
                <th>{t('colResolution', '直播分辨率')}</th>
                <th>{t('colBitrate', '直播码率')}</th>
                <th>{t('colFramerate', '直播帧率')}</th>
                <th>{t('colPushUrl', '直播推流地址')}</th>
                <th>{t('colPlayUrl', '直播观看地址')}</th>
                <th>{t('colIsLive', '是否直播')}</th>
                <th>{t('colRtspLive', 'RTSP直播')}</th>
              </tr>
            </thead>
            <tbody>
              {liveRows.map((row, idx) => (
                <tr key={row.id}>
                  <td>{tCommon('channels.' + row.id, row.channel)}</td>
                  <td>
                    <NativeSelect
                      value={row.mode}
                      options={['RTMP', 'RTSP', 'HTTP-FLV', 'HLS']}
                      onChange={val => setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, mode: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.res}
                      options={['1920*1080', '1280*720', '640*360']}
                      onChange={val => setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, res: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.bitrate}
                      options={['2048Kbps', '1024Kbps', '512Kbps', '256Kbps']}
                      onChange={val => setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, bitrate: val } : r))}
                    />
                  </td>
                  <td>
                    <NativeSelect
                      value={row.fps}
                      options={['25fps', '30fps', '60fps']}
                      onChange={val => setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, fps: val } : r))}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input w-28"
                      value={row.pushUrl}
                      onChange={e => {
                        const val = e.target.value;
                        setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, pushUrl: val } : r));
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="lcs-web-compact-input w-48"
                      value={row.playUrl}
                      onChange={e => {
                        const val = e.target.value;
                        setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, playUrl: val } : r));
                      }}
                    />
                  </td>
                  <td>
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={row.isLive}
                        onChange={e => {
                          const checked = e.target.checked;
                          setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, isLive: checked } : r));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 relative">
                      <label className="lcs-web-switch">
                        <input
                          type="checkbox"
                          checked={row.rtspLive}
                          onChange={e => {
                            const checked = e.target.checked;
                            setLiveRows(curr => curr.map((r, i) => i === idx ? { ...r, rtspLive: checked } : r));
                          }}
                        />
                        <span className="slider" />
                      </label>
                      {row.rtspLive && (
                        <button
                          type="button"
                          className="text-blue-500 hover:text-blue-700 text-xs flex items-center gap-0.5"
                          onClick={() => setActiveTooltipChannel(activeTooltipChannel === row.id ? null : row.id)}
                        >
                          <Share2 size={12} />
                          <span>{t('liveUrlLink', '直播地址')}</span>
                        </button>
                      )}
                      {activeTooltipChannel === row.id && (
                        <div className="lcs-web-popover-tooltip">
                          <span>{row.rtspUrl}</span>
                          <button
                            type="button"
                            className="lcs-web-btn-copy"
                            onClick={() => copyToClipboard(row.rtspUrl)}
                          >
                            {t('copy', '复制')}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 2: 定时直播 */}
      <div className="lcs-web-card mb-4">
        <div className="lcs-web-schedule-top-bar">
          <div className="lcs-web-schedule-control-item">
            <span>{t('autoLiveBoot', '开机自动直播')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={autoLive} onChange={e => setAutoLive(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
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

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('定时直播设置已保存')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}

