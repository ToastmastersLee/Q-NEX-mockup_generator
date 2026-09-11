import { useState, Fragment } from 'react';
import {
  ChevronDown,
  Plus,
  Minus,
  Sun,
  Snowflake,
  Fan,
  Wind,
  Disc3,
  Check,
  Flame,
} from 'lucide-react';
import { AirConditionerIcon } from '../../../assets/Icons';
import { GlassPanel, IconButton, SegButton, Toggle } from '../components/common';
import './AirPage.css';


export function AirPage({ compact = false }) {
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
