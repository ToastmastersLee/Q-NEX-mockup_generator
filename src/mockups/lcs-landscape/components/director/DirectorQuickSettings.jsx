import React from 'react';
import { Sliders } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function DirectorQuickSettings() {
  const { isSettingsOpen, setIsSettingsOpen, remainingHours, setRemainingHours } = useLcs();

  if (!isSettingsOpen) return null;

  return (
    <div className="lcs-settings-popup">
      <div className="lcs-settings-header">
        <Sliders size={16} />
        <h3>LCS Device Settings</h3>
      </div>
      <div className="lcs-settings-body">
        <div className="lcs-settings-row">
          <span>Max Recording Limit:</span>
          <input 
            type="range" 
            min="20" 
            max="200" 
            value={remainingHours} 
            onChange={(e) => setRemainingHours(Number(e.target.value))} 
          />
          <strong>{remainingHours} hrs</strong>
        </div>
        <div className="lcs-settings-row">
          <span>Video Quality:</span>
          <span className="lcs-badge">1080P Full HD</span>
        </div>
        <div className="lcs-settings-row">
          <span>Camera Framerate:</span>
          <span className="lcs-badge">60 FPS</span>
        </div>
      </div>
      <button 
        type="button" 
        className="lcs-settings-close-btn"
        onClick={() => setIsSettingsOpen(false)}
      >
        Close
      </button>
    </div>
  );
}
