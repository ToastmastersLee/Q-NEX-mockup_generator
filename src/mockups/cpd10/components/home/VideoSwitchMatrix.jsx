import { ToggleSwitch } from '../common/ToggleSwitch';
import { useCpd10 } from '../../context/Cpd10Context';

export function VideoSwitchMatrix() {
  const { matrixOutputs, setMatrixOutput, setDuplicateMode } = useCpd10();

  const outputs = [
    { id: 'outA', label: 'HDMI out A' },
    { id: 'outB', label: 'HDMI out B' },
    { id: 'outC', label: 'HDMI out C' },
  ];

  const inputs = [
    { id: 'hdmi1', label: 'HDMI in 1' },
    { id: 'hdmi2', label: 'HDMI in 2' },
    { id: 'hdmi3', label: 'HDMI in 3' },
  ];

  return (
    <div className="cpd10-panel cpd10-video-switch-panel">
      <div className="cpd10-panel-header">
        <span className="cpd10-panel-title">Video Switch</span>
        <div className="cpd10-duplicate-mode-toggle">
          <span className="cpd10-toggle-label">Duplicate Mode</span>
          <ToggleSwitch
            checked={false}
            onChange={(checked) => setDuplicateMode(checked)}
          />
        </div>
      </div>

      <div className="cpd10-matrix-grid">
        {outputs.map((out) => (
          <div key={out.id} className="cpd10-matrix-row">
            <span className="cpd10-matrix-out-label">{out.label}</span>
            <div className="cpd10-matrix-inputs">
              {inputs.map((inp) => {
                const isSelected = matrixOutputs[out.id] === inp.id;
                return (
                  <button
                    key={inp.id}
                    type="button"
                    className={`cpd10-matrix-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setMatrixOutput(out.id, inp.id)}
                  >
                    {/* Small HDMI pill icon */}
                    <div className="cpd10-matrix-hdmi-icon">
                      <span className="cpd10-matrix-hdmi-shape" />
                    </div>
                    <span className="cpd10-matrix-btn-text">{inp.label}</span>
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
