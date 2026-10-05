import { useState } from 'react';
import { Square, Pause, Play, RotateCcw } from 'lucide-react';

export function TimerLiveView({
  remainingSeconds,
  targetSeconds,
  elapsedSeconds,
  isPaused,
  onTogglePause,
  onAddMinutes,
  onStopConfirm,
  onResetConfirm,
}) {
  const [isStopModalOpen, setIsStopModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const formatTime = (totalSecs) => {
    const s = Math.max(0, totalSecs);
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const handleConfirmStop = () => {
    setIsStopModalOpen(false);
    onStopConfirm();
  };

  const handleConfirmReset = () => {
    setIsResetModalOpen(false);
    onResetConfirm();
  };

  return (
    <div className="sl100-timer-live-wrap">
      {/* Top Left: LIVE indicator */}
      <div className="sl100-timer-live-badge">
        <span className="sl100-timer-live-dot" />
        <span className="sl100-timer-live-text">LIVE</span>
      </div>

      {/* Center: Digits Display & Quick Add Pills */}
      <div className="sl100-timer-live-center-area">
        <div className="sl100-timer-live-digits-row">
          <span className="sl100-timer-live-digits">
            {formatTime(remainingSeconds)}
          </span>
          <span className="sl100-timer-live-target">
            /{formatTime(targetSeconds)}
          </span>
        </div>

        <div className="sl100-timer-live-quick-add-row">
          <button
            type="button"
            className="sl100-timer-live-add-pill"
            onClick={() => onAddMinutes(1)}
          >
            +1 min
          </button>
          <button
            type="button"
            className="sl100-timer-live-add-pill"
            onClick={() => onAddMinutes(5)}
          >
            +5 min
          </button>
          <button
            type="button"
            className="sl100-timer-live-add-pill"
            onClick={() => onAddMinutes(10)}
          >
            +10 min
          </button>
        </div>
      </div>

      {/* Far Right: Stacked Circle Action Buttons */}
      <div className="sl100-timer-live-actions-col">
        {/* 1. Stop button (Red circle with white square) */}
        <button
          type="button"
          className="sl100-timer-live-circle-btn is-stop"
          onClick={() => setIsStopModalOpen(true)}
          title="End Presentation"
        >
          <Square size={16} fill="#ffffff" strokeWidth={0} />
        </button>

        {/* 2. Pause / Play button (Blue circle) */}
        <button
          type="button"
          className="sl100-timer-live-circle-btn is-pause"
          onClick={onTogglePause}
          title={isPaused ? 'Resume timer' : 'Pause timer'}
        >
          {isPaused ? (
            <Play size={18} fill="#ffffff" strokeWidth={0} />
          ) : (
            <Pause size={18} fill="#ffffff" strokeWidth={0} />
          )}
        </button>

        {/* 3. Reset button (Dark gray circle) */}
        <button
          type="button"
          className="sl100-timer-live-circle-btn is-reset"
          onClick={() => setIsResetModalOpen(true)}
          title="Reset timer"
        >
          <RotateCcw size={16} strokeWidth={2.4} />
        </button>
      </div>

      {/* Modal 1: End Presentation Confirmation (sl100_timer_stop_modal.jpg) */}
      {isStopModalOpen && (
        <div
          className="sl100-timer-modal-overlay"
          onClick={() => setIsStopModalOpen(false)}
        >
          <div
            className="sl100-timer-dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="sl100-timer-dialog-msg">
              Your presentation lasted {formatTime(elapsedSeconds)}
              <br />
              End this timer?
            </p>
            <div className="sl100-timer-dialog-actions">
              <button
                type="button"
                className="sl100-btn-timer-modal-cancel"
                onClick={() => setIsStopModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sl100-btn-timer-modal-confirm"
                onClick={handleConfirmStop}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Reset Timer Confirmation (sl100_timer_reset_modal.jpg) */}
      {isResetModalOpen && (
        <div
          className="sl100-timer-modal-overlay"
          onClick={() => setIsResetModalOpen(false)}
        >
          <div
            className="sl100-timer-dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="sl100-timer-dialog-msg">
              Reset the current timer?
            </p>
            <div className="sl100-timer-dialog-actions">
              <button
                type="button"
                className="sl100-btn-timer-modal-cancel"
                onClick={() => setIsResetModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="sl100-btn-timer-modal-confirm"
                onClick={handleConfirmReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
