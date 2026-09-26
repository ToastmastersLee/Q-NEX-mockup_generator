import React from 'react';

/**
 * WheelPickerDrawer
 * Recreates the bottom time/option picker drawer seen on CPD10 hardware (e.g. Screen Sleep).
 * Features a half-height bottom overlay with a full-width blue highlight on the active choice.
 */
export function WheelPickerDrawer({
  isOpen,
  options = ['Never', '1 min', '2 min', '5 min', '10 min', '30 min'],
  value,
  onSelect,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="cpd10-wheel-picker-overlay" onClick={onClose}>
      <div
        className="cpd10-wheel-picker-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cpd10-wheel-picker-list">
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                className={`cpd10-wheel-picker-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => {
                  onSelect(opt);
                  onClose();
                }}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
