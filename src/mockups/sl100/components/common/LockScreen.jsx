import { useState } from 'react';
import { Delete, X } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

export function LockScreen() {
  const { isLocked, setIsLocked, passwordUnlockEnabled, password } = useSl100();
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!isLocked) return null;

  const handleCircleClick = () => {
    if (passwordUnlockEnabled) {
      setShowPinModal(true);
      setEnteredPin('');
      setPinError(false);
    } else {
      setIsLocked(false);
    }
  };

  const handleDigit = (digit) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      setPinError(false);
      if (next.length === 4) {
        if (next === password) {
          setIsLocked(false);
          setShowPinModal(false);
        } else {
          setPinError(true);
          setTimeout(() => {
            setEnteredPin('');
            setPinError(false);
          }, 600);
        }
      }
    }
  };

  const handleDelete = () => {
    setEnteredPin((prev) => prev.slice(0, -1));
    setPinError(false);
  };

  return (
    <div className="sl100-lock-screen">
      <div className="sl100-lock-center-wrapper" onClick={handleCircleClick}>
        <div className="sl100-lock-halo" />
        <button type="button" className="sl100-lock-circle-btn" title="点击解锁屏幕">
          <svg
            className="sl100-lock-svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#00e5ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <line x1="12" y1="15" x2="12" y2="18" />
          </svg>
        </button>
      </div>

      {showPinModal && (
        <div className="sl100-pin-unlock-overlay" onClick={() => setShowPinModal(false)}>
          <div className="sl100-pin-unlock-card" onClick={(e) => e.stopPropagation()}>
            <div className="sl100-pin-unlock-header">
              <span>Enter 4-Digit Password</span>
              <button
                type="button"
                className="sl100-pin-close-btn"
                onClick={() => setShowPinModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className={`sl100-pin-dots ${pinError ? 'is-error' : ''}`}>
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`sl100-pin-dot ${idx < enteredPin.length ? 'filled' : ''}`}
                />
              ))}
            </div>

            <div className="sl100-pin-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  className="sl100-pin-num-key"
                  onClick={() => handleDigit(String(num))}
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                className="sl100-pin-num-key"
                onClick={() => handleDigit('0')}
              >
                0
              </button>
              <button
                type="button"
                className="sl100-pin-num-key sl100-pin-del-key"
                onClick={handleDelete}
              >
                <Delete size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
