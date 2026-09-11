import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function PtzSettingPage() {
  const { t } = useTranslation('ptz');
  const { t: tCommon } = useTranslation('common');
  const [toastMessage, setToastMessage] = useState('');

  const [ptzRows, setPtzRows] = useState([
    { id: 'pc1', enabled: false, protocol: 'Visca', mode: 'UDP', ip: '127.0.0.2', port: '5858' },
    { id: 'pc2', enabled: false, protocol: 'Visca', mode: 'UDP', ip: '127.0.0.2', port: '5858' },
    { id: 'tch', enabled: true, protocol: 'Visca', mode: 'UDP', ip: '192.167.32.65', port: '5858' },
    { id: 'stu', enabled: true, protocol: 'Visca', mode: 'UDP', ip: '192.167.32.66', port: '5858' },
    { id: 'tch_p', enabled: false, protocol: 'Visca', mode: 'UDP', ip: '127.0.0.2', port: '5858' },
    { id: 'stu_p', enabled: false, protocol: 'Visca', mode: 'UDP', ip: '127.0.0.2', port: '5858' },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-ptz-page">
      <div className="lcs-web-section-title">{t('pageTitle', '云台设置')}</div>

      <div className="lcs-web-card">
        <div className="flex flex-col">
          {ptzRows.map((row, idx) => (
            <div key={row.id} className="flex items-center gap-6 py-3 border-b border-slate-100 flex-wrap">
              <div className="w-24 flex items-center gap-2">
                <span className="text-xs text-slate-700 font-semibold">{tCommon(`channels.${row.id}`, row.id)}</span>
              </div>
              <label className="lcs-web-switch">
                <input
                  type="checkbox"
                  checked={row.enabled}
                  onChange={e => {
                    const checked = e.target.checked;
                    setPtzRows(curr => curr.map((r, i) => i === idx ? { ...r, enabled: checked } : r));
                  }}
                />
                <span className="slider" />
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('protocol', '通讯协议')}</span>
                <div className="w-28">
                  <NativeSelect
                    value={row.protocol}
                    options={['Visca', 'Pelco-D', 'Pelco-P']}
                    onChange={val => setPtzRows(curr => curr.map((r, i) => i === idx ? { ...r, protocol: val } : r))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('commMode', '通讯方式')}</span>
                <div className="w-28">
                  <NativeSelect
                    value={row.mode}
                    options={['UDP', 'TCP', 'Serial']}
                    onChange={val => setPtzRows(curr => curr.map((r, i) => i === idx ? { ...r, mode: val } : r))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('commIp', '通讯IP')}</span>
                <input
                  type="text"
                  className="lcs-web-compact-input w-36 font-mono text-xs"
                  value={row.ip}
                  onChange={e => {
                    const val = e.target.value;
                    setPtzRows(curr => curr.map((r, i) => i === idx ? { ...r, ip: val } : r));
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('commPort', '通讯端口')}</span>
                <input
                  type="text"
                  className="lcs-web-compact-input w-20 font-mono text-xs"
                  value={row.port}
                  onChange={e => {
                    const val = e.target.value;
                    setPtzRows(curr => curr.map((r, i) => i === idx ? { ...r, port: val } : r));
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('云台设置已保存')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
