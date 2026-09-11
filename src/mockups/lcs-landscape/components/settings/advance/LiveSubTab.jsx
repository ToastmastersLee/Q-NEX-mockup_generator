import { useLcs } from '../../../context/LcsContext';

export function LiveSubTab() {
  const {
    settingsLiveSelect,
    setSettingsLiveSelect,
    settingsLiveFormat,
    settingsLiveBitrate,
    settingsLiveFrameRate,
    settingsLiveResolution,
    settingsLiveServer,
    setSettingsLiveServer
  } = useLcs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <div className="lcs-settings-advance-card">
        {/* Row 1: Select checkboxes */}
        <div className="lcs-settings-row" style={{ alignItems: 'flex-start' }}>
          <span className="lcs-settings-label" style={{ marginTop: '4px' }}>Select:</span>
          <div className="lcs-checkbox-grid">
            {[
              { label: 'PGM', key: 'pgm' },
              { label: 'Lecture', key: 'lecture' },
              { label: 'Lecture2', key: 'lecture2' },
              { label: 'Teacher_C', key: 'teacherC' },
              { label: 'Student_C', key: 'studentC' },
              { label: 'Teacher_P', key: 'teacherP' },
              { label: 'Student_P', key: 'studentP' },
              { label: 'Interactive', key: 'interactive' }
            ].map((chk) => {
              const isChecked = settingsLiveSelect[chk.key];
              return (
                <div 
                  key={chk.key} 
                  className="lcs-checkbox-item"
                  onClick={() => setSettingsLiveSelect(prev => ({ ...prev, [chk.key]: !prev[chk.key] }))}
                >
                  <div className={`lcs-checkbox-box ${isChecked ? 'is-checked' : ''}`}>
                    {isChecked && <span className="lcs-checkmark">✓</span>}
                  </div>
                  <span className={`lcs-checkbox-label-pill ${isChecked ? 'is-checked' : ''}`}>{chk.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Format */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Format:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsLiveFormat}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 3: Bitrate */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Bitrate:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsLiveBitrate}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 4: Frame Rate */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Frame Rate:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsLiveFrameRate}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 5: Resolution */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none' }}>
          <span className="lcs-settings-label">Resolution:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsLiveResolution}</span>
            <span>▼</span>
          </div>
        </div>
      </div>

      {/* Card 2: Live Server Input */}
      <div className="lcs-settings-advance-card">
        <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '6px', borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="lcs-settings-label">Live Server:</span>
            <input 
              type="text" 
              className="lcs-settings-input" 
              style={{ width: '360px' }}
              value={settingsLiveServer}
              onChange={(e) => setSettingsLiveServer(e.target.value)}
            />
          </div>
          <span style={{ marginLeft: '140px', fontSize: '10px', color: '#a0aec0', lineHeight: '1.4' }}>
            (Address format: rtmp://hostip:port/appname/streamname; For example: rtmp://127.0.0.1:1935/live/livestream)
          </span>
        </div>
      </div>
    </div>
  );
}
