import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Circle, 
  Pause, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Film, 
  Settings, 
  Sun, 
  Moon, 
  Clock, 
  Video, 
  Mic, 
  Info,
  Sliders,
  ChevronLeft
} from 'lucide-react';
import classroomFeed from '../../assets/classroom_feed.png';
import './styles.css';

export default function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  
  // Interactive States
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  
  const [isLive, setIsLive] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('ch3'); // default active channel (Teacher_C)
  const [viewMode, setViewMode] = useState('director'); // 'director' (split) or 'single' (full screen channel)
  const [micLevel, setMicLevel] = useState(45); // fluctuated dynamically
  const [isMuted, setIsMuted] = useState(false);

  // Time clock state
  const [timeString, setTimeString] = useState('10-07-2026 17:24:29');
  
  // Settings Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [remainingHours, setRemainingHours] = useState(97);

  const timerRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuating Mic Level simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setMicLevel(prev => {
          const delta = Math.floor(Math.random() * 21) - 10; // -10 to 10
          const next = Math.max(10, Math.min(85, prev + delta));
          return next;
        });
      } else {
        setMicLevel(0);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [isMuted]);

  // Recording Timer
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, isPaused]);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPaused(false);
      setRecordSeconds(0);
    } else {
      setIsRecording(false);
      setIsPaused(false);
      setRecordSeconds(0);
    }
  };

  const handlePauseToggle = () => {
    if (isRecording) {
      setIsPaused(!isPaused);
    }
  };

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Channel details data
  const channels = [
    { id: 'ch1', name: 'Lecture', label: 'CH1', type: 'placeholder' },
    { id: 'ch2', name: 'Lecture2', label: 'CH2', type: 'placeholder' },
    { id: 'ch3', name: 'Teacher_C', label: 'CH3', type: 'live', pos: 'center top' },
    { id: 'ch4', name: 'Student_C', label: 'CH4', type: 'live', pos: 'left center' },
    { id: 'ch5', name: 'Teacher_P', label: 'CH5', type: 'live', pos: 'right center' },
    { id: 'ch6', name: 'Student_P', label: 'CH6', type: 'live', pos: 'center bottom' },
    { id: 'ch7', name: 'Interactive', label: 'CH7', type: 'placeholder' }
  ];

  return (
    <div className={`lcs-stage-container ${theme === 'light' ? 'is-light' : 'is-dark'}`}>
      
      {/* Simulation Controls Panel (floating outside device) */}
      <div className="lcs-simulation-toolbar">
        <div className="lcs-sim-title">
          <span>LCS Simulation Controls</span>
        </div>
        <div className="lcs-sim-buttons">
          <button 
            type="button" 
            className="lcs-sim-btn" 
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button 
            type="button" 
            className={`lcs-sim-btn ${isRecording ? 'is-active' : ''}`}
            onClick={handleRecordToggle}
          >
            <Circle size={12} fill={isRecording ? '#ef4444' : 'transparent'} className={isRecording ? 'animate-pulse' : ''} />
            <span>Record</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${isLive ? 'is-active' : ''}`}
            onClick={() => setIsLive(!isLive)}
          >
            <Play size={12} fill={isLive ? '#3b82f6' : 'transparent'} />
            <span>Live Stream</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${viewMode === 'director' ? 'is-active' : ''}`}
            onClick={() => setViewMode('director')}
          >
            <Sliders size={12} />
            <span>Director View (Orig)</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${viewMode === 'single' ? 'is-active' : ''}`}
            onClick={() => setViewMode('single')}
          >
            <Monitor size={12} />
            <span>Menu View (Orig)</span>
          </button>
        </div>
      </div>

      {/* Hardware Device Shell */}
      <div className="lcs-hardware-shell">
        <div className="lcs-screen-container">
          
          {/* SCREEN CONTENT */}
          <div className="lcs-screen">
            
            {/* Top Bar */}
            <div className="lcs-top-bar">
              <div className="lcs-top-left">
                <span className="lcs-brand">IQ</span>
              </div>
              <div className="lcs-top-center">
                <span className="lcs-recording-time">
                  Remaining recording time: {remainingHours} hours
                </span>
              </div>
              <div className="lcs-top-right">
                <span className="lcs-clock">{timeString}</span>
                <button 
                  type="button" 
                  className="lcs-top-icon" 
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <button 
                  type="button" 
                  className="lcs-top-icon" 
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  title="Settings"
                >
                  <Settings size={15} className={isSettingsOpen ? 'rotate-45' : ''} />
                </button>
              </div>
            </div>

            {/* Main Area */}
            <div className="lcs-main-area">
              
              {/* Left Column: Video Display & Bottom Control Bar */}
              <div className="lcs-left-pane">
                
                {/* Director View / Video Feed Display Area */}
                <div className="lcs-video-feed-box">
                  {viewMode === 'director' ? (
                    // 3-Pane split screen layout: Left column with 2 small rows, Right column with 1 large panel
                    <div className="lcs-split-screen">
                      <div className="lcs-split-left-col">
                        {/* Student_C view */}
                        <div className="lcs-split-small-box">
                          <img src={classroomFeed} alt="feed1" className="lcs-feed-img pos-student" />
                          <span className="lcs-split-label">Student_C (CH4)</span>
                        </div>
                        {/* Student_P view */}
                        <div className="lcs-split-small-box">
                          <img src={classroomFeed} alt="feed2" className="lcs-feed-img pos-classroom" />
                          <span className="lcs-split-label">Student_P (CH6)</span>
                        </div>
                      </div>
                      
                      <div className="lcs-split-right-col">
                        {/* Active channel Large View */}
                        <div className="lcs-split-large-box">
                          <img 
                            src={classroomFeed} 
                            alt="large-feed" 
                            className="lcs-feed-img"
                            style={{ 
                              objectPosition: channels.find(c => c.id === selectedChannel)?.pos || 'center top' 
                            }} 
                          />
                          <span className="lcs-split-label active">
                            {channels.find(c => c.id === selectedChannel)?.name || 'Teacher_C'} ({channels.find(c => c.id === selectedChannel)?.label || 'CH3'}) - Main Out
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Single focal active channel Full View
                    <div className="lcs-single-screen">
                      {channels.find(c => c.id === selectedChannel)?.type === 'placeholder' ? (
                        <div className="lcs-placeholder-screen">
                          <Film size={64} className="opacity-40 animate-pulse" />
                          <span>No Active Video Input</span>
                          <span className="text-xs opacity-60">Please connect a live source device</span>
                        </div>
                      ) : (
                        <div className="lcs-split-large-box w-full h-full border-none">
                          <img 
                            src={classroomFeed} 
                            alt="single-feed" 
                            className="lcs-feed-img"
                            style={{ 
                              objectPosition: channels.find(c => c.id === selectedChannel)?.pos || 'center top' 
                            }} 
                          />
                          <span className="lcs-split-label active">
                            {channels.find(c => c.id === selectedChannel)?.name} ({channels.find(c => c.id === selectedChannel)?.label})
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Settings sub-modal */}
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
                </div>

                {/* Bottom Control Bar */}
                <div className="lcs-bottom-bar">
                  
                  {/* Column 1: Director button */}
                  <button 
                    type="button" 
                    className={`lcs-pill-btn lcs-director-btn ${viewMode === 'director' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('director')}
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
                    <button 
                      type="button" 
                      className={`lcs-pill-btn-sm ${viewMode === 'single' ? 'is-active' : ''}`}
                      onClick={() => setViewMode('single')}
                    >
                      <span>Menu</span>
                    </button>

                    <button 
                      type="button" 
                      className="lcs-pill-btn-sm"
                      onClick={() => {
                        setSelectedChannel(prev => prev === 'ch3' ? 'ch4' : 'ch3');
                      }}
                    >
                      <span>Interactive</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic mic level & CH1-CH7 side channel list */}
              <div className="lcs-right-pane">
                
                {/* Volume / Level Slider indicator */}
                <div className="lcs-level-bar-container">
                  <div className="lcs-level-bar-indicator">
                    {/* Render level lights based on micLevel state */}
                    {Array.from({ length: 28 }).map((_, index) => {
                      const percentageThreshold = ((28 - index) / 28) * 100;
                      const isActive = micLevel >= percentageThreshold;
                      
                      let colorClass = 'is-green';
                      if (index < 6) {
                        colorClass = 'is-red'; // top bars red
                      } else if (index < 12) {
                        colorClass = 'is-yellow'; // middle bars yellow
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
                        onClick={() => setSelectedChannel(ch.id)}
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
                              src={classroomFeed} 
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

          </div>

        </div>

        {/* Bezel Bottom Brushed Metal Bar with LEDs */}
        <div className="lcs-hardware-bottom-bezel">
          <div className="lcs-bezel-leds">
            <div className={`lcs-bezel-led red ${isRecording ? 'is-flashing' : 'is-solid'}`} />
            <div className={`lcs-bezel-led blue ${isLive ? 'is-flashing' : 'is-solid'}`} />
          </div>
        </div>

      </div>

    </div>
  );
}
