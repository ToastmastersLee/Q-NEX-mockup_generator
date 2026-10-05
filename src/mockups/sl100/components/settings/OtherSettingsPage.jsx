import { ChevronLeft } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { ToggleSwitch } from '../common/ToggleSwitch';

export function OtherSettingsPage() {
  const {
    setScreen,
    powerLinkage,
    setPowerLinkage,
  } = useSl100();

  const updateLinkage = (key, val) => {
    setPowerLinkage((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="sl100-page-content sl100-other-settings-page">
      <div className="sl100-subpage-layout-wrap">
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="sl100-other-header-area" style={{ padding: '2px 4px' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 600, color: '#f8fafc' }}>
              Power on/off settings
            </h2>
            <p className="sl100-other-header-desc" style={{ margin: 0, fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
              When the devices is turned on/off, it will automatically send the power on/off command to all serial devices.
            </p>
          </div>

          <div className="sl100-device-info-main-grid">
            <div className="sl100-device-info-col1">
              <div className="sl100-info-row-card">
                <span className="sl100-info-card-label">Power on linkage</span>
                <ToggleSwitch
                  checked={powerLinkage.powerOnLinkage}
                  onChange={(val) => updateLinkage('powerOnLinkage', val)}
                />
              </div>
            </div>

            <div className="sl100-device-info-col2">
              <div className="sl100-info-row-card">
                <span className="sl100-info-card-label">Shutdown linkage</span>
                <ToggleSwitch
                  checked={powerLinkage.shutdownLinkage}
                  onChange={(val) => updateLinkage('shutdownLinkage', val)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
