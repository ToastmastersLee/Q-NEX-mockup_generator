import React from 'react';
import { CircleMinus } from 'lucide-react';
import { NativeSelect, TimePicker } from '../../common';
import { useTranslation } from '../../../i18n';

function calculateDuration(start, end) {
  if (!start || !end) return '00:45:00';
  const [sh, sm, ss] = start.split(':').map(Number);
  const [eh, em, es] = end.split(':').map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(ss) || isNaN(eh) || isNaN(em) || isNaN(es)) return '00:45:00';
  let diffSec = (eh * 3600 + em * 60 + es) - (sh * 3600 + sm * 60 + ss);
  if (diffSec < 0) diffSec += 24 * 3600;
  const dh = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const dm = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const ds = String(diffSec % 60).padStart(2, '0');
  return `${dh}:${dm}:${ds}`;
}

export function RecordScheduleTable({
  autoRecord,
  setAutoRecord,
  segmentDuration,
  setSegmentDuration,
  maxDuration,
  setMaxDuration,
  scheduleRows,
  setScheduleRows,
  onSave
}) {
  const { t } = useTranslation('record');

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

  return (
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
                  <TimePicker
                    value={s.start}
                    onChange={val => {
                      setScheduleRows(curr => curr.map((r, i) => {
                        if (i !== idx) return r;
                        const nextDuration = calculateDuration(val, r.end);
                        return { ...r, start: val, duration: nextDuration };
                      }));
                    }}
                  />
                </td>
                <td>
                  <TimePicker
                    value={s.end}
                    onChange={val => {
                      setScheduleRows(curr => curr.map((r, i) => {
                        if (i !== idx) return r;
                        const nextDuration = calculateDuration(r.start, val);
                        return { ...r, end: val, duration: nextDuration };
                      }));
                    }}
                  />
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

      <button className="lcs-web-ok mt-4" type="button" onClick={onSave}>
        {t('ok', '确定')}
      </button>
    </div>
  );
}
