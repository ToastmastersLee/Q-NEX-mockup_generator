import { useState, useEffect } from 'react';

/**
 * Shutdown Confirmation Dialog for SL100 (Matches sl100_shutdown_confirm_modal_real.jpg)
 */
export function ShutdownConfirmModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <ShutdownConfirmDialog
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

function ShutdownConfirmDialog({ onConfirm, onCancel }) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onConfirm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onConfirm]);

  return (
    <div className="sl100-modal-overlay" onClick={onCancel}>
      <div className="sl100-shutdown-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="sl100-shutdown-title">
          Are you sure you want to shut down?
        </div>
        <div className="sl100-shutdown-countdown">
          {countdown}s
        </div>
        <div className="sl100-shutdown-actions">
          <button
            type="button"
            className="sl100-btn-shutdown-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="sl100-btn-shutdown-confirm"
            onClick={onConfirm}
          >
            Shut Down
          </button>
        </div>
      </div>
    </div>
  );
}
