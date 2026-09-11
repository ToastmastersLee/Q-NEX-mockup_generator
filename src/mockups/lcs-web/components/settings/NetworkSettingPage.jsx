import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function NetworkSettingPage() {
  const { t } = useTranslation('network');
  const [dhcp, setDhcp] = useState(false);
  const [ip, setIp] = useState('192.168.3.50');
  const [mask, setMask] = useState('255.255.255.0');
  const [gateway, setGateway] = useState('192.168.3.1');
  const [dns, setDns] = useState('113.31.119.88');
  const [testUrl, setTestUrl] = useState('');
  const [testResult, setTestResult] = useState('');
  const [netType, setNetType] = useState('wired');
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const netTypeOptions = [
    { value: 'wired', label: t('wiredNet', '有线网络') },
    { value: 'wireless', label: t('wirelessNet', '无线网络') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleTest = () => {
    if (!testUrl) {
      setTestResult(t('pleaseEnterUrl', '请输入要检测的网址或IP地址'));
      return;
    }
    setTestResult(t('pingResult', `正在 Ping ${testUrl} ...\n来自 ${testUrl} 的回复: 字节=32 时间=12ms TTL=54\n来自 ${testUrl} 的回复: 字节=32 时间=11ms TTL=54\n数据包: 已发送 = 2, 已接收 = 2, 丢失 = 0 (0% 丢失)`, { url: testUrl }));
  };

  const handleClear = () => {
    setTestUrl('');
    setTestResult('');
  };

  return (
    <section className="lcs-web-page lcs-web-network-page">
      <div className="lcs-web-section-title">{t('pageTitle', '网络设置')}</div>

      {/* Card 1: 网络设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleNetwork', '网络设置')}</h3>

        <div className="flex gap-12 flex-wrap">
          {/* Left Form */}
          <div className="flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center gap-4">
              <span className="w-20 text-xs text-slate-600">{t('dhcp', 'DHCP')}</span>
              <label className="lcs-web-switch">
                <input type="checkbox" checked={dhcp} onChange={e => setDhcp(e.target.checked)} />
                <span className="slider" />
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20 text-xs text-slate-600">{t('ipAddress', 'IP地址')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48 font-mono text-xs"
                value={ip}
                onChange={e => setIp(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20 text-xs text-slate-600">{t('subnetMask', '子网掩码')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48 font-mono text-xs"
                value={mask}
                onChange={e => setMask(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20 text-xs text-slate-600">{t('gateway', '默认网关')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48 font-mono text-xs"
                value={gateway}
                onChange={e => setGateway(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-20 text-xs text-slate-600">{t('dnsServer', 'DNS服务器')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48 font-mono text-xs"
                value={dns}
                onChange={e => setDns(e.target.value)}
              />
            </div>

            <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('网络设置已保存')}>
              {t('ok', '确定')}
            </button>
          </div>

          {/* Right Ping/Test Box */}
          <div className="lcs-web-network-right">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600">{t('url', '网址')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48"
                value={testUrl}
                onChange={e => setTestUrl(e.target.value)}
              />
              <button type="button" className="lcs-web-btn-blue-sm" onClick={handleTest}>
                {t('test', '检测')}
              </button>
              <button type="button" className="lcs-web-btn-blue-sm" onClick={handleClear}>
                {t('clear', '清空')}
              </button>
            </div>

            <div className="lcs-web-network-test-box mt-3">
              <pre className="text-xs font-mono text-slate-600 whitespace-pre-wrap">{testResult}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: 网络选择 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleSelect', '网络选择')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="w-20 text-xs text-slate-600">{t('netType', '类型')}</span>
          <div className="w-48">
            <NativeSelect
              value={netType}
              options={netTypeOptions}
              onChange={setNetType}
            />
          </div>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
