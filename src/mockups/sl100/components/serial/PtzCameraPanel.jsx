import { RotateCcw, Plus, Minus, Triangle } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

export function PtzCameraPanel() {
  const { ptzState, updatePtzField } = useSl100();

  const handlePanTilt = (direction) => {
    updatePtzField('lastAction', `Pan/Tilt: ${direction}`);
  };

  const handleZoom = (delta) => {
    const next = Math.max(0, Math.min(100, ptzState.zoom + delta));
    updatePtzField('zoom', next);
    updatePtzField('lastAction', `Zoom: ${next}%`);
  };

  return (
    <div className="sl100-ptz-container">
      {/* Left Column: Power & Focus */}
      <div className="sl100-ptz-left-col">
        {/* PTZ Camera Power */}
        <div className="sl100-panel sl100-ptz-card">
          <span className="sl100-panel-title">PTZ Camera</span>
          <div className="sl100-round-btn-group">
            <button
              type="button"
              className={`sl100-round-btn ${ptzState.power ? 'is-active' : ''}`}
              onClick={() => updatePtzField('power', true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`sl100-round-btn ${!ptzState.power ? 'is-active' : ''}`}
              onClick={() => updatePtzField('power', false)}
            >
              OFF
            </button>
          </div>
        </div>

        {/* Focus AF */}
        <div className="sl100-panel sl100-ptz-card">
          <span className="sl100-panel-title">Focus</span>
          <div className="sl100-round-btn-group single">
            <button
              type="button"
              className={`sl100-af-btn ${ptzState.focusAf ? 'is-active' : ''}`}
              onClick={() => updatePtzField('focusAf', !ptzState.focusAf)}
            >
              AF
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Direction D-Pad and Zoom Controls */}
      <div className="sl100-panel sl100-ptz-control-panel">
        <span className="sl100-panel-title">PTZ Control</span>

        <div className="sl100-ptz-controls-body">
          {/* Circular 5-way D-Pad */}
          <div className="sl100-dpad-circle">
            {/* Up Button */}
            <button
              type="button"
              className="sl100-dpad-arrow up"
              onClick={() => handlePanTilt('Up')}
              title="Tilt Up"
            >
              <Triangle size={14} fill="currentColor" />
            </button>

            {/* Left Button */}
            <button
              type="button"
              className="sl100-dpad-arrow left"
              onClick={() => handlePanTilt('Left')}
              title="Pan Left"
            >
              <Triangle size={14} fill="currentColor" style={{ transform: 'rotate(-90deg)' }} />
            </button>

            {/* Center Reset Button */}
            <button
              type="button"
              className="sl100-dpad-center"
              onClick={() => handlePanTilt('Home/Reset')}
              title="Home Position"
            >
              <RotateCcw size={16} strokeWidth={2.4} />
            </button>

            {/* Right Button */}
            <button
              type="button"
              className="sl100-dpad-arrow right"
              onClick={() => handlePanTilt('Right')}
              title="Pan Right"
            >
              <Triangle size={14} fill="currentColor" style={{ transform: 'rotate(90deg)' }} />
            </button>

            {/* Down Button */}
            <button
              type="button"
              className="sl100-dpad-arrow down"
              onClick={() => handlePanTilt('Down')}
              title="Tilt Down"
            >
              <Triangle size={14} fill="currentColor" style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>

          {/* Vertical Zoom Pill Track */}
          <div className="sl100-zoom-pill">
            <button
              type="button"
              className="sl100-zoom-btn plus"
              onClick={() => handleZoom(10)}
              title="Zoom In"
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
            <div className="sl100-zoom-divider" />
            <button
              type="button"
              className="sl100-zoom-btn minus"
              onClick={() => handleZoom(-10)}
              title="Zoom Out"
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
