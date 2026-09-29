import React from 'react';
import { Mic } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function DirectorAudioMeter() {
  const { micLevel, isMuted, setIsMuted } = useLcs();

  return (
    <div className="lcs-level-bar-container">
      <div className="lcs-level-bar-indicator">
        {Array.from({ length: 28 }).map((_, index) => {
          const percentageThreshold = ((28 - index) / 28) * 100;
          const isActive = micLevel >= percentageThreshold;
          
          let colorClass = 'is-green';
          if (index < 6) {
            colorClass = 'is-red';
          } else if (index < 12) {
            colorClass = 'is-yellow';
          }
          
          return (
            <div 
              key={index} 
              className={`lcs-level-segment ${isActive ? 'is-active' : ''} ${colorClass}`} 
            />
          );
        })}
      </div>
      
      {/* Microphone Icon button to toggle mute */}
      <button 
        type="button" 
        className={`lcs-mic-icon-btn ${isMuted ? 'is-muted' : ''}`}
        onClick={() => setIsMuted(!isMuted)}
        title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
      >
        <Mic size={14} className={isMuted ? 'text-red-500' : 'text-gray-200'} />
      </button>
    </div>
  );
}
