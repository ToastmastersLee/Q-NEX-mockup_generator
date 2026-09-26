import React, { useState } from 'react';

/**
 * SetPasswordModal
 * Recreates the password setup screen on CPD10 (media_1790411766852.png).
 * Left area contains "Enter password" and "Confirm Password" inputs.
 * Right column contains "Cancel" and "Confirm" pill buttons.
 */
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
    <div className="cpd10-password-modal-overlay">
      <div className="cpd10-password-modal-content">
        {/* Left Inputs Section */}
        <div className="cpd10-password-inputs-col">
          <div className="cpd10-password-input-row">
            <span className="cpd10-password-label">Enter password</span>
            <input
              type="password"
              maxLength={4}
              value={pwd1}
              onChange={(e) => {
                setPwd1(e.target.value.replace(/\D/g, ''));
                setErrorMsg('');
              }}
              placeholder="Please enter a 4-digit password."
              className="cpd10-password-field"
              autoFocus
            />
          </div>

          <div className="cpd10-password-input-row">
            <span className="cpd10-password-label">Confirm Password</span>
            <input
              type="password"
              maxLength={4}
              value={pwd2}
              onChange={(e) => {
                setPwd2(e.target.value.replace(/\D/g, ''));
                setErrorMsg('');
              }}
              placeholder="Confirm Password"
              className="cpd10-password-field"
            />
          </div>

          {errorMsg && (
            <div className="cpd10-password-error-tip">{errorMsg}</div>
          )}
        </div>

        {/* Right Action Column */}
        <div className="cpd10-password-action-col">
          <button
            type="button"
            className="cpd10-password-btn cpd10-password-btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="cpd10-password-btn cpd10-password-btn-confirm"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
