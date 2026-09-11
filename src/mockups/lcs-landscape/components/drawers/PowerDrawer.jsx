import { useLcs } from '../../context/LcsContext';

export function PowerDrawer() {
  const {
    activeMenuSection,
    setActiveMenuSection,
    powerActionConfirm,
    setPowerActionConfirm,
    setIsSystemLoggingOut,
    setIsSystemRestarting,
    setIsSystemShutdown,
    setIsLocked,
    showToast
  } = useLcs();

  if (activeMenuSection !== 'power') {
    return null;
  }

  return (
    <div className="lcs-power-preview-layout">
      <div className="lcs-power-preview-viewport">
        <div className="lcs-power-preview-placeholder-overlay">
          <svg className="lcs-ptz-film-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
            <polygon points="9.5 9 15.5 12 9.5 15 9.5 9" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Hint Confirmation Modal Overlay */}
      {powerActionConfirm && (
        <div className="lcs-power-hint-modal">
          <div className="lcs-power-hint-header">Hint</div>
          <div className="lcs-power-hint-body">
            <div className="lcs-power-hint-message">
              {powerActionConfirm === 'logout' && 'Log off or not?'}
              {powerActionConfirm === 'restart' && 'Restart system or not?'}
              {powerActionConfirm === 'shutdown' && 'Shut down system or not?'}
            </div>
            <div className="lcs-power-hint-actions">
              <button 
                type="button" 
                className="lcs-power-hint-btn yes"
                onClick={() => {
                  const action = powerActionConfirm;
                  setPowerActionConfirm(null);
                  setActiveMenuSection(null);
                  
                  if (action === 'logout') {
                    setIsSystemLoggingOut(true);
                    setTimeout(() => {
                      setIsSystemLoggingOut(false);
                      setIsLocked(true);
                      showToast("Logged out successfully");
                    }, 2000);
                  } else if (action === 'restart') {
                    setIsSystemRestarting(true);
                    setTimeout(() => {
                      setIsSystemRestarting(false);
                      showToast("System restarted successfully");
                    }, 2500);
                  } else if (action === 'shutdown') {
                    setIsSystemShutdown(true);
                  }
                }}
              >
                Yes
              </button>
              <button 
                type="button" 
                className="lcs-power-hint-btn no"
                onClick={() => setPowerActionConfirm(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Power bottom control drawer */}
      <div className="lcs-power-drawer">
        {/* Title & Close */}
        <div className="lcs-ptz-drawer-top">
          <span className="lcs-ptz-drawer-title">Power Ctrl</span>
          <button 
            type="button" 
            className="lcs-ptz-drawer-close"
            onClick={() => setActiveMenuSection(null)}
          >
            ✕
          </button>
        </div>

        <div className="lcs-power-drawer-body">
          {/* Restart Button */}
          <div className="lcs-power-action-unit">
            <button 
              type="button" 
              className="lcs-power-circle-btn restart"
              onClick={() => setPowerActionConfirm('restart')}
            >
              <div className="lcs-power-icon-spinner">
                {[...Array(8)].map((_, i) => (
                  <span key={i} style={{ transform: `rotate(${i * 45}deg) translateY(-8px)` }} />
                ))}
              </div>
            </button>
            <span className="lcs-power-action-label">Restart</span>
          </div>

          {/* Shutdown Button */}
          <div className="lcs-power-action-unit">
            <button 
              type="button" 
              className="lcs-power-circle-btn shutdown"
              onClick={() => setPowerActionConfirm('shutdown')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lcs-power-svg-icon">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
              </svg>
            </button>
            <span className="lcs-power-action-label">Shutdown</span>
          </div>

          {/* Logout Button */}
          <div className="lcs-power-action-unit">
            <button 
              type="button" 
              className="lcs-power-circle-btn logout"
              onClick={() => setPowerActionConfirm('logout')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="lcs-power-svg-icon">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
            <span className="lcs-power-action-label">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
