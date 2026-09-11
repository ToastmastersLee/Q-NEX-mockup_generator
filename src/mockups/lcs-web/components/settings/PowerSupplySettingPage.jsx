import { useState } from 'react';
import {
  Clock,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function PowerSupplySettingPage() {
  const { t } = useTranslation('power');
  const [powerMode, setPowerMode] = useState('normalBoot');
  const [bootTime1, setBootTime1] = useState('07:00:00');
  const [bootSw1, setBootSw1] = useState(false);
  const [shutTime1, setShutTime1] = useState('12:30:00');
  const [shutSw1, setShutSw1] = useState(false);

  const [bootTime2, setBootTime2] = useState('13:50:00');
  const [bootSw2, setBootSw2] = useState(false);
  const [shutTime2, setShutTime2] = useState('20:00:00');
  const [shutSw2, setShutSw2] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  const powerModeOptions = [
    { value: 'normalBoot', label: t('normalBoot', '常规开机') },
    { value: 'autoBoot', label: t('autoBoot', '通电开机') },
    { value: 'keepOff', label: t('keepOff', '来电保持断电') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-power-page">
      <div className="lcs-web-section-title">{t('pageTitle', '电源设置')}</div>

      <div className="lcs-web-card">
        {/* Row 1: 上电模式 */}
        <div className="flex items-center gap-8 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-36 text-xs text-slate-700 font-semibold">{t('powerOnMode', '上电模式')}</span>
          <div className="w-36">
            <NativeSelect
              value={powerMode}
              options={powerModeOptions}
              onChange={setPowerMode}
            />
          </div>
        </div>

        {/* Row 2: 定时开关机设置一 */}
        <div className="flex items-center gap-8 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-36 text-xs text-slate-700 font-semibold">{t('timer1', '定时开关机设置一')}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('bootTime', '开机时间')}</span>
            <div className="lcs-web-time-input-box w-36">
              <Clock size={13} className="text-slate-400" />
              <input type="text" className="flex-1" value={bootTime1} onChange={e => setBootTime1(e.target.value)} />
            </div>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={bootSw1} onChange={e => setBootSw1(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('shutdownTime', '关机时间')}</span>
            <div className="lcs-web-time-input-box w-36">
              <Clock size={13} className="text-slate-400" />
              <input type="text" className="flex-1" value={shutTime1} onChange={e => setShutTime1(e.target.value)} />
            </div>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={shutSw1} onChange={e => setShutSw1(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* Row 3: 定时开关机设置二 */}
        <div className="flex items-center gap-8 py-3 flex-wrap">
          <span className="w-36 text-xs text-slate-700 font-semibold">{t('timer2', '定时开关机设置二')}</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('bootTime', '开机时间')}</span>
            <div className="lcs-web-time-input-box w-36">
              <Clock size={13} className="text-slate-400" />
              <input type="text" className="flex-1" value={bootTime2} onChange={e => setBootTime2(e.target.value)} />
            </div>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={bootSw2} onChange={e => setBootSw2(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('shutdownTime', '关机时间')}</span>
            <div className="lcs-web-time-input-box w-36">
              <Clock size={13} className="text-slate-400" />
              <input type="text" className="flex-1" value={shutTime2} onChange={e => setShutTime2(e.target.value)} />
            </div>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={shutSw2} onChange={e => setShutSw2(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('电源设置已保存')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
