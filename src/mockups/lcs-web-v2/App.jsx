import { useState, useEffect, useRef, Component } from 'react';
import './styles.css';
import { LanguageProvider, useTranslation } from './i18n';
import { LcsTopbar, Sidebar, getInitialActivePage } from './components/shell';
import { MainPage } from './components/main';
import { RecordingsPage } from './components/recordings';
import { SETTINGS_PAGE_MAP } from './components/settings';

class SettingsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Settings page render error:', error, errorInfo);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activePage !== this.props.activePage && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '32px', background: '#ffffff', margin: '20px', borderRadius: '8px', border: '1px solid #fee2e2' }}>
          <h3 style={{ color: '#e11d48', fontSize: '15px', fontWeight: 600 }}>{this.props.t('pageError')}</h3>
          <button
            type="button"
            className="lcs-web-btn-blue-sm"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: '12px' }}
          >
            {this.props.t('retry')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function LcsWebAppInner() {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState(getInitialActivePage);
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  const lastSettingsPage = useRef('Subtitle');

  const navigate = page => {
    if (page !== 'Main' && page !== 'Recordings') lastSettingsPage.current = page;
    setActivePage(page);
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toLowerCase().replace(/\s/g, ''));
    window.history.pushState({}, '', url);
  };

  useEffect(() => {
    const onPopState = () => setActivePage(getInitialActivePage());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activeTopTab = activePage === 'Main' ? 'Main' : activePage === 'Recordings' ? 'Recordings' : 'Settings';
  const switchTopTab = tab => {
    navigate(tab === 'Settings' ? lastSettingsPage.current : tab);
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
        onSelectPage={navigate}
        isProjectOpen={isProjectOpen}
        setIsProjectOpen={setIsProjectOpen}
      />
      <div className="lcs-web-main">
        <LcsTopbar activeTab={activeTopTab} onSelect={switchTopTab} />
        <SettingsErrorBoundary activePage={activePage} t={t}>
          <ActiveSettingsPage />
        </SettingsErrorBoundary>
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
