import { useState } from 'react';
import {
  ChevronDown,
  Plus,
  Minus,
  Sun,
  Snowflake,
  Fan,
  Wind,
  Disc3,
} from 'lucide-react';
import { AirConditionerIcon } from '../../../../assets/Icons';
import { GlassPanel, IconButton, SegButton } from '../common';
import { AirDeviceSelectModal } from './AirDeviceSelectModal';

export const AirCompactCard = ({
    enabled,
    setEnabled,
    temperature,
    setTemperature,
    mode,
    setMode,
    selectedDevices,
    toggleDevice
}) => {
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

    return (
        <>
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

            <AirDeviceSelectModal 
                isOpen={isDeviceModalOpen}
                onClose={() => setIsDeviceModalOpen(false)}
                selectedDevices={selectedDevices}
                onToggleDevice={toggleDevice}
            />
        </>
    );
};
