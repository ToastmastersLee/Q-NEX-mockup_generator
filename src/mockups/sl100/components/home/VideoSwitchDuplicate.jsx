import { ToggleSwitch } from '../common/ToggleSwitch';
import { OpsDeviceIcon } from '../common/OpsDeviceIcon';
import { HdmiCableIcon } from '../common/HdmiCableIcon';
import { TypeCCableIcon } from '../common/TypeCCableIcon';
import { useSl100 } from '../../context/useSl100';

export function VideoSwitchDuplicate() {
  const { duplicateInput, setDuplicateInput, setDuplicateMode } = useSl100();

  const inputs = [
    { id: 'ops', label: 'OPS', component: OpsDeviceIcon },
    { id: 'hdmi', label: 'HDMI', component: HdmiCableIcon },
    { id: 'typec', label: 'Type-C', component: TypeCCableIcon },
  ];

  return (
    <div className="sl100-panel sl100-video-switch-panel">
      <div className="sl100-panel-header">
        <span className="sl100-panel-title">Video Switch</span>
        <div className="sl100-duplicate-mode-toggle">
          <span className="sl100-toggle-label">Duplicate mode</span>
          <ToggleSwitch
            checked={true}
            onChange={(checked) => setDuplicateMode(checked)}
          />
        </div>
      </div>

      <div className="sl100-video-cards-grid">
        {inputs.map((item) => {
          const isSelected = duplicateInput === item.id;
          const IconComp = item.component;
          return (
            <button
              key={item.id}
              type="button"
              className={`sl100-video-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setDuplicateInput(item.id)}
            >
              <div className="sl100-video-card-label">{item.label}</div>
              <div className="sl100-video-icon-container">
                <IconComp active={isSelected} size="large" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
