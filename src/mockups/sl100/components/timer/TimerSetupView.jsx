const PRESETS = [1, 5, 10, 15, 30, 45, 60, 90];

export function TimerSetupView({
  mode,
  onModeSwitch,
  hours,
  minutes,
  seconds,
  onAdjust,
  activePreset,
  onPresetClick,
  onStart,
  onClean,
}) {
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="sl100-timer-setup-wrap">
      {/* Left: Digits Display & Adjusters */}
      <div className="sl100-timer-display-area">
        {/* Plus Row */}
        <div className="sl100-timer-adjust-row">
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('hh', 1)}
            disabled={mode === 'stopwatch'}
            title="Add Hour"
          >
            +
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('mm', 1)}
            disabled={mode === 'stopwatch'}
            title="Add Minute"
          >
            +
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('ss', 1)}
            disabled={mode === 'stopwatch'}
            title="Add Second"
          >
            +
          </button>
        </div>

        {/* Digits Display */}
        <div className="sl100-timer-digits-row">
          <span className="sl100-timer-digit-unit">{pad(hours)}</span>
          <span className="sl100-timer-digit-colon">:</span>
          <span className="sl100-timer-digit-unit">{pad(minutes)}</span>
          <span className="sl100-timer-digit-colon">:</span>
          <span className="sl100-timer-digit-unit">{pad(seconds)}</span>
        </div>

        {/* Minus Row */}
        <div className="sl100-timer-adjust-row">
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('hh', -1)}
            disabled={mode === 'stopwatch'}
            title="Minus Hour"
          >
            -
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('mm', -1)}
            disabled={mode === 'stopwatch'}
            title="Minus Minute"
          >
            -
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => onAdjust('ss', -1)}
            disabled={mode === 'stopwatch'}
            title="Minus Second"
          >
            -
          </button>
        </div>
      </div>

      {/* Right: Mode Switcher, Presets & Action Buttons */}
      <div className="sl100-timer-panel-card">
        {/* Mode Switcher */}
        <div className="sl100-timer-mode-switcher">
          <button
            type="button"
            className={`sl100-timer-mode-tab ${mode === 'timer' ? 'is-active' : ''}`}
            onClick={() => onModeSwitch('timer')}
          >
            Timer
          </button>
          <button
            type="button"
            className={`sl100-timer-mode-tab ${mode === 'stopwatch' ? 'is-active' : ''}`}
            onClick={() => onModeSwitch('stopwatch')}
          >
            Stopwatch
          </button>
        </div>

        {/* Presets Grid */}
        <div className="sl100-timer-presets-grid">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`sl100-timer-preset-capsule ${activePreset === preset ? 'is-active' : ''}`}
              onClick={() => onPresetClick(preset)}
            >
              {preset} min
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="sl100-timer-actions-row">
          <button
            type="button"
            className="sl100-timer-action-start"
            onClick={onStart}
          >
            Start
          </button>
          <button
            type="button"
            className="sl100-timer-action-clean"
            onClick={onClean}
          >
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}
