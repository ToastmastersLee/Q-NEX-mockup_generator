import { ToggleSwitch } from '../common/ToggleSwitch';
import { HdmiCableIcon } from '../common/HdmiCableIcon';
import { useCpd10 } from '../../context/Cpd10Context';

export function VideoSwitchDuplicate() {
  const { duplicateInput, setDuplicateInput, setDuplicateMode } = useCpd10();

  const inputs = [
    { id: 'hdmi1', label: 'HDMI in 1', number: 1 },
    { id: 'hdmi2', label: 'HDMI in 2', number: 2 },
    { id: 'hdmi3', label: 'HDMI in 3', number: 3 },
  ];

  return (
    <div className="cpd10-panel cpd10-video-switch-panel">
      <div className="cpd10-panel-header">
        <span className="cpd10-panel-title">Video Switch</span>
        <div className="cpd10-duplicate-mode-toggle">
          <span className="cpd10-toggle-label">Duplicate Mode</span>
          <ToggleSwitch
            checked={true}
            onChange={(checked) => setDuplicateMode(checked)}
          />
        </div>
      </div>

      <div className="cpd10-hdmi-cards-grid">
        {inputs.map((item) => {
          const isSelected = duplicateInput === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`cpd10-hdmi-card ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setDuplicateInput(item.id)}
            >
              <div className="cpd10-hdmi-label">{item.label}</div>
              <div className="cpd10-hdmi-icon-container">
                <HdmiCableIcon
                  number={item.number}
                  active={isSelected}
                  size="large"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
