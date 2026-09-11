import { useState } from 'react';
import { useTranslation } from '../../i18n';

export function VersionPage() {
  const { t } = useTranslation('version');
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const fields = [
    { key: 'model', label: t('model', '型号'), value: 'LCS810(I)' },
    { key: 'aecVersion', label: t('aecVersion', 'AEC版本'), value: '5.0.1' },
    { key: 'sysVersion', label: t('sysVersion', '系统版本'), value: '7.0.5S' },
    { key: 'firmwareVersion', label: t('firmwareVersion', '固件版本'), value: '8.1.702-release-ss528v100' },
    { key: 'ipAddress', label: t('ipAddress', 'IP地址'), value: '192.168.3.50' },
    { key: 'ipv6Address', label: t('ipv6Address', 'IPv6地址'), value: 'fe80::3a3a:21ff:fe00:8e0c' },
    { key: 'uuid', label: t('uuid', 'UUID'), value: '0100000000007b23003c' },
    { key: 'macAddress', label: t('macAddress', 'MAC地址'), value: '38-3a-21-00-8e-0c' },
  ];

  return (
    <section className="lcs-web-page lcs-web-version-page">
      <div className="lcs-web-section-title">{t('pageTitle', '系统信息')}</div>

      <div className="lcs-web-card max-w-2xl">
        <div className="flex flex-col gap-3">
          {fields.map(item => (
            <div key={item.key} className="flex items-center gap-6 py-1">
              <span className="w-24 text-xs text-slate-700 font-semibold">{item.label}</span>
              <input
                type="text"
                className="lcs-web-compact-input flex-1 bg-slate-50 text-slate-600 cursor-default"
                value={item.value}
                readOnly
              />
            </div>
          ))}
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('当前版本已是最新版本')}>
          {t('checkVersion', '版本检测')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
