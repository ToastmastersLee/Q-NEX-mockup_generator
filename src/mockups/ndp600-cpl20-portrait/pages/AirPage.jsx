import { useState } from 'react';
import {
  ChevronDown,
  Plus,
  Minus,
  Sun,
  Snowflake,
  Fan,
  Wind,
} from 'lucide-react';
import { GlassPanel, IconButton, Toggle } from '../components/common';
import { CircularSlider } from '../components/air/CircularSlider';
import { AirCompactCard } from '../components/air/AirCompactCard';
import { AirDeviceSelectModal } from '../components/air/AirDeviceSelectModal';
import './AirPage.css';

export function AirPage({ compact = false }) {
  const [enabled, setEnabled] = useState(true);
  const [temperature, setTemperature] = useState(26);
  const [mode, setMode] = useState('heat');
  const [fanSpeed, setFanSpeed] = useState('auto');
  const [swing, setSwing] = useState(true);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState(['All', 'NDP600', 'CBX 2']);

  const minTemp = 16;
  const maxTemp = 30;

  const toggleDevice = (device) => {
    setSelectedDevices(prev => 
      prev.includes(device) ? prev.filter(d => d !== device) : [...prev, device]
    );
  };

  if (compact) {
    return (
      <AirCompactCard 
        enabled={enabled}
        setEnabled={setEnabled}
        temperature={temperature}
        setTemperature={setTemperature}
        mode={mode}
        setMode={setMode}
        selectedDevices={selectedDevices}
        toggleDevice={toggleDevice}
      />
    );
  }

  return (
    <>
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
            <IconButton 
              label="Temp Up" 
              onClick={() => enabled && setTemperature(prev => Math.min(maxTemp, prev + 1))}
              style={{ width: 52, height: 52, borderRadius: '50%' }}
            >
              <Plus size={26} />
            </IconButton>

            <CircularSlider 
              enabled={enabled}
              temperature={temperature}
              setTemperature={setTemperature}
              mode={mode}
              minTemp={minTemp}
              maxTemp={maxTemp}
            />

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

      <AirDeviceSelectModal 
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        selectedDevices={selectedDevices}
        onToggleDevice={toggleDevice}
      />
    </>
  );
}
