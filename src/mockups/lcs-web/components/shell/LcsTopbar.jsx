import { RefreshCw, Power, LogOut } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { IqLogo } from '../common';

export function LcsTopbar({ activeTab, onSelect, showBrand = false }) {
  const { t } = useTranslation('common');
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
        {showBrand && <button className="lcs-web-guide" type="button">{t('topbar.guide', 'Guide')}</button>}
        <button type="button"><RefreshCw size={15} />{t('topbar.reboot', 'Reboot')}</button>
        <button type="button"><Power size={15} />{t('topbar.shutdown', 'ShutDown')}</button>
        <button type="button"><LogOut size={15} />{t('topbar.logout', 'LogOut')}</button>
      </div>
    </header>
  );
}
