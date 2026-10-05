import { ToggleSwitch } from '../common/ToggleSwitch';
import { useSl100 } from '../../context/useSl100';

function WindowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm0 17.102L9.75 21.9v-9.45H0v8.101zm10.7-18.423L24 0v11.551H10.7V2.128zm13.3 10.323H10.7V24L24 21.872v-9.421z" />
    </svg>
  );
}

function HdmiPortIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 24 16" fill="currentColor">
      <path d="M2 1C2 0.447715 2.44772 0 3 0H21C21.5523 0 22 0.447715 22 1V10C22 10.5523 21.5523 11 21 11L18 15C17.5 15.6 16.8 16 16 16H8C7.2 16 6.5 15.6 6 15L2 11C2 10.5 2 1 2 1Z" />
    </svg>
  );
}

function TypeCPortIcon() {
  return (
    <svg width="18" height="10" viewBox="0 0 24 12" fill="currentColor">
      <rect x="1" y="1" width="22" height="10" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="5" y="4.5" width="14" height="3" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function VideoSwitchMatrix() {
  const { matrixOutputs, setMatrixOutput, setDuplicateMode } = useSl100();

  const outputs = [
    { id: 'outA', label: 'HDMI out A' },
    { id: 'outB', label: 'HDMI out B' },
    { id: 'outC', label: 'HDMI out C' },
  ];

  const inputs = [
    { id: 'ops', label: 'OPS', icon: WindowsIcon },
    { id: 'hdmi', label: 'HDMI', icon: HdmiPortIcon },
    { id: 'typec', label: 'Type-C', icon: TypeCPortIcon },
  ];

  return (
    <div className="sl100-panel sl100-video-switch-panel">
      <div className="sl100-panel-header">
        <span className="sl100-panel-title">Video Switch</span>
        <div className="sl100-duplicate-mode-toggle">
          <span className="sl100-toggle-label">Duplicate mode</span>
          <ToggleSwitch
            checked={false}
            onChange={(checked) => setDuplicateMode(checked)}
          />
        </div>
      </div>

      <div className="sl100-matrix-grid">
        {outputs.map((out) => (
          <div key={out.id} className="sl100-matrix-row">
            <span className="sl100-matrix-out-label">{out.label}</span>
            <div className="sl100-matrix-inputs">
              {inputs.map((inp) => {
                const isSelected = matrixOutputs[out.id] === inp.id;
                const IconComp = inp.icon;
                return (
                  <button
                    key={inp.id}
                    type="button"
                    className={`sl100-matrix-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setMatrixOutput(out.id, inp.id)}
                    title={`${out.label} -> ${inp.label}`}
                  >
                    <IconComp />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
