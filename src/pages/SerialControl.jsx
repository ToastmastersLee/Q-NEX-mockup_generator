import React, { useState } from 'react';
import { Monitor, Radio, Disc3, CircleStop, ChevronRight, ChevronLeft, Smartphone } from 'lucide-react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { HdmiIcon, PowerControlIcon, VideoSwitchIcon } from '../assets/Icons';

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

export const SerialControl = ({ isDark }) => {
    const [rs232Power, setRs232Power] = useState(true);
    const [rs232Input, setRs232Input] = useState('windows');
    
    const [rs485Power, setRs485Power] = useState(true);
    
    const [cbx3Power, setCbx3Power] = useState(true);
    const [lectureCapture, setLectureCapture] = useState(true);
    
    const [activeDetail, setActiveDetail] = useState(null);
    const [cbx1ActiveBtn, setCbx1ActiveBtn] = useState(null);

    const handleCbx1Press = (btn) => {
        setCbx1ActiveBtn(btn);
        setTimeout(() => setCbx1ActiveBtn(null), 200);
    };

    const cardClass = `w-full h-full flex flex-col p-5 rounded-[1.5rem] ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`;
    const innerCardClass = `flex-1 flex flex-col justify-center rounded-[1rem] px-5 py-3 ${isDark ? 'bg-[#353c4d] shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)] border border-white/5' : 'bg-white border border-gray-200'}`;
    const headerClass = `flex items-center gap-3 mb-3 pl-2`;
    const titleClass = `text-[15px] font-bold tracking-wider ${isDark ? 'text-gray-200' : 'text-gray-800'}`;
    
    const IconButton = ({ active, onClick, children, label }) => (
        <button 
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-12 rounded-xl transition-all ${
                active 
                ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_12px_rgba(0,122,255,0.4)]' : 'bg-[#007AFF] text-white') 
                : (isDark ? 'bg-[#2a303e] text-gray-400 hover:text-gray-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')
            }`}
        >
            {children}
            {label && <span className="text-[9px] font-bold">{label}</span>}
        </button>
    );

    if (activeDetail === 'e-Curtain') {
        return (
            <div className="h-full w-full px-8 overflow-y-auto custom-scrollbar">
                <div className="w-full max-w-[66rem] min-h-[26rem] mx-auto min-h-full flex flex-col justify-center py-4">
                    <div className={`w-full flex-1 flex flex-col p-6 rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                    <div className="flex items-center justify-center relative mb-8">
                        <button 
                            className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setActiveDetail(null)}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>e-Curtain</h2>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-3 gap-6 items-center px-12">
                        {['Up', 'Down', 'Stop', 'Dimming1', 'Dimming2', 'All Window'].map(btn => {
                            const id = btn.toLowerCase().replace(' ', '');
                            return (
                                <button 
                                    key={id}
                                    onPointerDown={() => handleCbx1Press(id)}
                                    className={`h-16 rounded-2xl flex items-center justify-center text-lg font-bold transition-all ${
                                        cbx1ActiveBtn === id 
                                        ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_15px_rgba(0,122,255,0.5)]' : 'bg-[#007AFF] text-white')
                                        : (isDark ? 'bg-[#2a303e] text-gray-300 border border-white/10 hover:bg-[#353c4d]' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')
                                    }`}
                                >
                                    {btn}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full px-8 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[66rem] min-h-full mx-auto flex flex-col justify-center py-4">
                <div className="grid grid-cols-2 gap-6" style={{ gridAutoRows: 'minmax(12rem, auto)' }}>
                
                {/* RS232 */}
                <div className={cardClass}>
                    <div className={headerClass}>
                        <Monitor className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h3 className={titleClass}>RS232</h3>
                    </div>
                    <div className={innerCardClass}>
                        <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                            <ToggleSwitch isOn={rs232Power} onToggle={() => setRs232Power(!rs232Power)} isDark={isDark} />
                        </div>
                        <div className={`flex items-center justify-between pt-3 transition-opacity ${!rs232Power ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Input Source</span>
                            <div className="flex items-center gap-2">
                                <IconButton active={rs232Input === 'windows'} onClick={() => setRs232Input('windows')} label="Windows">
                                    <WindowsIcon className="w-4 h-4" />
                                </IconButton>
                                <IconButton active={rs232Input === 'hdmi'} onClick={() => setRs232Input('hdmi')} label="HDMI">
                                    <HdmiIcon className="w-4 h-4" />
                                </IconButton>
                                <IconButton active={rs232Input === 'android'} onClick={() => setRs232Input('android')} label="Android">
                                    <AndroidIcon className="w-4 h-4" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RS485 */}
                <div className={cardClass}>
                    <div className={headerClass}>
                        <Radio className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h3 className={titleClass}>RS485</h3>
                    </div>
                    <div className={innerCardClass}>
                        <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                            <ToggleSwitch isOn={rs485Power} onToggle={() => setRs485Power(!rs485Power)} isDark={isDark} />
                        </div>
                    </div>
                </div>

                {/* e-Curtain */}
                <div className={cardClass}>
                    <div className={`flex items-center justify-between mb-3 pl-2`}>
                        <div className="flex items-center gap-3">
                            <PowerControlIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                            <h3 className={titleClass}>e-Curtain</h3>
                        </div>
                        <button 
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}
                            onClick={() => setActiveDetail('e-Curtain')}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className={`${innerCardClass} flex-row items-center justify-center gap-6`}>
                        <button 
                            onPointerDown={() => handleCbx1Press('up')}
                            className={`flex-1 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                                cbx1ActiveBtn === 'up' 
                                ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_12px_rgba(0,122,255,0.4)]' : 'bg-[#007AFF] text-white') 
                                : (isDark ? 'bg-[#2a303e] text-gray-300 hover:bg-[#353c4d]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                            }`}
                        >
                            Up
                        </button>
                        <button 
                            onPointerDown={() => handleCbx1Press('down')}
                            className={`flex-1 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                                cbx1ActiveBtn === 'down' 
                                ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_12px_rgba(0,122,255,0.4)]' : 'bg-[#007AFF] text-white') 
                                : (isDark ? 'bg-[#2a303e] text-gray-300 hover:bg-[#353c4d]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                            }`}
                        >
                            Down
                        </button>
                    </div>
                </div>

                {/* CBX 3 */}
                <div className={cardClass}>
                    <div className={headerClass}>
                        <VideoSwitchIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h3 className={titleClass}>CBX 3</h3>
                    </div>
                    <div className={innerCardClass}>
                        <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                            <ToggleSwitch isOn={cbx3Power} onToggle={() => setCbx3Power(!cbx3Power)} isDark={isDark} />
                        </div>
                        <div className={`flex items-center justify-between pt-3 transition-opacity ${!cbx3Power ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Lecture Capture</span>
                            <div className="flex items-center gap-2">
                                <IconButton active={lectureCapture} onClick={() => setLectureCapture(true)}>
                                    <Disc3 className="w-5 h-5" />
                                </IconButton>
                                <IconButton active={!lectureCapture} onClick={() => setLectureCapture(false)}>
                                    <CircleStop className="w-5 h-5" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    );
};
