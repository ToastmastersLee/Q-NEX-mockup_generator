import { useState, useRef } from 'react';
import { 
  Check, 
  Square, 
  HelpCircle,
  Minus,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PtzControlModal } from './PtzControlModal';

// High-resolution screenshots of the authentic system UI
import img02StartSearch from '../assets/02_start_search.png';
import img02SearchCompleted from '../assets/02_search_completed.png';
import img04AddToClient from '../assets/04_add_to_client.png';
import img05MainView from '../assets/05_main_view_close_up_panorama.png';
import img06TeacherStop from '../assets/06_teacher_camera_presets_stop.png';
import img07TargetLost from '../assets/07_target_lost_action.jpeg';
import img08LecturerArea from '../assets/08_lecturer_area_setting.png';
import img09BlockingZone from '../assets/09_blocking_zone.png';
import img10PresetZone from '../assets/10_preset_zone.png';
import img11TrackingScreen from '../assets/11_tracking_screen_close_up.png';
import img12BlsZone from '../assets/12_bls_zone_blackboard.png';
import img13LeftBlackboard from '../assets/13_left_blackboard_settings.png';
import img14RightBlackboard from '../assets/14_right_blackboard_settings.png';
import img15StudentStop from '../assets/15_student_camera_presets_stop.png';
import img16StudentBlocking from '../assets/16_student_blocking_zone.png';
import img17DualCmos from '../assets/17_dual_cmos_calibration.jpeg';
import img18PowerOnState from '../assets/18_power_on_state.png';

export function InteractiveCanvas({
  step,
  lang,
  onActionComplete
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(step.id > 2);
  const [isTrackingStopped, setIsTrackingStopped] = useState(step.id > 5);

  // Sub-view toggle states for multi-screen steps
  const [step5View, setStep5View] = useState('presets'); // 'presets' | 'settings'
  const [step8View, setStep8View] = useState('zone'); // 'zone' | 'modal'
  const [step9View, setStep9View] = useState('overview'); // 'overview' | 'left' | 'right'
  const [step10View, setStep10View] = useState('stop'); // 'stop' | 'blocking'

  const [isPtzOpen, setIsPtzOpen] = useState(false);
  const [ptzTitle, setPtzTitle] = useState('');

  // Zone drawing state for Steps 6-10
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState(null);
  const [customZones, setCustomZones] = useState({});

  // Toast
  const [toast, setToast] = useState(null);
  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  // STEP 2: Start search action
  const handleStartSearch = () => {
    setIsSearching(true);
    triggerToast(lang === 'zh' ? '正在扫描局域网 192.167.32.0/24...' : 'Scanning LAN 192.167.32.0/24...');
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      onActionComplete('c1');
      onActionComplete('c2');
      onActionComplete('c3');
      triggerToast(lang === 'zh' ? '搜索完成！发现 2 台在线摄像机 (192.167.32.65 / 66)' : 'Found 2 online cameras: 192.167.32.65, 192.167.32.66');
    }, 1100);
  };

  // Canvas drawing for steps 6-10
  const handleMouseDown = (e) => {
    if (!['draw_zone', 'draw_zone_with_ptz', 'blackboard_setup', 'student_setup'].includes(step.interactiveType)) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    const width = Math.abs(currentX - startPos.x);
    const height = Math.abs(currentY - startPos.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentBox) return;
    setIsDrawing(false);

    if (currentBox.width > 4 && currentBox.height > 4) {
      setCustomZones(prev => ({
        ...prev,
        [step.id]: currentBox
      }));
      if (step.id === 6) onActionComplete('c2');
      if (step.id === 7) onActionComplete('c2');
      if (step.id === 8) onActionComplete('c1');
      if (step.id === 9) onActionComplete('c1');
      if (step.id === 10) onActionComplete('c3');
      triggerToast(lang === 'zh' ? '区域绘制完成，请点击【Save】保存' : 'Zone drawn! Click Save to apply');
    }
    setCurrentBox(null);
  };

  return (
    <section className="cv870-canvas-workspace">
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'absolute',
          top: '18px',
          background: '#059669',
          color: '#ffffff',
          padding: '8px 18px',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '13px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
          zIndex: 120,
          border: '1px solid rgba(255,255,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={14} />
          <span>{toast}</span>
        </div>
      )}

      {/* 100% AUTHENTIC SYSTEM UI WORKSPACE */}
      <div className="cv870-virtual-window">
        {/* Windows System Titlebar ONLY for Step 1 (Steps 2-12 have native titlebar embedded in the authentic screenshot) */}
        {step.id === 1 && (
          <div className="cv870-window-titlebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#e5e7eb', fontWeight: 'bold' }}>
                Windows Network Configuration
              </span>
            </div>
            <div className="cv870-win-btn-group">
              <span style={{ opacity: 0.8, fontSize: '10px' }}>192.167.32.0/24</span>
              <span className="cv870-win-ctrl-btn" title="Help"><HelpCircle size={11} /></span>
              <span className="cv870-win-ctrl-btn" title="Minimize"><Minus size={11} /></span>
              <span className="cv870-win-ctrl-btn" title="Maximize"><Square size={10} /></span>
              <span className="cv870-win-ctrl-btn is-close" title="Close"><X size={12} /></span>
            </div>
          </div>
        )}

        {/* STEP 1: AUTHENTIC WINDOWS TCP/IPv4 PROPERTIES + LCS STATION REAR PANEL */}
        {step.id === 1 && (
          <div style={{
            background: '#1f2430',
            padding: '28px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '36px',
            minHeight: '520px'
          }}>
            {/* Windows 10/11 IPv4 Properties Dialog */}
            <div className="cv870-ipv4-dialog">
              <div className="cv870-ipv4-titlebar">
                <span>Internet Protocol Version 4 (TCP/IPv4) Properties</span>
                <span style={{ cursor: 'pointer', color: '#666' }}>✕</span>
              </div>
              <div className="cv870-ipv4-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <input type="radio" checked readOnly />
                  <label style={{ fontWeight: 600 }}>Use the following IP address:</label>
                </div>

                <div className="cv870-ipv4-field">
                  <span>IP address:</span>
                  <div className="cv870-ip-box">
                    <input className="cv870-ip-octet" value="192" readOnly />.
                    <input className="cv870-ip-octet" value="167" readOnly />.
                    <input className="cv870-ip-octet" value="32" readOnly />.
                    <input className="cv870-ip-octet" value="100" style={{ fontWeight: 'bold', color: '#0078d7' }} readOnly />
                  </div>
                </div>

                <div className="cv870-ipv4-field">
                  <span>Subnet mask:</span>
                  <div className="cv870-ip-box">
                    <input className="cv870-ip-octet" value="255" readOnly />.
                    <input className="cv870-ip-octet" value="255" readOnly />.
                    <input className="cv870-ip-octet" value="255" readOnly />.
                    <input className="cv870-ip-octet" value="0" readOnly />
                  </div>
                </div>

                <div className="cv870-ipv4-field">
                  <span>Default gateway:</span>
                  <div className="cv870-ip-box">
                    <input className="cv870-ip-octet" value="192" readOnly />.
                    <input className="cv870-ip-octet" value="167" readOnly />.
                    <input className="cv870-ip-octet" value="32" readOnly />.
                    <input className="cv870-ip-octet" value="248" readOnly />
                  </div>
                </div>
              </div>

              <div className="cv870-ipv4-footer">
                <button
                  type="button"
                  className="cv870-win-dialog-btn is-default"
                  onClick={() => {
                    onActionComplete('c1');
                    onActionComplete('c2');
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? 'PC 静态网卡参数已确认！' : 'PC static IP settings confirmed!');
                  }}
                >
                  OK
                </button>
                <button type="button" className="cv870-win-dialog-btn">Cancel</button>
              </div>
            </div>

            {/* LCS Video Station POE3 Wiring Card */}
            <div style={{
              background: '#2b313f',
              border: '1px solid #475569',
              borderRadius: '6px',
              padding: '18px',
              width: '320px',
              color: '#e2e8f0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.45)'
            }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#60a5fa', marginBottom: '10px' }}>
                LCS Video Station - Physical Wiring
              </div>
              <div style={{ fontSize: '12px', lineHeight: '1.7', color: '#cbd5e1', marginBottom: '16px' }}>
                <div>• Station Virtual IP: <strong>192.167.32.1</strong></div>
                <div>• Connection Port: <strong style={{ color: '#f59e0b' }}>POE3 Port</strong></div>
                <div>• Physical Cable: RJ45 to PC Ethernet NIC</div>
              </div>

              <button
                type="button"
                className="cv870-btn-next"
                style={{ width: '100%', padding: '9px 12px' }}
                onClick={() => {
                  onActionComplete('c4');
                  triggerToast(lang === 'zh' ? '网线已确认插入 POE3 网口！' : 'RJ45 connected to POE3 port!');
                }}
              >
                <Check size={15} />
                <span>{lang === 'zh' ? '确认已插入 POE3 网口' : 'Confirm POE3 Cable Connected'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 100% AUTHENTIC CAMERACMS - START SEARCH */}
        {step.id === 2 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={hasSearched ? img02SearchCompleted : img02StartSearch}
              alt="CameraCMS - Start search"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Clickable Hotspot on the Red-Boxed "Start search" button */}
            {!hasSearched ? (
              <div
                className="cv870-hotspot-target"
                style={{
                  left: '44.73%',
                  top: '72.75%',
                  width: '11.33%',
                  height: '5.59%'
                }}
                onClick={handleStartSearch}
                title="Click Start search"
              >
                <span className="cv870-hotspot-badge">CLICK</span>
              </div>
            ) : (
              /* Hotspot on discovered cameras in search results table */
              <div
                className="cv870-hotspot-target"
                style={{
                  left: '5.20%',
                  top: '81.20%',
                  width: '83.50%',
                  height: '10.50%'
                }}
                onClick={() => {
                  onActionComplete('c3');
                  triggerToast(lang === 'zh' ? '已确认发现 192.167.32.65 与 192.167.32.66' : 'Discovered 192.167.32.65 and 192.167.32.66');
                }}
                title="Discovered Cameras"
              >
                <span className="cv870-hotspot-badge" style={{ background: '#10b981' }}>DISCOVERED</span>
              </div>
            )}

            {/* Scanning animation overlay */}
            {isSearching && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.65)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                backdropFilter: 'blur(2px)',
                zIndex: 40
              }}>
                <div className="lcs-spinner-ring large" />
                <span>{lang === 'zh' ? '正在扫描局域网摄像机设备 (192.167.32.0/24)...' : 'Scanning LAN cameras...'}</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: 100% AUTHENTIC CAMERACMS - ADD TO CLIENT DIALOG */}
        {step.id === 3 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={img04AddToClient}
              alt="CameraCMS - Add to client"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Hotspot 1: Select camera row (Box 1) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '1.60%',
                top: '86.25%',
                width: '16.99%',
                height: '4.43%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已勾选目标摄像机 192.167.32.66' : 'Selected camera 192.167.32.66');
              }}
              title="Select Camera"
            >
              <span className="cv870-hotspot-badge">1</span>
            </div>

            {/* Hotspot 2: "+ Add to client" button (Box 2) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.34%',
                top: '74.24%',
                width: '11.61%',
                height: '4.31%'
              }}
              onClick={() => {
                onActionComplete('c2');
                triggerToast(lang === 'zh' ? '点击 + Add to client 打开配置弹窗' : 'Opened Add to client modal');
              }}
              title="+ Add to client"
            >
              <span className="cv870-hotspot-badge">2</span>
            </div>

            {/* Hotspot 3: "Add" button inside modal (Box 3) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '40.54%',
                top: '62.00%',
                width: '10.77%',
                height: '3.38%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                triggerToast(lang === 'zh' ? '摄像机已成功添加至客户端！' : 'Camera added to client device list!');
              }}
              title="Click Add"
            >
              <span className="cv870-hotspot-badge">3. ADD</span>
            </div>
          </div>
        )}

        {/* STEP 4: 100% AUTHENTIC CAMERACMS - MAIN VIEW DUAL STREAMS */}
        {step.id === 4 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={img05MainView}
              alt="CameraCMS - Main View Dual Streams"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Hotspot 1: Main View tab (Box 1) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '17.72%',
                top: '4.69%',
                width: '12.26%',
                height: '5.28%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已进入 Main View 预览选项卡' : 'Main View tab selected');
              }}
              title="Main View Tab"
            >
              <span className="cv870-hotspot-badge">1</span>
            </div>

            {/* Hotspot 2: Device tree item (Box 2) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.50%',
                top: '15.49%',
                width: '12.01%',
                height: '7.51%'
              }}
              onClick={() => {
                onActionComplete('c2');
                triggerToast(lang === 'zh' ? '右键点击设备节点打开流菜单' : 'Right-clicked camera node');
              }}
              title="Camera Node"
            >
              <span className="cv870-hotspot-badge">2</span>
            </div>

            {/* Hotspot 3: Context menu streams (Box 3) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '6.72%',
                top: '15.49%',
                width: '18.22%',
                height: '7.51%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                triggerToast(lang === 'zh' ? '特写与全景视频流已成功加载！' : 'Dual streams opened in Main View!');
              }}
              title="Select close-up & panorama"
            >
              <span className="cv870-hotspot-badge">3. SELECT</span>
            </div>
          </div>
        )}

        {/* STEP 5: 100% AUTHENTIC CAMERACMS - STOP TRACKING & TARGET LOST ACTION */}
        {step.id === 5 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={step5View === 'settings' ? img07TargetLost : img06TeacherStop}
              alt="CameraCMS - Teacher Stop & Settings"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {step5View === 'presets' ? (
              <>
                {/* Hotspot: Stop Tracking (Box 1) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '4.99%',
                    top: '90.15%',
                    width: '6.39%',
                    height: '8.60%'
                  }}
                  onClick={() => {
                    setIsTrackingStopped(true);
                    onActionComplete('c1');
                    triggerToast(lang === 'zh' ? '已停止跟踪 (Tracking Stopped) ✓' : 'Tracking Stopped ✓');
                  }}
                  title="Click Stop Tracking"
                >
                  <span className="cv870-hotspot-badge">1. STOP</span>
                </div>

                {/* Hotspot: Presets 1/0 (Box 3) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.50%',
                    top: '83.63%',
                    width: '6.39%',
                    height: '9.57%'
                  }}
                  onClick={() => {
                    onActionComplete('c2');
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? 'Preset 1（特写）与 Preset 0（回位全景）已保存！' : 'Presets 1/0 configured!');
                  }}
                  title="Set Presets 1 and 0"
                >
                  <span className="cv870-hotspot-badge">2. PRESETS</span>
                </div>

                {/* Hotspot: Settings button (Box 2) -> switch to settings view */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '12.18%',
                    top: '90.15%',
                    width: '8.48%',
                    height: '9.02%'
                  }}
                  onClick={() => {
                    setStep5View('settings');
                    triggerToast(lang === 'zh' ? '进入摄像机 Settings -> Basic2 页面' : 'Navigated to Settings -> Basic2');
                  }}
                  title="Click Settings"
                >
                  <span className="cv870-hotspot-badge">3. SETTINGS</span>
                </div>
              </>
            ) : (
              /* Settings View: Target Lost Action */
              <>
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.40%',
                    top: '54.20%',
                    width: '19.40%',
                    height: '14.80%'
                  }}
                  onClick={() => {
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? '目标丢失动作已设定为 No. 0 preset！' : 'Target lost action set to No. 0 preset!');
                  }}
                  title="Select No. 0 preset"
                >
                  <span className="cv870-hotspot-badge">NO. 0 PRESET</span>
                </div>

                {/* Hotspot: Save in Settings */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '5.10%',
                    top: '96.20%',
                    width: '3.60%',
                    height: '3.20%'
                  }}
                  onClick={() => {
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? 'Basic2 参数保存成功！' : 'Basic2 settings saved!');
                  }}
                  title="Save"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            )}

            {/* Sub-view toggle footer */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              background: 'rgba(0,0,0,0.82)',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              gap: '6px',
              zIndex: 36,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step5View === 'presets' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep5View('presets')}
              >
                1. Main View (Stop/Presets)
              </button>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step5View === 'settings' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep5View('settings')}
              >
                2. Basic2 (Target Lost)
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: 100% AUTHENTIC CAMERACMS - LECTURER AREA SETTING */}
        {step.id === 6 && (
          <div
            ref={canvasRef}
            style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353', cursor: 'crosshair' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img
              src={img08LecturerArea}
              alt="CameraCMS - Lecturer Area"
              style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
            />

            {/* Hotspot on Lecturer Button (Box 1) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.18%',
                top: '38.69%',
                width: '9.09%',
                height: '5.44%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已激活【Lecturer】讲师区域绘制模式' : 'Lecturer zone mode activated');
              }}
              title="Click Lecturer"
            >
              <span className="cv870-hotspot-badge">1. LECTURER</span>
            </div>

            {/* Hotspot on Save Button (Box 3) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '7.07%',
                top: '92.67%',
                width: '7.35%',
                height: '4.80%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                triggerToast(lang === 'zh' ? '讲师区域配置已保存生效！' : 'Lecturer area saved successfully!');
              }}
              title="Click Save"
            >
              <span className="cv870-hotspot-badge">3. SAVE</span>
            </div>

            {/* Custom user drawn box */}
            {customZones[6] && (
              <div
                className="cv870-drawn-box"
                style={{
                  left: `${customZones[6].x}%`,
                  top: `${customZones[6].y}%`,
                  width: `${customZones[6].width}%`,
                  height: `${customZones[6].height}%`,
                  borderColor: '#22c55e'
                }}
              >
                <span className="cv870-drawn-box-tag" style={{ background: '#22c55e' }}>
                  Lecturer Area (Custom)
                </span>
              </div>
            )}

            {currentBox && (
              <div
                className="cv870-drawn-box"
                style={{
                  left: `${currentBox.x}%`,
                  top: `${currentBox.y}%`,
                  width: `${currentBox.width}%`,
                  height: `${currentBox.height}%`,
                  borderColor: '#22c55e'
                }}
              />
            )}
          </div>
        )}

        {/* STEP 7: 100% AUTHENTIC CAMERACMS - BLOCKING ZONE */}
        {step.id === 7 && (
          <div
            ref={canvasRef}
            style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353', cursor: 'crosshair' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img
              src={img09BlockingZone}
              alt="CameraCMS - Blocking Zone"
              style={{ width: '100%', height: 'auto', display: 'block', pointerEvents: 'none' }}
            />

            {/* Hotspot on Blocking zone 1 checkbox (Box 1) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.41%',
                top: '44.33%',
                width: '10.56%',
                height: '9.47%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已勾选【Blocking zone 1】屏蔽区' : 'Blocking zone 1 selected');
              }}
              title="Click Blocking zone 1"
            >
              <span className="cv870-hotspot-badge">1. BLOCKING</span>
            </div>

            {/* Hotspot on Save Button (Box 3) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '7.76%',
                top: '94.40%',
                width: '7.35%',
                height: '4.73%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                triggerToast(lang === 'zh' ? '屏蔽区设置已成功保存！' : 'Blocking zone saved successfully!');
              }}
              title="Click Save"
            >
              <span className="cv870-hotspot-badge">3. SAVE</span>
            </div>

            {/* Custom user drawn box */}
            {customZones[7] && (
              <div
                className="cv870-drawn-box"
                style={{
                  left: `${customZones[7].x}%`,
                  top: `${customZones[7].y}%`,
                  width: `${customZones[7].width}%`,
                  height: `${customZones[7].height}%`,
                  borderColor: '#ef4444'
                }}
              >
                <span className="cv870-drawn-box-tag" style={{ background: '#ef4444' }}>
                  Blocking Zone
                </span>
              </div>
            )}

            {currentBox && (
              <div
                className="cv870-drawn-box"
                style={{
                  left: `${currentBox.x}%`,
                  top: `${currentBox.y}%`,
                  width: `${currentBox.width}%`,
                  height: `${currentBox.height}%`,
                  borderColor: '#ef4444'
                }}
              />
            )}
          </div>
        )}

        {/* STEP 8: 100% AUTHENTIC CAMERACMS - PRESET ZONE & CLOSE-UP SETTINGS */}
        {step.id === 8 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={step8View === 'modal' ? img11TrackingScreen : img10PresetZone}
              alt="CameraCMS - Preset Zone & Close-up"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {step8View === 'zone' ? (
              <>
                {/* Hotspot on Preset zone 1 (Box 1) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.47%',
                    top: '46.93%',
                    width: '5.39%',
                    height: '6.15%'
                  }}
                  onClick={() => {
                    onActionComplete('c1');
                    triggerToast(lang === 'zh' ? '已勾选【Preset zone 1】' : 'Preset zone 1 selected');
                  }}
                  title="Preset zone 1"
                >
                  <span className="cv870-hotspot-badge">1</span>
                </div>

                {/* Hotspot on Set Button to open Close-up Settings modal */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '1.39%',
                    top: '62.64%',
                    width: '4.39%',
                    height: '7.18%'
                  }}
                  onClick={() => {
                    setStep8View('modal');
                    onActionComplete('c2');
                    triggerToast(lang === 'zh' ? '打开 Close-up Settings 特写微调弹窗' : 'Close-up Settings modal opened');
                  }}
                  title="Click Set"
                >
                  <span className="cv870-hotspot-badge">2. SET</span>
                </div>

                {/* Hotspot on Save Button (Box 3) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '8.21%',
                    top: '92.39%',
                    width: '7.50%',
                    height: '6.96%'
                  }}
                  onClick={() => {
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? '讲桌预置区已保存！' : 'Preset zone saved!');
                  }}
                  title="Save"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            ) : (
              /* Modal Dialog View (img11) */
              <>
                {/* Hotspot on PTZ Direction Arrows (Box 2) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '48.09%',
                    top: '22.19%',
                    width: '11.91%',
                    height: '15.82%'
                  }}
                  onClick={() => {
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '调整云台上下左右角度' : 'PTZ directions adjusted');
                  }}
                  title="PTZ Direction Arrows"
                >
                  <span className="cv870-hotspot-badge">PTZ</span>
                </div>

                {/* Hotspot on Zoom (+ / -) (Box 3) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '57.80%',
                    top: '22.19%',
                    width: '9.60%',
                    height: '8.65%'
                  }}
                  onClick={() => {
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '变倍微调教师半身画面' : 'Zoom +/- adjusted');
                  }}
                  title="Zoom +/-"
                >
                  <span className="cv870-hotspot-badge">ZOOM</span>
                </div>

                {/* Hotspot on Modal Set Button (Box 4) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '53.06%',
                    top: '48.94%',
                    width: '10.64%',
                    height: '6.20%'
                  }}
                  onClick={() => {
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '特写位置已确认 (Set)！' : 'Close-up position set!');
                  }}
                  title="Confirm Set"
                >
                  <span className="cv870-hotspot-badge">SET</span>
                </div>

                {/* Hotspot on Save Button (Box 5) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '8.09%',
                    top: '92.17%',
                    width: '5.90%',
                    height: '7.18%'
                  }}
                  onClick={() => {
                    onActionComplete('c1');
                    onActionComplete('c2');
                    onActionComplete('c3');
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? '讲桌特写参数全部保存生效！' : 'Preset close-up settings saved!');
                  }}
                  title="Save"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            )}

            {/* Sub-view toggle footer */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              background: 'rgba(0,0,0,0.82)',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              gap: '6px',
              zIndex: 36,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step8View === 'zone' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep8View('zone')}
              >
                1. Preset Zone
              </button>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step8View === 'modal' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep8View('modal')}
              >
                2. Close-up Settings
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: 100% AUTHENTIC CAMERACMS - BLS BLACKBOARD SETTINGS */}
        {step.id === 9 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={
                step9View === 'left' ? img13LeftBlackboard :
                step9View === 'right' ? img14RightBlackboard :
                img12BlsZone
              }
              alt="CameraCMS - BLS Blackboard Settings"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {step9View === 'overview' && (
              <>
                {/* Hotspot: Set Left Blackboard */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.88%',
                    top: '70.23%',
                    width: '5.61%',
                    height: '12.98%'
                  }}
                  onClick={() => {
                    setStep9View('left');
                    onActionComplete('c1');
                    triggerToast(lang === 'zh' ? '进入左侧黑板特写微调 (Left Blackboard Settings)' : 'Left Blackboard modal opened');
                  }}
                  title="Set Left Blackboard"
                >
                  <span className="cv870-hotspot-badge">LEFT SET</span>
                </div>

                {/* Hotspot: Set Right Blackboard */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '5.25%',
                    top: '75.80%',
                    width: '4.92%',
                    height: '8.88%'
                  }}
                  onClick={() => {
                    setStep9View('right');
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '进入右侧黑板特写微调 (Right Blackboard Settings)' : 'Right Blackboard modal opened');
                  }}
                  title="Set Right Blackboard"
                >
                  <span className="cv870-hotspot-badge">RIGHT SET</span>
                </div>
              </>
            )}

            {step9View === 'left' && (
              <>
                {/* Hotspot on PTZ Direction / Zoom */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '48.50%',
                    top: '20.49%',
                    width: '19.82%',
                    height: '18.20%'
                  }}
                  onClick={() => {
                    triggerToast(lang === 'zh' ? '微调左侧黑板拍摄范围' : 'Adjusted Left Blackboard PTZ');
                  }}
                  title="PTZ Controls"
                >
                  <span className="cv870-hotspot-badge">PTZ</span>
                </div>

                {/* Hotspot on Modal Set Button */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '53.82%',
                    top: '48.62%',
                    width: '10.30%',
                    height: '5.96%'
                  }}
                  onClick={() => {
                    onActionComplete('c1');
                    triggerToast(lang === 'zh' ? '左侧黑板特写已确认 (Set)！' : 'Left Blackboard Set!');
                  }}
                  title="Set"
                >
                  <span className="cv870-hotspot-badge">SET</span>
                </div>

                {/* Hotspot on Save Button */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '7.75%',
                    top: '93.58%',
                    width: '8.31%',
                    height: '4.74%'
                  }}
                  onClick={() => {
                    onActionComplete('c2');
                    triggerToast(lang === 'zh' ? '左侧黑板配置已保存！' : 'Left Blackboard settings saved!');
                  }}
                  title="Save"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            )}

            {step9View === 'right' && (
              <>
                {/* Hotspot on PTZ Direction / Zoom */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '48.09%',
                    top: '20.37%',
                    width: '19.45%',
                    height: '16.85%'
                  }}
                  onClick={() => {
                    triggerToast(lang === 'zh' ? '微调右侧黑板拍摄范围' : 'Adjusted Right Blackboard PTZ');
                  }}
                  title="PTZ Controls"
                >
                  <span className="cv870-hotspot-badge">PTZ</span>
                </div>

                {/* Hotspot on Modal Set Button */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '54.10%',
                    top: '47.78%',
                    width: '7.43%',
                    height: '6.28%'
                  }}
                  onClick={() => {
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '右侧黑板特写已确认 (Set)！' : 'Right Blackboard Set!');
                  }}
                  title="Set"
                >
                  <span className="cv870-hotspot-badge">SET</span>
                </div>

                {/* Hotspot on Save Button */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '7.43%',
                    top: '92.96%',
                    width: '8.09%',
                    height: '5.51%'
                  }}
                  onClick={() => {
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? '右侧黑板配置已保存！' : 'Right Blackboard settings saved!');
                  }}
                  title="Save"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            )}

            {/* Sub-view toggle footer */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              background: 'rgba(0,0,0,0.82)',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              gap: '6px',
              zIndex: 36,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step9View === 'overview' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep9View('overview')}
              >
                BLS Zone
              </button>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step9View === 'left' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep9View('left')}
              >
                Left Blackboard
              </button>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step9View === 'right' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep9View('right')}
              >
                Right Blackboard
              </button>
            </div>
          </div>
        )}

        {/* STEP 10: 100% AUTHENTIC CAMERACMS - STUDENT CAMERA TRACKING */}
        {step.id === 10 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={step10View === 'blocking' ? img16StudentBlocking : img15StudentStop}
              alt="CameraCMS - Student Camera Tracking"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {step10View === 'stop' ? (
              <>
                {/* Hotspot 1: Select camera node (Box 1) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.60%',
                    top: '15.26%',
                    width: '13.47%',
                    height: '4.30%'
                  }}
                  onClick={() => {
                    onActionComplete('c1');
                    triggerToast(lang === 'zh' ? '已选择学生机 (Student Camera)' : 'Student camera selected');
                  }}
                  title="Select Student Camera"
                >
                  <span className="cv870-hotspot-badge">1</span>
                </div>

                {/* Hotspot 2: Stop button (Box 4) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '4.99%',
                    top: '90.15%',
                    width: '6.39%',
                    height: '8.60%'
                  }}
                  onClick={() => {
                    onActionComplete('c2');
                    triggerToast(lang === 'zh' ? '学生机跟踪已停止！' : 'Student camera tracking stopped!');
                  }}
                  title="Stop Tracking"
                >
                  <span className="cv870-hotspot-badge">2. STOP</span>
                </div>

                {/* Hotspot 3: Presets 1 & Set (Boxes 2 & 3) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '0.50%',
                    top: '83.63%',
                    width: '17.37%',
                    height: '10.55%'
                  }}
                  onClick={() => {
                    onActionComplete('c3');
                    triggerToast(lang === 'zh' ? '学生全景预置位 1 已保存！' : 'Student Preset 1 configured!');
                  }}
                  title="Set Preset 1"
                >
                  <span className="cv870-hotspot-badge">3. PRESET 1</span>
                </div>

                {/* Hotspot 4: Setting button (Box 5) */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '12.18%',
                    top: '90.15%',
                    width: '8.48%',
                    height: '9.02%'
                  }}
                  onClick={() => {
                    setStep10View('blocking');
                    triggerToast(lang === 'zh' ? '进入学生机防干扰屏蔽区配置' : 'Navigated to Student Blocking Zone');
                  }}
                  title="Settings"
                >
                  <span className="cv870-hotspot-badge">4. SETTING</span>
                </div>
              </>
            ) : (
              /* Student Blocking Zone View */
              <>
                {/* Hotspot: Save Student Blocking Zone */}
                <div
                  className="cv870-hotspot-target"
                  style={{
                    left: '7.46%',
                    top: '94.19%',
                    width: '7.35%',
                    height: '4.43%'
                  }}
                  onClick={() => {
                    onActionComplete('c1');
                    onActionComplete('c2');
                    onActionComplete('c3');
                    onActionComplete('c4');
                    triggerToast(lang === 'zh' ? '学生机窗外屏蔽与跟踪配置已生效！' : 'Student camera tracking finalized!');
                  }}
                  title="Save Student Settings"
                >
                  <span className="cv870-hotspot-badge">SAVE</span>
                </div>
              </>
            )}

            {/* Sub-view toggle footer */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              background: 'rgba(0,0,0,0.82)',
              borderRadius: '4px',
              padding: '4px 8px',
              display: 'flex',
              gap: '6px',
              zIndex: 36,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step10View === 'stop' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep10View('stop')}
              >
                1. Presets & Stop
              </button>
              <button
                type="button"
                className="cv870-action-btn"
                style={{
                  background: step10View === 'blocking' ? '#2563eb' : '#334155',
                  color: '#fff',
                  padding: '4px 10px',
                  fontSize: '11px'
                }}
                onClick={() => setStep10View('blocking')}
              >
                2. Window Shielding
              </button>
            </div>
          </div>
        )}

        {/* STEP 11: 100% AUTHENTIC CAMERACMS - DUAL CMOS CALIBRATION */}
        {step.id === 11 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={img17DualCmos}
              alt="CameraCMS - Dual CMOS Calibration"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Hotspot 1: Pos correct (Box 1) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.39%',
                top: '14.37%',
                width: '9.31%',
                height: '8.11%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已进入 Pos correct 双目传感器电子对齐模式' : 'Pos correct mode activated');
              }}
              title="Pos correct"
            >
              <span className="cv870-hotspot-badge">1. POS</span>
            </div>

            {/* Hotspot 2: Direction arrows (Box 2) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '8.34%',
                top: '10.47%',
                width: '12.77%',
                height: '15.09%'
              }}
              onClick={() => {
                onActionComplete('c2');
                triggerToast(lang === 'zh' ? 'CMOS 双目电子中心微调中...' : 'Adjusting dual CMOS centers');
              }}
              title="Direction Arrows"
            >
              <span className="cv870-hotspot-badge">2. ARROWS</span>
            </div>

            {/* Hotspot 3: OK Button (Box 3) */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '14.51%',
                top: '17.04%',
                width: '3.40%',
                height: '2.87%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                onActionComplete('c4');
                triggerToast(lang === 'zh' ? '双目 CMOS 电子对齐校准完成 (OK)！' : 'Dual CMOS Centers Calibrated!');
              }}
              title="Click OK"
            >
              <span className="cv870-hotspot-badge">3. OK</span>
            </div>
          </div>
        )}

        {/* STEP 12: 100% AUTHENTIC CAMERACMS - POWER ON STATE */}
        {step.id === 12 && (
          <div style={{ position: 'relative', width: '100%', lineHeight: 0, background: '#535353' }}>
            <img
              src={img18PowerOnState}
              alt="CameraCMS - Power On State"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />

            {/* Hotspot 1: Basic 2 tab */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '4.95%',
                top: '8.15%',
                width: '5.71%',
                height: '4.70%'
              }}
              onClick={() => {
                onActionComplete('c1');
                triggerToast(lang === 'zh' ? '已进入 Basic2 设置标签' : 'Basic2 tab selected');
              }}
              title="Basic 2"
            >
              <span className="cv870-hotspot-badge">1. BASIC2</span>
            </div>

            {/* Hotspot 2: Power On State: Track dropdown */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '0.11%',
                top: '67.40%',
                width: '10.87%',
                height: '4.70%'
              }}
              onClick={() => {
                onActionComplete('c2');
                onActionComplete('c3');
                triggerToast(lang === 'zh' ? 'Power on State 已选择为 Track（开机自启动跟踪）' : 'Power on State set to Track');
              }}
              title="Select Track"
            >
              <span className="cv870-hotspot-badge">2. TRACK</span>
            </div>

            {/* Hotspot 3: Save button */}
            <div
              className="cv870-hotspot-target"
              style={{
                left: '7.10%',
                top: '96.39%',
                width: '6.67%',
                height: '3.45%'
              }}
              onClick={() => {
                onActionComplete('c1');
                onActionComplete('c2');
                onActionComplete('c3');
                onActionComplete('c4');
                triggerToast(lang === 'zh' ? '开机状态已保存！CV870 跟踪全部配置完毕！' : 'Configuration finalized!');
              }}
              title="Click Save"
            >
              <span className="cv870-hotspot-badge">3. SAVE</span>
            </div>
          </div>
        )}
      </div>

      {/* PTZ Close-up Adjustment Modal (Optional custom overlay for further adjustment) */}
      <PtzControlModal
        isOpen={isPtzOpen}
        title={ptzTitle}
        lang={lang}
        onClose={() => setIsPtzOpen(false)}
        onSave={() => {
          triggerToast(lang === 'zh' ? '特写画面参数已保存！' : 'Close-up PTZ saved!');
        }}
      />
    </section>
  );
}
