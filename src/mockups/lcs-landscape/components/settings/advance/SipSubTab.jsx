import { useLcs } from '../../../context/LcsContext';

export function SipSubTab() {
  const {
    sublabelColor,
    pipBorderColor,
    pipInnerBgColor,
    pipSplitBgColor,
    settingsSipCalls,
    setSettingsSipCalls,
    settingsSipRegister,
    setSettingsSipRegister,
    settingsSipDomain,
    setSettingsSipDomain,
    settingsSipServer,
    setSettingsSipServer,
    settingsSipPort,
    setSettingsSipPort,
    settingsSipUsername,
    setSettingsSipUsername,
    settingsSipPassword,
    setSettingsSipPassword,
    settingsSipNatRoute,
    setSettingsSipNatRoute,
    settingsSipTransmission,
    setSettingsSipTransmission,
    settingsSipVideoOutput,
    setSettingsSipVideoOutput,
    isSipVideoOutputDropdownOpen,
    setIsSipVideoOutputDropdownOpen,
    settingsSipVideoQuality,
    setSettingsSipVideoQuality,
    isSipVideoQualityDropdownOpen,
    setIsSipVideoQualityDropdownOpen,
    settingsSipDualStream,
    setSettingsSipDualStream,
    settingsSipPipLayout,
    setSettingsSipPipLayout,
    showToast
  } = useLcs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Card 1: SIP Registration */}
      <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '120px' }}>
          <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '4px' }}>SIP registration:</span>
          <span style={{ 
            fontSize: '10px', 
            fontWeight: 'bold', 
            color: settingsSipRegister ? '#00e676' : '#a0aec0',
            marginTop: '16px'
          }}>
            {settingsSipRegister ? 'Registered' : 'Unregistered'}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Row 1: SIP Calls toggle & Register toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>SIP Calls:</span>
              <div 
                className={`lcs-toggle-switch ${settingsSipCalls ? 'is-on' : ''}`}
                onClick={() => setSettingsSipCalls(!settingsSipCalls)}
                style={{ transform: 'scale(0.85)' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>Register:</span>
              <div 
                className={`lcs-toggle-switch ${settingsSipRegister ? 'is-on' : ''}`}
                onClick={() => setSettingsSipRegister(!settingsSipRegister)}
                style={{ transform: 'scale(0.85)' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>
          </div>

          {/* Row 2: SIP Domain, SIP Server, SIP Port */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>SIP Domain:</span>
              <input 
                type="text" 
                className="lcs-settings-input" 
                style={{ width: '120px' }}
                value={settingsSipDomain}
                onChange={(e) => setSettingsSipDomain(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>SIP Server:</span>
              <input 
                type="text" 
                className="lcs-settings-input" 
                style={{ width: '120px' }}
                value={settingsSipServer}
                onChange={(e) => setSettingsSipServer(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>SIP Port:</span>
              <input 
                type="text" 
                className="lcs-settings-input" 
                style={{ width: '80px' }}
                value={settingsSipPort}
                onChange={(e) => setSettingsSipPort(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: UserName, Password */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>UserName:</span>
              <input 
                type="text" 
                className="lcs-settings-input" 
                style={{ width: '120px' }}
                value={settingsSipUsername}
                onChange={(e) => setSettingsSipUsername(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '70px' }}>Password:</span>
              <input 
                type="password" 
                className="lcs-settings-input" 
                style={{ width: '120px' }}
                value={settingsSipPassword}
                onChange={(e) => setSettingsSipPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: NAT Route */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ width: '120px' }}>NAT Route:</span>
          <div 
            className={`lcs-toggle-switch ${settingsSipNatRoute ? 'is-on' : ''}`}
            onClick={() => setSettingsSipNatRoute(!settingsSipNatRoute)}
            style={{ transform: 'scale(0.85)' }}
          >
            <div className="lcs-toggle-knob" />
          </div>
          <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
        </div>
      </div>

      {/* Card 3: Transmission */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ width: '120px' }}>Transmission:</span>
          <div className="lcs-settings-options-group">
            {['TCP', 'UDP'].map((opt) => {
              const isSelected = settingsSipTransmission === opt;
              return (
                <div 
                  key={opt} 
                  className="lcs-radio-item"
                  onClick={() => setSettingsSipTransmission(opt)}
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
      </div>

      {/* Card 4: Video Output */}
      <div className="lcs-settings-advance-card" style={{ overflow: 'visible' }}>
        <div className="lcs-settings-row" style={{ borderBottom: 'none', display: 'flex', gap: '32px', overflow: 'visible' }}>
          <span className="lcs-settings-label" style={{ width: '120px' }}>Video Output:</span>
          
          {/* Default Video Output Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <span style={{ fontSize: '11px', color: sublabelColor, width: '50px' }}>Default:</span>
            <div 
              className="lcs-select-pill" 
              style={{ width: '140px', cursor: 'pointer' }}
              onClick={() => {
                setIsSipVideoOutputDropdownOpen(!isSipVideoOutputDropdownOpen);
                setIsSipVideoQualityDropdownOpen(false);
              }}
            >
              <span>{settingsSipVideoOutput}</span>
              <span>▼</span>
            </div>
            {isSipVideoOutputDropdownOpen && (
              <div className="lcs-settings-dropdown-menu" style={{ top: '30px', left: '62px', width: '140px' }}>
                {['PGM', 'Lecture', 'Lecture2', 'Teacher_C', 'Student_C', 'Teacher_P', 'Student_P'].map(opt => (
                  <div 
                    key={opt}
                    className={`lcs-settings-dropdown-item ${settingsSipVideoOutput === opt ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSettingsSipVideoOutput(opt);
                      setIsSipVideoOutputDropdownOpen(false);
                      showToast(`Video Output Default set to ${opt}`);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quality Output Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
            <span style={{ fontSize: '11px', color: sublabelColor, width: '50px' }}>Quality:</span>
            <div 
              className="lcs-select-pill" 
              style={{ width: '120px', cursor: 'pointer' }}
              onClick={() => {
                setIsSipVideoQualityDropdownOpen(!isSipVideoQualityDropdownOpen);
                setIsSipVideoOutputDropdownOpen(false);
              }}
            >
              <span>{settingsSipVideoQuality}</span>
              <span>▼</span>
            </div>
            {isSipVideoQualityDropdownOpen && (
              <div className="lcs-settings-dropdown-menu" style={{ top: '30px', left: '62px', width: '120px' }}>
                {['FHD', 'HD', 'SD'].map(opt => (
                  <div 
                    key={opt}
                    className={`lcs-settings-dropdown-item ${settingsSipVideoQuality === opt ? 'is-selected' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSettingsSipVideoQuality(opt);
                      setIsSipVideoQualityDropdownOpen(false);
                      showToast(`Video Quality set to ${opt}`);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card 5: Dual Stream */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ width: '120px' }}>Dual Stream:</span>
          <div 
            className={`lcs-toggle-switch ${settingsSipDualStream ? 'is-on' : ''}`}
            onClick={() => setSettingsSipDualStream(!settingsSipDualStream)}
            style={{ transform: 'scale(0.85)' }}
          >
            <div className="lcs-toggle-knob" />
          </div>
          <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
        </div>
      </div>

      {/* Card 6: PIP Layouts */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ borderBottom: 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="lcs-settings-label" style={{ width: '120px' }}>PIP:</span>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Icon 1: Top-Right mini box */}
            <div 
              onClick={() => setSettingsSipPipLayout(1)}
              style={{ 
                width: '32px', 
                height: '20px', 
                border: `1px solid ${settingsSipPipLayout === 1 ? '#00e676' : pipBorderColor}`, 
                borderRadius: '2px', 
                position: 'relative', 
                cursor: 'pointer',
                backgroundColor: settingsSipPipLayout === 1 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
              }}
            >
              <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 1 ? '#00e676' : pipInnerBgColor, position: 'absolute', top: '2px', right: '2px' }} />
            </div>

            {/* Icon 2: Bottom-Right mini box */}
            <div 
              onClick={() => setSettingsSipPipLayout(2)}
              style={{ 
                width: '32px', 
                height: '20px', 
                border: `1px solid ${settingsSipPipLayout === 2 ? '#00e676' : pipBorderColor}`, 
                borderRadius: '2px', 
                position: 'relative', 
                cursor: 'pointer',
                backgroundColor: settingsSipPipLayout === 2 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
              }}
            >
              <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 2 ? '#00e676' : pipInnerBgColor, position: 'absolute', bottom: '2px', right: '2px' }} />
            </div>

            {/* Icon 3: Top-Left mini box */}
            <div 
              onClick={() => setSettingsSipPipLayout(3)}
              style={{ 
                width: '32px', 
                height: '20px', 
                border: `1px solid ${settingsSipPipLayout === 3 ? '#00e676' : pipBorderColor}`, 
                borderRadius: '2px', 
                position: 'relative', 
                cursor: 'pointer',
                backgroundColor: settingsSipPipLayout === 3 ? 'rgba(0, 230, 118, 0.1)' : 'transparent'
              }}
            >
              <div style={{ width: '10px', height: '6px', backgroundColor: settingsSipPipLayout === 3 ? '#00e676' : pipInnerBgColor, position: 'absolute', top: '2px', left: '2px' }} />
            </div>

            {/* Icon 4: Side by Side (Split with right colored green) */}
            <div 
              onClick={() => setSettingsSipPipLayout(4)}
              style={{ 
                width: '32px', 
                height: '20px', 
                border: `1px solid ${settingsSipPipLayout === 4 ? '#00e676' : pipBorderColor}`, 
                borderRadius: '2px', 
                position: 'relative', 
                cursor: 'pointer',
                backgroundColor: 'transparent',
                overflow: 'hidden'
              }}
            >
              <div style={{ width: '50%', height: '100%', backgroundColor: settingsSipPipLayout === 4 ? '#00e676' : pipSplitBgColor, position: 'absolute', right: 0, borderLeft: `1px solid ${pipSplitBgColor}` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
