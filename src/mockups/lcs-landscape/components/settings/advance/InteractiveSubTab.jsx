import { useLcs } from '../../../context/LcsContext';

export function InteractiveSubTab() {
  const {
    groupHeaderColor,
    groupHeaderBorder,
    sublabelColor,
    settingsInteractiveOutput1,
    settingsInteractiveQuality1,
    settingsInteractiveOutput2,
    settingsInteractiveQuality2,
    settingsInteractiveMaxScreens,
    setSettingsInteractiveMaxScreens,
    settingsInteractivePgScroll,
    settingsInteractivePgScrollEnable,
    setSettingsInteractivePgScrollEnable,
    settingsInteractiveMicNum,
    settingsInteractiveSpeakerFull,
    setSettingsInteractiveSpeakerFull,
    settingsInteractiveShowLocalCreator,
    setSettingsInteractiveShowLocalCreator,
    settingsInteractiveLocalDisplays,
    setSettingsInteractiveLocalDisplays,
    settingsInteractiveDisplayLayout,
    setSettingsInteractiveDisplayLayout,
    settingsInteractiveSendCreator,
    settingsInteractiveQualityJoiner,
    settingsInteractiveShowLocalJoiner,
    setSettingsInteractiveShowLocalJoiner,
    settingsInteractiveAutoJoin,
    setSettingsInteractiveAutoJoin
  } = useLcs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Card 1: Creator settings */}
      <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
        <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '6px' }}>Creator:</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Sub Row 1: Send to Joiner */}
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: groupHeaderColor, borderBottom: groupHeaderBorder, paddingBottom: '6px' }}>
            Send to Joiner:
          </div>

          {/* Sub Row 2: Default Output 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Default Output1:</span>
              <div className="lcs-select-pill" style={{ width: '140px' }}>
                <span>{settingsInteractiveOutput1}</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
              <div className="lcs-select-pill" style={{ width: '120px' }}>
                <span>{settingsInteractiveQuality1}</span>
                <span>▼</span>
              </div>
            </div>
          </div>

          {/* Sub Row 3: Default Output 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Default Output2:</span>
              <div className="lcs-select-pill" style={{ width: '140px' }}>
                <span>{settingsInteractiveOutput2}</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
              <div className="lcs-select-pill" style={{ width: '120px' }}>
                <span>{settingsInteractiveQuality2}</span>
                <span>▼</span>
              </div>
            </div>
          </div>

          {/* Sub Row 4: Interactive with Joiners */}
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: groupHeaderColor, borderBottom: groupHeaderBorder, paddingBottom: '6px', marginTop: '6px' }}>
            Interactive with Joiners:
          </div>

          {/* Sub Row 5: Max Screens & AUTO PG Scroll */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Max Screens:</span>
              {[
                { label: '4 views', value: '4' },
                { label: '9 views', value: '9' }
              ].map((opt) => {
                const isSelected = settingsInteractiveMaxScreens === opt.value;
                return (
                  <div 
                    key={opt.value} 
                    className="lcs-radio-item"
                    onClick={() => setSettingsInteractiveMaxScreens(opt.value)}
                  >
                    <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                      {isSelected && <div className="lcs-radio-dot" />}
                    </div>
                    <span>{opt.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '90px' }}>AUTO PG Scroll:</span>
              <div className="lcs-select-pill" style={{ width: '80px' }}>
                <span>{settingsInteractivePgScroll}</span>
                <span>▼</span>
              </div>
              <span style={{ fontSize: '11px', color: '#a0aec0' }}>sec</span>
              <div 
                className={`lcs-toggle-switch ${settingsInteractivePgScrollEnable ? 'is-on' : ''}`}
                onClick={() => setSettingsInteractivePgScrollEnable(!settingsInteractivePgScrollEnable)}
                style={{ transform: 'scale(0.85)', marginLeft: '4px' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>
          </div>

          {/* Sub Row 6: Joiners Mic Num & Speaker Fullscreen */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Joiners Mic Num:</span>
              <div className="lcs-select-pill" style={{ width: '80px' }}>
                <span>{settingsInteractiveMicNum}</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '110px' }}>Speaker Fullscreen:</span>
              <div 
                className={`lcs-toggle-switch ${settingsInteractiveSpeakerFull ? 'is-on' : ''}`}
                onClick={() => setSettingsInteractiveSpeakerFull(!settingsInteractiveSpeakerFull)}
                style={{ transform: 'scale(0.85)' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>
          </div>

          {/* Sub Row 7: Show Local */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Show Local:</span>
            <div 
              className={`lcs-toggle-switch ${settingsInteractiveShowLocalCreator ? 'is-on' : ''}`}
              onClick={() => setSettingsInteractiveShowLocalCreator(!settingsInteractiveShowLocalCreator)}
              style={{ transform: 'scale(0.85)' }}
            >
              <div className="lcs-toggle-knob" />
            </div>
            <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
          </div>
        </div>
      </div>

      {/* Card 2: Joiner settings */}
      <div className="lcs-settings-advance-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '12px 20px', gap: '16px' }}>
        <span className="lcs-settings-label" style={{ fontWeight: 'bold', width: '120px', marginTop: '6px' }}>Joiner:</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Sub Row 1: Local Displays */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Local Displays:</span>
            {[
              { label: '2 Screens', value: '2' },
              { label: '1 Screen', value: '1' }
            ].map((opt) => {
              const isSelected = settingsInteractiveLocalDisplays === opt.value;
              return (
                <div 
                  key={opt.value} 
                  className="lcs-radio-item"
                  onClick={() => setSettingsInteractiveLocalDisplays(opt.value)}
                >
                  <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                    {isSelected && <div className="lcs-radio-dot" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
              );
            })}

            <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
              {['V1', 'V2', 'V2 [V1]'].map((layout) => {
                const layoutVal = layout === 'V2 [V1]' ? 'V2_V1' : layout;
                const isActive = settingsInteractiveDisplayLayout === layoutVal;
                return (
                  <button
                    key={layout}
                    type="button"
                    className={`lcs-subnav-btn ${isActive ? 'is-active' : ''}`}
                    style={{ height: '22px', padding: '0 8px', borderRadius: '4px', fontSize: '10px' }}
                    onClick={() => setSettingsInteractiveDisplayLayout(layoutVal)}
                  >
                    {layout}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub Row 2: Send to Creator & Quality */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '100px' }}>Send to Creator:</span>
              <div className="lcs-select-pill" style={{ width: '140px' }}>
                <span>{settingsInteractiveSendCreator}</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '60px' }}>Quality:</span>
              <div className="lcs-select-pill" style={{ width: '120px' }}>
                <span>{settingsInteractiveQualityJoiner}</span>
                <span>▼</span>
              </div>
            </div>
          </div>

          {/* Sub Row 3: Show Local & Auto Join */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Show Local:</span>
              <div 
                className={`lcs-toggle-switch ${settingsInteractiveShowLocalJoiner ? 'is-on' : ''}`}
                onClick={() => setSettingsInteractiveShowLocalJoiner(!settingsInteractiveShowLocalJoiner)}
                style={{ transform: 'scale(0.85)' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: sublabelColor, width: '80px' }}>Auto Join:</span>
              <div 
                className={`lcs-toggle-switch ${settingsInteractiveAutoJoin ? 'is-on' : ''}`}
                onClick={() => setSettingsInteractiveAutoJoin(!settingsInteractiveAutoJoin)}
                style={{ transform: 'scale(0.85)' }}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span style={{ fontSize: '11px', color: sublabelColor }}>Enable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
