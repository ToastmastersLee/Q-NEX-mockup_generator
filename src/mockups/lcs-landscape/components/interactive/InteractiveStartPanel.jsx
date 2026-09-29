import React from 'react';
import { useLcs } from '../../context/LcsContext';

export function InteractiveStartPanel() {
  const {
    interactiveSubPage,
    setInteractiveSubPage,
    isInteractiveSessionActive,
    setIsInteractiveSessionActive,
    addressBook,
    setAddressBook,
    interactiveCallState,
    setInteractiveCallState,
    setSelectedRemoteHost,
    setIsDirectorMinimized
  } = useLcs();

  if (interactiveSubPage !== 'start') return null;

  const isEntering = interactiveCallState === 'entering';

  return (
    <div className={`lcs-interactive-subpage-layout ${isEntering ? 'relative' : ''}`} style={isEntering ? { position: 'relative' } : {}}>
      {/* Left: Start control panel */}
      <div className="lcs-interactive-subpage-left" style={isEntering ? { opacity: 0.4 } : {}}>
        <div className="lcs-interactive-subpage-title">Start</div>
        
        <div className="lcs-interactive-circle-container">
          <button 
            type="button" 
            className={`lcs-interactive-big-circle-btn ${isInteractiveSessionActive ? 'is-active' : ''}`}
            onClick={() => {
              if (isEntering) return;
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
          onClick={() => {
            if (isEntering) return;
            setInteractiveSubPage('home');
          }}
        >
          Back
        </button>
      </div>

      {/* Right: Address Book list */}
      <div className="lcs-interactive-subpage-right" style={isEntering ? { opacity: 0.4 } : {}}>
        <div className="lcs-interactive-subpage-right-title">Address Book</div>
        
        <div className="lcs-interactive-address-list">
          {addressBook.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="lcs-interactive-address-row"
              onClick={() => {
                if (isEntering) return;
                setAddressBook(prev => prev.map(addr => addr.id === item.id ? { ...addr, checked: !addr.checked } : addr));
              }}
            >
              <div className={`lcs-interactive-checkbox ${item.checked ? 'is-checked' : ''}`}>
                {item.checked && <span className="lcs-checkmark">✓</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
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

      {/* Entering Modal Overlay */}
      {isEntering && (
        <div className="lcs-entering-modal-backdrop">
          <div className="lcs-entering-modal-card">
            <div className="lcs-entering-spinner-box">
              <div className="lcs-entering-spinner" />
            </div>
            <div className="lcs-entering-text">Entering</div>
          </div>
        </div>
      )}
    </div>
  );
}
