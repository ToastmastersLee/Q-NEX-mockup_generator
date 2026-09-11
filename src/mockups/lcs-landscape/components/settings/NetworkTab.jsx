import { useLcs } from '../../context/LcsContext';

export function NetworkTab() {
  const {
    theme,
    settingsNetworkSubTab,
    setSettingsNetworkSubTab,
    settingsNetworkDhcp,
    setSettingsNetworkDhcp,
    settingsNetworkIp,
    setSettingsNetworkIp,
    settingsNetworkMask,
    setSettingsNetworkMask,
    settingsNetworkGateway,
    setSettingsNetworkGateway,
    settingsNetworkDns,
    setSettingsNetworkDns,
    isRemoteClassroomView,
    sublabelColor,
    pingAddress,
    setPingAddress,
    isPinging,
    handleStartPing,
    handleClearPing,
    pingConsoleLines
  } = useLcs();

  return (
    <div className="lcs-settings-network-tab">
      {/* Sub Navigation Bar */}
      <div className="lcs-settings-subnav-row">
        <button
          type="button"
          className={`lcs-subnav-btn ${settingsNetworkSubTab === 'config' ? 'is-active' : ''}`}
          onClick={() => setSettingsNetworkSubTab('config')}
        >
          Config
        </button>
        <button
          type="button"
          className={`lcs-subnav-btn ${settingsNetworkSubTab === 'detect' ? 'is-active' : ''}`}
          onClick={() => setSettingsNetworkSubTab('detect')}
        >
          Net Detect
        </button>
      </div>

      {settingsNetworkSubTab === 'config' ? (
        <div className="lcs-settings-network-config">
          {/* Row 1: Select (LAN) */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">Select:</span>
            <div className="lcs-radio-item" style={{ cursor: 'default' }}>
              <div className="lcs-radio-circle is-checked">
                <div className="lcs-radio-dot" />
              </div>
              <span>LAN</span>
            </div>
          </div>

          {/* Row 2: DHCP */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">DHCP:</span>
            <div 
              className={`lcs-toggle-switch ${settingsNetworkDhcp ? 'is-on' : ''}`}
              onClick={() => {
                const nextDhcp = !settingsNetworkDhcp;
                setSettingsNetworkDhcp(nextDhcp);
                if (nextDhcp) {
                  setSettingsNetworkIp('192.168.3.155');
                  setSettingsNetworkMask('255.255.255.0');
                  setSettingsNetworkGateway('192.168.3.1');
                  setSettingsNetworkDns('8.8.8.8');
                } else {
                  setSettingsNetworkIp(isRemoteClassroomView ? '192.168.3.37' : '192.168.3.50');
                  setSettingsNetworkMask(isRemoteClassroomView ? '255.255.255.0' : '113.31.119.88');
                  setSettingsNetworkGateway('192.168.3.1');
                  setSettingsNetworkDns('');
                }
              }}
            >
              <div className="lcs-toggle-knob" />
            </div>
          </div>

          {/* Row 3: IP Address */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">IP Address:</span>
            <input 
              type="text" 
              className="lcs-settings-input" 
              value={settingsNetworkIp}
              disabled={settingsNetworkDhcp}
              onChange={(e) => setSettingsNetworkIp(e.target.value)}
            />
          </div>

          {/* Row 4: Subnet Mask */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">Subnet Mask:</span>
            <input 
              type="text" 
              className="lcs-settings-input" 
              value={settingsNetworkMask}
              disabled={settingsNetworkDhcp}
              onChange={(e) => setSettingsNetworkMask(e.target.value)}
            />
          </div>

          {/* Row 5: Default Gateway */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">Default Gateway:</span>
            <input 
              type="text" 
              className="lcs-settings-input" 
              value={settingsNetworkGateway}
              disabled={settingsNetworkDhcp}
              onChange={(e) => setSettingsNetworkGateway(e.target.value)}
            />
          </div>

          {/* Row 6: DNS Server */}
          <div className="lcs-settings-row">
            <span className="lcs-settings-label">DNS Server:</span>
            <input 
              type="text" 
              className="lcs-settings-input" 
              value={settingsNetworkDns}
              disabled={settingsNetworkDhcp}
              placeholder=""
              onChange={(e) => setSettingsNetworkDns(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="lcs-settings-net-detect-panel" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, padding: '8px 0', boxSizing: 'border-box' }}>
          {/* Controls bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: sublabelColor }}>Address:</span>
            <input 
              type="text" 
              className="lcs-net-detect-input"
              value={pingAddress}
              onChange={(e) => setPingAddress(e.target.value)}
              placeholder="www.bing.com"
              disabled={isPinging}
              style={{ 
                background: 'rgba(0,0,0,0.2)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                color: '#fff', 
                padding: '4px 12px', 
                borderRadius: '999px',
                outline: 'none',
                fontSize: '12px',
                width: '200px'
              }}
            />
            
            <button 
              type="button" 
              className="lcs-net-detect-btn"
              onClick={handleStartPing}
              disabled={isPinging}
              style={{
                background: theme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.06)',
                border: theme === 'light' ? '1px solid #d1d5db' : '1px solid rgba(255,255,255,0.1)',
                color: theme === 'light' ? '#1f2937' : '#fff',
                padding: '4px 16px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isPinging ? 'Detecting...' : 'Start Detect'}
            </button>
            
            <button 
              type="button" 
              className="lcs-net-detect-btn"
              onClick={handleClearPing}
              style={{
                background: theme === 'light' ? '#e5e7eb' : 'rgba(255,255,255,0.06)',
                border: theme === 'light' ? '1px solid #d1d5db' : '1px solid rgba(255,255,255,0.1)',
                color: theme === 'light' ? '#1f2937' : '#fff',
                padding: '4px 16px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          </div>

          {/* Monospaced Output terminal console */}
          <div className="lcs-net-detect-console" style={{ 
            flex: 1, 
            background: '#090a0f', 
            border: '1px solid rgba(255,255,255,0.05)', 
            borderRadius: '6px', 
            padding: '12px', 
            fontFamily: 'monospace', 
            fontSize: '11px', 
            color: '#e2e8f0', 
            overflowY: 'auto',
            minHeight: '140px',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap'
          }}>
            {pingConsoleLines.length > 0 ? (
              pingConsoleLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))
            ) : (
              <div style={{ color: '#64748b', fontStyle: 'italic' }}>Console idle. Enter address and click 'Start Detect'.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
