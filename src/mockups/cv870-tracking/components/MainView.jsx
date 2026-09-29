import { useState, useRef } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Video, 
  Maximize, 
  Grid, 
  Square, 
  Check, 
  Sliders, 
  RotateCcw, 
  Save, 
  LogOut,
  Target,
  Layers,
  ChevronRight as ArrowRightIcon
} from 'lucide-react';
import classroomFeed from '../../../assets/classroom_feed.png';
import teacherClose from '../../../assets/ch3_teacher_close.png';
import studentClose from '../../../assets/ch4_student_close.png';
import studentPanorama from '../../../assets/ch4_student_panoprama.png';
import { CloseUpSettingsModal } from './CloseUpSettingsModal';
import { DualCmosModal } from './DualCmosModal';

export function MainView({
  managedDevices = [],
  onShowToast
}) {
  // Sidebar mode: 'ptz' or 'settings'
  const [sidebarMode, setSidebarMode] = useState('ptz');
  const [settingsTab, setSettingsTab] = useState('Basic1'); // 'Basic1' | 'Basic2' | 'Adv.1' | 'Adv.2'

  // Device & Stream Selection
  const [selectedCameraId, setSelectedCameraId] = useState('1');
  const [isStreamMenuOpen, setIsStreamMenuOpen] = useState(false);
  const [openStreams, setOpenStreams] = useState({
    studentCloseUp: true,
    studentPanorama: true,
    teacherCloseUp: false,
    teacherPanorama: false
  });

  // Tracking state
  const [isTrackingActive, setIsTrackingActive] = useState(false); // default stopped
  const [presetNumber, setPresetNumber] = useState(1);

  // Settings: Basic1 (Zones)
  const [activeDrawTool, setActiveDrawTool] = useState('lecturer'); // 'lecturer' | 'blocking' | 'preset' | 'bls' | null
  const [selectedBlockingIndex, setSelectedBlockingIndex] = useState(1);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(1);
  const [selectedBlsIndex, setSelectedBlsIndex] = useState(1);

  // Existing zones
  const [zones, setZones] = useState({
    lecturer: { x: 24, y: 38, width: 68, height: 35 },
    blocking: { x: 30, y: 62, width: 64, height: 26 },
    preset: { x: 38, y: 65, width: 45, height: 22 },
    bls: { x: 26, y: 40, width: 32, height: 28 }
  });

  // Settings: Basic2 (Params)
  const [tiltMotion, setTiltMotion] = useState(false);
  const [outsidePlatform, setOutsidePlatform] = useState(true);
  const [autoZoom, setAutoZoom] = useState(false);
  const [trackSens, setTrackSens] = useState(4);
  const [trackSpeed, setTrackSpeed] = useState(4);
  const [zoomLimit, setZoomLimit] = useState(0);
  const [lostTimeout, setLostTimeout] = useState(3);
  const [targetLostAction, setTargetLostAction] = useState('No. 0 preset');
  const [powerOnState, setPowerOnState] = useState('Track');
  const [videoAutoSwitch, setVideoAutoSwitch] = useState('Close');
  const [usbSwitch, setUsbSwitch] = useState('Open');

  // Video Grid layout: 4-split or 1-split
  const [splitMode, setSplitMode] = useState('4'); // '1' | '4'
  const [activeTileIndex, setActiveTileIndex] = useState(0);

  // Snapshot & Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [isFlash, setIsFlash] = useState(false);

  // Floating Modals
  const [isCloseUpModalOpen, setIsCloseUpModalOpen] = useState(false);
  const [closeUpTarget, setCloseUpTarget] = useState('desk');
  const [isDualCmosOpen, setIsDualCmosOpen] = useState(false);

  // Drawing state on the main canvas
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [tempBox, setTempBox] = useState(null);

  // PTZ Control simulation
  const handlePtzAction = (action) => {
    onShowToast?.(`PTZ: ${action}`);
  };

  const handleStartTracking = () => {
    setIsTrackingActive(true);
    onShowToast?.('Auto-Tracking Started! Camera algorithms active.');
  };

  const handleStopTracking = () => {
    setIsTrackingActive(false);
    onShowToast?.('Tracking Stopped! Manual PTZ & zone adjustments enabled.');
  };

  const handleSavePreset = () => {
    onShowToast?.(`Preset ${presetNumber} position saved!`);
  };

  const handleCallPreset = () => {
    onShowToast?.(`Calling Preset ${presetNumber}...`);
  };

  // Canvas drawing handlers
  const handleMouseDown = (e) => {
    if (!activeDrawTool || splitMode === '4') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setIsDrawing(true);
    setDrawStart({ x, y });
    setTempBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const curX = ((e.clientX - rect.left) / rect.width) * 100;
    const curY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(drawStart.x, curX);
    const y = Math.min(drawStart.y, curY);
    const width = Math.abs(curX - drawStart.x);
    const height = Math.abs(curY - drawStart.y);

    setTempBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !tempBox) return;
    setIsDrawing(false);

    if (tempBox.width > 4 && tempBox.height > 4) {
      setZones(prev => ({
        ...prev,
        [activeDrawTool]: tempBox
      }));
      onShowToast?.(`New ${activeDrawTool} zone drawn! Click "Save" to apply.`);
    }
    setTempBox(null);
  };

  const handleSaveZones = () => {
    onShowToast?.('Tracking zones saved to camera ROM successfully!');
  };

  const handleSaveBasic2 = () => {
    onShowToast?.(`Basic2 parameters saved! Power-On: ${powerOnState}, Lost Action: ${targetLostAction}`);
  };

  const handleTakeSnapshot = () => {
    setIsFlash(true);
    setTimeout(() => setIsFlash(false), 200);
    onShowToast?.('Snapshot saved: /recordings/snapshot_192.167.32.65.jpg');
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      onShowToast?.('Recording stopped & saved to storage.');
    } else {
      setIsRecording(true);
      setRecordSeconds(0);
      onShowToast?.('Recording started (1080P 30FPS H.264)...');
    }
  };

  return (
    <div className="cms-main-view-page">
      {/* LEFT SIDEBAR: Either PTZ Mode or Settings Mode */}
      <aside className="cms-sidebar">
        {sidebarMode === 'ptz' ? (
          /* ================= PTZ MODE ================= */
          <div className="cms-ptz-sidebar-content">
            {/* Device Tree Section */}
            <div className="cms-sidebar-section">
              <div className="cms-sidebar-section-title">Device</div>
              <div className="cms-device-tree">
                {/* Device 1: Teacher Camera */}
                <div
                  className={`cms-tree-node ${selectedCameraId === '1' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedCameraId('1')}
                >
                  <span className="cms-tree-bullet">▸</span>
                  <span className="cms-tree-id">1</span>
                  <span className="cms-tree-name">192.167.32.65 (Teacher)</span>
                </div>

                {/* Device 2: Student Camera with Context Menu */}
                <div
                  className={`cms-tree-node ${selectedCameraId === '2' ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSelectedCameraId('2');
                    setIsStreamMenuOpen(!isStreamMenuOpen);
                  }}
                >
                  <span className="cms-tree-bullet">▾</span>
                  <span className="cms-tree-id">2</span>
                  <span className="cms-tree-name">192.167.32.66 (Student)</span>
                </div>

                {/* Stream Context Menu */}
                {isStreamMenuOpen && (
                  <div className="cms-stream-context-menu">
                    <label className="cms-stream-menu-item">
                      <input
                        type="checkbox"
                        checked={openStreams.studentCloseUp}
                        onChange={(e) => setOpenStreams({ ...openStreams, studentCloseUp: e.target.checked })}
                      />
                      <span>Student-close-up</span>
                    </label>
                    <label className="cms-stream-menu-item">
                      <input
                        type="checkbox"
                        checked={openStreams.studentPanorama}
                        onChange={(e) => setOpenStreams({ ...openStreams, studentPanorama: e.target.checked })}
                      />
                      <span>Student-panorama</span>
                    </label>
                    <label className="cms-stream-menu-item">
                      <input
                        type="checkbox"
                        checked={openStreams.teacherCloseUp}
                        onChange={(e) => setOpenStreams({ ...openStreams, teacherCloseUp: e.target.checked })}
                      />
                      <span>Teacher-close-up</span>
                    </label>
                    <label className="cms-stream-menu-item">
                      <input
                        type="checkbox"
                        checked={openStreams.teacherPanorama}
                        onChange={(e) => setOpenStreams({ ...openStreams, teacherPanorama: e.target.checked })}
                      />
                      <span>Teacher-panorama</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Camera / PTZ Lens Section */}
            <div className="cms-sidebar-section">
              <div className="cms-sidebar-section-title">Camera</div>
              <div className="cms-sidebar-sub-title">PTZ Lens</div>

              {/* 8-Way Direction Pad with Menu Button */}
              <div className="cms-ptz-pad-grid">
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Up-Left')}>↖</button>
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Tilt Up')}>▲</button>
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Up-Right')}>↗</button>

                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Left')}>◀</button>
                <button type="button" className="cms-pad-btn is-menu" onClick={() => handlePtzAction('OSD Menu')}>Menu</button>
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Right')}>▶</button>

                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Down-Left')}>↙</button>
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Tilt Down')}>▼</button>
                <button type="button" className="cms-pad-btn" onClick={() => handlePtzAction('Pan Down-Right')}>↘</button>
              </div>

              {/* Lens Adjustments */}
              <div className="cms-lens-controls">
                <div className="cms-lens-row">
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Zoom In')}>+ Zoom</button>
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Zoom Out')}>-</button>
                </div>
                <div className="cms-lens-row">
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Focus In')}>+ Focus</button>
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Focus Out')}>-</button>
                </div>
                <div className="cms-lens-row">
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Iris Open')}>+ Iris</button>
                  <button type="button" className="cms-lens-btn" onClick={() => handlePtzAction('Iris Close')}>-</button>
                </div>

                <div className="cms-lens-aux-row">
                  <button type="button" className="cms-btn cms-btn-tool" onClick={() => handlePtzAction('Enter')}>Enter</button>
                  <button type="button" className="cms-btn cms-btn-tool" onClick={() => handlePtzAction('Return')}>Return</button>
                  <button type="button" className="cms-btn cms-btn-tool" onClick={() => handlePtzAction('Iris Reset')}>Iris reset</button>
                </div>
              </div>
            </div>

            {/* Presets Section */}
            <div className="cms-sidebar-section">
              <div className="cms-sidebar-section-title">Presets</div>
              <div className="cms-presets-row">
                <input
                  type="number"
                  min="0"
                  max="255"
                  className="cms-preset-input"
                  value={presetNumber}
                  onChange={(e) => setPresetNumber(Number(e.target.value) || 0)}
                />
                <button type="button" className="cms-btn cms-btn-tool" onClick={handleCallPreset}>Call</button>
                <button type="button" className="cms-btn cms-btn-tool" onClick={handleSavePreset}>Set</button>
                <button type="button" className="cms-btn cms-btn-tool" onClick={() => onShowToast?.(`Preset ${presetNumber} cleared.`)}>Clear</button>
              </div>
            </div>

            {/* Track Section */}
            <div className="cms-sidebar-section">
              <div className="cms-track-header">
                <span className="cms-sidebar-section-title">Track</span>
                <span className={`cms-track-led ${isTrackingActive ? 'on' : 'off'}`} />
              </div>

              <div className="cms-track-btn-row">
                <button
                  type="button"
                  className={`cms-btn cms-btn-tool ${isTrackingActive ? 'is-active' : ''}`}
                  onClick={handleStartTracking}
                >
                  Start
                </button>
                <button
                  type="button"
                  className={`cms-btn cms-btn-tool ${!isTrackingActive ? 'is-stopped' : ''}`}
                  onClick={handleStopTracking}
                >
                  Stop
                </button>
                <button
                  type="button"
                  className="cms-btn cms-btn-tool cms-btn-enter-settings"
                  onClick={() => {
                    setSidebarMode('settings');
                    setSplitMode('1'); // switch to 1-split full preview for zone setup
                    onShowToast?.('Entered Camera Tracking Settings!');
                  }}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= SETTINGS MODE ================= */
          <div className="cms-settings-sidebar-content">
            <div className="cms-settings-header-title">Settings</div>

            {/* Sub-tabs: Basic1 | Basic2 | Adv.1 | Adv.2 */}
            <div className="cms-settings-tab-bar">
              <button
                type="button"
                className={`cms-setting-tab-btn ${settingsTab === 'Basic1' ? 'is-active' : ''}`}
                onClick={() => setSettingsTab('Basic1')}
              >
                Basic1
              </button>
              <button
                type="button"
                className={`cms-setting-tab-btn ${settingsTab === 'Basic2' ? 'is-active' : ''}`}
                onClick={() => setSettingsTab('Basic2')}
              >
                Basic2
              </button>
              <button
                type="button"
                className={`cms-setting-tab-btn ${settingsTab === 'Adv.1' ? 'is-active' : ''}`}
                onClick={() => setSettingsTab('Adv.1')}
              >
                Adv.1
              </button>
              <button
                type="button"
                className={`cms-setting-tab-btn ${settingsTab === 'Adv.2' ? 'is-active' : ''}`}
                onClick={() => setSettingsTab('Adv.2')}
              >
                Adv.2
              </button>
            </div>

            {/* TAB: Basic1 (Zones & Calibration) */}
            {settingsTab === 'Basic1' && (
              <div className="cms-settings-tab-body">
                {/* Calibration Tools */}
                <div className="cms-calib-row">
                  <button
                    type="button"
                    className="cms-btn cms-btn-tool"
                    onClick={() => setIsDualCmosOpen(true)}
                  >
                    Pos correct
                  </button>
                  <button type="button" className="cms-btn cms-btn-tool">Debug</button>
                  <div className="cms-mini-ptz">
                    <button type="button" className="cms-mini-btn" onClick={() => handlePtzAction('Up')}>▲</button>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button type="button" className="cms-mini-btn" onClick={() => handlePtzAction('Left')}>◀</button>
                      <button type="button" className="cms-mini-btn" onClick={() => handlePtzAction('OK')}>OK</button>
                      <button type="button" className="cms-mini-btn" onClick={() => handlePtzAction('Right')}>▶</button>
                    </div>
                    <button type="button" className="cms-mini-btn" onClick={() => handlePtzAction('Down')}>▼</button>
                  </div>
                </div>

                {/* 1. Zone Settings: Lecturer */}
                <div className="cms-zone-group">
                  <div className="cms-group-label">Zone settings</div>
                  <button
                    type="button"
                    className={`cms-btn cms-zone-btn ${activeDrawTool === 'lecturer' ? 'is-active-green' : ''}`}
                    onClick={() => setActiveDrawTool(activeDrawTool === 'lecturer' ? null : 'lecturer')}
                  >
                    Lecturer Area
                  </button>
                </div>

                {/* 2. Blocking Zone (1..8) */}
                <div className="cms-zone-group">
                  <div className="cms-group-label">Blocking zone</div>
                  <div className="cms-num-check-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <label
                        key={n}
                        className={`cms-num-check ${selectedBlockingIndex === n ? 'is-checked-red' : ''}`}
                        onClick={() => {
                          setSelectedBlockingIndex(n);
                          setActiveDrawTool('blocking');
                        }}
                      >
                        <input type="radio" checked={selectedBlockingIndex === n} readOnly />
                        <span>{n}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Preset Zone (1..4) */}
                <div className="cms-zone-group">
                  <div className="cms-group-label">Preset zone</div>
                  <div className="cms-preset-zone-grid">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="cms-zone-col">
                        <label className="cms-num-check">
                          <input
                            type="radio"
                            checked={selectedPresetIndex === n}
                            onChange={() => {
                              setSelectedPresetIndex(n);
                              setActiveDrawTool('preset');
                            }}
                          />
                          <span>{n}</span>
                        </label>
                        <button
                          type="button"
                          className="cms-btn cms-btn-tool cms-btn-xs"
                          onClick={() => {
                            setCloseUpTarget('desk');
                            setIsCloseUpModalOpen(true);
                          }}
                        >
                          Set
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. BLS Zone (Blackboard 1..4) */}
                <div className="cms-zone-group">
                  <div className="cms-group-label">Bls zone</div>
                  <div className="cms-preset-zone-grid">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="cms-zone-col">
                        <label className="cms-num-check">
                          <input
                            type="radio"
                            checked={selectedBlsIndex === n}
                            onChange={() => {
                              setSelectedBlsIndex(n);
                              setActiveDrawTool('bls');
                            }}
                          />
                          <span>{n}</span>
                        </label>
                        <button
                          type="button"
                          className="cms-btn cms-btn-tool cms-btn-xs"
                          onClick={() => {
                            setCloseUpTarget(n === 1 ? 'blackboard_left' : 'blackboard_right');
                            setIsCloseUpModalOpen(true);
                          }}
                        >
                          Set
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="cms-settings-footer">
                  <button type="button" className="cms-btn cms-btn-tool" onClick={() => onShowToast?.('Refreshed zone parameters')}>
                    Refresh
                  </button>
                  <button type="button" className="cms-btn cms-btn-primary" onClick={handleSaveZones}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="cms-btn cms-btn-tool"
                    onClick={() => {
                      setSidebarMode('ptz');
                      setSplitMode('4');
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Basic2 (Tracking Parameters & Target Lost Action) */}
            {settingsTab === 'Basic2' && (
              <div className="cms-settings-tab-body">
                {/* Tracking Setting Checkboxes */}
                <div className="cms-settings-section-box">
                  <div className="cms-group-label">Tracking setting</div>
                  <div className="cms-check-col">
                    <label className="cms-check-item">
                      <input
                        type="checkbox"
                        checked={tiltMotion}
                        onChange={(e) => setTiltMotion(e.target.checked)}
                      />
                      <span>Tilt motion</span>
                    </label>
                    <label className="cms-check-item">
                      <input
                        type="checkbox"
                        checked={outsidePlatform}
                        onChange={(e) => setOutsidePlatform(e.target.checked)}
                      />
                      <span>Outside platform</span>
                    </label>
                    <label className="cms-check-item">
                      <input
                        type="checkbox"
                        checked={autoZoom}
                        onChange={(e) => setAutoZoom(e.target.checked)}
                      />
                      <span>Auto zoom</span>
                    </label>
                  </div>
                </div>

                {/* Tracking Sliders */}
                <div className="cms-settings-section-box">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="cms-group-label">Tracking params</span>
                    <button
                      type="button"
                      className="cms-btn cms-btn-tool cms-btn-xs"
                      onClick={() => {
                        setTrackSens(4);
                        setTrackSpeed(4);
                        setZoomLimit(0);
                        setLostTimeout(3);
                        onShowToast?.('Reset to standard parameters');
                      }}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="cms-slider-row">
                    <span>Track Sens.</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={trackSens}
                      onChange={(e) => setTrackSens(Number(e.target.value))}
                    />
                    <span className="cms-slider-val">{trackSens}</span>
                  </div>

                  <div className="cms-slider-row">
                    <span>Track speed</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={trackSpeed}
                      onChange={(e) => setTrackSpeed(Number(e.target.value))}
                    />
                    <span className="cms-slider-val">{trackSpeed}</span>
                  </div>

                  <div className="cms-slider-row">
                    <span>Zoom limit</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={zoomLimit}
                      onChange={(e) => setZoomLimit(Number(e.target.value))}
                    />
                    <span className="cms-slider-val">{zoomLimit}</span>
                  </div>

                  <div className="cms-slider-row">
                    <span>Lost timeout</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={lostTimeout}
                      onChange={(e) => setLostTimeout(Number(e.target.value))}
                    />
                    <span className="cms-slider-val">{lostTimeout}</span>
                  </div>
                </div>

                {/* Target Lost Action Dropdown */}
                <div className="cms-dropdown-row">
                  <label>Target lost action</label>
                  <select
                    className="cms-select"
                    value={targetLostAction}
                    onChange={(e) => setTargetLostAction(e.target.value)}
                  >
                    <option value="No. 0 preset">No. 0 preset</option>
                    <option value="No. 1 preset">No. 1 preset</option>
                    <option value="Stay">Stay</option>
                  </select>
                </div>

                {/* Video Auto Switch */}
                <div className="cms-dropdown-row">
                  <label>Video auto switch</label>
                  <select
                    className="cms-select"
                    value={videoAutoSwitch}
                    onChange={(e) => setVideoAutoSwitch(e.target.value)}
                  >
                    <option value="Close">Close</option>
                    <option value="Open">Open</option>
                  </select>
                </div>

                {/* Power On State Dropdown */}
                <div className="cms-dropdown-row">
                  <label style={{ fontWeight: 600, color: '#f59e0b' }}>Power On State</label>
                  <select
                    className="cms-select"
                    value={powerOnState}
                    onChange={(e) => setPowerOnState(e.target.value)}
                  >
                    <option value="Track">Track (开机自启跟踪)</option>
                    <option value="Do not track">Do not track</option>
                  </select>
                </div>

                {/* USB Switch */}
                <div className="cms-dropdown-row">
                  <label>USB switch</label>
                  <select
                    className="cms-select"
                    value={usbSwitch}
                    onChange={(e) => setUsbSwitch(e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Close</option>
                  </select>
                </div>

                {/* Footer Buttons */}
                <div className="cms-settings-footer">
                  <button type="button" className="cms-btn cms-btn-tool" onClick={() => onShowToast?.('Refreshed')}>
                    Refresh
                  </button>
                  <button type="button" className="cms-btn cms-btn-primary" onClick={handleSaveBasic2}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="cms-btn cms-btn-tool"
                    onClick={() => {
                      setSidebarMode('ptz');
                      setSplitMode('4');
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            {/* TAB: Adv.1 / Adv.2 Placeholder */}
            {(settingsTab === 'Adv.1' || settingsTab === 'Adv.2') && (
              <div className="cms-settings-tab-body">
                <div style={{ color: '#94a3b8', fontSize: '12px', padding: '16px 8px' }}>
                  Advanced ONVIF profile and network streaming telemetry parameters configured automatically by LCS Video Station.
                </div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* CENTER / RIGHT: LIVE VIDEO CANVAS */}
      <main className="cms-canvas-area">
        {splitMode === '4' ? (
          /* 4-SPLIT VIDEO GRID */
          <div className="cms-video-grid cms-grid-4">
            {/* Tile 0: Teacher Close-up */}
            <div
              className={`cms-video-tile ${activeTileIndex === 0 ? 'is-active-tile' : ''}`}
              onClick={() => setActiveTileIndex(0)}
              onDoubleClick={() => setSplitMode('1')}
            >
              <img src={teacherClose} alt="Teacher Close-up" className="cms-tile-media" />
              <div className="cms-tile-osd">192.167.32.65 - Teacher Close-up</div>
              <div className="cms-tile-stats">1080P 30FPS</div>
            </div>

            {/* Tile 1: Teacher Panorama */}
            <div
              className={`cms-video-tile ${activeTileIndex === 1 ? 'is-active-tile' : ''}`}
              onClick={() => setActiveTileIndex(1)}
              onDoubleClick={() => setSplitMode('1')}
            >
              <img src={classroomFeed} alt="Teacher Panorama" className="cms-tile-media" />
              <div className="cms-tile-osd">192.167.32.65 - Teacher Panorama</div>
              <div className="cms-tile-stats">1080P 30FPS</div>
            </div>

            {/* Tile 2: Student Close-up */}
            <div
              className={`cms-video-tile ${activeTileIndex === 2 ? 'is-active-tile' : ''}`}
              onClick={() => setActiveTileIndex(2)}
              onDoubleClick={() => setSplitMode('1')}
            >
              <img src={studentClose} alt="Student Close-up" className="cms-tile-media" />
              <div className="cms-tile-osd">192.167.32.66 - Student Close-up</div>
              <div className="cms-tile-stats">1080P 30FPS</div>
            </div>

            {/* Tile 3: Student Panorama */}
            <div
              className={`cms-video-tile ${activeTileIndex === 3 ? 'is-active-tile' : ''}`}
              onClick={() => setActiveTileIndex(3)}
              onDoubleClick={() => setSplitMode('1')}
            >
              <img src={studentPanorama} alt="Student Panorama" className="cms-tile-media" />
              <div className="cms-tile-osd">192.167.32.66 - Student Panorama</div>
              <div className="cms-tile-stats">1080P 30FPS</div>
            </div>
          </div>
        ) : (
          /* 1-SPLIT FULL VIDEO WITH INTERACTIVE DRAWING LAYER */
          <div
            ref={canvasRef}
            className={`cms-single-viewport ${activeDrawTool ? 'is-crosshair' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img src={classroomFeed} alt="Live feed" className="cms-viewport-bg" />

            {/* Flash Effect on Snapshot */}
            {isFlash && <div className="cms-flash-overlay" />}

            {/* Existing Persistent Configured Zones */}
            {zones.lecturer && (
              <div
                className="cms-drawn-box is-lecturer"
                style={{
                  left: `${zones.lecturer.x}%`,
                  top: `${zones.lecturer.y}%`,
                  width: `${zones.lecturer.width}%`,
                  height: `${zones.lecturer.height}%`
                }}
              >
                <span className="cms-drawn-tag is-green">Lecturer Area</span>
              </div>
            )}

            {zones.blocking && (
              <div
                className="cms-drawn-box is-blocking"
                style={{
                  left: `${zones.blocking.x}%`,
                  top: `${zones.blocking.y}%`,
                  width: `${zones.blocking.width}%`,
                  height: `${zones.blocking.height}%`
                }}
              >
                <span className="cms-drawn-tag is-red">Blocking Zone 1</span>
              </div>
            )}

            {zones.preset && (
              <div
                className="cms-drawn-box is-preset"
                style={{
                  left: `${zones.preset.x}%`,
                  top: `${zones.preset.y}%`,
                  width: `${zones.preset.width}%`,
                  height: `${zones.preset.height}%`
                }}
              >
                <span className="cms-drawn-tag is-blue">Preset Zone 1</span>
              </div>
            )}

            {zones.bls && (
              <div
                className="cms-drawn-box is-bls"
                style={{
                  left: `${zones.bls.x}%`,
                  top: `${zones.bls.y}%`,
                  width: `${zones.bls.width}%`,
                  height: `${zones.bls.height}%`
                }}
              >
                <span className="cms-drawn-tag is-yellow">BLS Blackboard Zone</span>
              </div>
            )}

            {/* Active Drawing Preview Box */}
            {tempBox && (
              <div
                className={`cms-drawn-box is-${activeDrawTool || 'lecturer'}`}
                style={{
                  left: `${tempBox.x}%`,
                  top: `${tempBox.y}%`,
                  width: `${tempBox.width}%`,
                  height: `${tempBox.height}%`
                }}
              />
            )}

            {/* In-viewport drawing hint badge */}
            {activeDrawTool && (
              <div className="cms-draw-hint-badge">
                <span>Drag mouse on screen to draw <strong>{activeDrawTool.toUpperCase()}</strong> zone</span>
              </div>
            )}

            <div className="cms-tile-osd">
              {selectedCameraId === '1' ? '192.167.32.65 - Teacher Tracking' : '192.167.32.66 - Student Tracking'}
            </div>
          </div>
        )}

        {/* BOTTOM VIDEO STATUS TOOLBAR */}
        <div className="cms-video-toolbar">
          <div className="cms-toolbar-left">
            <span className="cms-stream-telemetry">
              1920*1080 30.0fps 3.852Mbps (H.264 Main Profile)
            </span>
          </div>

          <div className="cms-toolbar-right">
            {/* Snapshot Button */}
            <button
              type="button"
              className="cms-tool-icon-btn"
              title="Capture Snapshot"
              onClick={handleTakeSnapshot}
            >
              <Camera size={14} />
            </button>

            {/* Record Button */}
            <button
              type="button"
              className={`cms-tool-icon-btn ${isRecording ? 'is-recording-red' : ''}`}
              title={isRecording ? 'Stop Recording' : 'Start Recording'}
              onClick={handleToggleRecord}
            >
              <Video size={14} />
            </button>

            {/* Split Screen Selectors */}
            <div className="cms-split-btn-group">
              <button
                type="button"
                className={`cms-split-btn ${splitMode === '1' ? 'is-active' : ''}`}
                onClick={() => setSplitMode('1')}
                title="Single View"
              >
                <Square size={12} />
              </button>
              <button
                type="button"
                className={`cms-split-btn ${splitMode === '4' ? 'is-active' : ''}`}
                onClick={() => setSplitMode('4')}
                title="4-Split Grid"
              >
                <Grid size={12} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Modals */}
      <CloseUpSettingsModal
        isOpen={isCloseUpModalOpen}
        targetType={closeUpTarget}
        title={
          closeUpTarget === 'blackboard_left' ? 'Left Blackboard Settings' :
          closeUpTarget === 'blackboard_right' ? 'Right Blackboard Settings' :
          'Close-up Settings'
        }
        onClose={() => setIsCloseUpModalOpen(false)}
        onSave={() => {
          onShowToast?.(`${closeUpTarget} framing set successfully!`);
          setIsCloseUpModalOpen(false);
        }}
      />

      <DualCmosModal
        isOpen={isDualCmosOpen}
        onClose={() => setIsDualCmosOpen(false)}
        onConfirm={() => {
          onShowToast?.('Dual CMOS electronic center calibrated!');
          setIsDualCmosOpen(false);
        }}
      />
    </div>
  );
}
