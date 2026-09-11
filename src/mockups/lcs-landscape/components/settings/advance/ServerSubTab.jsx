import { useLcs } from '../../../context/LcsContext';

export function ServerSubTab() {
  const {
    settingsServerIp,
    setSettingsServerIp,
    settingsServerPlatform,
    setSettingsServerPlatform,
    settingsServerDeviceName,
    setSettingsServerDeviceName,
    settingsServerAuthCode,
    setSettingsServerAuthCode,
    settingsServerOrgId,
    setSettingsServerOrgId,
    settingsServerCreateLoc,
    setSettingsServerCreateLoc
  } = useLcs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Card 1: Server IP */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
          <span className="lcs-settings-label" style={{ width: '140px' }}>Server:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input 
              type="text" 
              className="lcs-settings-input" 
              style={{ width: '180px' }}
              value={settingsServerIp}
              onChange={(e) => setSettingsServerIp(e.target.value)}
            />
            <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px' }}>
              Set
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Management Platform settings */}
      <div className="lcs-settings-advance-card">
        {/* Row 1: management platform */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label" style={{ width: '140px' }}>management platform:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input 
              type="text" 
              className="lcs-settings-input" 
              style={{ width: '180px' }}
              value={settingsServerPlatform}
              onChange={(e) => setSettingsServerPlatform(e.target.value)}
            />
            <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px' }}>
              Set
            </button>
          </div>
        </div>

        {/* Row 2: Device Name */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label" style={{ width: '140px' }}>Device Name:</span>
          <input 
            type="text" 
            className="lcs-settings-input" 
            style={{ width: '180px' }}
            value={settingsServerDeviceName}
            onChange={(e) => setSettingsServerDeviceName(e.target.value)}
          />
        </div>

        {/* Row 3: Auth Code */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label" style={{ width: '140px' }}>Auth Code:</span>
          <input 
            type="text" 
            className="lcs-settings-input" 
            style={{ width: '180px' }}
            value={settingsServerAuthCode}
            onChange={(e) => setSettingsServerAuthCode(e.target.value)}
          />
        </div>

        {/* Row 4: Organization ID */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label" style={{ width: '140px' }}>Organization ID:</span>
          <input 
            type="text" 
            className="lcs-settings-input" 
            style={{ width: '180px' }}
            value={settingsServerOrgId}
            onChange={(e) => setSettingsServerOrgId(e.target.value)}
          />
        </div>

        {/* Row 5: Create location checkbox */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ width: '140px' }}>Create location:</span>
          <div 
            className={`lcs-checkbox-box ${settingsServerCreateLoc ? 'is-checked' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setSettingsServerCreateLoc(!settingsServerCreateLoc)}
          >
            {settingsServerCreateLoc && <span className="lcs-checkmark">✓</span>}
          </div>
        </div>

        {/* Row 6: Join button */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none', paddingTop: '0' }}>
          <span style={{ width: '140px' }} />
          <button 
            type="button" 
            className="lcs-subnav-btn is-active" 
            style={{ height: '24px', padding: '0 20px', fontSize: '11px', borderRadius: '12px' }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
