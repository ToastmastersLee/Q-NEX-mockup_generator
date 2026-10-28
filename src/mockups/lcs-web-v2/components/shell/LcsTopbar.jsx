import { RefreshCw, Power, LogOut } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { IqLogo } from '../common';
import { ModalShell } from '../common';
import { useState } from 'react';

export function LcsTopbar({ activeTab, onSelect, showBrand = false }) {
  const { t, language, setLanguage } = useTranslation('common');
  const [action, setAction] = useState(null);
  const tabs = [
    { id: 'Main', label: t('topbar.main', 'Main') },
    { id: 'Recordings', label: t('topbar.recordings', 'Recordings') },
    { id: 'Settings', label: t('topbar.settings', 'Settings') },
  ];

  return (
    <header className={`lcs-web-topbar ${showBrand ? 'lcs-web-topbar-standalone' : ''}`}>
      <div className="lcs-web-topbar-left">
        {showBrand && (
          <div className="lcs-web-header-brand">
            <IqLogo size={28} />
          </div>
        )}
        <span className="lcs-web-preview-label">{t('previewLabel')}</span>
      </div>
      <nav className="lcs-web-topbar-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? 'is-active' : ''}
            onClick={() => onSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="lcs-web-actions">
        <select aria-label={t('languageLabel')} value={language} onChange={e => setLanguage(e.target.value)} className="lcs-web-language-select">
          <option value="en">English</option><option value="zh">中文(简体)</option>
        </select>
        <button type="button" onClick={() => setAction('reboot')}><RefreshCw size={15} />{t('topbar.reboot', 'Reboot')}</button>
        <button type="button" onClick={() => setAction('shutdown')}><Power size={15} />{t('topbar.shutdown', 'ShutDown')}</button>
        <button type="button" onClick={() => setAction('logout')}><LogOut size={15} />{t('topbar.logout', 'LogOut')}</button>
      </div>
      {action && <ModalShell title={t(`topbar.${action}`)} onClose={() => setAction(null)}>
        <div className="lcs-web-modal-body">
          <p>{t(`${action}Confirm`)}</p>
          <p className="text-sm text-slate-500 my-4">{t('previewNotice')}</p>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => setAction(null)}>{t('actions.ok')}</button>
        </div>
      </ModalShell>}
    </header>
  );
}
