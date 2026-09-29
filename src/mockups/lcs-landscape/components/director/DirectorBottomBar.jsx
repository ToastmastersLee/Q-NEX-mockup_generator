import React from 'react';
import { Pause, Play } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function DirectorBottomBar() {
  const {
    isLayoutBarOpen,
    setIsLayoutBarOpen,
    isRecording,
    handleRecordToggle,
    handlePauseToggle,
    isPaused,
    isLive,
    setIsLive,
    isMenuOpen,
    setIsMenuOpen,
    setActiveMenuSection,
    interactiveCallState,
    setIsDirectorMinimized,
    setInteractiveSubPage,
    activeMenuSection
  } = useLcs();

  return (
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
            title="Back Interaction"
          >
            <span>Back Interaction</span>
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
  );
}
