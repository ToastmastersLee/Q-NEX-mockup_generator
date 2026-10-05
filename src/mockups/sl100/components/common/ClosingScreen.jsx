import { Power } from 'lucide-react';

export function ClosingScreen({ state, onPowerOn }) {
  if (state === 'on') return null;

  return (
    <div className={`sl100-closing-overlay ${state === 'off' ? 'is-off' : 'is-closing'}`}>
      {state === 'closing' ? (
        <div className="sl100-closing-center">
          <div className="sl100-closing-spinner" />
          <span className="sl100-closing-text">Closing...</span>
        </div>
      ) : (
        <div className="sl100-off-center">
          <button
            type="button"
            className="sl100-power-on-btn"
            onClick={onPowerOn}
            title="点击开机"
          >
            <Power size={32} strokeWidth={2.5} />
            <span>Power On</span>
          </button>
        </div>
      )}
    </div>
  );
}
