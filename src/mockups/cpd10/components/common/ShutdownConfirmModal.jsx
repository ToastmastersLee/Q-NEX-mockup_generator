import React, { useState, useEffect } from 'react';

/**
 * ShutdownConfirmModal
 * Recreates the shutdown confirmation dialog (media_1790431177703.jpg).
 * Features:
 * - "Are you sure you want to shut down?"
 * - Red countdown timer ("9s")
 * - Pill buttons: [Cancel] & [Shut Down]
 * - Auto-triggers shutdown when countdown expires
 */
export function ShutdownConfirmModal({ isOpen, onConfirm, onCancel }) {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsLeft(10);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onConfirm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="cpd10-shutdown-overlay" onClick={onCancel}>
      <div className="cpd10-shutdown-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="cpd10-shutdown-title">
          Are you sure you want to shut down?
        </h3>
        <div className="cpd10-shutdown-countdown">
          {secondsLeft}s
        </div>
        <div className="cpd10-shutdown-btns">
          <button
            type="button"
            className="cpd10-shutdown-pill-btn cpd10-shutdown-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="cpd10-shutdown-pill-btn cpd10-shutdown-btn-confirm"
            onClick={onConfirm}
          >
            Shut Down
          </button>
        </div>
      </div>
    </div>
  );
}
