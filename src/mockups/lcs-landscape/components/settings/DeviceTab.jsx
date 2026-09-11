import { useLcs } from '../../context/LcsContext';

export function DeviceTab() {
  const {
    settingsLanguage,
    setSettingsLanguage,
    settingsPowerBoot,
    setSettingsPowerBoot,
    settingsAlarms,
    setSettingsAlarms,
    lockScreenTime,
    setLockScreenTime,
    isLockScreenDropdownOpen,
    setIsLockScreenDropdownOpen,
    settingsOthers,
    setSettingsOthers,
    timeFormat,
    setTimeFormat,
    isTimeFormatDropdownOpen,
    setIsTimeFormatDropdownOpen,
    hourFormat,
    setHourFormat,
    isHourFormatDropdownOpen,
    setIsHourFormatDropdownOpen,
    showToast
  } = useLcs();

  return (
    <div className="lcs-settings-device-tab">
      {/* Row 1: Language */}
      <div className="lcs-settings-row">
        <span className="lcs-settings-label">Language</span>
        <div className="lcs-settings-options-group">
          {['简体中文', '繁體中文', 'ENGLISH', 'Русский язык', 'Français'].map((lang) => {
            const langKey = lang === '简体中文' ? 'zh-cn' : lang === '繁體中文' ? 'zh-tw' : lang === 'ENGLISH' ? 'english' : lang === 'Русский язык' ? 'russian' : lang.toLowerCase();
            const isSelected = settingsLanguage === langKey;
            return (
              <div 
                key={lang} 
                className="lcs-radio-item"
                onClick={() => setSettingsLanguage(langKey)}
              >
                <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                  {isSelected && <div className="lcs-radio-dot" />}
                </div>
                <span>{lang}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Power Boot */}
      <div className="lcs-settings-row">
        <span className="lcs-settings-label">Power Boot</span>
        <div className="lcs-settings-options-group">
          {[
            { label: 'Normal Boot', value: 'normal' },
            { label: 'Power on Boot', value: 'poweron' }
          ].map((opt) => {
            const isSelected = settingsPowerBoot === opt.value;
            return (
              <div 
                key={opt.value} 
                className="lcs-radio-item"
                onClick={() => setSettingsPowerBoot(opt.value)}
              >
                <div className={`lcs-radio-circle ${isSelected ? 'is-checked' : ''}`}>
                  {isSelected && <div className="lcs-radio-dot" />}
                </div>
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 3: Alarm Power Boot */}
      <div className="lcs-settings-row" style={{ alignItems: 'flex-start' }}>
        <span className="lcs-settings-label" style={{ marginTop: '2px' }}>Alarm Power Boot:</span>
        <div className="lcs-alarm-grid">
          {/* Alarm 1: PowerOn1 */}
          <div className="lcs-alarm-column">
            <div className="lcs-alarm-header">
              <span>PowerOn1</span>
              <div 
                className={`lcs-toggle-switch ${settingsAlarms.on1.enabled ? 'is-on' : ''}`}
                onClick={() => setSettingsAlarms(prev => ({ ...prev, on1: { ...prev.on1, enabled: !prev.on1.enabled } }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span>Enable</span>
            </div>
            <div className="lcs-alarm-time-box">
              <span>Time</span>
              <strong>{settingsAlarms.on1.time}</strong>
            </div>
          </div>

          {/* Alarm 2: PowerOff1 */}
          <div className="lcs-alarm-column">
            <div className="lcs-alarm-header">
              <span>PowerOff1</span>
              <div 
                className={`lcs-toggle-switch ${settingsAlarms.off1.enabled ? 'is-on' : ''}`}
                onClick={() => setSettingsAlarms(prev => ({ ...prev, off1: { ...prev.off1, enabled: !prev.off1.enabled } }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span>Enable</span>
            </div>
            <div className="lcs-alarm-time-box">
              <span>Time</span>
              <strong>{settingsAlarms.off1.time}</strong>
            </div>
          </div>

          {/* Alarm 3: PowerOn2 */}
          <div className="lcs-alarm-column">
            <div className="lcs-alarm-header">
              <span>PowerOn2</span>
              <div 
                className={`lcs-toggle-switch ${settingsAlarms.on2.enabled ? 'is-on' : ''}`}
                onClick={() => setSettingsAlarms(prev => ({ ...prev, on2: { ...prev.on2, enabled: !prev.on2.enabled } }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span>Enable</span>
            </div>
            <div className="lcs-alarm-time-box">
              <span>Time</span>
              <strong>{settingsAlarms.on2.time}</strong>
            </div>
          </div>

          {/* Alarm 4: PowerOff2 */}
          <div className="lcs-alarm-column">
            <div className="lcs-alarm-header">
              <span>PowerOff2</span>
              <div 
                className={`lcs-toggle-switch ${settingsAlarms.off2.enabled ? 'is-on' : ''}`}
                onClick={() => setSettingsAlarms(prev => ({ ...prev, off2: { ...prev.off2, enabled: !prev.off2.enabled } }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
              <span>Enable</span>
            </div>
            <div className="lcs-alarm-time-box">
              <span>Time</span>
              <strong>{settingsAlarms.off2.time}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Lock Screen */}
      <div className="lcs-settings-row" style={{ position: 'relative', zIndex: 120 }}>
        <span className="lcs-settings-label">Lock Screen:</span>
        <div 
          className="lcs-select-pill" 
          style={{ width: '160px', cursor: 'pointer', position: 'relative' }}
          onClick={() => {
            setIsLockScreenDropdownOpen(!isLockScreenDropdownOpen);
            setIsTimeFormatDropdownOpen(false);
            setIsHourFormatDropdownOpen(false);
          }}
        >
          <span>{lockScreenTime}</span>
          <span>▼</span>
        </div>
        {isLockScreenDropdownOpen && (
          <div className="lcs-settings-dropdown-menu">
            {['2minute', '5minute', '10minute', '15minute', 'Never'].map(opt => (
              <div 
                key={opt}
                className={`lcs-settings-dropdown-item ${lockScreenTime === opt ? 'is-selected' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLockScreenTime(opt);
                  setIsLockScreenDropdownOpen(false);
                  showToast(`Lock Screen set to ${opt}`);
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Row 5: Other Set */}
      <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'flex-start' }}>
        <span className="lcs-settings-label" style={{ marginTop: '2px' }}>Other Set:</span>
        <div className="lcs-others-grid">
          <div className="lcs-others-col-left">
            <div className="lcs-others-toggle-row">
              <span>Save Film Layout</span>
              <div 
                className={`lcs-toggle-switch ${settingsOthers.saveFilmLayout ? 'is-on' : ''}`}
                onClick={() => setSettingsOthers(prev => ({ ...prev, saveFilmLayout: !prev.saveFilmLayout }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
            </div>
            <div className="lcs-others-toggle-row">
              <span>Power on Live Streaming</span>
              <div 
                className={`lcs-toggle-switch ${settingsOthers.powerOnLive ? 'is-on' : ''}`}
                onClick={() => setSettingsOthers(prev => ({ ...prev, powerOnLive: !prev.powerOnLive }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
            </div>
            <div className="lcs-others-toggle-row">
              <span>Power on Recording</span>
              <div 
                className={`lcs-toggle-switch ${settingsOthers.powerOnRecord ? 'is-on' : ''}`}
                onClick={() => setSettingsOthers(prev => ({ ...prev, powerOnRecord: !prev.powerOnRecord }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
            </div>
            <div className="lcs-others-toggle-row">
              <span>Start Recording\Start Living Countdown</span>
              <div 
                className={`lcs-toggle-switch ${settingsOthers.startCountdown ? 'is-on' : ''}`}
                onClick={() => setSettingsOthers(prev => ({ ...prev, startCountdown: !prev.startCountdown }))}
              >
                <div className="lcs-toggle-knob" />
              </div>
            </div>
          </div>

          <div className="lcs-others-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative', zIndex: 110 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', position: 'relative' }}>
              <span style={{ fontSize: '11px' }}>Time Format:</span>
              <div 
                className="lcs-select-pill" 
                style={{ width: '160px', cursor: 'pointer' }}
                onClick={() => {
                  setIsTimeFormatDropdownOpen(!isTimeFormatDropdownOpen);
                  setIsLockScreenDropdownOpen(false);
                  setIsHourFormatDropdownOpen(false);
                }}
              >
                <span>{timeFormat}</span>
                <span>▼</span>
              </div>
              {isTimeFormatDropdownOpen && (
                <div className="lcs-settings-dropdown-menu format-dropdown" style={{ top: '30px' }}>
                  {['DD-MM-YYYY', 'YYYY-MM-DD'].map(opt => (
                    <div 
                      key={opt}
                      className={`lcs-settings-dropdown-item ${timeFormat === opt ? 'is-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTimeFormat(opt);
                        setIsTimeFormatDropdownOpen(false);
                        showToast(`Time Format set to ${opt}`);
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', position: 'relative' }}>
              <div 
                className="lcs-select-pill" 
                style={{ width: '160px', cursor: 'pointer' }}
                onClick={() => {
                  setIsHourFormatDropdownOpen(!isHourFormatDropdownOpen);
                  setIsLockScreenDropdownOpen(false);
                  setIsTimeFormatDropdownOpen(false);
                }}
              >
                <span>{hourFormat}</span>
                <span>▼</span>
              </div>
              {isHourFormatDropdownOpen && (
                <div className="lcs-settings-dropdown-menu hour-dropdown" style={{ top: '34px' }}>
                  {['12 Hours Format', '24 Hours Format'].map(opt => (
                    <div 
                      key={opt}
                      className={`lcs-settings-dropdown-item ${hourFormat === opt ? 'is-selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHourFormat(opt);
                        setIsHourFormatDropdownOpen(false);
                        showToast(`Hour Format set to ${opt}`);
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
      </div>
    </div>
  );
}
