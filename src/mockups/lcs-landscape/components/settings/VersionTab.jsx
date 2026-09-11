import { useLcs } from '../../context/LcsContext';

export function VersionTab() {
  const {
    versionDetectState,
    setVersionDetectState,
    handleVersionCheck
  } = useLcs();

  return (
    <div className="lcs-settings-version-tab" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Subnav row with 'Check' button */}
      <div className="lcs-settings-subnav-row">
        <button 
          type="button" 
          className="lcs-subnav-btn is-active"
          onClick={handleVersionCheck}
          disabled={versionDetectState === 'detecting'}
        >
          Check
        </button>
      </div>

      {/* Version details card */}
      <div className="lcs-settings-version-card">
        <div className="lcs-version-row">
          <span className="lcs-version-label">Model</span>
          <span className="lcs-version-value">LCS810(i)</span>
        </div>
        <div className="lcs-version-row">
          <span className="lcs-version-label">Main IP:</span>
          <span className="lcs-version-value">192.168.3.50</span>
        </div>
        <div className="lcs-version-row">
          <span className="lcs-version-label">AEC Version:</span>
          <span className="lcs-version-value">5.0.1</span>
        </div>
        <div className="lcs-version-row">
          <span className="lcs-version-label">System Version:</span>
          <span className="lcs-version-value">7.0.5S</span>
        </div>
        <div className="lcs-version-row">
          <span className="lcs-version-label">Sevice Version:</span>
          <span className="lcs-version-value">v8.1.702-release-ss528v100</span>
        </div>
        <div className="lcs-version-row">
          <span className="lcs-version-label">MAC Address:</span>
          <span className="lcs-version-value">38-3a-21-00-8e-0c</span>
        </div>
      </div>

      {/* Detecting Loading Modal */}
      {versionDetectState === 'detecting' && (
        <div className="lcs-version-modal-overlay">
          <div className="lcs-version-modal-spinner-box">
            <div className="lcs-version-spinner" />
            <span style={{ fontSize: '13px', color: '#ffffff', marginTop: '16px', fontWeight: '500' }}>Detecting</span>
          </div>
        </div>
      )}

      {/* Latest Version Alert Pill Bar */}
      {versionDetectState === 'latest' && (
        <div className="lcs-version-modal-overlay">
          <div className="lcs-version-alert-bar">
            <div className="lcs-version-alert-check-icon">✓</div>
            <span style={{ fontSize: '12px', color: '#ffffff', fontWeight: '500', flex: 1 }}>It's the latest version</span>
            <button 
              type="button" 
              className="lcs-version-alert-close-btn"
              onClick={() => setVersionDetectState('idle')}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
