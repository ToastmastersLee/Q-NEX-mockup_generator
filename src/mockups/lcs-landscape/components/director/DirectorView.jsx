import React from 'react';
import { Settings } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { PowerDrawer } from '../drawers/PowerDrawer';
import { PtzDrawer } from '../drawers/PtzDrawer';
import { LayoutConfigModal } from './LayoutConfigModal';
import { PgmDirectorLayout } from './PgmDirectorLayout';
import { DirectorLayoutBar } from './DirectorLayoutBar';
import { DirectorBottomBar } from './DirectorBottomBar';
import { DirectorAudioMeter } from './DirectorAudioMeter';
import { DirectorChannelList } from './DirectorChannelList';
import { DirectorQuickSettings } from './DirectorQuickSettings';

export function DirectorView() {
  const {
    isRemoteClassroomView,
    activeMenuSection,
    setActiveMenuSection,
    selectedPgmSource,
    channelImages,
    isRecording,
    isPaused,
    recordSeconds,
    formatTime,
    isLive,
    isLayoutBarOpen
  } = useLcs();

  const getPgmImage = () => {
    if (selectedPgmSource === 'Lecture') return channelImages.ch1;
    if (selectedPgmSource === 'Lecture2') return channelImages.ch2;
    if (selectedPgmSource === 'Teacher_C') return channelImages.ch3;
    if (selectedPgmSource === 'Student_C') return channelImages.ch4;
    if (selectedPgmSource === 'Student_P') return channelImages.ch6;
    return channelImages.ch7;
  };

  return (
    <div className="lcs-main-area">
      {/* Left Column: Video Display & Bottom Control Bar */}
      <div className="lcs-left-pane">
        {/* Director View / Video Feed Display Area */}
        <div className="lcs-video-feed-box">
          {activeMenuSection === 'power' ? (
            <PowerDrawer />
          ) : activeMenuSection === 'ptz' ? (
            <PtzDrawer />
          ) : (
            <>
              {isRemoteClassroomView && selectedPgmSource !== 'PGM' ? (
                <div className="lcs-full-video-box">
                  <img 
                    src={getPgmImage()} 
                    alt={selectedPgmSource} 
                    className="lcs-feed-img" 
                  />
                  <span className="lcs-split-label active">{selectedPgmSource}</span>
                </div>
              ) : (
                <PgmDirectorLayout />
              )}
            </>
          )}

          {/* Fallback menu sub-sections overlay if needed */}
          {activeMenuSection && 
           activeMenuSection !== 'set' && 
           activeMenuSection !== 'file' && 
           activeMenuSection !== 'ptz' && 
           activeMenuSection !== 'power' && 
           activeMenuSection !== 'interactive' && (
            <div className="lcs-menu-section-overlay">
              <div className="lcs-overlay-header">
                <div className="lcs-overlay-title-group">
                  <Settings size={16} />
                  <h3>Menu Control</h3>
                </div>
                <button 
                  type="button" 
                  className="lcs-overlay-close-btn"
                  onClick={() => setActiveMenuSection(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Quick Settings sub-modal */}
          <DirectorQuickSettings />

          {/* Flashing Recording Status indicator Overlay */}
          {isRecording && (
            <div className="lcs-recording-overlay">
              <div className="lcs-rec-dot animate-pulse" />
              <span>REC {formatTime(recordSeconds)}</span>
              {isPaused && <span className="lcs-paused-badge">PAUSED</span>}
            </div>
          )}

          {/* Flashing Live Streaming Overlay */}
          {isLive && (
            <div className="lcs-live-overlay">
              <div className="lcs-live-dot" />
              <span>LIVE</span>
            </div>
          )}

          {/* Channel Selector & 2-Level Layout Configuration Modals */}
          <LayoutConfigModal />
        </div>

        {/* Bottom Control Bar or Layout Selection Bar */}
        {isLayoutBarOpen ? <DirectorLayoutBar /> : <DirectorBottomBar />}
      </div>

      {/* Right Column: Dynamic mic level & CH1-CH7 side channel list */}
      <div className="lcs-right-pane">
        <DirectorAudioMeter />
        <DirectorChannelList />
      </div>
    </div>
  );
}
