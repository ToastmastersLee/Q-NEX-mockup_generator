import { useLcs } from '../../../context/LcsContext';

export function ChannelSubTab() {
  const {
    settingsChannelActive,
    setSettingsChannelActive,
    settingsChannelConfigs,
    updateChannelConfig
  } = useLcs();

  const currentConfig = settingsChannelConfigs[settingsChannelActive] || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Card 1: Channel Select and Raw */}
      <div className="lcs-settings-advance-card">
        {/* Row 1: Select Channel */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label" style={{ width: '140px' }}>Select Channel:</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {['Teacher_C', 'Student_C', 'Teacher_P', 'Student_P'].map((chn) => {
              const isActive = settingsChannelActive === chn;
              return (
                <button
                  key={chn}
                  type="button"
                  className={`lcs-subnav-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setSettingsChannelActive(chn)}
                >
                  {chn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Select Raw */}
        <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label" style={{ width: '140px' }}>Select Raw:</span>
            <div className="lcs-settings-options-group">
              {['Close', 'RTSP', 'USB Camera'].map((opt) => {
                const isSelected = currentConfig.raw === opt;
                return (
                  <div 
                    key={opt} 
                    className="lcs-radio-item"
                    onClick={() => updateChannelConfig('raw', opt)}
                  >
                    <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                      {isSelected && <div className="lcs-radio-dot" />}
                    </div>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {currentConfig.raw === 'RTSP' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ width: '140px' }} />
              <input 
                type="text" 
                className="lcs-settings-input" 
                style={{ width: '360px' }}
                value={currentConfig.url || ''}
                onChange={(e) => updateChannelConfig('url', e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Row 3: PTZ Control Toggle */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ width: '140px' }}>PTZ Control:</span>
          <div 
            className={`lcs-toggle-switch ${currentConfig.ptzEnabled ? 'is-on' : ''}`}
            onClick={() => updateChannelConfig('ptzEnabled', !currentConfig.ptzEnabled)}
          >
            <div className="lcs-toggle-knob" />
          </div>
        </div>
      </div>

      {/* Card 2: PTZ details grid */}
      <div className="lcs-settings-advance-card">
        {/* Row 1: IP Address and Port */}
        <div className="lcs-settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label" style={{ width: '120px' }}>IP Address:</span>
            <input 
              type="text" 
              className="lcs-settings-input"
              disabled={!currentConfig.ptzEnabled}
              value={currentConfig.ptzIp || ''}
              onChange={(e) => updateChannelConfig('ptzIp', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label" style={{ width: '80px' }}>Port:</span>
            <input 
              type="text" 
              className="lcs-settings-input"
              disabled={!currentConfig.ptzEnabled}
              value={currentConfig.ptzPort || ''}
              onChange={(e) => updateChannelConfig('ptzPort', e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Protocol and Connection Type */}
        <div className="lcs-settings-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label" style={{ width: '120px' }}>Protocol:</span>
            <div 
              className="lcs-select-pill" 
              style={{ width: '160px', opacity: currentConfig.ptzEnabled ? 1 : 0.4, cursor: currentConfig.ptzEnabled ? 'pointer' : 'default' }}
              onClick={() => {
                if (currentConfig.ptzEnabled) {
                  updateChannelConfig('ptzProtocol', currentConfig.ptzProtocol === 'Visca' ? 'Pelco-D' : 'Visca');
                }
              }}
            >
              <span>{currentConfig.ptzProtocol}</span>
              <span>▼</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label" style={{ width: '80px' }}>Type:</span>
            <div 
              className="lcs-select-pill" 
              style={{ width: '160px', opacity: currentConfig.ptzEnabled ? 1 : 0.4, cursor: currentConfig.ptzEnabled ? 'pointer' : 'default' }}
              onClick={() => {
                if (currentConfig.ptzEnabled) {
                  updateChannelConfig('ptzType', currentConfig.ptzType === 'UDP' ? 'TCP' : 'UDP');
                }
              }}
            >
              <span>{currentConfig.ptzType}</span>
              <span>▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
