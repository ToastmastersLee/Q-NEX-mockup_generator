import React from 'react';
import { Film } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function DirectorChannelList() {
  const { channels, selectedChannel, handleSelectRightChannel, channelImages } = useLcs();

  return (
    <div className="lcs-channels-list">
      {channels.map((ch) => {
        const isActive = selectedChannel === ch.id;
        return (
          <div 
            key={ch.id} 
            className={`lcs-channel-card ${isActive ? 'is-active' : ''}`}
            onClick={() => handleSelectRightChannel(ch.id)}
          >
            <div className="lcs-channel-card-header">
              <span className="lcs-ch-name">{ch.name}</span>
              <span className="lcs-ch-num">{ch.label}</span>
            </div>
            <div className="lcs-channel-card-thumbnail">
              {ch.type === 'placeholder' ? (
                <div className="lcs-ch-thumb-placeholder">
                  <Film size={20} className="opacity-40" />
                </div>
              ) : (
                <img 
                  src={channelImages[ch.id]} 
                  alt={ch.name} 
                  className="lcs-ch-thumb-img"
                  style={{ objectPosition: ch.pos }} 
                />
              )}
              {isActive && <div className="lcs-active-border-indicator" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
