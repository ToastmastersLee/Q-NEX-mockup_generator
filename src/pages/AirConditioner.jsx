import React, { useState, useRef, useEffect } from 'react';
import { Sun, Snowflake, Wind, Droplet, Flame, Fan, DropletOff } from 'lucide-react';
import { ToggleSwitch } from '../components/ToggleSwitch';

const CircularSlider = ({ value, onChange, min, max, isDark, isOn }) => {
    const svgRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // Math for the circular track
    const radius = 90;
    const center = 110;
    const strokeWidth = 10;
    const startAngle = 135; // Bottom left
    const endAngle = 405; // Bottom right
    const angleRange = endAngle - startAngle;

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y, 
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const handlePointerDown = (e) => {
        setIsDragging(true);
        updateValueFromEvent(e);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        updateValueFromEvent(e);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        } else {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isDragging]);

    const updateValueFromEvent = (e) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - center;
        const y = e.clientY - rect.top - center;
        
        // Calculate angle from center (top is 0)
        let angle = Math.atan2(y, x) * 180 / Math.PI + 90;
        if (angle < 0) angle += 360;
        
        // Handle the gap at the bottom
        if (angle > endAngle % 360 && angle < startAngle) {
            const distToStart = Math.abs(angle - startAngle);
            const distToEnd = Math.abs(angle - (endAngle % 360));
            angle = distToStart < distToEnd ? startAngle : endAngle;
        } else if (angle < startAngle) {
            angle += 360;
        }
        
        angle = Math.max(startAngle, Math.min(endAngle, angle));
        
        const percentage = (angle - startAngle) / angleRange;
        let newValue = min + percentage * (max - min);
        newValue = Math.round(newValue);
        onChange(Math.max(min, Math.min(max, newValue)));
    };

    const currentAngle = startAngle + ((value - min) / (max - min)) * angleRange;
    const thumbPos = polarToCartesian(center, center, radius, currentAngle);

    return (
        <div className="relative w-[220px] h-[220px] select-none touch-none">
            {/* The outer track */}
            <svg 
                ref={svgRef}
                width="220" 
                height="220" 
                className="absolute top-0 left-0 cursor-pointer"
                onPointerDown={handlePointerDown}
            >
                {/* Background Arc */}
                <path
                    d={describeArc(center, center, radius, startAngle, endAngle)}
                    fill="none"
                    stroke={isDark ? "#282f40" : "#e5e7eb"}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Active Arc */}
                <path
                    d={describeArc(center, center, radius, startAngle, currentAngle)}
                    fill="none"
                    stroke={isOn ? "#007AFF" : (isDark ? "#4b5563" : "#9ca3af")}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />
                {/* Thumb */}
                <circle
                    cx={thumbPos.x}
                    cy={thumbPos.y}
                    r="8"
                    fill={isOn ? "#ffffff" : (isDark ? "#6b7280" : "#d1d5db")}
                    className="shadow-lg transition-all duration-300"
                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.4))' }}
                />
            </svg>

            {/* Inner raised circle */}
            <div className="absolute inset-0 m-auto w-[150px] h-[150px] rounded-full pointer-events-none">
                <div className={`w-full h-full rounded-full flex flex-col items-center justify-center ${isDark ? 'bg-[#353c4d] shadow-[-5px_-5px_15px_rgba(255,255,255,0.02),5px_5px_20px_rgba(0,0,0,0.5)] border border-white/5' : 'bg-gray-100 shadow-xl border border-gray-200'}`}>
                    <Flame className={`w-6 h-6 mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`text-4xl font-light tracking-wider ${isDark ? 'text-gray-100' : 'text-black'}`}>
                        {value}&deg;C
                    </span>
                </div>
            </div>
        </div>
    );
};

export const AirConditioner = ({ isDark }) => {
    const [isOn, setIsOn] = useState(true);
    const [temperature, setTemperature] = useState(26);
    const [mode, setMode] = useState('cool'); // 'sun', 'cool', 'wind', 'auto', 'dry'
    const [fanSpeed, setFanSpeed] = useState('auto'); // 'low', 'med', 'high', 'auto'
    const [swing, setSwing] = useState(true);

    const activeColor = isOn 
        ? (isDark ? 'text-white' : 'text-blue-600') 
        : (isDark ? 'text-gray-500' : 'text-gray-400');
    const inactiveColor = isDark ? 'text-gray-600' : 'text-gray-300';

    return (
        <div className="flex items-center justify-center h-full w-full px-8 py-4 overflow-hidden">
            <div className={`w-full max-w-[66rem] h-full max-h-[26rem] flex flex-col rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                
                {/* Top Left Segment Control for Power */}
                <div className={`absolute top-8 left-8 w-[8rem] h-[2.75rem] rounded-full p-1 flex items-center ${isDark ? 'bg-[#212634] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.05)]' : 'bg-gray-300 shadow-inner'}`}>
                    <button 
                        onClick={() => setIsOn(false)}
                        className={`flex-1 h-full rounded-full flex items-center justify-center transition-all text-xs font-bold tracking-wider ${!isOn ? 'bg-[#007AFF] text-white shadow-[0_2px_5px_rgba(0,0,0,0.4)]' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        OFF
                    </button>
                    <button 
                        onClick={() => setIsOn(true)}
                        className={`flex-1 h-full rounded-full flex items-center justify-center transition-all text-xs font-bold tracking-wider ${isOn ? 'bg-[#007AFF] text-white shadow-[0_2px_5px_rgba(0,0,0,0.4)]' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        ON
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center pt-8">
                    
                    {/* Left Section: Temperature Control */}
                    <div className="flex items-center gap-12 mr-16">
                        <button 
                            onClick={() => setTemperature(Math.min(30, temperature + 1))}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl font-light transition-all ${isDark ? 'bg-[#363d4f] text-[#8b9cb0] shadow-[-3px_-3px_8px_rgba(255,255,255,0.03),3px_3px_8px_rgba(0,0,0,0.4)] border border-white/5 hover:text-white' : 'bg-gray-100 border-2 border-gray-300 text-gray-600 hover:bg-gray-200 shadow-md'}`}
                        >
                            +
                        </button>

                        <CircularSlider 
                            value={temperature} 
                            onChange={setTemperature} 
                            min={16} 
                            max={30} 
                            isDark={isDark} 
                            isOn={isOn}
                        />

                        <button 
                            onClick={() => setTemperature(Math.max(16, temperature - 1))}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-4xl font-light pb-1 transition-all ${isDark ? 'bg-[#363d4f] text-[#8b9cb0] shadow-[-3px_-3px_8px_rgba(255,255,255,0.03),3px_3px_8px_rgba(0,0,0,0.4)] border border-white/5 hover:text-white' : 'bg-gray-100 border-2 border-gray-300 text-gray-600 hover:bg-gray-200 shadow-md'}`}
                        >
                            -
                        </button>
                    </div>

                    {/* Right Section: Modes and Fans */}
                    <div className="flex flex-col gap-6 ml-12">
                        {/* Mode Row */}
                        <div className={`flex items-center gap-8 px-10 py-4 rounded-full ${isDark ? 'bg-[#212634] shadow-[inset_0_2px_10px_rgba(0,0,0,0.4),inset_0_-1px_2px_rgba(255,255,255,0.05)]' : 'bg-gray-200 shadow-inner'}`}>
                            <button onClick={() => setMode('sun')} className={`${mode === 'sun' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Sun className="w-6 h-6" />
                            </button>
                            <button onClick={() => setMode('cool')} className={`${mode === 'cool' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Snowflake className="w-6 h-6" />
                            </button>
                            <button onClick={() => setMode('wind')} className={`${mode === 'wind' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Wind className="w-6 h-6" />
                            </button>
                            <button onClick={() => setMode('auto')} className={`font-bold text-lg ${mode === 'auto' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                A
                            </button>
                            <button onClick={() => setMode('dry')} className={`${mode === 'dry' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <DropletOff className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Fan Speed Row */}
                        <div className={`flex items-center justify-between px-10 py-4 rounded-full ${isDark ? 'bg-[#212634] shadow-[inset_0_2px_10px_rgba(0,0,0,0.4),inset_0_-1px_2px_rgba(255,255,255,0.05)]' : 'bg-gray-200 shadow-inner'}`}>
                            <button onClick={() => setFanSpeed('low')} className={`flex items-center gap-1 ${fanSpeed === 'low' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Fan className="w-5 h-5" />
                                <span className="text-[10px] font-bold">1</span>
                            </button>
                            <button onClick={() => setFanSpeed('med')} className={`flex items-center gap-1 ${fanSpeed === 'med' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Fan className="w-5 h-5" />
                                <span className="text-[10px] font-bold">2</span>
                            </button>
                            <button onClick={() => setFanSpeed('high')} className={`flex items-center gap-1 ${fanSpeed === 'high' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Fan className="w-5 h-5" />
                                <span className="text-[10px] font-bold">3</span>
                            </button>
                            <button onClick={() => setFanSpeed('auto')} className={`flex items-center gap-1 ${fanSpeed === 'auto' ? activeColor : inactiveColor} hover:opacity-80 transition-opacity`}>
                                <Fan className="w-5 h-5" />
                                <span className="text-[10px] font-bold">A</span>
                            </button>
                        </div>

                        {/* Swing Row */}
                        <div className="flex items-center justify-end gap-4 mt-2 pr-6">
                            <span className={`text-sm font-semibold tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Swing</span>
                            <ToggleSwitch isOn={swing} onToggle={() => setSwing(!swing)} isDark={isDark} disabled={!isOn} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
