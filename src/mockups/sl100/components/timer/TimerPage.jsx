import { useState, useEffect, useRef } from 'react';
import { TimerSetupView } from './TimerSetupView';
import { TimerLiveView } from './TimerLiveView';

export function TimerPage() {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [mode, setMode] = useState('timer'); // 'timer' | 'stopwatch'
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5); // Default to 5 mins
  const [seconds, setSeconds] = useState(0);
  const [activePreset, setActivePreset] = useState(5);

  const [targetSeconds, setTargetSeconds] = useState(300);
  const [remainingSeconds, setRemainingSeconds] = useState(300);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);

  // Live countdown & elapsed clock ticker
  useEffect(() => {
    if (!isLiveMode || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isLiveMode, isPaused]);

  // Setup adjustments
  const handleAdjust = (unit, delta) => {
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
    setMode('timer');
    setActivePreset(mins);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(0);
  };

  const handleClean = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setActivePreset(null);
  };

  const handleModeSwitch = (newMode) => {
    if (mode === newMode) return;
    setMode(newMode);
    setActivePreset(null);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handleStart = () => {
    const total = hours * 3600 + minutes * 60 + seconds;
    const dur = total > 0 ? total : 300;
    setTargetSeconds(dur);
    setRemainingSeconds(dur);
    setElapsedSeconds(0);
    setIsPaused(false);
    setIsLiveMode(true);
  };

  const handleAddMinutes = (mins) => {
    const addSecs = mins * 60;
    setRemainingSeconds((prev) => prev + addSecs);
    setTargetSeconds((prev) => prev + addSecs);
  };

  const handleStopConfirm = () => {
    setIsLiveMode(false);
    setIsPaused(false);
  };

  const handleResetConfirm = () => {
    setRemainingSeconds(targetSeconds);
    setElapsedSeconds(0);
  };

  return (
    <div className={`sl100-page-content sl100-timer-screen-wrap ${isLiveMode ? 'is-live' : ''}`}>
      {isLiveMode ? (
        <TimerLiveView
          remainingSeconds={remainingSeconds}
          targetSeconds={targetSeconds}
          elapsedSeconds={elapsedSeconds}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(!isPaused)}
          onAddMinutes={handleAddMinutes}
          onStopConfirm={handleStopConfirm}
          onResetConfirm={handleResetConfirm}
        />
      ) : (
        <TimerSetupView
          mode={mode}
          onModeSwitch={handleModeSwitch}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          onAdjust={handleAdjust}
          activePreset={activePreset}
          onPresetClick={handlePresetClick}
          onStart={handleStart}
          onClean={handleClean}
        />
      )}
    </div>
  );
}
