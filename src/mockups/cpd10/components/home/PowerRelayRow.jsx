import { ArrowUp, Pause, ArrowDown } from 'lucide-react';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { SerialCableIcon } from '../common/SerialCableIcon';
import { useCpd10 } from '../../context/Cpd10Context';

export function PowerRelayRow() {
  const {
    displayPower,
    setDisplayPower,
    externalPower,
    setExternalPower,
    projectorScreenState,
    setProjectorScreenState,
    setScreen,
  } = useCpd10();

  return (
    <div className="cpd10-home-bottom-row">
      {/* 1. Display Power & External Power */}
      <div className="cpd10-panel cpd10-dual-power-panel">
        <div className="cpd10-dual-power-labels">
          <span className="cpd10-bottom-card-title">Display Power</span>
          <span className="cpd10-bottom-card-title">External Power</span>
        </div>
        <div className="cpd10-dual-power-controls">
          <div className="cpd10-power-switch-item">
            <ToggleSwitch
              checked={displayPower}
              onChange={(val) => setDisplayPower(val)}
            />
          </div>
          <div className="cpd10-divider-vertical" />
          <div className="cpd10-power-switch-item">
            <ToggleSwitch
              checked={externalPower}
              onChange={(val) => setExternalPower(val)}
            />
          </div>
        </div>
      </div>

      {/* 2. Projector Screen */}
      <div className="cpd10-panel cpd10-projector-panel">
        <span className="cpd10-bottom-card-title cpd10-projector-title">Projector Screen</span>
        <div className="cpd10-projector-actions">
          <button
            type="button"
            className={`cpd10-projector-action-btn ${projectorScreenState === 'up' ? 'is-active' : ''}`}
            onClick={() => setProjectorScreenState('up')}
            title="Projector Screen Up"
          >
            <ArrowUp size={28} strokeWidth={2.6} />
          </button>
          <button
            type="button"
            className={`cpd10-projector-action-btn ${projectorScreenState === 'pause' ? 'is-active' : ''}`}
            onClick={() => setProjectorScreenState('pause')}
            title="Projector Screen Pause"
          >
            <Pause size={26} strokeWidth={2.8} />
          </button>
          <button
            type="button"
            className={`cpd10-projector-action-btn ${projectorScreenState === 'down' ? 'is-active' : ''}`}
            onClick={() => setProjectorScreenState('down')}
            title="Projector Screen Down"
          >
            <ArrowDown size={28} strokeWidth={2.6} />
          </button>
        </div>
      </div>

      {/* 3. Serial Port Card (Navigates to Serial Control Page) */}
      <button
        type="button"
        className="cpd10-panel cpd10-serial-entry-card"
        onClick={() => setScreen('serial-qa1400')}
        title="Open Serial Port Control"
      >
        <div className="cpd10-serial-entry-graphic">
          <SerialCableIcon />
        </div>
        <span className="cpd10-serial-entry-label">Serial Port</span>
        <div className="cpd10-corner-triangle" />
      </button>
    </div>
  );
}
