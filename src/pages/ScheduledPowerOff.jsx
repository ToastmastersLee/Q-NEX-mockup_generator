import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { ToggleSwitch } from '../components/ToggleSwitch';

const WheelColumn = ({ range, value, onChange, isDark }) => {
    const containerRef = useRef(null);
    const itemHeight = 40; // px
    const [isMounted, setIsMounted] = useState(false);

    // Scroll to the initial value on mount
    useEffect(() => {
        if (containerRef.current) {
            const timer = setTimeout(() => {
                containerRef.current.scrollTop = value * itemHeight;
                setIsMounted(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [value]);

    const handleScroll = (e) => {
        if (!isMounted) return;
        const scrollTop = e.target.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        if (index >= 0 && index < range.length) {
            if (range[index] !== value) {
                onChange(range[index]);
            }
        }
    };

    const handleItemClick = (val) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: val * itemHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="h-[120px] overflow-y-scroll snap-y snap-mandatory scrollbar-none relative w-16"
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            <div className="h-[40px] shrink-0" />
            {range.map((val) => {
                const isSelected = val === value;
                return (
                    <div 
                        key={val}
                        onClick={() => handleItemClick(val)}
                        className={`h-[40px] flex items-center justify-center snap-center cursor-pointer select-none text-xl font-bold transition-all ${
                            isSelected 
                                ? 'text-blue-600 scale-110 font-bold' 
                                : 'text-gray-400 opacity-60 hover:text-gray-600'
                        }`}
                    >
                        {String(val).padStart(2, '0')}
                    </div>
                );
            })}
            <div className="h-[40px] shrink-0" />
        </div>
    );
};

const TimePickerModal = ({ isOpen, onClose, onConfirm, initialHour, initialMinute, isDark }) => {
    const [tempHour, setTempHour] = useState(initialHour);
    const [tempMinute, setTempMinute] = useState(initialMinute);

    useEffect(() => {
        if (isOpen) {
            setTempHour(initialHour);
            setTempMinute(initialMinute);
        }
    }, [isOpen, initialHour, initialMinute]);

    if (!isOpen) return null;

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const cardBg = isDark ? 'bg-[#eef2f7] text-gray-800' : 'bg-white text-black border-4 border-black';
    const dividerColor = isDark ? 'border-gray-300' : 'border-black';
    const buttonTextClass = isDark ? 'text-blue-600 hover:text-blue-800' : 'text-black hover:bg-gray-100';

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 rounded-3xl animate-fade-in">
            <style>{`
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <div className={`w-64 rounded-2xl flex flex-col overflow-hidden shadow-2xl ${cardBg}`}>
                {/* Scroll Wheels Area */}
                <div className="relative py-4 px-6 flex justify-center items-center gap-2">
                    {/* Blue/Black Selection Lines Overlay */}
                    <div 
                        className="absolute left-6 right-6 top-[56px] pointer-events-none" 
                        style={{ 
                            height: '40px', 
                            borderTop: isDark ? '1px solid #3b82f6' : '2px solid black', 
                            borderBottom: isDark ? '1px solid #3b82f6' : '2px solid black' 
                        }} 
                    />
                    
                    <WheelColumn 
                        range={hours} 
                        value={tempHour} 
                        onChange={setTempHour} 
                        isDark={isDark} 
                    />
                    
                    <span className="text-xl font-bold text-blue-600 relative z-10 select-none pb-0.5">:</span>
                    
                    <WheelColumn 
                        range={minutes} 
                        value={tempMinute} 
                        onChange={setTempMinute} 
                        isDark={isDark} 
                    />
                </div>

                {/* Buttons Row */}
                <div className={`flex border-t ${dividerColor} h-12`}>
                    <button 
                        onClick={onClose}
                        className={`flex-1 font-bold text-base transition-colors ${buttonTextClass} flex items-center justify-center`}
                    >
                        Cancel
                    </button>
                    <div className={`w-[1px] border-r ${dividerColor} h-full`} />
                    <button 
                        onClick={() => onConfirm(tempHour, tempMinute)}
                        className={`flex-1 font-bold text-base transition-colors ${buttonTextClass} flex items-center justify-center`}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ScheduledPowerOff = ({ 
    isDark, 
    isEnabled, 
    setIsEnabled, 
    powerOffTime, 
    setPowerOffTime 
}) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [hasConfigured, setHasConfigured] = useState(powerOffTime !== null);

    // Initial hour and minute parsing
    const getHourAndMinute = () => {
        if (powerOffTime) {
            const [h, m] = powerOffTime.split(':').map(Number);
            return { hour: h, minute: m };
        }
        const now = new Date();
        return { hour: now.getHours(), minute: now.getMinutes() };
    };

    const { hour, minute } = getHourAndMinute();

    const handleToggle = () => {
        if (!isEnabled) {
            // Turn ON: open time picker immediately
            setIsEnabled(true);
            setIsPickerOpen(true);
        } else {
            // Turn OFF
            setIsEnabled(false);
        }
    };

    const handlePickerConfirm = (h, m) => {
        const formattedTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        setPowerOffTime(formattedTime);
        setHasConfigured(true);
        setIsPickerOpen(false);
    };

    const handlePickerClose = () => {
        setIsPickerOpen(false);
        if (!hasConfigured) {
            // If they cancel and have never set a time before, turn switch back OFF
            setIsEnabled(false);
        }
    };

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative animate-fade-in">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {/* Row 1: Toggle Option */}
                <div className={`flex justify-between items-center py-5 ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}>
                    <span className={`text-lg font-bold tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                        Scheduled Power-Off
                    </span>
                    <ToggleSwitch 
                        isOn={isEnabled} 
                        onToggle={handleToggle} 
                        isDark={isDark} 
                    />
                </div>

                {/* Row 2: Time Config (only when enabled) */}
                {isEnabled && powerOffTime && (
                    <>
                        <div 
                            className={`flex justify-between items-center py-5 cursor-pointer active:opacity-70 ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}
                            onClick={() => setIsPickerOpen(true)}
                        >
                            <span className={`text-lg font-bold tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                Power-Off time & Repeat
                            </span>
                            <div className="flex items-center gap-4">
                                <span className={`text-base font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {powerOffTime}
                                </span>
                                <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                        </div>

                        {/* Note text below */}
                        <div className="mt-4">
                            <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                * The device will automatically power off daily at {powerOffTime}. Press the physical power button to restart.
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Time Selection Dialog Modal */}
            <TimePickerModal 
                isOpen={isPickerOpen}
                onClose={handlePickerClose}
                onConfirm={handlePickerConfirm}
                initialHour={hour}
                initialMinute={minute}
                isDark={isDark}
            />
        </div>
    );
};
