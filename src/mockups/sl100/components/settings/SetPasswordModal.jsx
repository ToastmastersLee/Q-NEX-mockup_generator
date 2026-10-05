import { useState } from 'react';

export function SetPasswordModal({ isOpen, onConfirm, onCancel }) {
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (pwd1.length !== 4) {
      setErrorMsg('Please enter a 4-digit password.');
      return;
    }
    if (pwd1 !== pwd2) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setErrorMsg('');
    onConfirm(pwd1);
  };

  return (
    <div className="sl100-password-screen-overlay" onClick={onCancel}>
      <div className="sl100-password-screen-container" onClick={(e) => e.stopPropagation()}>
        {/* Left Form Area (Photo 5) */}
        <div className="sl100-password-form-area">
          {/* Row 1: Enter password */}
          <div className="sl100-pwd-input-row">
            <span className="sl100-pwd-label">Enter password:</span>
            <input
              type="password"
              maxLength={4}
              value={pwd1}
              onChange={(e) => {
                setPwd1(e.target.value.replace(/\D/g, ''));
                setErrorMsg('');
              }}
              placeholder="Please enter a 4-digit password."
              className="sl100-pwd-input-box"
              autoFocus
            />
          </div>

          {/* Row 2: Confirm Password */}
          <div className="sl100-pwd-input-row">
            <span className="sl100-pwd-label">Confirm Password:</span>
            <input
              type="password"
              maxLength={4}
              value={pwd2}
              onChange={(e) => {
                setPwd2(e.target.value.replace(/\D/g, ''));
                setErrorMsg('');
              }}
              placeholder="Confirm Password"
              className="sl100-pwd-input-box"
            />
          </div>

          {errorMsg && (
            <div className="sl100-pwd-error-text">{errorMsg}</div>
          )}
        </div>

        {/* Right Action Column Pane (Photo 5) */}
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
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
