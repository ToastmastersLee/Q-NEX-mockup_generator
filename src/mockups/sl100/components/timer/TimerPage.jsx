import { useState, useEffect, useRef } from 'react';

const PRESETS = [1, 5, 10, 15, 30, 45, 60, 90];

export function TimerPage() {
  const [mode, setMode] = useState('timer'); // 'timer' | 'stopwatch'
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  const timerRef = useRef(null);

  // Countdown & Stopwatch ticks
  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      if (mode === 'timer') {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          // prevSec === 0
          setMinutes((prevMin) => {
            if (prevMin > 0) {
              return prevMin - 1;
            }
            setHours((prevHr) => {
              if (prevHr > 0) return prevHr - 1;
              // Timer finished!
              setIsRunning(false);
              return 0;
            });
            return 59;
          });
          return 59;
        });
      } else {
        // Stopwatch count up
        setSeconds((prevSec) => {
          if (prevSec < 59) return prevSec + 1;
          setMinutes((prevMin) => {
            if (prevMin < 59) return prevMin + 1;
            setHours((prevHr) => prevHr + 1);
            return 0;
          });
          return 0;
        });
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const handleAdjust = (unit, delta) => {
    if (isRunning) setIsRunning(false);
    setActivePreset(null);

    if (unit === 'hh') {
      setHours((h) => Math.max(0, Math.min(99, h + delta)));
    } else if (unit === 'mm') {
      setMinutes((m) => {
        const next = m + delta;
        if (next < 0) return 59;
        if (next > 59) return 0;
        return next;
      });
    } else if (unit === 'ss') {
      setSeconds((s) => {
        const next = s + delta;
        if (next < 0) return 59;
        if (next > 59) return 0;
        return next;
      });
    }
  };

  const handlePresetClick = (mins) => {
    setIsRunning(false);
    setMode('timer');
    setActivePreset(mins);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(0);
  };

  const handleClean = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setActivePreset(null);
  };

  const handleModeSwitch = (newMode) => {
    if (mode === newMode) return;
    setIsRunning(false);
    setMode(newMode);
    setActivePreset(null);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="sl100-page-content sl100-timer-screen-wrap">
      {/* Left: Digits Display & Adjusters */}
      <div className="sl100-timer-display-area">
        {/* Plus Row */}
        <div className="sl100-timer-adjust-row">
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => handleAdjust('hh', 1)}
            disabled={mode === 'stopwatch'}
            title="Add Hour"
          >
            +
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => handleAdjust('mm', 1)}
            disabled={mode === 'stopwatch'}
            title="Add Minute"
          >
            +
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => handleAdjust('ss', 1)}
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
            onClick={() => handleAdjust('hh', -1)}
            disabled={mode === 'stopwatch'}
            title="Minus Hour"
          >
            -
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => handleAdjust('mm', -1)}
            disabled={mode === 'stopwatch'}
            title="Minus Minute"
          >
            -
          </button>
          <div className="sl100-timer-adjust-spacer" />
          <button
            type="button"
            className="sl100-timer-adjust-btn"
            onClick={() => handleAdjust('ss', -1)}
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
            onClick={() => handleModeSwitch('timer')}
          >
            Timer
          </button>
          <button
            type="button"
            className={`sl100-timer-mode-tab ${mode === 'stopwatch' ? 'is-active' : ''}`}
            onClick={() => handleModeSwitch('stopwatch')}
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
              onClick={() => handlePresetClick(preset)}
            >
              {preset} min
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="sl100-timer-actions-row">
          <button
            type="button"
            className={`sl100-timer-action-start ${isRunning ? 'is-running' : ''}`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            className="sl100-timer-action-clean"
            onClick={handleClean}
          >
            Clean
          </button>
        </div>
      </div>
    </div>
  );
}
