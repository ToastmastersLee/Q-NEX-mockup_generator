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
import ch1Ppt from '../../assets/ch1_ppt.png';
import ch2DocCam from '../../assets/ch2_doc_cam.png';
import ch3TeacherClose from '../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../assets/ch4_student_close.png';
import ch7Remote from '../../assets/ch7_remote_classroom.png';
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
  
  // Layout Select Overlays
  const [isLayoutBarOpen, setIsLayoutBarOpen] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('l5'); // 'l1' to 'l8'
  const [directorMode, setDirectorMode] = useState('manual'); // 'manual' | 'auto'

  // Double-click Channel Re-selection States
  const [isChannelSelectOpen, setIsChannelSelectOpen] = useState(false);
  const [selectedLayoutToEdit, setSelectedLayoutToEdit] = useState('l3');
  const [activeEditSlot, setActiveEditSlot] = useState('');
  const [layoutChannels, setLayoutChannels] = useState({
    l1: { main: 'ch6' },
    l2: { main: 'ch7', pip: 'ch3' },
    l3: { left: 'ch4', right: 'ch3' },
    l4: { main: 'ch2', pip: 'ch1' },
    l5: { topLeft: 'ch5', bottomLeft: 'ch4', right: 'ch3' },
    l6: { row1: 'ch2', row2: 'ch1', row3: 'ch4', right: 'ch3' },
    l7: { tl: 'ch2', tr: 'ch3', bl: 'ch1', br: 'ch4' }
  });

  const layoutSlotConfigs = {
    l1: [
      { key: 'main', label: 'Main' }
    ],
    l2: [
      { key: 'main', label: 'Main' },
      { key: 'pip', label: 'PiP' }
    ],
    l3: [
      { key: 'left', label: 'Left' },
      { key: 'right', label: 'Right' }
    ],
    l4: [
      { key: 'main', label: 'Main' },
      { key: 'pip', label: 'PiP' }
    ],
    l5: [
      { key: 'topLeft', label: 'Top Left' },
      { key: 'bottomLeft', label: 'Bottom Left' },
      { key: 'right', label: 'Right' }
    ],
    l6: [
      { key: 'row1', label: 'Row 1' },
      { key: 'row2', label: 'Row 2' },
      { key: 'row3', label: 'Row 3' },
      { key: 'right', label: 'Right' }
    ],
    l7: [
      { key: 'tl', label: 'Top Left' },
      { key: 'tr', label: 'Top Right' },
      { key: 'bl', label: 'Bottom Left' },
      { key: 'br', label: 'Bottom Right' }
    ]
  };

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

  const handleLayoutDoubleClick = (layoutId) => {
    if (layoutId === 'l8') return;
    setSelectedLayoutToEdit(layoutId);
    const config = layoutSlotConfigs[layoutId];
    if (config && config.length > 0) {
      setActiveEditSlot(config[0].key);
    }
    setIsChannelSelectOpen(true);
  };

  // Channel images map
  const channelImages = {
    ch1: ch1Ppt,
    ch2: ch2DocCam,
    ch3: ch3TeacherClose,
    ch4: ch4StudentClose,
    ch5: classroomFeed,
    ch6: classroomFeed,
    ch7: ch7Remote
  };

  // Channel details data
  const channels = [
    { id: 'ch1', name: 'Lecture', label: 'CH1', type: 'live', pos: 'center' },
    { id: 'ch2', name: 'Lecture2', label: 'CH2', type: 'live', pos: 'center' },
    { id: 'ch3', name: 'Teacher_C', label: 'CH3', type: 'live', pos: 'center' },
    { id: 'ch4', name: 'Student_C', label: 'CH4', type: 'live', pos: 'center' },
    { id: 'ch5', name: 'Teacher_P', label: 'CH5', type: 'live', pos: 'right center' },
    { id: 'ch6', name: 'Student_P', label: 'CH6', type: 'live', pos: 'left center' },
    { id: 'ch7', name: 'Interactive', label: 'CH7', type: 'live', pos: 'center' }
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
            className={`lcs-sim-btn ${currentLayout === 'l5' ? 'is-active' : ''}`}
            onClick={() => {
              setViewMode('director');
              setCurrentLayout('l5');
            }}
          >
            <Sliders size={12} />
            <span>Director View (Orig)</span>
          </button>

          <button 
            type="button" 
            className={`lcs-sim-btn ${currentLayout === 'l1' ? 'is-active' : ''}`}
            onClick={() => {
              setViewMode('single');
              setCurrentLayout('l1');
            }}
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
                  {currentLayout === 'l1' && (
                    <div className="lcs-layout-l1">
                      {(() => {
                        const ch = channels.find(c => c.id === layoutChannels.l1.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return ch.type === 'placeholder' ? (
                          <div className="lcs-placeholder-screen">
                            <Film size={64} className="opacity-40 animate-pulse" />
                            <span>No Active Video Input ({ch.label})</span>
                          </div>
                        ) : (
                          <div className="lcs-full-video-box">
                            <img src={channelImages[ch.id]} alt="l1" className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                            <span className="lcs-split-label active">{ch.name} ({ch.label})</span>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l2' && (
                    <div className="lcs-layout-l2">
                      {(() => {
                        const mainCh = channels.find(c => c.id === layoutChannels.l2.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const pipCh = channels.find(c => c.id === layoutChannels.l2.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            {mainCh.type === 'placeholder' ? (
                              <div className="lcs-placeholder-screen">
                                <Film size={48} className="opacity-40" />
                                <span>{mainCh.name} ({mainCh.label})</span>
                              </div>
                            ) : (
                              <div className="lcs-full-video-box">
                                <img src={channelImages[mainCh.id]} alt="l2-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                                <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                              </div>
                            )}
                            
                            <div className="lcs-pip-box top-left">
                              {pipCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={20} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[pipCh.id]} alt="l2-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                              )}
                              <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l3' && (
                    <div className="lcs-layout-l3">
                      {(() => {
                        const leftCh = channels.find(c => c.id === layoutChannels.l3.left) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l3.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-half">
                              {leftCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={24} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[leftCh.id]} alt="l3-left" className="lcs-feed-img" style={{ objectPosition: leftCh.pos }} />
                              )}
                              <span className="lcs-split-label">{leftCh.name} ({leftCh.label})</span>
                            </div>
                            <div className="lcs-split-half">
                              {rightCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={24} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[rightCh.id]} alt="l3-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                              )}
                              <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l4' && (
                    <div className="lcs-layout-l4">
                      {(() => {
                        const mainCh = channels.find(c => c.id === layoutChannels.l4.main) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const pipCh = channels.find(c => c.id === layoutChannels.l4.pip) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            {mainCh.type === 'placeholder' ? (
                              <div className="lcs-placeholder-screen">
                                <Film size={48} className="opacity-40" />
                                <span>{mainCh.name} ({mainCh.label})</span>
                              </div>
                            ) : (
                              <div className="lcs-full-video-box">
                                <img src={channelImages[mainCh.id]} alt="l4-main" className="lcs-feed-img" style={{ objectPosition: mainCh.pos }} />
                                <span className="lcs-split-label">{mainCh.name} ({mainCh.label})</span>
                              </div>
                            )}
                            
                            <div className="lcs-pip-box bottom-left">
                              {pipCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center">
                                  <Film size={20} className="opacity-40" />
                                </div>
                              ) : (
                                <img src={channelImages[pipCh.id]} alt="l4-pip" className="lcs-feed-img" style={{ objectPosition: pipCh.pos }} />
                              )}
                              <span className="lcs-pip-label">{pipCh.name} ({pipCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l5' && (
                    <div className="lcs-split-screen">
                      {(() => {
                        const tlCh = channels.find(c => c.id === layoutChannels.l5.topLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const blCh = channels.find(c => c.id === layoutChannels.l5.bottomLeft) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l5.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-left-col">
                              <div className="lcs-split-small-box">
                                {tlCh.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[tlCh.id]} alt="l5-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                                )}
                                <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {blCh.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[blCh.id]} alt="l5-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                                )}
                                <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                              </div>
                            </div>
                            <div className="lcs-split-right-col">
                              <div className="lcs-split-large-box">
                                {rightCh.type === 'placeholder' ? (
                                  <div className="lcs-placeholder-screen"><Film size={48} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[rightCh.id]} alt="l5-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                                )}
                                <span className="lcs-split-label active">{rightCh.name} ({rightCh.label}) - Main Out</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l6' && (
                    <div className="lcs-split-screen lcs-layout-l6">
                      {(() => {
                        const r1Ch = channels.find(c => c.id === layoutChannels.l6.row1) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const r2Ch = channels.find(c => c.id === layoutChannels.l6.row2) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const r3Ch = channels.find(c => c.id === layoutChannels.l6.row3) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const rightCh = channels.find(c => c.id === layoutChannels.l6.right) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-split-left-col lcs-three-rows">
                              <div className="lcs-split-small-box">
                                {r1Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r1Ch.id]} alt="l6-r1" className="lcs-feed-img" style={{ objectPosition: r1Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r1Ch.name} ({r1Ch.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {r2Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r2Ch.id]} alt="l6-r2" className="lcs-feed-img" style={{ objectPosition: r2Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r2Ch.name} ({r2Ch.label})</span>
                              </div>
                              <div className="lcs-split-small-box">
                                {r3Ch.type === 'placeholder' ? (
                                  <div className="lcs-ch-thumb-placeholder bg-slate-950 w-full h-full flex items-center justify-center"><Film size={14} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[r3Ch.id]} alt="l6-r3" className="lcs-feed-img" style={{ objectPosition: r3Ch.pos }} />
                                )}
                                <span className="lcs-split-label">{r3Ch.name} ({r3Ch.label})</span>
                              </div>
                            </div>
                            <div className="lcs-split-right-col">
                              <div className="lcs-split-large-box">
                                {rightCh.type === 'placeholder' ? (
                                  <div className="lcs-placeholder-screen"><Film size={48} className="opacity-30" /></div>
                                ) : (
                                  <img src={channelImages[rightCh.id]} alt="l6-right" className="lcs-feed-img" style={{ objectPosition: rightCh.pos }} />
                                )}
                                <span className="lcs-split-label active">{rightCh.name} ({rightCh.label})</span>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l7' && (
                    <div className="lcs-layout-l7">
                      {(() => {
                        const tlCh = channels.find(c => c.id === layoutChannels.l7.tl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const trCh = channels.find(c => c.id === layoutChannels.l7.tr) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const blCh = channels.find(c => c.id === layoutChannels.l7.bl) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        const brCh = channels.find(c => c.id === layoutChannels.l7.br) || { name: 'Empty', label: 'CH', type: 'placeholder' };
                        return (
                          <>
                            <div className="lcs-grid-cell">
                              {tlCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[tlCh.id]} alt="l7-tl" className="lcs-feed-img" style={{ objectPosition: tlCh.pos }} />
                              )}
                              <span className="lcs-split-label">{tlCh.name} ({tlCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {trCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[trCh.id]} alt="l7-tr" className="lcs-feed-img" style={{ objectPosition: trCh.pos }} />
                              )}
                              <span className="lcs-split-label active">{trCh.name} ({trCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {blCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[blCh.id]} alt="l7-bl" className="lcs-feed-img" style={{ objectPosition: blCh.pos }} />
                              )}
                              <span className="lcs-split-label">{blCh.name} ({blCh.label})</span>
                            </div>
                            <div className="lcs-grid-cell">
                              {brCh.type === 'placeholder' ? (
                                <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={24} className="opacity-30" /></div>
                              ) : (
                                <img src={channelImages[brCh.id]} alt="l7-br" className="lcs-feed-img" style={{ objectPosition: brCh.pos }} />
                              )}
                              <span className="lcs-split-label">{brCh.name} ({brCh.label})</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {currentLayout === 'l8' && (
                    <div className="lcs-layout-l8">
                      {channels.map((ch) => (
                        <div key={ch.id} className="lcs-grid-cell-all">
                          {ch.type === 'placeholder' ? (
                            <div className="lcs-ch-thumb-placeholder bg-slate-900 w-full h-full flex items-center justify-center"><Film size={16} className="opacity-35" /></div>
                          ) : (
                            <img src={channelImages[ch.id]} alt={ch.name} className="lcs-feed-img" style={{ objectPosition: ch.pos }} />
                          )}
                          <span className="lcs-split-label">{ch.name}</span>
                        </div>
                      ))}
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

                  {/* Channel Selector Double-click Popup Modal */}
                  {isChannelSelectOpen && (
                    <div className="lcs-layout-edit-popup">
                      
                      {/* Close button X */}
                      <button
                        type="button"
                        className="lcs-edit-close-x"
                        onClick={() => setIsChannelSelectOpen(false)}
                        title="Close popup"
                      >
                        ✕
                      </button>

                      {/* Top Row: Channel selection bar CH1 to CH7 */}
                      {activeEditSlot && (
                        <div className="lcs-edit-channels-row">
                          {channels.map((ch) => {
                            const isChSelected = layoutChannels[selectedLayoutToEdit]?.[activeEditSlot] === ch.id;
                            return (
                              <button
                                key={ch.id}
                                type="button"
                                className={`lcs-edit-ch-btn ${isChSelected ? 'is-selected' : ''}`}
                                onClick={() => {
                                  setLayoutChannels(prev => ({
                                    ...prev,
                                    [selectedLayoutToEdit]: {
                                      ...prev[selectedLayoutToEdit],
                                      [activeEditSlot]: ch.id
                                    }
                                  }));
                                }}
                              >
                                {ch.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Divider line */}
                      <div className="lcs-edit-divider" />

                      {/* Bottom Row: Slots list and OK button */}
                      <div className="lcs-edit-bottom-row">
                        <div className="lcs-edit-slots-group">
                          {layoutSlotConfigs[selectedLayoutToEdit]?.map((slot) => {
                            const currentChId = layoutChannels[selectedLayoutToEdit]?.[slot.key];
                            const chDetail = channels.find(c => c.id === currentChId) || { label: 'CH' };
                            const isSlotEditing = activeEditSlot === slot.key;
                            return (
                              <div key={slot.key} className="lcs-edit-slot-block">
                                <button
                                  type="button"
                                  className={`lcs-edit-slot-btn ${isSlotEditing ? 'is-active' : ''}`}
                                  onClick={() => setActiveEditSlot(slot.key)}
                                >
                                  {chDetail.label}
                                </button>
                                <span className="lcs-edit-slot-label">{slot.label}</span>
                              </div>
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          className="lcs-edit-ok-btn"
                          onClick={() => setIsChannelSelectOpen(false)}
                        >
                          OK
                        </button>
                      </div>

                    </div>
                  )}
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
                        {currentLayout === 'l1' && <span className="lcs-active-layout-badge">Layout</span>}
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
                        {currentLayout === 'l2' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 3: Vertical Split */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l3' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l3')}
                          onDoubleClick={() => handleLayoutDoubleClick('l3')}
                        >
                          <div className="lcs-thumb-split-v">
                            <div className="lcs-thumb-split-cell font-mono">CH4</div>
                            <div className="lcs-thumb-split-cell font-mono">CH3</div>
                          </div>
                        </button>
                        {currentLayout === 'l3' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 4: PiP Style 2 */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l4' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l4')}
                          onDoubleClick={() => handleLayoutDoubleClick('l4')}
                        >
                          <div className="lcs-thumb-pip-2">
                            <div className="lcs-thumb-pip-sub font-mono">CH1</div>
                            <span className="font-mono">CH2</span>
                          </div>
                        </button>
                        {currentLayout === 'l4' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 5: Director 3-Split (Default) */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l5' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l5')}
                          onDoubleClick={() => handleLayoutDoubleClick('l5')}
                        >
                          <div className="lcs-thumb-director">
                            <div className="lcs-thumb-dir-left">
                              <div className="font-mono">CH5</div>
                              <div className="font-mono">CH4</div>
                            </div>
                            <div className="lcs-thumb-dir-right font-mono">CH3</div>
                          </div>
                        </button>
                        {currentLayout === 'l5' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 6: 4-Split */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l6' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l6')}
                          onDoubleClick={() => handleLayoutDoubleClick('l6')}
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
                        {currentLayout === 'l6' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 7: Quad Grid */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l7' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l7')}
                          onDoubleClick={() => handleLayoutDoubleClick('l7')}
                        >
                          <div className="lcs-thumb-quad">
                            <div className="font-mono">CH2</div>
                            <div className="font-mono">CH3</div>
                            <div className="font-mono">CH1</div>
                            <div className="font-mono">CH4</div>
                          </div>
                        </button>
                        {currentLayout === 'l7' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                      {/* Layout 8: All */}
                      <div className="lcs-layout-option-wrapper">
                        <button 
                          type="button" 
                          className={`lcs-layout-thumb-card ${currentLayout === 'l8' ? 'is-active' : ''}`}
                          onClick={() => setCurrentLayout('l8')}
                        >
                          <div className="lcs-thumb-all">
                            <span>All</span>
                          </div>
                        </button>
                        {currentLayout === 'l8' && <span className="lcs-active-layout-badge">Layout</span>}
                      </div>

                    </div>

                    {/* Right: Close "x" button */}
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
                )}

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
