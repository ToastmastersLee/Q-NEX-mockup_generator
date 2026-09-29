import React from 'react';
import { Play, Plus, Phone } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function InteractiveHomeCards() {
  const {
    setInteractiveSessionType,
    setInteractiveSubPage,
    setShowSipCallModal,
    interactiveTime,
    interactiveDate,
    interactiveDay
  } = useLcs();

  return (
    <div className="lcs-interactive-home">
      {/* Top Action Buttons row */}
      <div className="lcs-interactive-action-row">
        <button 
          type="button" 
          className="lcs-interactive-action-btn"
          onClick={() => {
            setInteractiveSessionType('standard');
            setInteractiveSubPage('start');
          }}
        >
          <div className="lcs-interactive-icon-box">
            <Play size={16} fill="currentColor" />
          </div>
          <span className="lcs-interactive-btn-text">Start</span>
        </button>

        <button 
          type="button" 
          className="lcs-interactive-action-btn"
          onClick={() => setInteractiveSubPage('join')}
        >
          <div className="lcs-interactive-icon-box">
            <Plus size={16} />
          </div>
          <span className="lcs-interactive-btn-text">Join Class</span>
        </button>

        <button 
          type="button" 
          className="lcs-interactive-action-btn"
          onClick={() => setShowSipCallModal(true)}
        >
          <div className="lcs-interactive-icon-box">
            <Phone size={14} fill="currentColor" />
          </div>
          <span className="lcs-interactive-btn-text">Call</span>
        </button>

        <button 
          type="button" 
          className="lcs-interactive-action-btn"
          onClick={() => {
            setInteractiveSessionType('discussion');
            setInteractiveSubPage('start');
          }}
        >
          <div className="lcs-interactive-icon-box">
            <Play size={16} fill="currentColor" />
          </div>
          <span className="lcs-interactive-btn-text">Discussion Mode</span>
        </button>
      </div>

      {/* Left and Right Split Panels */}
      <div className="lcs-interactive-panels">
        {/* Left: Clock Card */}
        <div className="lcs-interactive-card left-card">
          <div className="lcs-interactive-clock">{interactiveTime}</div>
          <div className="lcs-interactive-date">{interactiveDate}</div>
          <div className="lcs-interactive-day">{interactiveDay}</div>
        </div>

        {/* Right: Illustration Card */}
        <div className="lcs-interactive-card right-card">
          <div className="lcs-interactive-classroom-container">
            <svg viewBox="0 0 320 180" className="w-full h-full">
              <rect width="320" height="180" fill="#2d3748" opacity="0.3" />
              <rect x="60" y="20" width="200" height="100" fill="#1b4d3e" rx="4" stroke="#4a5568" strokeWidth="3" />
              <circle cx="35" cy="40" r="12" fill="#edf2f7" stroke="#4a5568" strokeWidth="1.5" />
              <circle cx="35" cy="40" r="10" fill="none" stroke="#2d3748" strokeWidth="0.5" />
              <line x1="35" y1="40" x2="35" y2="33" stroke="#2d3748" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="35" y1="40" x2="41" y2="40" stroke="#2d3748" strokeWidth="1" strokeLinecap="round" />
              
              <g transform="translate(160, 110)">
                <path d="M-12,30 C-12,5 -6,2 0,2 C6,2 12,5 12,30 Z" fill="#319795" />
                <rect x="-3" y="-5" width="6" height="8" fill="#fbd38d" />
                <circle cx="0" cy="-12" r="10" fill="#fbd38d" />
                <path d="M-11,-15 C-11,-25 11,-25 11,-15 C11,-8 8,-8 8,-12 C8,-15 -8,-15 -8,-12 C-8,-8 -11,-8 -11,-15 Z" fill="#dd6b20" />
                <path d="M-10,-5 C-13,-5 -12,-15 -9,-15 C-9,-15 9,-15 9,-15 C12,-15 13,-5 10,-5 Z" fill="#dd6b20" />
                <rect x="-6" y="-14" width="5" height="4" fill="none" stroke="#e53e3e" strokeWidth="1" rx="1" />
                <rect x="1" y="-14" width="5" height="4" fill="none" stroke="#e53e3e" strokeWidth="1" rx="1" />
                <line x1="-1" y1="-12" x2="1" y2="-12" stroke="#e53e3e" strokeWidth="1" />
                <path d="M-3,-7 Q0,-5 3,-7" fill="none" stroke="#2d3748" strokeWidth="1" strokeLinecap="round" />
                <circle cx="-3.5" cy="-12" r="1" fill="#2d3748" />
                <circle cx="3.5" cy="-12" r="1" fill="#2d3748" />
              </g>

              <path d="M135,120 L185,120 L180,165 L140,165 Z" fill="#cbd5e0" stroke="#718096" strokeWidth="1.5" />
              <rect x="133" y="115" width="54" height="6" fill="#e2e8f0" rx="1" stroke="#718096" strokeWidth="1" />
              <line x1="10" y1="165" x2="310" y2="165" stroke="#cbd5e0" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
