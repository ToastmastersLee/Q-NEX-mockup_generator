import React from 'react';
import { useLcs } from '../../context/LcsContext';

export function InteractiveSipModal() {
  const {
    showSipCallModal,
    setShowSipCallModal,
    sipUserName,
    setSipUserName,
    showToast
  } = useLcs();

  if (!showSipCallModal) return null;

  return (
    <div className="lcs-interactive-modal-backdrop">
      <div className="lcs-interactive-modal-box">
        <div className="lcs-interactive-modal-header">
          <span className="lcs-modal-title">SIP Call</span>
          <button 
            type="button" 
            className="lcs-modal-close-x"
            onClick={() => setShowSipCallModal(false)}
          >
            ✕
          </button>
        </div>

        <div className="lcs-interactive-modal-body">
          <div className="lcs-interactive-modal-field">
            <label>UserName:</label>
            <input 
              type="text" 
              className="lcs-interactive-input"
              value={sipUserName}
              onChange={(e) => setSipUserName(e.target.value)}
              placeholder="Enter Username"
              autoFocus
            />
          </div>

          <button 
            type="button" 
            className="lcs-interactive-submit-btn"
            onClick={() => {
              if (!sipUserName) {
                showToast("Please enter a username");
              } else {
                showToast(`Calling ${sipUserName}...`);
                setShowSipCallModal(false);
              }
            }}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}
