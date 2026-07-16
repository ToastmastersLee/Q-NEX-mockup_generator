import { useState, useEffect, useRef, Fragment } from 'react';
import { LockCountdownModal } from '../../components/LockCountdownModal';
import { Modal } from '../../components/Modal';
import { AndroidEthernet } from '../../pages/AndroidEthernet';
import { Disconnection } from '../../pages/Disconnection';
import { ProjectionScreen } from '../../pages/ProjectionScreen';
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
  Snowflake,
  Sun,
  Moon,
  Fan,
  Wind,
  Plus,
  Minus,
  Mic,
  MicOff,
  Music,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Flame,
  Radio,
  CircleStop,
  Disc3,
  Check,
  Scan,
  MapPin,
  Eye,
  EyeOff,
} from 'lucide-react';
import classroomFeed from '../../assets/classroom_feed.png';
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

const WindowsIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M 3,4.5 L 9.5,3.5 L 9.5,11.5 L 3,11.5 Z" />
    <path d="M 3,12.5 L 9.5,12.5 L 9.5,20.5 L 3,19.5 Z" />
    <path d="M 11,3.3 L 21,1.8 L 21,11.5 L 11,11.5 Z" />
    <path d="M 11,12.5 L 21,12.5 L 21,22.2 L 11,20.7 Z" />
  </svg>
);

const AndroidIcon = ({ size = 22, ...props }) => (
  <svg 
    width={size}
    height={size}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M 6,10 A 6,6 0 0,1 18,10 Z" />
    <line x1="9" y1="4.5" x2="7.5" y2="2.5" />
    <line x1="15" y1="4.5" x2="16.5" y2="2.5" />
    <circle cx="9.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="7" r="0.75" fill="currentColor" stroke="none" />
    <path d="M 6,11.5 L 18,11.5 L 18,16.5 A 2,2 0 0,1 16,18.5 L 8,18.5 A 2,2 0 0,1 6,16.5 Z" />
    <rect x="3" y="11.5" width="2" height="4.5" rx="1" />
    <rect x="19" y="11.5" width="2" height="4.5" rx="1" />
    <rect x="8.5" y="18.5" width="2" height="3" rx="1" />
    <rect x="13.5" y="18.5" width="2" height="3" rx="1" />
  </svg>
);

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'power', label: 'Power Control', icon: PowerControlIcon },
  { id: 'video', label: 'Video Switch', icon: VideoSwitchIcon },
  { id: 'serial', label: 'Serial Control', icon: SerialIcon },
  { id: 'volume', label: 'Vol.', icon: Volume2 },
  { id: 'air', label: 'Air Conditioner', icon: AirConditionerIcon },
  { id: 'projector', label: 'Projection Screen', icon: ProjectorScreenIcon },
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

function Sidebar({ activeTab, setActiveTab, navConfig, itemsOrder }) {
  const visibleItems = itemsOrder
    .map((id) => navItems.find((item) => item.id === id))
    .filter((item) => item && item.id !== 'home' && navConfig[item.id]);

  return (
    <aside className="ndp-sidebar">
      <button 
        className={`ndp-nav-item ${activeTab === 'home' ? 'is-active' : ''}`} 
        type="button" 
        onClick={() => setActiveTab('home')}
      >
        <Home className="ndp-nav-icon" strokeWidth={1.9} />
        <span>Home</span>
      </button>
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

function LockScreen({ setLocked, passwordUnlockEnabled, password = '8888' }) {
  const [enteringPin, setEnteringPin] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length >= 4) return;
    setError(false);
    const nextPin = pin + num;
    setPin(nextPin);
    
    if (nextPin === password) {
      setTimeout(() => {
        setLocked(false);
        setPin('');
        setEnteringPin(false);
      }, 300);
    } else if (nextPin.length === 4) {
      setTimeout(() => {
        setError(true);
        setPin('');
      }, 300);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  if (enteringPin) {
    return (
      <div className="ndp-lock-screen ndp-pin-screen">
        <div className="ndp-pin-header">
          <h2>Enter Password</h2>
          {error && <span className="ndp-pin-error">Incorrect password</span>}
        </div>
        
        <div className="ndp-pin-dots">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx} 
              className={`ndp-pin-dot ${idx < pin.length ? 'is-filled' : ''} ${error ? 'is-error' : ''}`} 
            />
          ))}
        </div>

        <div className="ndp-pin-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num} 
              type="button" 
              className="ndp-key-btn" 
              onClick={() => handleKeyPress(num.toString())}
            >
              {num}
            </button>
          ))}
          <button 
            type="button" 
            className="ndp-key-btn text-sm" 
            onClick={() => { setEnteringPin(false); setPin(''); setError(false); }}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="ndp-key-btn" 
            onClick={() => handleKeyPress('0')}
          >
            0
          </button>
          <button 
            type="button" 
            className="ndp-key-btn" 
            onClick={handleBackspace}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

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
      <button 
        className="ndp-unlock-orb" 
        type="button" 
        onClick={() => {
          if (passwordUnlockEnabled) {
            setEnteringPin(true);
          } else {
            setLocked(false);
          }
        }}
      >
        <Lock size={46} />
      </button>
    </div>
  );
}

function DisconnectConfirmModal({ isDark, onCancel, onExecute }) {
  const backdropClass = isDark
    ? 'bg-black/40 backdrop-blur-xs'
    : 'bg-black/20';

  const cardClass = isDark
    ? 'bg-[#182740]/90 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-white rounded-[2rem] w-[28rem] p-8'
    : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black rounded-3xl w-[28rem] p-8';

  const cancelBtnClass = isDark
    ? 'bg-[#3b4c6b] hover:bg-[#485c80] text-white/95 hover:text-white transition-all active:scale-95 shadow-md shadow-black/10'
    : 'bg-white border-2 border-black hover:bg-gray-100 text-black font-bold active:translate-x-0.5 active:translate-y-0.5';

  const executeBtnClass = isDark
    ? 'bg-gradient-to-r from-[#00d4ff] to-[#00f2fe] text-white hover:brightness-110 shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all active:scale-95'
    : 'bg-blue-600 text-white border-2 border-black font-bold hover:bg-blue-700 active:translate-x-0.5 active:translate-y-0.5';

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl select-none ${backdropClass}`}>
      <div className={`flex flex-col items-center gap-8 text-center transition-all duration-300 ${cardClass}`}>
        <h3 className="text-xl font-semibold leading-relaxed px-4">
          Please note that Touch Panel will disconnect from the present NDP600!
        </h3>

        <div className="flex gap-6 w-full px-2">
          <button 
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-full text-base font-semibold transition-all cursor-pointer ${cancelBtnClass}`}
          >
            Cancel
          </button>
          <button 
            onClick={onExecute}
            className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all cursor-pointer ${executeBtnClass}`}
          >
            Execute Now
          </button>
        </div>
      </div>
    </div>
  );
}

function CloudServerModal({ isDark, initialValue, onCancel, onSave }) {
  const [value, setValue] = useState(initialValue);

  const backdropClass = isDark
    ? 'bg-black/40 backdrop-blur-xs'
    : 'bg-black/20';

  const cardClass = isDark
    ? 'bg-[#182740]/95 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-white rounded-[2rem] w-[28rem] p-8'
    : 'bg-white border border-gray-200 shadow-xl text-black rounded-3xl w-[28rem] p-8';

  const inputBgClass = isDark
    ? 'bg-[#0f1b2c] border border-white/10 text-white'
    : 'bg-gray-50 border border-gray-300 text-black';

  const cancelBtnClass = isDark
    ? 'bg-[#3b4c6b] hover:bg-[#485c80] text-white/95 hover:text-white transition-all active:scale-95 shadow-md shadow-black/10'
    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold';

  const saveBtnClass = isDark
    ? 'bg-gradient-to-r from-[#00d4ff] to-[#00f2fe] text-white hover:brightness-110 shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all active:scale-95'
    : 'bg-blue-600 text-white hover:bg-blue-700 font-bold';

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl select-none ${backdropClass}`}>
      <div className={`flex flex-col items-center gap-6 text-center transition-all duration-300 ${cardClass}`}>
        <h3 className="text-xl font-semibold leading-relaxed px-4">
          Q-NEX Cloud Server Address
        </h3>

        <div className={`w-full px-4 py-3 rounded-xl ${inputBgClass}`}>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
            className="w-full bg-transparent outline-none text-center font-medium text-base"
            autoFocus 
          />
        </div>

        <div className="flex gap-4 w-full px-2">
          <button 
            type="button"
            onClick={onCancel}
            className={`flex-1 py-3 px-6 rounded-full text-base font-semibold transition-all cursor-pointer ${cancelBtnClass}`}
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => onSave(value)}
            className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all cursor-pointer ${saveBtnClass}`}
          >
            Update now
          </button>
        </div>
      </div>
    </div>
  );
}

function PowerOnScreen({ onPowerOn, onLock }) {
  return (
    <div className="ndp-lock-screen" style={{ justifyContent: 'space-between', paddingBottom: '48px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="ndp-lock-brand">
          <span className="ndp-logo-mark" />
          <span>nex</span>
        </div>
        <button 
          className="ndp-icon-btn" 
          type="button" 
          onClick={onLock}
          style={{ width: '42px', height: '42px', display: 'grid', placeItems: 'center', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
        >
          <Lock size={18} />
        </button>
      </div>

      {/* Center Power Orb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button className="ndp-unlock-orb" type="button" onClick={onPowerOn} style={{ marginTop: 0 }}>
          <Power size={46} />
        </button>
      </div>
      
      {/* Bottom Spacer to balance the top bar height */}
      <div style={{ height: '42px' }} />
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

function HomePage({ homepageWidgets }) {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePress = (btn) => {
    setActiveBtn(btn);
    setTimeout(() => setActiveBtn(null), 200);
  };

  return (
    <div className="ndp-page ndp-scroll-page" style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
      {homepageWidgets.map((widgetId) => {
        if (widgetId === 'air') {
          return <AirPage key="air" compact />;
        }
        if (widgetId === 'projector') {
          return (
            <GlassPanel key="projector">
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
          );
        }
        if (widgetId === 'power') {
          return (
            <GlassPanel key="power">
              <div className="ndp-section-title">
                <PowerControlIcon />
                <h2>Power Control</h2>
              </div>
              <div className="ndp-onoff" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center' }}>Display ON</button>
                <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center' }}>External ON</button>
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'video') {
          return (
            <GlassPanel key="video">
              <div className="ndp-section-title">
                <VideoSwitchIcon />
                <h2>Video Switch</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', width: '100%', justifyContent: 'space-between' }}>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center', padding: '6px' }}>OPS</button>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center', padding: '6px' }}>HDMI 1</button>
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'volume') {
          return (
            <GlassPanel key="volume">
              <div className="ndp-section-title">
                <Volume2 size={18} />
                <h2>Volume Control</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '12px' }}>
                <VolumeX size={16} />
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ width: '70%', height: '100%', background: '#00c8ff', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '70%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%' }} />
                </div>
                <Volume2 size={16} />
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'serial') {
          return (
            <GlassPanel key="serial">
              <div className="ndp-section-title">
                <SerialIcon />
                <h2>Serial Control</h2>
              </div>
              <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>Send RS232 Power ON</button>
            </GlassPanel>
          );
        }
        if (widgetId === 'remote') {
          return (
            <GlassPanel key="remote">
              <div className="ndp-section-title">
                <RemoteControlIcon />
                <h2>Remote Control</h2>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '12px', width: '100%' }}>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center' }}>Menu</button>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
              </div>
            </GlassPanel>
          );
        }
        return null;
      })}
      {homepageWidgets.length === 0 && (
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
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState(['All', 'NDP600', 'CBX 2']);

  const toggleDevice = (device) => {
    setSelectedDevices(prev => 
      prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device]
    );
  };

  if (compact) {
    return (
      <Fragment>
        <GlassPanel className="ndp-air-compact">
        <div className="ndp-air-head">
          <div className="ndp-section-title">
            <AirConditionerIcon />
            <h2>Air Conditioner</h2>
          </div>
          <button className="ndp-device-select" type="button" onClick={() => setIsDeviceModalOpen(true)}>
            NDP600 <ChevronDown size={18} />
          </button>
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
      {isDeviceModalOpen && (
        <div className="ndp-bottom-sheet-overlay" onClick={() => setIsDeviceModalOpen(false)}>
          <div className="ndp-bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="ndp-sheet-list">
              {['All', 'NDP600', 'CBX 2'].map(device => (
                <div key={device} className="ndp-sheet-item" onClick={() => toggleDevice(device)}>
                  <span style={{ visibility: selectedDevices.includes(device) ? 'visible' : 'hidden', color: '#00c8ff' }}>
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>{device}</span>
                </div>
              ))}
            </div>
            <div className="ndp-sheet-actions">
              <button className="ndp-sheet-btn ndp-btn-cancel" onClick={() => setIsDeviceModalOpen(false)}>Cancel</button>
              <button className="ndp-sheet-btn ndp-btn-confirm" onClick={() => setIsDeviceModalOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
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
    <Fragment>
      <div style={{ width: '100%', opacity: enabled ? 1 : 0.65, transition: 'opacity 0.2s' }}>
        {/* Top Left Dropdown Select */}
        <button className="ndp-air-device-select" type="button" onClick={() => setIsDeviceModalOpen(true)}>
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
      {isDeviceModalOpen && (
        <div className="ndp-bottom-sheet-overlay" onClick={() => setIsDeviceModalOpen(false)}>
          <div className="ndp-bottom-sheet" onClick={e => e.stopPropagation()}>
            <div className="ndp-sheet-list">
              {['All', 'NDP600', 'CBX 2'].map(device => (
                <div key={device} className="ndp-sheet-item" onClick={() => toggleDevice(device)}>
                  <span style={{ visibility: selectedDevices.includes(device) ? 'visible' : 'hidden', color: '#00c8ff' }}>
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <span>{device}</span>
                </div>
              ))}
            </div>
            <div className="ndp-sheet-actions">
              <button className="ndp-sheet-btn ndp-btn-cancel" onClick={() => setIsDeviceModalOpen(false)}>Cancel</button>
              <button className="ndp-sheet-btn ndp-btn-confirm" onClick={() => setIsDeviceModalOpen(false)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

function VideoPage() {
  const [duplicate, setDuplicate] = useState(readQuery('duplicate') === '1');
  const [singleInput, setSingleInput] = useState('ops');
  const [outputs, setOutputs] = useState({ a: 'ops', b: 'hdmi1', c: 'ops' });

  return (
    <div className="ndp-page">
      <GlassPanel>
        <div className="ndp-card-heading ndp-duplicate-header">
          <label className="ndp-duplicate-label" onClick={() => setDuplicate(!duplicate)}>
            <div className={`ndp-checkbox ${duplicate ? 'is-checked' : ''}`}>
              {duplicate && (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span>Duplicate Mode</span>
          </label>
          <div className="ndp-help-icon">
            <span>?</span>
          </div>
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
  const [activeDetail, setActiveDetail] = useState(null);
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

  const [rs232ActiveBtn, setRs232ActiveBtn] = useState(null);
  const handleRs232Press = (btn) => {
    setRs232ActiveBtn(btn);
    setTimeout(() => setRs232ActiveBtn(null), 200);
  };

  if (activeDetail === 'RS232') {
    return (
      <div className="ndp-page ndp-scroll-page no-scrollbar">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 20px' }}>
          <div style={{ position: 'absolute', left: 4 }}>
            <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>RS232</h2>
        </div>
        
        {/* Power Card */}
        <GlassPanel style={{ flex: 'none' }}>
          <SoftRow label="Power">
            <SegButton active={rs232Power} onClick={() => setRs232Power(true)}>ON</SegButton>
            <SegButton active={!rs232Power} onClick={() => setRs232Power(false)}>OFF</SegButton>
          </SoftRow>
        </GlassPanel>
        
        {/* Input Source Card */}
        <GlassPanel style={{ flex: 'none' }}>
          <SoftRow 
            label="Input Source"
            style={{ opacity: rs232Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
          >
            <IconButton 
              label="Windows" 
              active={rs232Power && rs232Input === 'windows'} 
              onClick={() => rs232Power && setRs232Input('windows')}
            >
              <WindowsIcon />
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
              <AndroidIcon />
            </IconButton>
          </SoftRow>
        </GlassPanel>

        {/* Command Buttons */}
        {['HDMI2', 'HDMI3', 'Mute', 'Unmute', 'VOL+', 'VOL-'].map(cmd => {
          const id = cmd.toLowerCase().replace('+', 'plus').replace('-', 'minus');
          return (
            <button 
              key={id}
              className={`ndp-wide-command ${rs232ActiveBtn === id ? 'is-active' : ''}`} 
              type="button"
              onPointerDown={() => handleRs232Press(id)}
              style={{ flex: 'none' }}
            >
              {cmd}
            </button>
          );
        })}
      </div>
    );
  }

  if (activeDetail === 'RS485') {
    return (
      <div className="ndp-page no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 10px' }}>
          <div style={{ position: 'absolute', left: 4 }}>
            <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>RS485</h2>
        </div>

        {/* Video Feed Box */}
        <div style={{ width: '100%', height: '210px', borderRadius: '24px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.08)', background: '#1e2530', flex: 'none' }}>
          <img 
            src={classroomFeed} 
            alt="Classroom Feed" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          
          {/* Zoom Controls */}
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="ndp-zoom-btn" type="button"><Plus size={18} /></button>
            <button className="ndp-zoom-btn" type="button"><Minus size={18} /></button>
          </div>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '8px 0' }}>
          <button className="ndp-ptz-action" type="button">ON</button>
          <button className="ndp-ptz-action" type="button">OFF</button>
          <button className="ndp-ptz-action" type="button"><Scan size={18} /></button>
          <button className="ndp-ptz-action" type="button"><MapPin size={18} /></button>
          <button className="ndp-ptz-action" type="button" style={{ fontSize: '9px', fontWeight: 'bold' }}>Preset</button>
        </div>

        {/* PTZ Control Wheel */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ptz-wheel">
            <button className="ptz-btn is-up" type="button"><ChevronUp size={24} /></button>
            <button className="ptz-btn is-left" type="button"><ChevronLeft size={24} /></button>
            <button className="ptz-center-btn" type="button"><RefreshCcw size={20} /></button>
            <button className="ptz-btn is-right" type="button"><ChevronRight size={24} /></button>
            <button className="ptz-btn is-down" type="button"><ChevronDown size={24} /></button>
          </div>
        </div>
      </div>
    );
  }

  if (activeDetail === 'e-Curtain') {
    return (
      <div className="ndp-page ndp-scroll-page">
        <GlassPanel style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '30px' }}>
            <div style={{ position: 'absolute', left: 0 }}>
              <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>e-Curtain</h2>
          </div>
          {['Up', 'Down', 'Stop', 'Dimming1', 'Dimming2', 'All Window'].map(btn => {
            const id = btn.toLowerCase().replace(' ', '');
            return (
              <button 
                key={id}
                className={`ndp-wide-command ${cbx1ActiveBtn === id ? 'is-active' : ''}`} 
                type="button"
                onPointerDown={() => handleCbx1Press(id)}
              >
                {btn}
              </button>
            );
          })}
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="ndp-page ndp-scroll-page">
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <Monitor />
            <h2>RS232</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('RS232')}><ChevronRight /></IconButton>
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
            <WindowsIcon />
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
            <AndroidIcon />
          </IconButton>
        </SoftRow>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <Radio />
            <h2>RS485</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('RS485')}><ChevronRight /></IconButton>
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
            <h2>e-Curtain</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('e-Curtain')}><ChevronRight /></IconButton>
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

function VolumeControl({ icon: Icon, activeIcon: ActiveIcon, isMuted, onMuteToggle, values, onChange }) {
  const CurrentIcon = isMuted ? ActiveIcon : Icon;
  return (
    <GlassPanel className="ndp-volume-panel">
      <IconButton label="Toggle Mute" active={isMuted} onClick={onMuteToggle}>
        <CurrentIcon size={34} />
      </IconButton>
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
  const [speaker, setSpeaker] = useState({ Audio: 5, Treble: 3, Bass: 3, isMuted: true });
  const [mic, setMic] = useState({ Audio: 3, Treble: 3, Bass: 3, isMuted: true });

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
        activeIcon={VolumeX}
        isMuted={speaker.isMuted}
        onMuteToggle={() => setSpeaker(prev => ({ ...prev, isMuted: !prev.isMuted }))}
        values={[
          { label: 'Audio', value: speaker.Audio },
          { label: 'Treble', value: speaker.Treble },
          { label: 'Bass', value: speaker.Bass }
        ]} 
        onChange={handleSpeakerChange}
      />
      <VolumeControl 
        icon={Mic} 
        activeIcon={MicOff}
        isMuted={mic.isMuted}
        onMuteToggle={() => setMic(prev => ({ ...prev, isMuted: !prev.isMuted }))}
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
    <div className="ndp-page ndp-scroll-page">
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

function SettingsPage({ 
  onDisconnectionClick, 
  onResolutionClick, 
  onLanguageClick, 
  onDisplayClick, 
  onCustomizeClick, 
  onPasswordUnlockClick, 
  onPanelIpClick, 
  panelIpAddress, 
  deviceName, 
  setDeviceName, 
  isDark,
  onCloudServerAddressClick
}) {
  const [tempDeviceName, setTempDeviceName] = useState('');
  const [isDeviceNameModalOpen, setIsDeviceNameModalOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleDeviceNameClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current === 4) {
      setTempDeviceName(deviceName);
      setIsDeviceNameModalOpen(true);
      clickCountRef.current = 0;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 800);
  };

  return (
    <Fragment>
      <div className="ndp-page ndp-scroll-page">
        <div className="ndp-settings-list">
          {/* Device Name */}
          <div className="ndp-settings-row is-clickable" onClick={handleDeviceNameClick}>
            <span className="ndp-settings-label">Device Name</span>
            <span className="ndp-settings-value">{deviceName}</span>
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
        <div className="ndp-settings-row is-clickable" onClick={onPanelIpClick}>
          <span className="ndp-settings-label">Panel IP</span>
          <span className="ndp-settings-value">
            {panelIpAddress} (1C:54:E6:27:B2:AA)
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Language */}
        <div className="ndp-settings-row is-clickable" onClick={onLanguageClick}>
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
        <div className="ndp-settings-row is-clickable" onClick={onDisplayClick}>
          <span className="ndp-settings-label">Display</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Customize */}
        <div className="ndp-settings-row is-clickable" onClick={onCustomizeClick}>
          <span className="ndp-settings-label">Customize</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Password Unlock */}
        <div className="ndp-settings-row is-clickable" onClick={onPasswordUnlockClick}>
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
        <div className="ndp-settings-row is-clickable" onClick={onCloudServerAddressClick}>
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

    <Modal 
      isOpen={isDeviceNameModalOpen} 
      isDark={isDark} 
      onClose={() => setIsDeviceNameModalOpen(false)} 
      onConfirm={() => { setDeviceName(tempDeviceName); setIsDeviceNameModalOpen(false); }}
    >
      <div className={`px-5 py-4 w-full rounded-2xl text-xl ${isDark ? 'bg-[#1a2332]' : 'bg-slate-100'}`}>
        <input 
          type="text" 
          value={tempDeviceName} 
          onChange={(e) => setTempDeviceName(e.target.value)} 
          className={`w-full bg-transparent outline-none ${isDark ? 'text-white' : 'text-black'}`} 
          autoFocus 
        />
      </div>
    </Modal>
  </Fragment>
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

const languages = [
  'English',
  '中文(简体)',
  '中文(繁體)',
  'Français',
  'Español',
  'Português',
  'Deutsch',
  'Italiano',
  'Русский',
  'Монгол хэл',
  'العربية',
  'ภาษาไทย',
  'Tiếng Việt',
];

function LanguageSubpage() {
  const [selectedLang, setSelectedLang] = useState('English');
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {languages.map((lang) => (
          <div key={lang} className="ndp-settings-row is-clickable" onClick={() => setSelectedLang(lang)}>
            <span className="ndp-settings-label" style={{ flex: 1 }}>{lang}</span>
            {selectedLang === lang && <span style={{ color: '#00c8ff', display: 'flex' }}><Check size={20} strokeWidth={3} /></span>}
          </div>
        ))}
      </div>
    </div>
  );
}



function DisplaySubpage({ 
  brightness, 
  setBrightness, 
  autoLockTime, 
  setAutoLockTime, 
  screenSaver, 
  setScreenSaver, 
  screenSleep, 
  setScreenSleep,
  isDark 
}) {
  const autoLockChoices = ['1 Minute', '2 Minutes', '5 Minutes', '10 Minutes', 'Never'];
  const screenSaverChoices = ['Never', '1 Minute', '2 Minutes', '5 Minutes', '10 Minutes'];
  const screenSleepChoices = ['1 Minute', '5 Minutes', '10 Minutes', '30 Minutes', 'Never'];

  const toggleChoice = (current, choices, setter) => {
    const idx = choices.indexOf(current);
    const nextIdx = (idx + 1) % choices.length;
    setter(choices[nextIdx]);
  };

  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {/* Brightness */}
        <div className="ndp-settings-row">
          <span className="ndp-settings-label">Brightness</span>
          <div className="ndp-slider-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="ndp-slider"
              style={{
                background: `linear-gradient(to right, #00c8ff 0%, #00c8ff ${brightness}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ${brightness}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 100%)`
              }}
            />
          </div>
        </div>

        {/* Auto-Lock Screen */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(autoLockTime, autoLockChoices, setAutoLockTime)}
        >
          <span className="ndp-settings-label">Auto-Lock Screen</span>
          <span className="ndp-settings-value">
            {autoLockTime}
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Screen Saver */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(screenSaver, screenSaverChoices, setScreenSaver)}
        >
          <span className="ndp-settings-label">Screen Saver</span>
          <span className="ndp-settings-value">
            {screenSaver}
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Screen Sleep */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(screenSleep, screenSleepChoices, setScreenSleep)}
        >
          <span className="ndp-settings-label">Screen Sleep</span>
          <span className="ndp-settings-value">
            {screenSleep}
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomizeSubpage({ onSubpageSelect }) {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        <div className="ndp-settings-row is-clickable" onClick={() => onSubpageSelect('customize-nav')}>
          <span className="ndp-settings-label">Navigation bar</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable" onClick={() => onSubpageSelect('customize-template')}>
          <span className="ndp-settings-label">Homepage Template</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}

function NavigationBarSubpage({ navConfig, onNavConfigChange, itemsOrder, setItemsOrder }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...itemsOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setItemsOrder(newOrder);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-nav-subtitle">
        Long press and drag to order the list
      </div>
      <div className="ndp-nav-list-card">
        {itemsOrder.map((id, index) => {
          const item = menuConfigItems.find(n => n.id === id);
          if (!item) return null;
          const origItem = navItems.find(n => n.id === id);
          const Icon = origItem ? origItem.icon : Home;
          const isVisible = navConfig[id];

          return (
            <div 
              key={id} 
              className={`ndp-nav-sort-row ${draggedIndex === index ? 'is-dragging' : ''} ${!isVisible ? 'is-hidden' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              {/* Eye Visibility Icon */}
              <button 
                type="button" 
                className="ndp-eye-btn"
                onClick={() => onNavConfigChange(id)}
              >
                {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>

              {/* Menu Icon and Label */}
              <div className="ndp-nav-item-info">
                <Icon size={18} className="ndp-nav-row-icon" />
                <span className="ndp-nav-row-label">{item.label}</span>
              </div>

              {/* Drag Handle */}
              <div className="ndp-drag-handle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChooseWidgetSubpage({ homepageWidgets, setHomepageWidgets }) {
  return (
    <div className="ndp-page ndp-scroll-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div className="ndp-widget-section-title">Selected</div>
      
      {/* Selected Preview Box */}
      <div className="ndp-widget-preview-area">
        {homepageWidgets.length === 0 ? (
          <span style={{ color: '#a0aab8', fontSize: '14px' }}>No Widgets Selected</span>
        ) : (
          homepageWidgets.map((widgetId) => {
            const item = menuConfigItems.find(n => n.id === widgetId);
            if (!item) return null;
            const origItem = navItems.find(n => n.id === widgetId);
            const Icon = origItem ? origItem.icon : Home;

            return (
              <div key={widgetId} className="ndp-widget-card-selected">
                <Icon size={18} />
                <span style={{ fontSize: '14px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
                <button 
                  type="button" 
                  className="ndp-widget-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHomepageWidgets(homepageWidgets.filter(w => w !== widgetId));
                  }}
                >
                  –
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="ndp-widget-section-title">Optional</div>
      
      {/* Grid of options */}
      <div className="ndp-widget-grid">
        {menuConfigItems.map((item) => {
          const isSelected = homepageWidgets.includes(item.id);
          const origItem = navItems.find(n => n.id === item.id);
          const Icon = origItem ? origItem.icon : Home;

          return (
            <div 
              key={item.id} 
              className={`ndp-widget-card-optional ${isSelected ? 'is-selected' : ''}`}
              onClick={() => {
                if (isSelected) {
                  setHomepageWidgets(homepageWidgets.filter(w => w !== item.id));
                } else {
                  setHomepageWidgets([...homepageWidgets, item.id]);
                }
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {item.label}
              </span>
              {!isSelected && (
                <button type="button" className="ndp-widget-add-btn">
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PasswordUnlockSubpage({ 
  passwordUnlockEnabled, 
  setPasswordUnlockEnabled, 
  onPasswordSettingClick,
  setSettingsSubpage
}) {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {/* Password Unlock Toggle */}
        <div className="ndp-settings-row">
          <span className="ndp-settings-label">Password Unlock</span>
          <span className="ndp-settings-value">
            <Toggle 
              checked={passwordUnlockEnabled} 
              onClick={() => {
                if (!passwordUnlockEnabled) {
                  setSettingsSubpage('password-setting');
                } else {
                  setPasswordUnlockEnabled(false);
                }
              }} 
            />
          </span>
        </div>

        {/* Password setting */}
        <div className="ndp-settings-row is-clickable" onClick={onPasswordSettingClick}>
          <span className="ndp-settings-label">Password setting</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}

function PasswordSettingSubpage({ setPassword, setSettingsSubpage, setPasswordUnlockEnabled }) {
  const [phase, setPhase] = useState('enter'); // 'enter' or 'confirm'
  const [firstPin, setFirstPin] = useState('');
  const [currentPin, setCurrentPin] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const toastTimeoutRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 5000); // 5 seconds
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleKeyPress = (num) => {
    if (currentPin.length >= 4) return;
    const nextPin = currentPin + num;
    setCurrentPin(nextPin);

    if (nextPin.length === 4) {
      if (phase === 'enter') {
        // Go to confirm phase
        setTimeout(() => {
          setFirstPin(nextPin);
          setCurrentPin('');
          setPhase('confirm');
        }, 300);
      } else {
        // We are in confirm phase: check if they match!
        if (nextPin === firstPin) {
          setTimeout(() => {
            setPassword(nextPin);
            setPasswordUnlockEnabled(true);
            setSettingsSubpage('password-unlock');
          }, 300);
        } else {
          setTimeout(() => {
            showToast('The two passwords you entered did not match!');
            setCurrentPin('');
          }, 300);
        }
      }
    }
  };

  const handleBackspace = () => {
    setCurrentPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="ndp-page ndp-pin-screen" style={{ justifyContent: 'flex-start', paddingTop: '40px' }}>
      <div className="ndp-pin-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
          {phase === 'enter' ? 'Enter password' : 'Enter password again'}
        </h2>
      </div>

      <div className="ndp-pin-dots" style={{ marginBottom: '48px', gap: '20px', display: 'flex' }}>
        {[0, 1, 2, 3].map((idx) => (
          <div 
            key={idx} 
            className={`ndp-pin-dot-circle ${idx < currentPin.length ? 'is-filled' : ''}`} 
          />
        ))}
      </div>

      <div className="ndp-pin-keypad" style={{ width: '100%', maxWidth: '320px' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button 
            key={num} 
            type="button" 
            className="ndp-key-btn" 
            onClick={() => handleKeyPress(num.toString())}
          >
            {num}
          </button>
        ))}
        {/* Empty placeholder to keep layout */}
        <div style={{ width: '72px', height: '72px' }} />
        <button 
          type="button" 
          className="ndp-key-btn" 
          onClick={() => handleKeyPress('0')}
        >
          0
        </button>
        <button 
          type="button" 
          className="ndp-key-btn" 
          onClick={handleBackspace}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </div>

      {/* Android-style Toast */}
      {toastMessage && (
        <div className="ndp-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

function Content({ 
  activeTab, 
  navConfig, 
  handleNavConfigChange, 
  onDisconnectionClick, 
  settingsSubpage, 
  setSettingsSubpage, 
  onPanelIpClick, 
  panelIpAddress, 
  deviceName, 
  setDeviceName, 
  isDark,
  brightness,
  setBrightness,
  autoLockTime,
  setAutoLockTime,
  screenSaver,
  setScreenSaver,
  screenSleep,
  setScreenSleep,
  passwordUnlockEnabled,
  setPasswordUnlockEnabled,
  password,
  setPassword,
  homepageWidgets,
  setHomepageWidgets,
  itemsOrder,
  setItemsOrder,
  cloudServerAddress,
  onCloudServerAddressClick
}) {
  if (activeTab === 'home') return <HomePage homepageWidgets={homepageWidgets} />;
  if (activeTab === 'video') return <VideoPage />;
  if (activeTab === 'serial') return <SerialPage />;
  if (activeTab === 'volume') return <VolumePage />;
  if (activeTab === 'air') return <div className="ndp-page"><AirPage /></div>;
  if (activeTab === 'remote') return <RemotePage />;
  if (activeTab === 'projector') return <ProjectionScreen isDark={isDark} vertical={true} />;
  if (activeTab === 'settings') {
    if (settingsSubpage === 'resolution') {
      return <ResolutionSubpage />;
    }
    if (settingsSubpage === 'language') {
      return <LanguageSubpage />;
    }
    if (settingsSubpage === 'display') {
      return (
        <DisplaySubpage 
          brightness={brightness}
          setBrightness={setBrightness}
          autoLockTime={autoLockTime}
          setAutoLockTime={setAutoLockTime}
          screenSaver={screenSaver}
          setScreenSaver={setScreenSaver}
          screenSleep={screenSleep}
          setScreenSleep={setScreenSleep}
          isDark={isDark}
        />
      );
    }
    if (settingsSubpage === 'customize') {
      return (
        <CustomizeSubpage 
          onSubpageSelect={(sub) => setSettingsSubpage(sub)}
        />
      );
    }
    if (settingsSubpage === 'customize-nav') {
      return (
        <NavigationBarSubpage 
          navConfig={navConfig}
          onNavConfigChange={handleNavConfigChange}
          itemsOrder={itemsOrder}
          setItemsOrder={setItemsOrder}
        />
      );
    }
    if (settingsSubpage === 'customize-template') {
      return (
        <ChooseWidgetSubpage 
          homepageWidgets={homepageWidgets}
          setHomepageWidgets={setHomepageWidgets}
        />
      );
    }
    if (settingsSubpage === 'password-unlock') {
      return (
        <PasswordUnlockSubpage 
          passwordUnlockEnabled={passwordUnlockEnabled}
          setPasswordUnlockEnabled={setPasswordUnlockEnabled}
          onPasswordSettingClick={() => {
            setSettingsSubpage('password-setting');
          }}
          setSettingsSubpage={setSettingsSubpage}
          isDark={isDark}
        />
      );
    }
    if (settingsSubpage === 'password-setting') {
      return (
        <PasswordSettingSubpage 
          password={password}
          setPassword={setPassword}
          setSettingsSubpage={setSettingsSubpage}
          setPasswordUnlockEnabled={setPasswordUnlockEnabled}
        />
      );
    }
    return (
      <SettingsPage 
        onDisconnectionClick={onDisconnectionClick} 
        onResolutionClick={() => setSettingsSubpage('resolution')}
        onLanguageClick={() => setSettingsSubpage('language')}
        onDisplayClick={() => setSettingsSubpage('display')}
        onCustomizeClick={() => setSettingsSubpage('customize')}
        onPasswordUnlockClick={() => setSettingsSubpage('password-unlock')}
        onPanelIpClick={onPanelIpClick}
        panelIpAddress={panelIpAddress}
        deviceName={deviceName}
        setDeviceName={setDeviceName}
        isDark={isDark}
        cloudServerAddress={cloudServerAddress}
        onCloudServerAddressClick={onCloudServerAddressClick}
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
  const [isAndroidEthernetOpen, setIsAndroidEthernetOpen] = useState(false);
  const [panelIpAddress, setPanelIpAddress] = useState('192.168.110.125');
  const [deviceName, setDeviceName] = useState('3F NDP600');
  const [isDisconnectConfirmOpen, setIsDisconnectConfirmOpen] = useState(false);
  const [showPowerOnScreen, setShowPowerOnScreen] = useState(false);
  const [cloudServerAddress, setCloudServerAddress] = useState('https://test.qnextech.com');
  const [isCloudServerModalOpen, setIsCloudServerModalOpen] = useState(false);

  const [isLocking, setIsLocking] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(9);

  const [brightness, setBrightness] = useState(80);
  const [autoLockTime, setAutoLockTime] = useState('2 Minutes');
  const [screenSaver, setScreenSaver] = useState('Never');
  const [screenSleep, setScreenSleep] = useState('10 Minutes');
  const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(true);
  const [password, setPassword] = useState('8888');
  const [homepageWidgets, setHomepageWidgets] = useState(['air', 'projector']);
  const [itemsOrder, setItemsOrder] = useState(['power', 'video', 'volume', 'serial', 'air', 'projector', 'remote']);

  useEffect(() => {
    let timer;
    if (isLocking && lockCountdown > 0) {
      timer = setInterval(() => {
        setLockCountdown(prev => prev - 1);
      }, 1000);
    } else if (isLocking && lockCountdown === 0) {
      const lockTimer = setTimeout(() => {
        setLocked(true);
        setIsLocking(false);
      }, 0);
      return () => clearTimeout(lockTimer);
    }
    return () => clearInterval(timer);
  }, [isLocking, lockCountdown]);

  const handleStartLock = () => {
    setLockCountdown(9);
    setIsLocking(true);
  };

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
              <input 
                type="checkbox" 
                checked={isDisconnected} 
                onChange={(e) => {
                  const checked = e.target.checked;
                  setIsDisconnected(checked);
                  if (!checked) {
                    setActiveTab('home');
                    setSettingsSubpage(null);
                  }
                }} 
              />
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
            <div className={`ndp-screen ${isLight ? 'is-light' : ''} relative`}>
              {isAndroidEthernetOpen && (
                <div className="absolute inset-0 z-50 overflow-hidden shadow-2xl">
                  <AndroidEthernet 
                      isDark={!isLight} 
                      initialIp={panelIpAddress}
                      onSave={(newIp) => {
                          setPanelIpAddress(newIp);
                          setIsAndroidEthernetOpen(false);
                      }}
                      onBack={() => setIsAndroidEthernetOpen(false)} 
                  />
                </div>
              )}
              {isDisconnected ? (
                <Disconnection 
                  isDark={!isLight} 
                  onConnect={() => {
                    setIsDisconnected(false);
                    setShowPowerOnScreen(true);
                  }}
                  title="Connection Setting"
                  initialLabelText="NDP600 IP"
                  initialIpAddress="192.168.5.105"
                />
              ) : showPowerOnScreen ? (
                <PowerOnScreen 
                  onPowerOn={() => {
                    setShowPowerOnScreen(false);
                    setActiveTab('home');
                    setSettingsSubpage(null);
                  }}
                  onLock={() => {
                    setLocked(true);
                    setActiveTab('home');
                  }}
                />
              ) : locked ? (
                <LockScreen 
                  setLocked={setLocked} 
                  passwordUnlockEnabled={passwordUnlockEnabled}
                  password={password}
                  isDark={theme === 'dark'}
                />
              ) : (
                <>
                  {isLocking && (
                    <LockCountdownModal 
                      isDark={theme === 'dark'}
                      countdown={lockCountdown}
                      onCancel={() => setIsLocking(false)}
                      onExecute={() => {
                        setLocked(true);
                        setIsLocking(false);
                      }}
                    />
                  )}
                  {isDisconnectConfirmOpen && (
                    <DisconnectConfirmModal 
                      isDark={theme === 'dark'}
                      onCancel={() => setIsDisconnectConfirmOpen(false)}
                      onExecute={() => {
                        setIsDisconnectConfirmOpen(false);
                        setIsDisconnected(true);
                      }}
                    />
                  )}
                  {isCloudServerModalOpen && (
                    <CloudServerModal 
                      isDark={theme === 'dark'}
                      initialValue={cloudServerAddress}
                      onCancel={() => setIsCloudServerModalOpen(false)}
                      onSave={(val) => {
                        setCloudServerAddress(val);
                        setIsCloudServerModalOpen(false);
                      }}
                    />
                  )}
                  <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={(tabId) => {
                      setActiveTab(tabId);
                      setSettingsSubpage(null);
                    }} 
                    navConfig={navConfig} 
                    itemsOrder={itemsOrder}
                  />
                  <div className="ndp-main">
                    <TopTools 
                      onSettingsClick={() => {
                        setActiveTab('settings');
                        setSettingsSubpage(null);
                      }} 
                    />
                    {activeTab === 'settings' && (
                      settingsSubpage ? (
                        <button className="ndp-back-title" type="button" onClick={() => {
                          if (settingsSubpage === 'customize-nav' || settingsSubpage === 'customize-template') {
                            setSettingsSubpage('customize');
                          } else if (settingsSubpage === 'password-setting') {
                            setSettingsSubpage('password-unlock');
                          } else {
                            setSettingsSubpage(null);
                          }
                        }}>
                          <ChevronLeft size={22} />
                          <span>
                            {settingsSubpage === 'resolution' && 'HDMI OUT Resolution'}
                            {settingsSubpage === 'language' && 'Language'}
                            {settingsSubpage === 'display' && 'Display'}
                            {settingsSubpage === 'customize' && 'Customize'}
                            {settingsSubpage === 'customize-nav' && 'Navigation bar'}
                            {settingsSubpage === 'customize-template' && 'Choose Widget'}
                            {settingsSubpage === 'password-unlock' && 'Password Unlock'}
                            {settingsSubpage === 'password-setting' && 'Password setting'}
                          </span>
                        </button>
                      ) : (
                        <h1 className="ndp-screen-title">Setting</h1>
                      )
                    )}
                    <div className="ndp-content">
                      <Content 
                        activeTab={activeTab} 
                        navConfig={navConfig} 
                        handleNavConfigChange={handleNavConfigChange}
                        onDisconnectionClick={() => setIsDisconnectConfirmOpen(true)} 
                        settingsSubpage={settingsSubpage}
                        setSettingsSubpage={setSettingsSubpage}
                        onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
                        panelIpAddress={panelIpAddress}
                        deviceName={deviceName}
                        setDeviceName={setDeviceName}
                        isDark={theme === 'dark'}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        autoLockTime={autoLockTime}
                        setAutoLockTime={setAutoLockTime}
                        screenSaver={screenSaver}
                        setScreenSaver={setScreenSaver}
                        screenSleep={screenSleep}
                        setScreenSleep={setScreenSleep}
                        passwordUnlockEnabled={passwordUnlockEnabled}
                        setPasswordUnlockEnabled={setPasswordUnlockEnabled}
                        password={password}
                        setPassword={setPassword}
                        homepageWidgets={homepageWidgets}
                        setHomepageWidgets={setHomepageWidgets}
                        itemsOrder={itemsOrder}
                        setItemsOrder={setItemsOrder}
                        cloudServerAddress={cloudServerAddress}
                        onCloudServerAddressClick={() => setIsCloudServerModalOpen(true)}
                      />
                    </div>
                    <BottomDock locked={locked} muted={muted} setLocked={handleStartLock} setMuted={setMuted} />
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
