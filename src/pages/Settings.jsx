import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const EditableText = ({ text, className }) => {
    const [isEditable, setIsEditable] = useState(false);
    const spanRef = useRef(null);

    useEffect(() => {
        if (isEditable && spanRef.current) {
            spanRef.current.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(spanRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [isEditable]);

    return (
        <span 
            ref={spanRef}
            className={`outline-none cursor-text ${isEditable ? 'bg-blue-500/20 px-1 -mx-1 rounded' : ''} ${className}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditable(true);
            }}
            onBlur={() => setIsEditable(false)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    setIsEditable(false);
                }
            }}
            title="Double-click to edit"
        >
            {text}
        </span>
    );
};

export const Settings = ({ isDark, onDisconnectionClick, onPanelIpClick, panelIpAddress, onCustomizeClick }) => {
    const clickCountRef = useRef(0);
    const clickTimerRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deviceModel, setDeviceModel] = useState('Q-NEX-NMP311-RK');
    const [tempDeviceModel, setTempDeviceModel] = useState('');

    const deviceNameClickCountRef = useRef(0);
    const deviceNameClickTimerRef = useRef(null);
    const [isDeviceNameModalOpen, setIsDeviceNameModalOpen] = useState(false);
    const [deviceName, setDeviceName] = useState('NMP311-Product');
    const [tempDeviceName, setTempDeviceName] = useState('');

    const settingsItems = [
        { label: 'Device Name', value: deviceName, type: 'text' },
        { label: 'Device ID', value: '6D171B770608', type: 'qrcode' },
        { label: 'Panel IP', value: `${panelIpAddress} (30:11:9a:69:2e:d8)`, type: 'text_chevron' },
        { label: 'Divisible Room Mode', type: 'chevron' },
        { label: 'Language', type: 'chevron' },
        { label: 'HDMI OUT Resolution', type: 'chevron' },
        { label: 'Display', type: 'chevron' },
        { label: 'Customize', type: 'chevron' },
        { label: 'Password Unlock', type: 'chevron' },
        { label: 'Date & Time', type: 'chevron' },
        { label: 'Software Version', value: 'V 1.0.1.2', type: 'text_chevron' },
        { label: 'Q-NEX Cloud Server Address', type: 'chevron' },
        { label: 'Disconnection', type: 'text' },
        { label: 'Clear Cache & Restart Touch Panel', type: 'text' }
    ];

    const handleItemClick = (label) => {
        if (label === 'Software Version') {
            clickCountRef.current += 1;
            if (clickCountRef.current === 3) {
                setTempDeviceModel(deviceModel);
                setIsModalOpen(true);
                clickCountRef.current = 0;
            }
            if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
            clickTimerRef.current = setTimeout(() => {
                clickCountRef.current = 0;
            }, 600); // Reset count if not clicked fast enough
        } else if (label === 'Device Name') {
            deviceNameClickCountRef.current += 1;
            if (deviceNameClickCountRef.current === 4) {
                setTempDeviceName(deviceName);
                setIsDeviceNameModalOpen(true);
                deviceNameClickCountRef.current = 0;
            }
            if (deviceNameClickTimerRef.current) clearTimeout(deviceNameClickTimerRef.current);
            deviceNameClickTimerRef.current = setTimeout(() => {
                deviceNameClickCountRef.current = 0;
            }, 800); // Reset count if not clicked fast enough
        } else if (label === 'Disconnection') {
            if (onDisconnectionClick) {
                onDisconnectionClick();
            }
        } else if (label === 'Panel IP') {
            if (onPanelIpClick) {
                onPanelIpClick();
            }
        } else if (label === 'Customize') {
            if (onCustomizeClick) {
                onCustomizeClick();
            }
        }
    };

    const handleConfirm = () => {
        setDeviceModel(tempDeviceModel);
        setIsModalOpen(false);
    };

    return (
        <div className="p-8 h-full flex flex-col overflow-y-auto relative">
            <div className="max-w-5xl w-full mx-auto pb-10">
                {settingsItems.map((item, idx) => (
                    <div 
                        key={idx} 
                        className={`flex justify-between items-center py-5 ${(item.label === 'Software Version' || item.label === 'Disconnection' || item.label === 'Device Name' || item.label === 'Panel IP' || item.label === 'Customize') ? 'cursor-pointer active:opacity-70' : ''} ${isDark ? 'border-b border-gray-600/50' : 'border-b border-gray-300'}`}
                        onClick={() => handleItemClick(item.label)}
                    >
                        <span className={`text-lg font-bold tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{item.label}</span>
                        <div className="flex items-center gap-4">
                            {item.type === 'text' && (
                                <EditableText text={item.value || ''} className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            )}
                            {item.type === 'qrcode' && (
                                <div className="flex flex-col items-end gap-2 my-2">
                                    <EditableText text={item.value} className={`text-sm tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <div className={`w-16 h-16 p-1 ${isDark ? 'bg-white rounded-sm' : 'border border-gray-300'}`}>
                                        <div className="w-full h-full" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 4px 4px', backgroundSize: '8px 8px'}}></div>
                                    </div>
                                </div>
                            )}
                            {(item.type === 'text_chevron' || item.type === 'chevron') && (
                                <div className="flex items-center gap-4 pointer-events-none">
                                    {item.value && <span className={`text-base outline-none cursor-text ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.value}</span>}
                                    <ChevronRight className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 rounded-3xl">
                    <div className={`w-[28rem] p-8 rounded-[2rem] flex flex-col items-center gap-6 ${isDark ? 'bg-gradient-to-br from-[#5f7eb0] to-[#456499] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10' : 'bg-white shadow-2xl border border-gray-200'}`}>
                        <h3 className={`text-lg font-bold tracking-widest ${isDark ? 'text-white' : 'text-gray-800'}`}>{tempDeviceModel}</h3>
                        
                        <div className={`w-full px-4 py-3 rounded-md ${isDark ? 'bg-[#7392c6] border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'bg-gray-50 border border-gray-300'}`}>
                            <input 
                                type="text"
                                value={tempDeviceModel}
                                onChange={(e) => setTempDeviceModel(e.target.value)}
                                className={`w-full bg-transparent outline-none font-bold text-base tracking-wide ${isDark ? 'text-white placeholder-white/70' : 'text-gray-800'}`}
                                autoFocus
                            />
                        </div>

                        <div className="flex w-full gap-6 mt-2">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className={`flex-1 py-3 rounded-full font-bold text-lg transition-all ${isDark ? 'bg-[#5b7db1] text-white hover:bg-[#6c91cd] shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md'}`}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirm}
                                className={`flex-1 py-3 rounded-full font-bold text-lg transition-all shadow-[0_4px_15px_rgba(0,255,204,0.4)] hover:opacity-90 ${isDark ? 'bg-[#00eecd] text-white' : 'bg-[#00eecd] text-white'}`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Device Name Modal Overlay */}
            {isDeviceNameModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 rounded-3xl">
                    <div className={`w-[28rem] p-8 rounded-[2.2rem] flex flex-col items-center gap-6 ${isDark ? 'bg-gradient-to-br from-[#5f7eb0] to-[#456499] shadow-[0_15px_50px_rgba(0,0,0,0.5)] border border-white/10' : 'bg-white shadow-2xl border border-gray-200'}`}>
                        <div className={`w-full px-4 py-3 rounded-md ${isDark ? 'bg-[#7392c6] border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'bg-gray-50 border border-gray-300'}`}>
                            <input 
                                type="text"
                                value={tempDeviceName}
                                onChange={(e) => setTempDeviceName(e.target.value)}
                                className={`w-full bg-transparent outline-none font-bold text-base tracking-wide ${isDark ? 'text-white placeholder-white/70' : 'text-gray-800'}`}
                                autoFocus
                            />
                        </div>

                        <div className="flex w-full gap-6 mt-2">
                            <button 
                                onClick={() => setIsDeviceNameModalOpen(false)}
                                className={`flex-1 py-3 rounded-full font-bold text-lg transition-all ${isDark ? 'bg-[#5b7db1] text-white hover:bg-[#6c91cd] shadow-[0_4px_10px_rgba(0,0,0,0.2)]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md'}`}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => {
                                    setDeviceName(tempDeviceName);
                                    setIsDeviceNameModalOpen(false);
                                }}
                                className={`flex-1 py-3 rounded-full font-bold text-lg transition-all shadow-[0_4px_15px_rgba(0,255,204,0.4)] hover:opacity-90 ${isDark ? 'bg-[#00eecd] text-white' : 'bg-[#00eecd] text-white'}`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
