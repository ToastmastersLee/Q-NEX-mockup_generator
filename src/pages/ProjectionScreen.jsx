import React, { useState } from 'react';

const ScreenUpIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 5h18" />
        <rect x="4" y="5" width="16" height="11" />
        <path d="M12 16v3" />
        <path d="M9 22l3-3 3 3" />
        {/* Up Arrow */}
        <path d="M12 13V8" />
        <path d="M9 10l3-3 3 3" />
    </svg>
);

const ScreenStopIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 5h18" />
        <rect x="4" y="5" width="16" height="11" />
        <path d="M12 16v3" />
        <path d="M9 22l3-3 3 3" />
        {/* Pause */}
        <path d="M10 8.5v4" />
        <path d="M14 8.5v4" />
    </svg>
);

const ScreenDownIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 5h18" />
        <rect x="4" y="5" width="16" height="11" />
        <path d="M12 16v3" />
        <path d="M9 22l3-3 3 3" />
        {/* Down Arrow */}
        <path d="M12 8v5" />
        <path d="M9 11l3 3 3-3" />
    </svg>
);

export const ProjectionScreen = ({ isDark }) => {
    // Buttons are stateless actions, but we can add a simple active state for click feedback
    const [activeBtn, setActiveBtn] = useState(null);

    const handlePress = (btn) => {
        setActiveBtn(btn);
        setTimeout(() => setActiveBtn(null), 200); // Reset after 200ms to simulate click
    };

    return (
        <div className="flex items-center justify-center h-full w-full px-8 py-4 overflow-hidden">
            <div className={`w-full max-w-[66rem] h-full max-h-[26rem] flex items-center justify-center rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                
                <div className="flex items-center justify-center gap-24">
                    
                    {/* Screen Up */}
                    <div className="flex flex-col items-center gap-8">
                        <button 
                            onPointerDown={() => handlePress('up')}
                            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-150 ${
                                isDark 
                                    ? (activeBtn === 'up' ? 'bg-[#2a303e] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.02)] text-white' : 'bg-[#363d4f] text-[#f8fafc] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 hover:bg-[#3b4356]')
                                    : (activeBtn === 'up' ? 'bg-gray-200 shadow-inner text-blue-600' : 'bg-gray-100 border-2 border-gray-300 text-gray-700 shadow-xl hover:bg-white')
                            }`}
                        >
                            <ScreenUpIcon className="w-[3.5rem] h-[3.5rem]" />
                        </button>
                        <span className={`text-[17px] font-bold tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Screen Up</span>
                    </div>

                    {/* Stop */}
                    <div className="flex flex-col items-center gap-8">
                        <button 
                            onPointerDown={() => handlePress('stop')}
                            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-150 ${
                                isDark 
                                    ? (activeBtn === 'stop' ? 'bg-[#2a303e] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.02)] text-white' : 'bg-[#363d4f] text-[#f8fafc] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 hover:bg-[#3b4356]')
                                    : (activeBtn === 'stop' ? 'bg-gray-200 shadow-inner text-blue-600' : 'bg-gray-100 border-2 border-gray-300 text-gray-700 shadow-xl hover:bg-white')
                            }`}
                        >
                            <ScreenStopIcon className="w-[3.5rem] h-[3.5rem]" />
                        </button>
                        <span className={`text-[17px] font-bold tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Stop</span>
                    </div>

                    {/* Screen Down */}
                    <div className="flex flex-col items-center gap-8">
                        <button 
                            onPointerDown={() => handlePress('down')}
                            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-150 ${
                                isDark 
                                    ? (activeBtn === 'down' ? 'bg-[#2a303e] shadow-[inset_5px_5px_10px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(255,255,255,0.02)] text-white' : 'bg-[#363d4f] text-[#f8fafc] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 hover:bg-[#3b4356]')
                                    : (activeBtn === 'down' ? 'bg-gray-200 shadow-inner text-blue-600' : 'bg-gray-100 border-2 border-gray-300 text-gray-700 shadow-xl hover:bg-white')
                            }`}
                        >
                            <ScreenDownIcon className="w-[3.5rem] h-[3.5rem]" />
                        </button>
                        <span className={`text-[17px] font-bold tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Screen Down</span>
                    </div>

                </div>
            </div>
        </div>
    );
};
