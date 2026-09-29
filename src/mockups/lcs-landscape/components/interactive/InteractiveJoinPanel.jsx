import React from 'react';
import { useLcs } from '../../context/LcsContext';

export function InteractiveJoinPanel() {
  const {
    interactiveSubPage,
    setInteractiveSubPage,
    joinClassId,
    setJoinClassId,
    joinClassPassword,
    setJoinClassPassword,
    showToast
  } = useLcs();

  if (interactiveSubPage !== 'join') return null;

  return (
    <div className="lcs-interactive-subpage-layout">
      <div className="lcs-interactive-subpage-left">
        <div className="lcs-interactive-subpage-title">Join Class</div>
        
        <div className="lcs-interactive-form">
          <div className="lcs-interactive-form-field">
            <label>ID:</label>
            <input 
              type="text" 
              className="lcs-interactive-input"
              value={joinClassId}
              onChange={(e) => setJoinClassId(e.target.value)}
              placeholder="Enter Class ID"
            />
          </div>

          <div className="lcs-interactive-form-field">
            <label>Password:</label>
            <input 
              type="password" 
              className="lcs-interactive-input"
              value={joinClassPassword}
              onChange={(e) => setJoinClassPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <button 
            type="button" 
            className="lcs-interactive-submit-btn"
            onClick={() => {
              if (!joinClassId) {
                showToast("Please enter a Class ID");
              } else {
                showToast(`Joining Class ${joinClassId}...`);
              }
            }}
          >
            Join Class
          </button>
        </div>

        <button 
          type="button" 
          className="lcs-interactive-back-btn"
          onClick={() => setInteractiveSubPage('home')}
        >
          Back
        </button>
      </div>

      <div className="lcs-interactive-subpage-right">
        <div className="lcs-interactive-subpage-right-title">Schedule</div>
        
        <div className="lcs-interactive-schedule-panel">
          <div className="flex-1" />
          <div className="lcs-interactive-schedule-dots">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={`lcs-schedule-dot ${i === 0 ? 'is-active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
