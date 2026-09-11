import { LockScreen } from '../../pages/LockScreen';
import { LcsProvider, useLcs } from './context/LcsContext';
import { SimPanel } from './components/shell/SimPanel';
import { TopBar } from './components/shell/TopBar';
import { DirectorView } from './components/director/DirectorView';
import { SettingsModal } from './components/settings/SettingsModal';
import { FileOverlay } from './components/file-manager/FileOverlay';
import { InteractiveOverlay } from './components/interactive/InteractiveOverlay';
import './styles.css';

function LcsAppContent() {
  const {
    theme,
    isLocked,
    setIsLocked,
    toastMessage,
    isSystemShutdown,
    setIsSystemShutdown,
    isSystemRestarting,
    setIsSystemRestarting,
    isSystemLoggingOut,
    isRecording,
    isLive
  } = useLcs();

  if (isLocked) {
    return <LockScreen isDark={theme === 'dark'} onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className={`lcs-stage-container ${theme === 'light' ? 'is-light' : 'is-dark'}`}>
      {/* Simulation Controls Panel */}
      <SimPanel />

      {/* Hardware Device Shell */}
      <div className="lcs-hardware-shell">
        <div className="lcs-screen-container">
          {/* SCREEN CONTENT */}
          <div className="lcs-screen">
            {toastMessage && (
              <div className="lcs-toast-notification">
                {toastMessage}
              </div>
            )}

            {isSystemShutdown && (
              <div className="lcs-system-shutdown-overlay">
                <div className="lcs-shutdown-content">
                  <div className="lcs-shutdown-logo">IQ</div>
                  <p>System Powered Off</p>
                  <button 
                    type="button" 
                    className="lcs-power-on-btn"
                    onClick={() => {
                      setIsSystemShutdown(false);
                      setIsSystemRestarting(true);
                      setTimeout(() => {
                        setIsSystemRestarting(false);
                      }, 2500);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '20px', height: '20px' }}>
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                    </svg>
                    <span>Power On</span>
                  </button>
                </div>
              </div>
            )}

            {isSystemRestarting && (
              <div className="lcs-system-loader-overlay">
                <div className="lcs-loader-content">
                  <div className="lcs-spinner-ring large" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>System Restarting...</span>
                </div>
              </div>
            )}

            {isSystemLoggingOut && (
              <div className="lcs-system-loader-overlay">
                <div className="lcs-loader-content">
                  <div className="lcs-spinner-ring large" />
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Logging Off...</span>
                </div>
              </div>
            )}

            {/* Top Bar */}
            <TopBar />

            {/* Director View / Main Area */}
            <DirectorView />

            {/* Full Settings Overlay */}
            <SettingsModal />

            {/* File Manager Overlay */}
            <FileOverlay />

            {/* Interactive Classroom Overlay */}
            <InteractiveOverlay />
          </div>
        </div>

        {/* Bezel Bottom Brushed Metal Bar with LEDs */}
        <div className="lcs-hardware-bottom-bezel">
          <div className="lcs-bezel-leds">
            <div className={`lcs-bezel-led red ${isRecording ? 'is-flashing' : 'is-solid'}`} />
            <div className={`lcs-bezel-led blue ${isLive ? 'is-flashing' : 'is-solid'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LcsProvider>
      <LcsAppContent />
    </LcsProvider>
  );
}
