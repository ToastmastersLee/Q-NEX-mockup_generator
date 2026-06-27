import { useState, Fragment } from 'react';
import {
  Home,
  RefreshCcw,
  Link,
  Settings,
  Lock,
  Unlock,
  Power,
  Volume2,
  VolumeX,
  Monitor,
  Laptop,
  Smartphone,
  Snowflake,
  Sun,
  Moon,
  Fan,
  Wind,
  Plus,
  Minus,
  Mic,
  Music,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Flame,
  Radio,
  CircleStop,
  Disc3,
} from 'lucide-react';
import {
  AirConditionerIcon,
  DocCamIcon,
  HdmiIcon,
  PowerControlIcon,
  ProjectorScreenIcon,
  RemoteControlIcon,
  SerialIcon,
  VideoSwitchIcon,
} from '../../assets/Icons';
import './styles.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'power', label: 'Power Control', icon: PowerControlIcon },
  { id: 'video', label: 'Video Switch', icon: VideoSwitchIcon },
  { id: 'serial', label: 'Serial Control', icon: SerialIcon },
  { id: 'volume', label: 'Vol.', icon: Volume2 },
  { id: 'air', label: 'Air Conditioner', icon: AirConditionerIcon },
  { id: 'remote', label: 'Remote Control', icon: RemoteControlIcon },
];

const defaultNavConfig = {
  power: true,
  video: true,
  volume: true,
  serial: true,
  air: true,
  projector: true,
  remote: true,
};

const menuConfigItems = [
  { id: 'power', label: 'Power Control' },
  { id: 'video', label: 'Video Switch' },
  { id: 'volume', label: 'Vol.' },
  { id: 'serial', label: 'Serial Control' },
  { id: 'air', label: 'Air Conditioner' },
  { id: 'projector', label: 'Projection Screen' },
  { id: 'remote', label: 'Remote Control' },
];

const inputOptions = [
  { id: 'ops', label: 'OPS', icon: DocCamIcon },
  { id: 'hdmi1', label: 'HDMI in 1', icon: Laptop },
  { id: 'hdmi2', label: 'HDMI in 2', icon: HdmiIcon },
];

const readQuery = (name) => new URLSearchParams(window.location.search).get(name);

function getInitialTab() {
  const tab = readQuery('tab');
  return navItems.some((item) => item.id === tab) ? tab : 'power';
}

function IconButton({ children, active, onClick, label, className = '' }) {
  return (
    <button className={`ndp-icon-btn ${active ? 'is-active' : ''} ${className}`} type="button" onClick={onClick} title={label} aria-label={label}>
      {children}
    </button>
  );
}

function Toggle({ checked, onClick }) {
  return (
    <button className={`ndp-toggle ${checked ? 'is-on' : ''}`} type="button" onClick={onClick} aria-pressed={checked}>
      <span />
    </button>
  );
}

function GlassPanel({ children, className = '' }) {
  return <section className={`ndp-panel ${className}`}>{children}</section>;
}

function SoftRow({ label, children, className = '', style }) {
  return (
    <div className={`ndp-soft-row ${className}`} style={style}>
      <span>{label}</span>
      <div className="ndp-soft-row-actions">{children}</div>
    </div>
  );
}

function SegButton({ children, active, onClick }) {
  return (
    <button className={`ndp-seg-button ${active ? 'is-active' : ''}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function TopTools({ onSettingsClick }) {
  return (
    <div className="ndp-top-tools">
      <IconButton label="Refresh"><RefreshCcw size={24} /></IconButton>
      <IconButton label="Bind"><Link size={23} /></IconButton>
      <IconButton label="Settings" onClick={onSettingsClick}><Settings size={24} /></IconButton>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, navConfig }) {
  const visibleItems = navItems.filter((item) => item.id === 'home' || navConfig[item.id]);

  return (
    <aside className="ndp-sidebar">
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button key={item.id} className={`ndp-nav-item ${active ? 'is-active' : ''}`} type="button" onClick={() => setActiveTab(item.id)}>
            <Icon className="ndp-nav-icon" strokeWidth={1.9} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}



function BottomDock({ locked, muted, setLocked, setMuted }) {
  return (
    <footer className="ndp-bottom-dock">
      <IconButton label={locked ? 'Unlock' : 'Lock'} onClick={() => setLocked(true)}>
        {locked ? <Unlock size={24} /> : <Lock size={24} />}
      </IconButton>
      <div className="ndp-dock-divider" />
      <button className={`ndp-volume-half is-left ${muted ? 'is-active' : ''}`} type="button" onClick={() => setMuted(true)} aria-label="Mute">
        <VolumeX size={25} />
      </button>
      <button className={`ndp-volume-half is-right ${!muted ? 'is-active' : ''}`} type="button" onClick={() => setMuted(false)} aria-label="Volume">
        <Volume2 size={25} />
      </button>
      <div className="ndp-dock-divider" />
      <IconButton label="Power" className="ndp-power-btn">
        <Power size={26} />
      </IconButton>
    </footer>
  );
}

function DisconnectedScreen() {
  return (
    <div className="ndp-disconnected-screen">
      <div className="ndp-disconnected-mark">
        <Link size={52} />
      </div>
      <strong>Disconnected</strong>
      <span>Please check the network connection and bind status</span>
    </div>
  );
}

function LockScreen({ setLocked }) {
  return (
    <div className="ndp-lock-screen">
      <div className="ndp-lock-brand">
        <span className="ndp-logo-mark" />
        <span>nex</span>
      </div>
      <div className="ndp-lock-time">
        <Lock size={17} />
        <strong>10:28</strong>
        <span>TUESDAY, 16 JUNE, 2026</span>
      </div>
      <button className="ndp-unlock-orb" type="button" onClick={() => setLocked(false)}>
        <Lock size={46} />
      </button>
    </div>
  );
}

function PowerPage() {
  const [displayPower, setDisplayPower] = useState(true);
  const [lightPower, setLightPower] = useState(true);

  return (
    <div className="ndp-page">
      <GlassPanel>
        <h2>NDP600</h2>
        <div className="ndp-power-list">
          <SoftRow label="power">
            <Toggle checked={displayPower} onClick={() => setDisplayPower((value) => !value)} />
          </SoftRow>
          <SoftRow label="Light">
            <Toggle checked={lightPower} onClick={() => setLightPower((value) => !value)} />
          </SoftRow>
        </div>
      </GlassPanel>
      <GlassPanel className="ndp-cbx-panel">
        <h2>CBX</h2>
        <div className="ndp-empty-state">Please bind CBX first and select Power Control</div>
      </GlassPanel>
    </div>
  );
}

function HomePage({ navConfig }) {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePress = (btn) => {
    setActiveBtn(btn);
    setTimeout(() => setActiveBtn(null), 200);
  };

  return (
    <div className="ndp-page">
      {navConfig.air && <AirPage compact />}
      {navConfig.projector && (
        <GlassPanel>
          <div className="ndp-section-title">
            <ProjectorScreenIcon />
            <h2>Projection<br />Screen</h2>
          </div>
          <div className="ndp-projector-box">
            <IconButton label="Up" active={activeBtn === 'up'} onClick={() => handlePress('up')}><ProjectorScreenIcon /></IconButton>
            <IconButton label="Stop" active={activeBtn === 'stop'} onClick={() => handlePress('stop')}><Monitor size={38} /></IconButton>
            <IconButton label="Down" active={activeBtn === 'down'} onClick={() => handlePress('down')}><ProjectorScreenIcon /></IconButton>
            <span>Up</span>
            <span>Stop</span>
            <span>Down</span>
          </div>
        </GlassPanel>
      )}
      {!navConfig.air && !navConfig.projector && (
        <GlassPanel className="ndp-cbx-panel">
          <div className="ndp-empty-state">No home modules selected</div>
        </GlassPanel>
      )}
    </div>
  );
}

function AirPage({ compact = false }) {
  const [enabled, setEnabled] = useState(true);
  const [temperature, setTemperature] = useState(26);
  const [mode, setMode] = useState('heat');
  const [fanSpeed, setFanSpeed] = useState('auto');
  const [swing, setSwing] = useState(true);

  if (compact) {
    return (
      <GlassPanel className="ndp-air-compact">
        <div className="ndp-air-head">
          <div className="ndp-section-title">
            <AirConditionerIcon />
            <h2>Air Conditioner</h2>
          </div>
          <button className="ndp-device-select" type="button">NDP600,CI <ChevronRight size={18} /></button>
        </div>
        <div className="ndp-onoff">
          <SegButton active={!enabled} onClick={() => setEnabled(false)}>OFF</SegButton>
          <SegButton active={enabled} onClick={() => setEnabled(true)}>ON</SegButton>
        </div>
        <div className="ndp-temp-row">
          <IconButton 
            label="Temperature up"
            onClick={() => enabled && setTemperature((prev) => Math.min(30, prev + 1))}
          >
            <Plus size={38} />
          </IconButton>
          <strong style={{ opacity: enabled ? 1 : 0.5, transition: 'opacity 0.2s' }}>{temperature}°C</strong>
          <IconButton 
            label="Temperature down"
            onClick={() => enabled && setTemperature((prev) => Math.max(16, prev - 1))}
          >
            <Minus size={38} />
          </IconButton>
        </div>
        <div 
          className="ndp-mode-bar"
          style={{ 
            opacity: enabled ? 1 : 0.5, 
            pointerEvents: enabled ? 'auto' : 'none',
            transition: 'opacity 0.2s'
          }}
        >
          {[
            ['heat', Sun],
            ['cool', Snowflake],
            ['fan', Fan],
            ['auto', Wind],
            ['eco', Disc3],
          ].map(([id, Icon]) => (
            <button 
              key={id} 
              className={mode === id ? 'is-active' : ''} 
              type="button" 
              onClick={() => enabled && setMode(id)}
            >
              <Icon size={30} />
            </button>
          ))}
        </div>
      </GlassPanel>
    );
  }

  // SVG parameters for 200px square
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const strokeWidth = 10;

  // Angles (135deg bottom-left to 405deg bottom-right)
  const startAngle = 135;
  const endAngle = 405;
  const angleRange = endAngle - startAngle;

  const minTemp = 16;
  const maxTemp = 30;
  const tempRange = maxTemp - minTemp;

  // Calculate current angle based on temperature
  const currentAngle = startAngle + ((temperature - minTemp) / tempRange) * angleRange;

  // Convert polar coordinates to Cartesian
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Generate SVG path for arc
  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  // Convert coordinates to angle
  const getAngleFromCoordinates = (x, y) => {
    const dx = x - center;
    const dy = y - center;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    return angle;
  };

  const handlePointerEvent = (e) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined || clientY === undefined) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    let angle = getAngleFromCoordinates(x, y);

    if (angle < 135) {
      if (angle < 45) {
        angle += 360;
      } else {
        angle = angle < 90 ? 405 : 135;
      }
    }

    const percentage = (angle - startAngle) / angleRange;
    const nextTemp = Math.round(minTemp + percentage * tempRange);
    setTemperature(Math.max(minTemp, Math.min(maxTemp, nextTemp)));
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    handlePointerEvent(e);
    const moveHandler = (moveEvent) => handlePointerEvent(moveEvent);
    const upHandler = () => {
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerup', upHandler);
    };
    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerup', upHandler);
  };

  const activeArc = describeArc(center, center, radius, startAngle, currentAngle);
  const trackArc = describeArc(center, center, radius, startAngle, endAngle);
  const thumbPos = polarToCartesian(center, center, radius, currentAngle);

  const getDialIcon = () => {
    switch (mode) {
      case 'heat':
        return <Flame size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} />;
      case 'cool':
        return <Snowflake size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#3b82f6' : '#a0aab8' }} />;
      case 'fan':
        return <Fan size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#10b981' : '#a0aab8' }} />;
      case 'dry':
        return <Wind size={32} className={`ndp-air-dial-icon ${enabled ? 'is-active' : ''}`} style={{ color: enabled ? '#a855f7' : '#a0aab8' }} />;
      default: // auto
        return <span className="font-extrabold text-[22px]" style={{ color: enabled ? '#3b82f6' : '#a0aab8' }}>A</span>;
    }
  };

  return (
    <div style={{ width: '100%', opacity: enabled ? 1 : 0.65, transition: 'opacity 0.2s' }}>
      {/* Top Left Dropdown Select */}
      <button className="ndp-air-device-select" type="button">
        <span>NDP600,CBX</span>
        <ChevronDown size={14} />
      </button>

      <GlassPanel style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 460 }}>
        {/* ON / OFF Segmented Switch */}
        <div className="ndp-air-power-toggle">
          <button type="button" className={!enabled ? 'is-active' : ''} onClick={() => setEnabled(false)}>OFF</button>
          <button type="button" className={enabled ? 'is-active' : ''} onClick={() => setEnabled(true)}>ON</button>
        </div>

        {/* Circular Temp Control Row */}
        <div className="ndp-air-temp-control" style={{ pointerEvents: enabled ? 'auto' : 'none' }}>
          {/* Left Plus increases temp */}
          <IconButton 
            label="Temp Up" 
            onClick={() => enabled && setTemperature(prev => Math.min(maxTemp, prev + 1))}
            style={{ width: 52, height: 52, borderRadius: '50%' }}
          >
            <Plus size={26} />
          </IconButton>

          {/* Dial Wrapper */}
          <div 
            className="ndp-air-dial-wrapper"
            onPointerDown={handlePointerDown}
            style={{ cursor: enabled ? 'pointer' : 'default' }}
          >
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {/* Background Track */}
              <path
                d={trackArc}
                fill="none"
                stroke="rgba(74, 106, 142, 0.22)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Active Blue Arc */}
              <path
                d={activeArc}
                fill="none"
                stroke={enabled ? '#127bff' : 'rgba(74, 106, 142, 0.4)'}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Thumb Dial Knob */}
              <circle
                cx={thumbPos.x}
                cy={thumbPos.y}
                r="9"
                fill="#ffffff"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
              />
            </svg>

            {/* Inner Dial Center Card */}
            <div className="ndp-air-dial-inner">
              {getDialIcon()}
              <strong className="ndp-air-dial-temp">{temperature}°C</strong>
            </div>
          </div>

          {/* Right Minus decreases temp */}
          <IconButton 
            label="Temp Down" 
            onClick={() => enabled && setTemperature(prev => Math.max(minTemp, prev - 1))}
            style={{ width: 52, height: 52, borderRadius: '50%' }}
          >
            <Minus size={26} />
          </IconButton>
        </div>

        {/* Modes Pill */}
        <div 
          className="ndp-air-modes"
          style={{ 
            pointerEvents: enabled ? 'auto' : 'none',
            opacity: enabled ? 1 : 0.5,
            transition: 'opacity 0.2s'
          }}
        >
          <button type="button" className={mode === 'auto' ? 'is-active' : ''} onClick={() => enabled && setMode('auto')}>
            <span className="font-bold text-[18px]">A</span>
          </button>
          <button type="button" className={mode === 'heat' ? 'is-active' : ''} onClick={() => enabled && setMode('heat')}>
            <Sun size={22} />
          </button>
          <button type="button" className={mode === 'fan' ? 'is-active' : ''} onClick={() => enabled && setMode('fan')}>
            <Fan size={22} />
          </button>
          <button type="button" className={mode === 'cool' ? 'is-active' : ''} onClick={() => enabled && setMode('cool')}>
            <Snowflake size={22} />
          </button>
          <button type="button" className={mode === 'dry' ? 'is-active' : ''} onClick={() => enabled && setMode('dry')}>
            <Wind size={22} />
          </button>
        </div>

        {/* Fan Speed Pill */}
        <div 
          className="ndp-air-modes"
          style={{ 
            marginTop: 20,
            pointerEvents: enabled ? 'auto' : 'none',
            opacity: enabled ? 1 : 0.5,
            transition: 'opacity 0.2s'
          }}
        >
          <button type="button" className={fanSpeed === 'low' ? 'is-active' : ''} onClick={() => enabled && setFanSpeed('low')}>
            <Fan size={16} />
          </button>
          <button type="button" className={fanSpeed === 'med' ? 'is-active' : ''} onClick={() => enabled && setFanSpeed('med')}>
            <Fan size={20} />
          </button>
          <button type="button" className={fanSpeed === 'high' ? 'is-active' : ''} onClick={() => enabled && setFanSpeed('high')}>
            <Fan size={24} />
          </button>
          <button type="button" className={fanSpeed === 'auto' ? 'is-active' : ''} onClick={() => enabled && setFanSpeed('auto')}>
            <div className="flex items-center gap-1">
              <Fan size={18} />
              <span className="font-extrabold text-[12px]">A</span>
            </div>
          </button>
        </div>

        {/* Swing Row */}
        <div 
          className="ndp-air-swing-row"
          style={{ 
            pointerEvents: enabled ? 'auto' : 'none',
            opacity: enabled ? 1 : 0.5,
            transition: 'opacity 0.2s'
          }}
        >
          <span>Swing</span>
          <Toggle checked={swing} onClick={() => enabled && setSwing(!swing)} />
        </div>
      </GlassPanel>
    </div>
  );
}

function VideoPage() {
  const [duplicate, setDuplicate] = useState(readQuery('duplicate') === '1');
  const [singleInput, setSingleInput] = useState('ops');
  const [outputs, setOutputs] = useState({ a: 'ops', b: 'hdmi1', c: 'ops' });

  return (
    <div className="ndp-page">
      <GlassPanel>
        <div className="ndp-card-heading">
          <span>Duplicate Mode <small>?</small></span>
          <Toggle checked={duplicate} onClick={() => setDuplicate((value) => !value)} />
        </div>
        {duplicate ? (
          <div className="ndp-input-grid">
            {inputOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button key={option.id} className={`ndp-large-source ${singleInput === option.id ? 'is-active' : ''}`} type="button" onClick={() => setSingleInput(option.id)}>
                  <Icon />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="ndp-output-list">
            {['a', 'b', 'c'].map((output) => (
              <SoftRow key={output} label={`HDMI out ${output.toUpperCase()}`}>
                {inputOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <IconButton key={option.id} active={outputs[output] === option.id} label={option.label} onClick={() => setOutputs((current) => ({ ...current, [output]: option.id }))}>
                      <Icon />
                    </IconButton>
                  );
                })}
              </SoftRow>
            ))}
          </div>
        )}
      </GlassPanel>
    </div>
  );
}

function SerialPage() {
  const [rs232Power, setRs232Power] = useState(true);
  const [rs232Input, setRs232Input] = useState('windows');
  
  const [rs485Power, setRs485Power] = useState(true);
  
  const [cbx1ActiveBtn, setCbx1ActiveBtn] = useState(null);
  const handleCbx1Press = (btn) => {
    setCbx1ActiveBtn(btn);
    setTimeout(() => setCbx1ActiveBtn(null), 200);
  };
  
  const [cbx3Power, setCbx3Power] = useState(true);
  const [lectureCapture, setLectureCapture] = useState(true);

  return (
    <div className="ndp-page ndp-scroll-page">
      <GlassPanel>
        <div className="ndp-section-title">
          <Monitor />
          <h2>RS232</h2>
        </div>
        <SoftRow label="Power">
          <SegButton active={rs232Power} onClick={() => setRs232Power(true)}>ON</SegButton>
          <SegButton active={!rs232Power} onClick={() => setRs232Power(false)}>OFF</SegButton>
        </SoftRow>
        <SoftRow 
          label="Input Source"
          style={{ opacity: rs232Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
        >
          <IconButton 
            label="Windows" 
            active={rs232Power && rs232Input === 'windows'} 
            onClick={() => rs232Power && setRs232Input('windows')}
          >
            <Monitor />
          </IconButton>
          <IconButton 
            label="HDMI" 
            active={rs232Power && rs232Input === 'hdmi'} 
            onClick={() => rs232Power && setRs232Input('hdmi')}
          >
            <HdmiIcon />
          </IconButton>
          <IconButton 
            label="Android" 
            active={rs232Power && rs232Input === 'android'} 
            onClick={() => rs232Power && setRs232Input('android')}
          >
            <Smartphone />
          </IconButton>
        </SoftRow>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <Radio />
            <h2>RS485</h2>
          </div>
          <IconButton label="Expand"><ChevronRight /></IconButton>
        </div>
        <SoftRow label="Power">
          <SegButton active={rs485Power} onClick={() => setRs485Power(true)}>ON</SegButton>
          <SegButton active={!rs485Power} onClick={() => setRs485Power(false)}>OFF</SegButton>
        </SoftRow>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <PowerControlIcon />
            <h2>CBX 1</h2>
          </div>
          <IconButton label="Expand"><ChevronRight /></IconButton>
        </div>
        <button 
          className={`ndp-wide-command ${cbx1ActiveBtn === 'up' ? 'is-active' : ''}`} 
          type="button"
          onPointerDown={() => handleCbx1Press('up')}
        >
          Up
        </button>
        <button 
          className={`ndp-wide-command ${cbx1ActiveBtn === 'down' ? 'is-active' : ''}`} 
          type="button"
          onPointerDown={() => handleCbx1Press('down')}
        >
          Down
        </button>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-section-title">
          <VideoSwitchIcon />
          <h2>CBX 3</h2>
        </div>
        <SoftRow label="Power">
          <SegButton active={cbx3Power} onClick={() => setCbx3Power(true)}>ON</SegButton>
          <SegButton active={!cbx3Power} onClick={() => setCbx3Power(false)}>OFF</SegButton>
        </SoftRow>
        <SoftRow 
          label="Lecture Capture"
          style={{ opacity: cbx3Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
        >
          <SegButton active={cbx3Power && lectureCapture} onClick={() => cbx3Power && setLectureCapture(true)}>
            <Disc3 size={17} />
          </SegButton>
          <SegButton active={cbx3Power && !lectureCapture} onClick={() => cbx3Power && setLectureCapture(false)}>
            <CircleStop size={17} />
          </SegButton>
        </SoftRow>
      </GlassPanel>
    </div>
  );
}

function VolumeControl({ icon: Icon, values, onChange }) {
  return (
    <GlassPanel className="ndp-volume-panel">
      <IconButton label="Audio source"><Icon size={34} /></IconButton>
      {values.map((item, index) => (
        <Fragment key={item.label}>
          {index === 1 && <div className="ndp-fader-divider" />}
          <div className="ndp-fader">
            <button type="button" onClick={() => onChange(item.label, 1)}><Plus size={26} /></button>
            <div className="ndp-fader-tick is-top" />
            <strong>{item.value}</strong>
            <div className="ndp-fader-tick is-bottom" />
            <button type="button" onClick={() => onChange(item.label, -1)}><Minus size={24} /></button>
            <span>{item.label}</span>
          </div>
        </Fragment>
      ))}
    </GlassPanel>
  );
}

function VolumePage() {
  const [speaker, setSpeaker] = useState({ Audio: 5, Treble: 3, Bass: 3 });
  const [mic, setMic] = useState({ Audio: 3, Treble: 3, Bass: 3 });

  const handleSpeakerChange = (label, change) => {
    setSpeaker(prev => ({
      ...prev,
      [label]: Math.max(0, Math.min(10, prev[label] + change))
    }));
  };

  const handleMicChange = (label, change) => {
    setMic(prev => ({
      ...prev,
      [label]: Math.max(0, Math.min(10, prev[label] + change))
    }));
  };

  return (
    <div className="ndp-page">
      <VolumeControl 
        icon={Music} 
        values={[
          { label: 'Audio', value: speaker.Audio },
          { label: 'Treble', value: speaker.Treble },
          { label: 'Bass', value: speaker.Bass }
        ]} 
        onChange={handleSpeakerChange}
      />
      <VolumeControl 
        icon={Mic} 
        values={[
          { label: 'Audio', value: mic.Audio },
          { label: 'Treble', value: mic.Treble },
          { label: 'Bass', value: mic.Bass }
        ]} 
        onChange={handleMicChange}
      />
    </div>
  );
}

function RemotePage() {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePress = (idx) => {
    setActiveBtn(idx);
    setTimeout(() => setActiveBtn(null), 150);
  };

  const buttons = [
    "Power On",
    "Power Off",
    "Cool 25°C Med",
    "Cool 29°C Low",
    "Heat 27°C Med",
    "Heat 30°C High"
  ];

  return (
    <div className="ndp-page">
      <GlassPanel>
        <div className="ndp-remote-grid">
          {buttons.map((label, idx) => (
            <button
              key={idx}
              type="button"
              className={`ndp-remote-btn ${activeBtn === idx ? 'is-active' : ''}`}
              onPointerDown={() => handlePress(idx)}
            >
              {label}
            </button>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}

function SettingsPage({ onDisconnectionClick, onResolutionClick }) {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {/* Device Name */}
        <div className="ndp-settings-row">
          <span className="ndp-settings-label">Device Name</span>
          <span className="ndp-settings-value">3F NDP600</span>
        </div>

        {/* Device ID with QR code */}
        <div className="ndp-settings-row has-qr">
          <span className="ndp-settings-label">Device ID</span>
          <div className="ndp-settings-value-container">
            <span className="ndp-settings-value">572B1B12905F</span>
            <svg width="64" height="64" viewBox="0 0 29 29" fill="none" className="bg-white p-1 rounded-sm border border-gray-300 text-black">
              <path d="M0 0h7v7H0zm22 0h7v7h-7zM0 22h7v7H0z" fill="currentColor" />
              <path d="M2 2h3v3H2zm20 0h3v3h-3zM2 24h3v3H2z" fill="currentColor" />
              <path d="M9 0h1v3H9zm2 0h3v1h-3zm4 0h2v2h-2zm3 0h2v1h-2zm-9 4h2v1H9zm3 0h3v1h-3zm4 1h1v2h-1zm1-1h1v1h-1zm-6 2h1v1h-1zm1 0h2v2h-2zm-8 4h1v2H2zm2 0h2v1H4zm5 0h1v1H9zm2 0h3v1h-3zm4 0h1v3h-1zm3 0h1v1h-1zm2 0h1v2h-1zm-15 2h2v1H6zm4 0h2v2h-2zm6 1h2v1h-2zm5-1h1v2h-1zm-12 2h3v1h-3zm4 0h2v1h-2zm2 0h1v1h-1zm-11 2h2v2H7zm4 0h1v2h-1zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v2h-2z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Panel IP */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Panel IP</span>
          <span className="ndp-settings-value">
            192.168.110.125 (1C:54:E6:27:B2:AA)
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Language */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Language</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* HDMI OUT Resolution */}
        <div className="ndp-settings-row is-clickable" onClick={onResolutionClick}>
          <span className="ndp-settings-label">HDMI OUT Resolution</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Display */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Display</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Customize */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Customize</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Password Unlock */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Password Unlock</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Date & Time */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Date & Time</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Software Version */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Software Version</span>
          <span className="ndp-settings-value">
            V 1.0.0.9
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Q-NEX Cloud Server Address */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Q-NEX Cloud Server Address</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Disconnection */}
        <div className="ndp-settings-row is-clickable" onClick={onDisconnectionClick}>
          <span className="ndp-settings-label">Disconnection</span>
          <span className="ndp-settings-value"></span>
        </div>

        {/* Clear Cache & Restart Touch Panel */}
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">Clear Cache & Restart Touch Panel</span>
          <span className="ndp-settings-value"></span>
        </div>
      </div>
    </div>
  );
}

function ResolutionSubpage() {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out A</span>
          <span className="ndp-settings-value">
            1920 x 1080
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out B</span>
          <span className="ndp-settings-value">
            1920 x 1080
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out C</span>
          <span className="ndp-settings-value">
            3840 x 2160
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}

function Content({ activeTab, navConfig, onDisconnectionClick, settingsSubpage, setSettingsSubpage }) {
  if (activeTab === 'home') return <HomePage navConfig={navConfig} />;
  if (activeTab === 'video') return <VideoPage />;
  if (activeTab === 'serial') return <SerialPage />;
  if (activeTab === 'volume') return <VolumePage />;
  if (activeTab === 'air') return <div className="ndp-page"><AirPage /></div>;
  if (activeTab === 'remote') return <RemotePage />;
  if (activeTab === 'settings') {
    if (settingsSubpage === 'resolution') {
      return <ResolutionSubpage />;
    }
    return (
      <SettingsPage 
        onDisconnectionClick={onDisconnectionClick} 
        onResolutionClick={() => setSettingsSubpage('resolution')}
      />
    );
  }
  return <PowerPage />;
}

export default function Ndp600PortraitApp() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [settingsSubpage, setSettingsSubpage] = useState(null);
  const [locked, setLocked] = useState(readQuery('screen') === 'lock');
  const [muted, setMuted] = useState(false);
  const [theme, setTheme] = useState(readQuery('theme') === 'light' ? 'light' : 'dark');
  const [isDisconnected, setIsDisconnected] = useState(readQuery('status') === 'disconnected');
  const [navConfig, setNavConfig] = useState(defaultNavConfig);

  const handleNavConfigChange = (id) => {
    const next = { ...navConfig, [id]: !navConfig[id] };
    setNavConfig(next);
    if (activeTab === id && !next[id]) {
      const fallback = navItems.find((item) => item.id !== 'home' && next[item.id]);
      setActiveTab(fallback?.id ?? 'home');
    }
  };

  const isLight = theme === 'light';

  return (
    <main className={`ndp-stage ${isLight ? 'is-light' : ''}`}>
      <div className="ndp-layout-container">
        {/* Left Side Controls */}
        <div className="ndp-left-controls">
          <div className="ndp-control-row ndp-status-row">
            <span>Status:</span>
            <label>
              <input type="checkbox" checked={isDisconnected} onChange={() => setIsDisconnected((value) => !value)} />
              <strong className={isDisconnected ? 'is-disconnected' : ''}>{isDisconnected ? 'Disconnected' : 'Connected'}</strong>
            </label>
          </div>
          
          <div className="ndp-control-row ndp-menu-row">
            <span>Menu Config:</span>
            {menuConfigItems.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={navConfig[item.id]}
                  onChange={() => handleNavConfigChange(item.id)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Center Device */}
        <div className="ndp-device-wrapper">
          <div className="ndp-device">
            <div className="ndp-screen">
              {isDisconnected ? (
                <DisconnectedScreen />
              ) : locked ? (
                <LockScreen setLocked={setLocked} />
              ) : (
                <>
                  <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={(tabId) => {
                      setActiveTab(tabId);
                      setSettingsSubpage(null);
                    }} 
                    navConfig={navConfig} 
                  />
                  <div className="ndp-main">
                    <TopTools 
                      onSettingsClick={() => {
                        setActiveTab('settings');
                        setSettingsSubpage(null);
                      }} 
                    />
                    {activeTab === 'settings' && (
                      settingsSubpage === 'resolution' ? (
                        <button className="ndp-back-title" type="button" onClick={() => setSettingsSubpage(null)}>
                          <ChevronLeft size={22} />
                          <span>HDMI OUT Resolution</span>
                        </button>
                      ) : (
                        <h1 className="ndp-screen-title">Setting</h1>
                      )
                    )}
                    <div className="ndp-content">
                      <Content 
                        activeTab={activeTab} 
                        navConfig={navConfig} 
                        onDisconnectionClick={() => setIsDisconnected(true)} 
                        settingsSubpage={settingsSubpage}
                        setSettingsSubpage={setSettingsSubpage}
                      />
                    </div>
                    <BottomDock locked={locked} muted={muted} setLocked={setLocked} setMuted={setMuted} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Theme Toggle */}
        <div className="ndp-right-controls">
          <button className="ndp-theme-button" type="button" onClick={() => setTheme(isLight ? 'dark' : 'light')}>
            {isLight ? <Moon size={22} /> : <Sun size={22} />}
            <span>{isLight ? 'Dark Theme' : 'Light Theme'}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
