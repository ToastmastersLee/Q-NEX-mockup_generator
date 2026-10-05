import { useState } from 'react';
import { SERIAL_CODE_LIST_OPTIONS } from '../../constants/serialConfigs';

function CodeListModalContent({ value, onConfirm, onCancel }) {
  const [selectedCode, setSelectedCode] = useState(value || 'TR1310C Pro');

  return (
    <div className="sl100-password-screen-overlay" onClick={onCancel}>
      <div className="sl100-password-screen-container" onClick={(e) => e.stopPropagation()}>
        {/* Left Radio Options Grid (Photo 2) */}
        <div className="sl100-codelist-options-area">
          <div className="sl100-codelist-options-grid">
            {SERIAL_CODE_LIST_OPTIONS.map((opt) => {
              const isSelected = selectedCode === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  className={`sl100-lang-radio-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedCode(opt)}
                >
                  <span className={`sl100-lang-radio-circle ${isSelected ? 'is-selected' : ''}`}>
                    {isSelected && <span className="sl100-lang-radio-dot" />}
                  </span>
                  <span className="sl100-lang-radio-text">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Action Column Pane (Photo 2) */}
        <div className="sl100-password-actions-pane">
          <button
            type="button"
            className="sl100-pwd-action-pill cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="sl100-pwd-action-pill confirm"
            onClick={() => onConfirm(selectedCode)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * SL100 Interactive LCD Code List Selection Modal
 * Matches authentic hardware layout (Photo media_1791174202312.jpg)
 */
export function CodeListModal({ isOpen, value, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <CodeListModalContent
      value={value}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
