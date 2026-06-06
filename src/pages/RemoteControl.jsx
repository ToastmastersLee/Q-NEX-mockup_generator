import React, { useState } from 'react';

export const RemoteControl = ({ isDark }) => {
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
        <div className="flex items-center justify-center h-full w-full px-8">
            <div className={`w-full max-w-[66rem] h-[26rem] flex flex-col items-center justify-center rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                
                <div className="grid grid-cols-2 gap-x-12 gap-y-7 w-full max-w-[52rem]">
                    {buttons.map((label, idx) => (
                        <button 
                            key={idx}
                            onPointerDown={() => handlePress(idx)}
                            className={`w-full h-[4.5rem] rounded-[1.25rem] flex items-center justify-center text-[17px] font-bold tracking-wide transition-all duration-150 ${
                                isDark 
                                    ? (activeBtn === idx 
                                        ? 'bg-[#2a303e] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.02)] text-white' 
                                        : 'bg-[#363d4f] text-[#f8fafc] shadow-[-3px_-3px_8px_rgba(255,255,255,0.03),4px_4px_12px_rgba(0,0,0,0.3)] border border-white/5 hover:bg-[#3b4356]')
                                    : (activeBtn === idx 
                                        ? 'bg-gray-200 shadow-inner text-blue-600' 
                                        : 'bg-white border-2 border-gray-300 text-gray-700 shadow-lg hover:bg-gray-50')
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};
