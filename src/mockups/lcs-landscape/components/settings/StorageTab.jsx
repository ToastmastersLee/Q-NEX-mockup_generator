import { useLcs } from '../../context/LcsContext';

export function StorageTab() {
  const {
    settingsRecordStrategy,
    setSettingsRecordStrategy
  } = useLcs();

  return (
    <div className="lcs-settings-storage-tab">
      {/* Row 1: Record Strategy */}
      <div className="lcs-settings-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="lcs-settings-label">Record Strategy:</span>
          <div className="lcs-settings-options-group">
            {[
              { label: 'Delete Priority', value: 'delete' },
              { label: 'Stop Priority', value: 'stop' }
            ].map((opt) => {
              const isSelected = settingsRecordStrategy === opt.value;
              return (
                <div 
                  key={opt.value} 
                  className="lcs-radio-item"
                  onClick={() => setSettingsRecordStrategy(opt.value)}
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
        <div style={{ marginLeft: '120px', fontSize: '11px', color: '#a0aec0', lineHeight: '1.6' }}>
          <div>When "Delete Priority" is selected, oldest files will be deleted first when lack space.</div>
          <div>When "Stop Priority" is selected, it will stop recording when lack space.</div>
        </div>
      </div>

      {/* Row 2: Disk Manage */}
      <div className="lcs-settings-row" style={{ alignItems: 'center' }}>
        <span className="lcs-settings-label">Disk Manage:</span>
        <div className="lcs-disk-grid">
          <div className="lcs-disk-col">
            <span className="lcs-disk-value" style={{ color: '#00e676' }}>Good</span>
            <span className="lcs-disk-label">Disk State</span>
          </div>
          <div className="lcs-disk-col">
            <span className="lcs-disk-value">930.39G</span>
            <span className="lcs-disk-label">Capacity</span>
          </div>
          <div className="lcs-disk-col">
            <span className="lcs-disk-value" style={{ color: '#f59e0b' }}>246.65G</span>
            <span className="lcs-disk-label">Used</span>
          </div>
          <div className="lcs-disk-col">
            <span className="lcs-disk-value" style={{ color: '#00e676' }}>683.74G</span>
            <span className="lcs-disk-label">Free</span>
          </div>
        </div>
      </div>
    </div>
  );
}
