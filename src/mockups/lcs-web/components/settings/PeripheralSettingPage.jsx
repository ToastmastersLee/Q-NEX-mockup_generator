import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function PeripheralSettingPage() {
  const { t } = useTranslation('peripheral');
  const [toastMessage, setToastMessage] = useState('');

  const [peripherals, setPeripherals] = useState({
    keyboard: { model: 'None', port: 'none', baud: '9600' },
    panel: { model: 'P2000', port: 'RS232', baud: '9600' },
    clock: { model: 'None', port: 'none', baud: '9600' },
    power: { model: 'None', port: 'none', baud: '9600' },
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-peripheral-page">
      <div className="lcs-web-section-title">{t('pageTitle', '外设设置')}</div>

      <div className="lcs-web-card">
        {/* Row 1: 键盘 */}
        <div className="flex items-center gap-6 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-20 text-xs text-slate-700 font-semibold">{t('keyboard', '键盘')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('kbModel', '键盘型号')}</span>
            <div className="w-32"><NativeSelect value={peripherals.keyboard.model} options={['None', 'KB100', 'KB200']} onChange={val => setPeripherals(c => ({ ...c, keyboard: { ...c.keyboard, model: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('connPort', '连接端口')}</span>
            <div className="w-32"><NativeSelect value={peripherals.keyboard.port} options={['none', 'RS232', 'RS485']} onChange={val => setPeripherals(c => ({ ...c, keyboard: { ...c.keyboard, port: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('baudRate', '波特率')}</span>
            <input type="text" className="lcs-web-compact-input w-24 font-mono text-xs" value={peripherals.keyboard.baud} onChange={e => { const v = e.target.value; setPeripherals(c => ({ ...c, keyboard: { ...c.keyboard, baud: v } })); }} />
          </div>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('键盘设置已保存')}>{t('ok', '确定')}</button>
        </div>

        {/* Row 2: 面板 */}
        <div className="flex items-center gap-6 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-20 text-xs text-slate-700 font-semibold">{t('panel', '面板')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('kbModel', '键盘型号')}</span>
            <div className="w-32"><NativeSelect value={peripherals.panel.model} options={['P2000', 'P1000', 'None']} onChange={val => setPeripherals(c => ({ ...c, panel: { ...c.panel, model: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('connPort', '连接端口')}</span>
            <div className="w-32"><NativeSelect value={peripherals.panel.port} options={['RS232', 'RS485', 'none']} onChange={val => setPeripherals(c => ({ ...c, panel: { ...c.panel, port: val } }))} /></div>
            <span className="text-[11px] text-emerald-600 font-semibold">{t('available', '(可用)')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('baudRate', '波特率')}</span>
            <input type="text" className="lcs-web-compact-input w-24 font-mono text-xs" value={peripherals.panel.baud} onChange={e => { const v = e.target.value; setPeripherals(c => ({ ...c, panel: { ...c.panel, baud: v } })); }} />
          </div>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('面板设置已保存')}>{t('ok', '确定')}</button>
        </div>

        {/* Row 3: 时钟 */}
        <div className="flex items-center gap-6 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-20 text-xs text-slate-700 font-semibold">{t('clock', '时钟')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('clockModel', '时钟型号')}</span>
            <div className="w-32"><NativeSelect value={peripherals.clock.model} options={['None', 'CLK100', 'CLK200']} onChange={val => setPeripherals(c => ({ ...c, clock: { ...c.clock, model: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('connPort', '连接端口')}</span>
            <div className="w-32"><NativeSelect value={peripherals.clock.port} options={['none', 'RS232', 'RS485']} onChange={val => setPeripherals(c => ({ ...c, clock: { ...c.clock, port: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('baudRate', '波特率')}</span>
            <input type="text" className="lcs-web-compact-input w-24 font-mono text-xs" value={peripherals.clock.baud} onChange={e => { const v = e.target.value; setPeripherals(c => ({ ...c, clock: { ...c.clock, baud: v } })); }} />
          </div>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('时钟设置已保存')}>{t('ok', '确定')}</button>
        </div>

        {/* Row 4: 时序电源 */}
        <div className="flex items-center gap-6 py-3 flex-wrap">
          <span className="w-20 text-xs text-slate-700 font-semibold">{t('powerSequencer', '时序电源')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('powerModel', '电源型号')}</span>
            <div className="w-32"><NativeSelect value={peripherals.power.model} options={['None', 'PWR100', 'PWR200']} onChange={val => setPeripherals(c => ({ ...c, power: { ...c.power, model: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('connPort', '连接端口')}</span>
            <div className="w-32"><NativeSelect value={peripherals.power.port} options={['none', 'RS232', 'RS485']} onChange={val => setPeripherals(c => ({ ...c, power: { ...c.power, port: val } }))} /></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('baudRate', '波特率')}</span>
            <input type="text" className="lcs-web-compact-input w-24 font-mono text-xs" value={peripherals.power.baud} onChange={e => { const v = e.target.value; setPeripherals(c => ({ ...c, power: { ...c.power, baud: v } })); }} />
          </div>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('时序电源设置已保存')}>{t('ok', '确定')}</button>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
