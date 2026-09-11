import { useState } from 'react';
import './styles.css';
import { LanguageProvider } from './i18n';
import { LcsTopbar, Sidebar, getInitialActivePage } from './components/shell';
import { MainPage } from './components/main';
import { RecordingsPage } from './components/recordings';
import { SETTINGS_PAGE_MAP } from './components/settings';

function LcsWebAppInner() {
  const [activePage, setActivePage] = useState(getInitialActivePage);
  const [isProjectOpen, setIsProjectOpen] = useState(true);

  const activeTopTab = activePage === 'Main' ? 'Main' : activePage === 'Recordings' ? 'Recordings' : 'Settings';
  const switchTopTab = tab => {
    if (tab === 'Main') setActivePage('Main');
    if (tab === 'Recordings') setActivePage('Recordings');
    if (tab === 'Settings') setActivePage('Subtitle');
  };

  if (activePage === 'Main') {
    return (
      <main className="lcs-web-standalone">
        <LcsTopbar activeTab={activeTopTab} onSelect={switchTopTab} showBrand />
        <MainPage />
      </main>
    );
  }

  if (activePage === 'Recordings') {
    return (
      <main className="lcs-web-standalone">
        <LcsTopbar activeTab={activeTopTab} onSelect={switchTopTab} showBrand />
        <RecordingsPage />
      </main>
    );
  }

  const ActiveSettingsPage = SETTINGS_PAGE_MAP[activePage] || SETTINGS_PAGE_MAP['Input'];

  return (
    <main className="lcs-web-shell">
      <Sidebar
        activePage={activePage}
        onSelectPage={setActivePage}
        isProjectOpen={isProjectOpen}
        setIsProjectOpen={setIsProjectOpen}
      />
      <div className="lcs-web-main">
        <LcsTopbar activeTab={activeTopTab} onSelect={switchTopTab} />
        <ActiveSettingsPage />
      </div>
    </main>
  );
}

export default function LcsWebApp() {
  return (
    <LanguageProvider>
      <LcsWebAppInner />
    </LanguageProvider>
  );
}
