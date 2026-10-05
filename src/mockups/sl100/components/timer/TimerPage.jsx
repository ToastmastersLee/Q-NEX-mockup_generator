import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function TimerPage() {
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString());
  const [totalSeconds, setTotalSeconds] = useState(1800); // 30 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(1800);
  const [isRunning, setIsRunning] = useState(false);

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer tick
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const setPreset = (mins) => {
    setIsRunning(false);
    setTotalSeconds(mins * 60);
    setRemainingSeconds(mins * 60);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPct = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  return (
    <div className="sl100-timer-container">
      {/* 1. Real-time Clock Card */}
      <div className="sl100-panel sl100-timer-clock-card">
        <span className="sl100-panel-title">Lectern Clock</span>
        <div className="sl100-clock-digits">{currentTime}</div>
        <div className="sl100-clock-sub">Local System Time</div>
      </div>

      {/* 2. Lecture Countdown Timer Card */}
      <div className="sl100-panel sl100-timer-countdown-card">
        <div className="sl100-countdown-header">
          <span className="sl100-panel-title">Presentation Timer</span>
          <div className="sl100-timer-presets">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                className={`sl100-preset-btn ${totalSeconds === mins * 60 ? 'is-active' : ''}`}
                onClick={() => setPreset(mins)}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>

        <div className="sl100-countdown-body">
          <div className="sl100-countdown-digits">
            {formatCountdown(remainingSeconds)}
          </div>

          <div className="sl100-countdown-controls">
            <button
              type="button"
              className={`sl100-timer-btn primary ${isRunning ? 'is-running' : ''}`}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} />}
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </button>
            <button
              type="button"
              className="sl100-timer-btn secondary"
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="sl100-timer-progress-track">
          <div
            className="sl100-timer-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
