import { useLcs } from '../../../context/LcsContext';

export function RecordSubTab() {
  const {
    settingsAdvanceSelect,
    setSettingsAdvanceSelect,
    settingsAdvanceName,
    setSettingsAdvanceName,
    settingsAdvanceBitrate,
    settingsAdvanceFormat,
    settingsAdvanceFrameRate,
    settingsAdvanceCodec,
    settingsAdvanceResolution,
    settingsAdvanceSegment,
    settingsAdvanceMaxTime
  } = useLcs();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {/* Card 1: Record Config */}
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
              const isChecked = settingsAdvanceSelect[chk.key];
              return (
                <div 
                  key={chk.key} 
                  className="lcs-checkbox-item"
                  onClick={() => setSettingsAdvanceSelect(prev => ({ ...prev, [chk.key]: !prev[chk.key] }))}
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

        {/* Row 2: Name */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Name:</span>
          <input 
            type="text" 
            className="lcs-settings-input" 
            value={settingsAdvanceName}
            onChange={(e) => setSettingsAdvanceName(e.target.value)}
          />
        </div>

        {/* Row 3: Bitrate */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Bitrate:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceBitrate}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 4: Format */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Format:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceFormat}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 5: Frame Rate */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Frame Rate:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceFrameRate}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 6: Codec */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Codec:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceCodec}</span>
            <span>▼</span>
          </div>
        </div>

        {/* Row 7: Resolution */}
        <div className="lcs-settings-row">
          <span className="lcs-settings-label">Resolution:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceResolution}</span>
            <span>▼</span>
          </div>
        </div>
      </div>

      {/* Card 2: Other Rec Config */}
      <div className="lcs-settings-advance-card">
        {/* Row 1: Other Title */}
        <div className="lcs-settings-row" style={{ padding: '6px 20px', borderBottom: 'none' }}>
          <span className="lcs-settings-label" style={{ fontWeight: 'bold' }}>Other:</span>
        </div>

        {/* Row 2: Segment Rec. */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
          <span className="lcs-settings-label">Segment Rec.:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="lcs-select-pill" style={{ width: '160px' }}>
              <span>{settingsAdvanceSegment}</span>
              <span>▼</span>
            </div>
            <span style={{ fontSize: '11px', color: '#a0aec0' }}>(0 means no automatic segmentation)</span>
          </div>
        </div>

        {/* Row 3: Maximum REC. time */}
        <div className="lcs-settings-row" style={{ borderBottom: 'none', alignItems: 'center' }}>
          <span className="lcs-settings-label">Maximum REC. time:</span>
          <div className="lcs-select-pill" style={{ width: '160px' }}>
            <span>{settingsAdvanceMaxTime}</span>
            <span>▼</span>
          </div>
        </div>
      </div>
    </div>
  );
}
