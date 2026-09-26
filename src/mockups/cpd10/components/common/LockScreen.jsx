import React, { useState } from 'react';
import { Delete, X } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

/**
 * LockScreen
 * Recreates the CPD10 physical Lock Screen seen in real device photo (media_1790431162130.jpg).
 * Features:
 * - Full-screen deep obsidian blue backdrop
 * - Concentric glowing blue rings & radial gradient center button
 * - Precision vector neon-cyan open lock icon with keyhole slit
 * - Instant unlock or 4-digit PIN verification when Password Unlock is enabled
 */
export function LockScreen() {
  const { isLocked, setIsLocked, passwordUnlockEnabled, panelPassword } = useCpd10();
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
        if (next === panelPassword) {
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
    <div className="cpd10-lock-screen">
      {/* Center Unlock Button with Concentric Glow (Photo: media_1790431162130.jpg) */}
      <div className="cpd10-lock-center-wrapper" onClick={handleCircleClick}>
        <div className="cpd10-lock-halo" />
        <button type="button" className="cpd10-lock-circle-btn" title="点击解锁屏幕">
          {/* Custom exact SVG icon matching photo: Open shackle + rectangular body + vertical keyhole slit */}
          <svg
            className="cpd10-lock-svg"
            width="42"
            height="42"
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

      {/* Optional PIN Keypad Modal if passwordUnlockEnabled is active */}
      {showPinModal && (
        <div className="cpd10-pin-unlock-overlay" onClick={() => setShowPinModal(false)}>
          <div className="cpd10-pin-unlock-card" onClick={(e) => e.stopPropagation()}>
            <div className="cpd10-pin-unlock-header">
              <span>Enter 4-Digit Password</span>
              <button
                type="button"
                className="cpd10-pin-close-btn"
                onClick={() => setShowPinModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* 4 Dots indicator */}
            <div className={`cpd10-pin-dots ${pinError ? 'is-error' : ''}`}>
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`cpd10-pin-dot ${idx < enteredPin.length ? 'filled' : ''}`}
                />
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="cpd10-pin-keypad">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  className="cpd10-pin-num-key"
                  onClick={() => handleDigit(String(num))}
                >
                  {num}
                </button>
              ))}
              <div />
              <button
                type="button"
                className="cpd10-pin-num-key"
                onClick={() => handleDigit('0')}
              >
                0
              </button>
              <button
                type="button"
                className="cpd10-pin-num-key cpd10-pin-del-key"
                onClick={handleDelete}
              >
                <Delete size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
