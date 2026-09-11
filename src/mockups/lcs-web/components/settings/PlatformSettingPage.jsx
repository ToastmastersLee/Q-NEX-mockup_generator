import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function PlatformSettingPage() {
  const { t, isZh } = useTranslation('platform');
  const [interIp, setInterIp] = useState('192.168.3.50');
  const [enableSip, setEnableSip] = useState(true);
  const [allowReg, setAllowReg] = useState(false);
  const [sipUser, setSipUser] = useState('user1');
  const [sipPass, setSipPass] = useState('123456');
  const [sipDomain, setSipDomain] = useState('192.168.3.50');
  const [sipServerAddr, setSipServerAddr] = useState('192.168.3.50');
  const [natRoute, setNatRoute] = useState('off');
  const [sipPort, setSipPort] = useState('5060');
  const [transport, setTransport] = useState('TCP');

  const [platformAddr, setPlatformAddr] = useState('192.168.3.50:8081');
  const [devName, setDevName] = useState(isZh ? '三楼' : 'Floor 3');
  const [createLocation, setCreateLocation] = useState(true);
  const [authCode, setAuthCode] = useState('123456');
  const [orgId, setOrgId] = useState('10000000');

  const [toastMessage, setToastMessage] = useState('');

  const natOptions = [
    { value: 'off', label: t('off', '关') },
    { value: 'on', label: t('on', '开') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-platform-page">
      <div className="lcs-web-section-title">{t('pageTitle', '平台设置')}</div>

      {/* Card 1: 互动平台设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardInteractive', '互动平台设置')}</h3>

        <div className="py-2 border-b border-slate-100">
          <div className="text-xs text-slate-700 font-semibold mb-2">{t('interactive', '互动')}</div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">{t('interactiveServer', '互动服务器')}</span>
            <input type="text" className="lcs-web-compact-input w-64 text-xs font-mono" value={interIp} onChange={e => setInterIp(e.target.value)} />
            <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('互动服务器已设置')}>{t('setting', '设置')}</button>
          </div>
        </div>

        <div className="py-3">
          <div className="flex items-center gap-3 text-xs text-slate-700 font-semibold mb-3">
            <span>{t('sip', 'SIP')}</span>
            <span className="text-emerald-600 font-normal">({t('regSuccess', '注册成功')})</span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('enableSip', '启用SIP呼叫')}</span>
              <label className="lcs-web-switch">
                <input type="checkbox" checked={enableSip} onChange={e => setEnableSip(e.target.checked)} />
                <span className="slider" />
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('allowReg', '允许注册')}</span>
              <label className="lcs-web-switch">
                <input type="checkbox" checked={allowReg} onChange={e => setAllowReg(e.target.checked)} />
                <span className="slider" />
              </label>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('username', '用户名')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 text-xs" value={sipUser} onChange={e => setSipUser(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('password', '密码')}</span>
              <input type="password" className="lcs-web-compact-input flex-1 text-xs" value={sipPass} onChange={e => setSipPass(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('sipDomain', 'SIP域')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 text-xs font-mono" value={sipDomain} onChange={e => setSipDomain(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('sipServerAddr', 'SIP服务器地址')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 text-xs font-mono" value={sipServerAddr} onChange={e => setSipServerAddr(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('natRoute', 'NAT路由')}</span>
              <div className="flex-1">
                <NativeSelect value={natRoute} options={natOptions} onChange={setNatRoute} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('sipServerPort', 'SIP服务器端口')}</span>
              <input type="text" className="lcs-web-compact-input flex-1 text-xs font-mono" value={sipPort} onChange={e => setSipPort(e.target.value)} />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-slate-600">{t('transportMode', '传输方式')}</span>
              <div className="flex-1">
                <NativeSelect value={transport} options={['TCP', 'UDP', 'TLS']} onChange={setTransport} />
              </div>
            </div>

            <div className="flex items-center">
              <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('SIP参数已设置')}>{t('setting', '设置')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: 管理平台设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardManage', '管理平台设置')}</h3>

        <div className="flex items-center gap-4 py-2">
          <span className="w-24 text-xs text-slate-600">{t('platformAddr', '平台地址')}</span>
          <input type="text" className="lcs-web-compact-input w-64 text-xs font-mono" value={platformAddr} onChange={e => setPlatformAddr(e.target.value)} />
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('管理平台地址已设置')}>{t('setting', '设置')}</button>
        </div>

        <div className="flex items-center gap-6 py-2">
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs text-slate-600">{t('deviceName', '设备名称')}</span>
            <input type="text" className="lcs-web-compact-input w-64 text-xs" value={devName} onChange={e => setDevName(e.target.value)} />
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-blue-600 font-semibold">
            <input type="checkbox" checked={createLocation} onChange={e => setCreateLocation(e.target.checked)} />
            <span>{t('createLocation', '创建地点')}</span>
          </label>
        </div>

        <div className="flex items-center gap-6 py-2">
          <div className="flex items-center gap-4">
            <span className="w-24 text-xs text-slate-600">{t('authCode', '授权码')}</span>
            <input type="text" className="lcs-web-compact-input w-64 text-xs" value={authCode} onChange={e => setAuthCode(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600">{t('orgId', '组织ID')}</span>
            <input type="text" className="lcs-web-compact-input w-48 text-xs font-mono" value={orgId} onChange={e => setOrgId(e.target.value)} />
            <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('组织设置已保存')}>{t('setting', '设置')}</button>
          </div>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
