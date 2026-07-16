import { useState, useEffect, useRef } from 'react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { SettingsRow } from '../components/SettingsRow';
import { textTertiary } from '../styles/theme';

const WheelColumn = ({ range, value, onChange }) => {
    const containerRef = useRef(null);
    const itemHeight = 40;
    const [isMounted, setIsMounted] = useState(false);

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
        const index = Math.round(e.target.scrollTop / itemHeight);
        if (index >= 0 && index < range.length && range[index] !== value) {
            onChange(range[index]);
        }
    };

    return (
        <div 
            ref={containerRef} onScroll={handleScroll}
            className="h-[120px] overflow-y-scroll snap-y snap-mandatory scrollbar-none relative w-16"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            <div className="h-[40px] shrink-0" />
            {range.map((val) => (
                <div 
                    key={val}
                    onClick={() => containerRef.current?.scrollTo({ top: val * itemHeight, behavior: 'smooth' })}
                    className={`h-[40px] flex items-center justify-center snap-center cursor-pointer select-none text-xl font-bold transition-all ${
                        val === value ? 'text-blue-600 scale-110 font-bold' : 'text-gray-400 opacity-60 hover:text-gray-600'
                    }`}
                >
                    {String(val).padStart(2, '0')}
                </div>
            ))}
            <div className="h-[40px] shrink-0" />
        </div>
    );
};

const TimePickerModal = ({ onClose, onConfirm, initialHour, initialMinute, isDark }) => {
    const [tempHour, setTempHour] = useState(initialHour);
    const [tempMinute, setTempMinute] = useState(initialMinute);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const cardBg = isDark ? 'bg-[#eef2f7] text-gray-800' : 'bg-white text-black border-4 border-black';
    const dividerColor = isDark ? 'border-gray-300' : 'border-black';
    const btnClass = `flex-1 font-bold text-base transition-colors flex items-center justify-center ${isDark ? 'text-blue-600 hover:text-blue-800' : 'text-black hover:bg-gray-100'}`;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 rounded-3xl animate-fade-in">
            <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
            <div className={`w-64 rounded-2xl flex flex-col overflow-hidden shadow-2xl ${cardBg}`}>
                <div className="relative py-4 px-6 flex justify-center items-center gap-2">
                    <div className="absolute left-6 right-6 top-[56px] pointer-events-none" style={{ height: '40px', borderTop: isDark ? '1px solid #3b82f6' : '2px solid black', borderBottom: isDark ? '1px solid #3b82f6' : '2px solid black' }} />
                    <WheelColumn range={hours} value={tempHour} onChange={setTempHour} isDark={isDark} />
                    <span className="text-xl font-bold text-blue-600 relative z-10 select-none pb-0.5">:</span>
                    <WheelColumn range={minutes} value={tempMinute} onChange={setTempMinute} isDark={isDark} />
                </div>
                <div className={`flex border-t ${dividerColor} h-12`}>
                    <button onClick={onClose} className={btnClass}>Cancel</button>
                    <div className={`w-[1px] border-r ${dividerColor} h-full`} />
                    <button onClick={() => onConfirm(tempHour, tempMinute)} className={btnClass}>OK</button>
                </div>
            </div>
        </div>
    );
};

export const ScheduledPowerOff = ({ isDark, isEnabled, setIsEnabled, powerOffTime, setPowerOffTime }) => {
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [hasConfigured, setHasConfigured] = useState(powerOffTime !== null);

    const getHourAndMinute = () => {
        if (powerOffTime) { const [h, m] = powerOffTime.split(':').map(Number); return { hour: h, minute: m }; }
        const now = new Date();
        return { hour: now.getHours(), minute: now.getMinutes() };
    };
    const { hour, minute } = getHourAndMinute();

    const handleToggle = () => {
        if (!isEnabled) { setIsEnabled(true); setIsPickerOpen(true); }
        else { setIsEnabled(false); }
    };

    const handlePickerConfirm = (h, m) => {
        setPowerOffTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        setHasConfigured(true);
        setIsPickerOpen(false);
    };

    const handlePickerClose = () => {
        setIsPickerOpen(false);
        if (!hasConfigured) setIsEnabled(false);
    };

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative animate-fade-in">
            <div className="max-w-5xl w-full mx-auto pb-10">
                <SettingsRow isDark={isDark} label="Scheduled Power-Off" type="custom"
                    rightContent={<ToggleSwitch isOn={isEnabled} onToggle={handleToggle} isDark={isDark} />}
                />

                {isEnabled && powerOffTime && (
                    <>
                        <SettingsRow isDark={isDark} label="Power-Off time & Repeat" value={powerOffTime}
                            type="text_chevron" clickable onClick={() => setIsPickerOpen(true)}
                        />
                        <div className="mt-4">
                            <p className={`text-sm italic ${textTertiary(isDark)}`}>
                                * The device will automatically power off daily at {powerOffTime}. Press the physical power button to restart.
                            </p>
                        </div>
                    </>
                )}
            </div>

            {isPickerOpen && (
                <TimePickerModal onClose={handlePickerClose} onConfirm={handlePickerConfirm}
                    initialHour={hour} initialMinute={minute} isDark={isDark}
                />
            )}
        </div>
    );
};
