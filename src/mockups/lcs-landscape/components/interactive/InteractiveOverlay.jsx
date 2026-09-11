import { User, RotateCw, Video, Play, Plus, Phone } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { DiscussionRoom } from './DiscussionRoom';
import { InteractiveRoom } from './InteractiveRoom';

export function InteractiveOverlay() {
  const {
    activeMenuSection,
    setActiveMenuSection,
    interactiveSubPage,
    setInteractiveSubPage,
    setInteractiveSessionType,
    showSipCallModal,
    setShowSipCallModal,
    sipUserName,
    setSipUserName,
    joinClassId,
    setJoinClassId,
    joinClassPassword,
    setJoinClassPassword,
    isInteractiveSessionActive,
    setIsInteractiveSessionActive,
    addressBook,
    setAddressBook,
    interactiveCallState,
    setInteractiveCallState,
    setSelectedRemoteHost,
    setIsDirectorMinimized,
    showToast,
    interactiveTime,
    interactiveDate,
    interactiveDay
  } = useLcs();

  if (activeMenuSection !== 'interactive') {
    return null;
  }

  return (
    <div className="lcs-full-interactive-overlay">
      {/* Header bar */}
      <div className="lcs-interactive-header">
        <div className="lcs-interactive-header-left">
          <div className="lcs-user-avatar">
            <User size={14} />
          </div>
          <span className="lcs-user-id">900011001</span>
        </div>
        
        <div className="lcs-interactive-header-right">
          <button 
            type="button" 
            className="lcs-interactive-header-icon" 
            onClick={() => showToast("Syncing data...")}
            title="Sync"
          >
            <RotateCw size={15} />
          </button>
          <button 
            type="button" 
            className="lcs-interactive-header-icon"
            onClick={() => showToast("Camera settings")}
            title="Camera"
          >
            <Video size={15} />
          </button>
          <button 
            type="button" 
            className="lcs-interactive-header-icon"
            onClick={() => showToast("Transmission settings")}
            title="Transmission"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '15px', height: '15px' }}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <polygon points="10 8 15 10 10 12 10 8" fill="currentColor" />
            </svg>
          </button>
          <button 
            type="button" 
            className="lcs-interactive-header-icon close-btn"
            onClick={() => {
              setActiveMenuSection(null);
              setShowSipCallModal(false);
            }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Sub-view Area */}
      {interactiveSubPage === 'home' && (
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
      )}

      {/* Start sub-page */}
      {interactiveSubPage === 'start' && interactiveCallState === 'idle' && (
        <div className="lcs-interactive-subpage-layout">
          {/* Left: Start control panel */}
          <div className="lcs-interactive-subpage-left">
            <div className="lcs-interactive-subpage-title">Start</div>
            
            <div className="lcs-interactive-circle-container">
              <button 
                type="button" 
                className={`lcs-interactive-big-circle-btn ${isInteractiveSessionActive ? 'is-active' : ''}`}
                onClick={() => {
                  const selected = addressBook.find(addr => addr.checked);
                  const hostName = selected ? selected.name : 'Shanghai Campus - Room 101';
                  setSelectedRemoteHost(hostName);
                  setInteractiveCallState('entering');
                  setIsInteractiveSessionActive(true);
                  setIsDirectorMinimized(false);
                }}
              >
                <span className="lcs-circle-btn-text">Start</span>
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

          {/* Right: Address Book list */}
          <div className="lcs-interactive-subpage-right">
            <div className="lcs-interactive-subpage-right-title">Address Book</div>
            
            <div className="lcs-interactive-address-list">
              {addressBook.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  className="lcs-interactive-address-row"
                  onClick={() => {
                    setAddressBook(prev => prev.map(addr => addr.id === item.id ? { ...addr, checked: !addr.checked } : addr));
                  }}
                >
                  <div className={`lcs-interactive-checkbox ${item.checked ? 'is-checked' : ''}`}>
                    {item.checked && <span className="lcs-checkmark">✓</span>}
                  </div>
                  <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <span className={`lcs-status-dot ${item.status === 'online' ? 'is-online' : 'is-offline'}`} />
                    <span className={`lcs-address-name ${item.status === 'online' ? 'is-online-text' : 'is-offline-text'}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className={`lcs-address-status ${item.status === 'online' ? 'is-online' : 'is-offline'}`}>
                    {item.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Entering modal over start subpage */}
      {interactiveSubPage === 'start' && interactiveCallState === 'entering' && (
        <div className="lcs-interactive-subpage-layout relative" style={{ position: 'relative' }}>
          <div className="lcs-interactive-subpage-left" style={{ opacity: 0.4 }}>
            <div className="lcs-interactive-subpage-title">Start</div>
            <div className="lcs-interactive-circle-container">
              <button type="button" className="lcs-interactive-big-circle-btn">
                <span className="lcs-circle-btn-text">Start</span>
              </button>
            </div>
            <button type="button" className="lcs-interactive-back-btn">Back</button>
          </div>
          <div className="lcs-interactive-subpage-right" style={{ opacity: 0.4 }}>
            <div className="lcs-interactive-subpage-right-title">Address Book</div>
            <div className="lcs-interactive-address-list">
              {addressBook.map((item, idx) => (
                <div key={item.id || idx} className="lcs-interactive-address-row">
                  <div className={`lcs-interactive-checkbox ${item.checked ? 'is-checked' : ''}`}>
                    {item.checked && <span className="lcs-checkmark">✓</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                    <span className={`lcs-status-dot ${item.status === 'online' ? 'is-online' : 'is-offline'}`} />
                    <span className="lcs-address-name">{item.name}</span>
                  </div>
                  <span className={`lcs-address-status ${item.status === 'online' ? 'is-online' : 'is-offline'}`}>
                    {item.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Entering Modal Overlay */}
          <div className="lcs-entering-modal-backdrop">
            <div className="lcs-entering-modal-card">
              <div className="lcs-entering-spinner-box">
                <div className="lcs-entering-spinner" />
              </div>
              <div className="lcs-entering-text">Entering</div>
            </div>
          </div>
        </div>
      )}

      {/* Active Discussion Room View */}
      <DiscussionRoom />

      {/* Active Interactive Room View */}
      <InteractiveRoom />

      {/* Join Class sub-page */}
      {interactiveSubPage === 'join' && (
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
      )}

      {/* SIP Call modal overlay */}
      {showSipCallModal && (
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
      )}
    </div>
  );
}
