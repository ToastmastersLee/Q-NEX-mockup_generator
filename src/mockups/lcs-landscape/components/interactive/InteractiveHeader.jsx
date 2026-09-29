import React from 'react';
import { User, RotateCw, Video } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function InteractiveHeader() {
  const { setActiveMenuSection, setShowSipCallModal, showToast } = useLcs();

  return (
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
  );
}
