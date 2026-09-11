import { Film, Pause, Play, Sliders, Settings, Mic, ArrowLeft } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';
import { PowerDrawer } from '../drawers/PowerDrawer';
import { PtzDrawer } from '../drawers/PtzDrawer';
import { LayoutConfigModal } from './LayoutConfigModal';
import { PgmDirectorLayout } from './PgmDirectorLayout';

export function DirectorView() {
  const {
    isRemoteClassroomView,
    activeMenuSection,
    setActiveMenuSection,
    selectedPgmSource,
    currentLayout,
    setCurrentLayout,
    channels,
    channelImages,
    isSettingsOpen,
    setIsSettingsOpen,
    remainingHours,
    setRemainingHours,
    isRecording,
    isPaused,
    recordSeconds,
    handleRecordToggle,
    handlePauseToggle,
    formatTime,
    isLive,
    setIsLive,
    isLayoutBarOpen,
    setIsLayoutBarOpen,
    directorMode,
    setDirectorMode,
    handleLayoutDoubleClick,
    handleOpenLevel1,
    isMenuOpen,
    setIsMenuOpen,
    interactiveCallState,
    setIsDirectorMinimized,
    setInteractiveSubPage,
    micLevel,
    isMuted,
    setIsMuted,
    selectedChannel,
    handleSelectRightChannel
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
          {activeMenuSection && activeMenuSection !== 'set' && activeMenuSection !== 'file' && activeMenuSection !== 'ptz' && activeMenuSection !== 'power' && activeMenuSection !== 'interactive' && (
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
          {isSettingsOpen && (
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
          )}

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
        {isLayoutBarOpen ? (
          <div className="lcs-layout-select-bar">
            {/* Left: Manual / Auto toggle */}
            <div className="lcs-layout-mode-group">
              <button 
                type="button" 
                className={`lcs-mode-btn ${directorMode === 'manual' ? 'is-active' : ''}`}
                onClick={() => setDirectorMode('manual')}
              >
                Manual
              </button>
              <button 
                type="button" 
                className={`lcs-mode-btn ${directorMode === 'auto' ? 'is-active' : ''}`}
                onClick={() => setDirectorMode('auto')}
              >
                Auto
              </button>
            </div>

            {/* Middle: Layout Selection options list */}
            <div className="lcs-layout-options-list">
              {/* Layout 1: Single full screen */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l1' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l1')}
                  onDoubleClick={() => handleLayoutDoubleClick('l1')}
                >
                  <div className="lcs-thumb-single font-mono">
                    <span>CH6</span>
                  </div>
                </button>
                {currentLayout === 'l1' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l1'); }}>Layout</span>}
              </div>

              {/* Layout 2: PiP Style 1 */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l2' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l2')}
                  onDoubleClick={() => handleLayoutDoubleClick('l2')}
                >
                  <div className="lcs-thumb-pip-1">
                    <div className="lcs-thumb-pip-sub font-mono">CH3</div>
                    <span className="font-mono">CH7</span>
                  </div>
                </button>
                {currentLayout === 'l2' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleLayoutDoubleClick('l2'); }}>Layout</span>}
              </div>

              {/* Layout 3: Vertical Split */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l3' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l3')}
                  onDoubleClick={() => handleOpenLevel1('l3')}
                >
                  <div className="lcs-thumb-split-v">
                    <div className="lcs-thumb-split-cell font-mono">CH4</div>
                    <div className="lcs-thumb-split-cell font-mono">CH3</div>
                  </div>
                </button>
                {currentLayout === 'l3' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l3'); }}>Layout</span>}
              </div>

              {/* Layout 4: PiP Style 2 */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l4' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l4')}
                  onDoubleClick={() => handleOpenLevel1('l4')}
                >
                  <div className="lcs-thumb-pip-2">
                    <div className="lcs-thumb-pip-sub font-mono">CH1</div>
                    <span className="font-mono">CH2</span>
                  </div>
                </button>
                {currentLayout === 'l4' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l4'); }}>Layout</span>}
              </div>

              {/* Layout 5: Director 3-Split (Default) */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l5' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l5')}
                  onDoubleClick={() => handleOpenLevel1('l5')}
                >
                  <div className="lcs-thumb-director">
                    <div className="lcs-thumb-dir-left">
                      <div className="font-mono">CH5</div>
                      <div className="font-mono">CH4</div>
                    </div>
                    <div className="lcs-thumb-dir-right font-mono">CH3</div>
                  </div>
                </button>
                {currentLayout === 'l5' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l5'); }}>Layout</span>}
              </div>

              {/* Layout 6: 4-Split */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l6' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l6')}
                  onDoubleClick={() => handleOpenLevel1('l6')}
                >
                  <div className="lcs-thumb-director-4">
                    <div className="lcs-thumb-dir4-left">
                      <div className="font-mono">CH2</div>
                      <div className="font-mono">CH1</div>
                      <div className="font-mono">CH4</div>
                    </div>
                    <div className="lcs-thumb-dir4-right font-mono">CH3</div>
                  </div>
                </button>
                {currentLayout === 'l6' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l6'); }}>Layout</span>}
              </div>

              {/* Layout 7: Quad Grid */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l7' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l7')}
                  onDoubleClick={() => handleOpenLevel1('l7')}
                >
                  <div className="lcs-thumb-quad">
                    <div className="font-mono">CH2</div>
                    <div className="font-mono">CH3</div>
                    <div className="font-mono">CH1</div>
                    <div className="font-mono">CH4</div>
                  </div>
                </button>
                {currentLayout === 'l7' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l7'); }}>Layout</span>}
              </div>

              {/* Layout 8: All */}
              <div className="lcs-layout-option-wrapper">
                <button 
                  type="button" 
                  className={`lcs-layout-thumb-card ${currentLayout === 'l8' ? 'is-active' : ''}`}
                  onClick={() => setCurrentLayout('l8')}
                  onDoubleClick={() => handleOpenLevel1('l8')}
                >
                  <div className="lcs-thumb-all">
                    <span>All</span>
                  </div>
                </button>
                {currentLayout === 'l8' && <span className="lcs-active-layout-badge" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); handleOpenLevel1('l8'); }}>Layout</span>}
              </div>
            </div>

            {/* Right: Actions (Back button if interactive session, and Close "x" button) */}
            <div className="lcs-layout-bar-actions">
              {interactiveCallState !== 'idle' && (
                <button 
                  type="button" 
                  className="lcs-layout-back-btn"
                  onClick={() => {
                    setActiveMenuSection('interactive');
                    setIsDirectorMinimized(false);
                    setIsMenuOpen(false);
                    setIsLayoutBarOpen(false);
                  }}
                  title="Back to Interactive Session"
                >
                  <ArrowLeft size={13} />
                  <span>Back</span>
                </button>
              )}
              <button 
                type="button" 
                className="lcs-layout-close-btn"
                onClick={() => setIsLayoutBarOpen(false)}
                title="Close Layouts"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="lcs-bottom-bar">
            {/* Column 1: Director button */}
            <button 
              type="button" 
              className={`lcs-pill-btn lcs-director-btn ${isLayoutBarOpen ? 'is-active' : ''}`}
              onClick={() => setIsLayoutBarOpen(true)}
            >
              <span>Director</span>
            </button>

            {/* Column 2: Record Control pill */}
            <div className="lcs-control-pill-group lcs-record-group">
              <span className="lcs-group-label">Record</span>
              <button 
                type="button" 
                className={`lcs-large-rec-btn ${isRecording ? 'is-recording' : ''}`}
                onClick={handleRecordToggle}
                title={isRecording ? "Stop Record" : "Start Record"}
              >
                <div className="lcs-rec-inner-circle" />
              </button>
              <button 
                type="button" 
                className={`lcs-large-action-btn ${isPaused ? 'is-active' : ''}`}
                onClick={handlePauseToggle}
                disabled={!isRecording}
                title="Pause Record"
              >
                <Pause size={18} fill="currentColor" />
              </button>
            </div>

            {/* Column 3: Live Stream pill */}
            <div className="lcs-control-pill-group lcs-live-group">
              <button 
                type="button" 
                className={`lcs-large-action-btn lcs-live-btn ${isLive ? 'is-live-active' : ''}`}
                onClick={() => setIsLive(!isLive)}
                title="Toggle Live Stream"
              >
                <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
              </button>
              <span className="lcs-group-label">Live</span>
            </div>

            {/* Column 4: Menu & Interactive Stack */}
            <div className="lcs-right-stack-col">
              {isMenuOpen && (
                <div className="lcs-menu-popup">
                  <button 
                    type="button" 
                    className="lcs-menu-popup-btn"
                    onClick={() => {
                      setActiveMenuSection('set');
                      setIsMenuOpen(false);
                    }}
                  >
                    Set
                  </button>
                  <button 
                    type="button" 
                    className="lcs-menu-popup-btn"
                    onClick={() => {
                      setActiveMenuSection('file');
                      setIsMenuOpen(false);
                    }}
                  >
                    File
                  </button>
                  <button 
                    type="button" 
                    className="lcs-menu-popup-btn"
                    onClick={() => {
                      setActiveMenuSection('ptz');
                      setIsMenuOpen(false);
                    }}
                  >
                    PTZ
                  </button>
                  <button 
                    type="button" 
                    className="lcs-menu-popup-btn"
                    onClick={() => {
                      setActiveMenuSection('power');
                      setIsMenuOpen(false);
                    }}
                  >
                    Power
                  </button>
                </div>
              )}

              <button 
                type="button" 
                className={`lcs-pill-btn-sm ${isMenuOpen ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span>Menu</span>
              </button>

              {interactiveCallState !== 'idle' ? (
                <button 
                  type="button" 
                  className="lcs-pill-btn-sm lcs-back-interaction-btn"
                  onClick={() => {
                    setActiveMenuSection('interactive');
                    setIsDirectorMinimized(false);
                    setIsMenuOpen(false);
                  }}
                  title="Back to Interactive Session"
                >
                  <ArrowLeft size={12} style={{ display: 'inline', marginRight: '3px' }} />
                  <span>Back</span>
                </button>
              ) : (
                <button 
                  type="button" 
                  className={`lcs-pill-btn-sm ${activeMenuSection === 'interactive' ? 'is-active' : ''}`}
                  onClick={() => {
                    if (activeMenuSection === 'interactive') {
                      setActiveMenuSection(null);
                    } else {
                      setActiveMenuSection('interactive');
                      setInteractiveSubPage('home');
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  <span>Interactive</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Dynamic mic level & CH1-CH7 side channel list */}
      <div className="lcs-right-pane">
        {/* Volume / Level Slider indicator */}
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
          >
            <Mic size={14} className={isMuted ? 'text-red-500' : 'text-gray-200'} />
          </button>
        </div>

        {/* Vertical Channel feeds selection list */}
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
      </div>
    </div>
  );
}
