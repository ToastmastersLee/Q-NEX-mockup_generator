import React, { useState } from 'react';
import { ToggleSwitch } from '../components/ToggleSwitch';

export const PowerControl = ({ isDark }) => {
    const [displayPower, setDisplayPower] = useState(false);
    const [externalPower, setExternalPower] = useState(false);

    return (
        <div className="flex items-center justify-center gap-8 h-full w-full px-10">
            {/* Left Panel: NMP 211 */}
            <div className={`w-1/2 max-w-[32rem] h-[22rem] flex flex-col p-6 rounded-[2rem] ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                <h3 className={`text-[15px] font-bold tracking-wider mb-6 pl-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>NMP 211</h3>
                
                <div className={`flex-1 flex flex-col justify-center rounded-[1.5rem] px-8 py-4 ${isDark ? 'bg-[#353c4d] shadow-[0_15px_30px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)] border border-white/5' : 'bg-white border border-gray-200'}`}>
                    <div className={`flex items-center justify-between py-6 ${isDark ? 'border-b border-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)]' : 'border-b border-gray-300'}`}>
                        <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-300' : 'text-black'}`}>Display Power</span>
                        <ToggleSwitch isOn={displayPower} onToggle={() => setDisplayPower(!displayPower)} isDark={isDark} />
                    </div>
                    <div className="flex items-center justify-between py-6">
                        <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-300' : 'text-black'}`}>External Power</span>
                        <ToggleSwitch isOn={externalPower} onToggle={() => setExternalPower(!externalPower)} isDark={isDark} />
                    </div>
                </div>
            </div>

            {/* Right Panel: CBX */}
            <div className={`w-1/2 max-w-[32rem] h-[22rem] flex flex-col p-6 rounded-[2rem] ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                <h3 className={`text-[15px] font-bold tracking-wider mb-4 pl-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>CBX</h3>
                
                <div className="flex-1 flex items-center justify-center px-10 text-center">
                    <p className={`text-[22px] leading-relaxed tracking-wide ${isDark ? 'text-[#8b9cb0]' : 'text-gray-500'}`}>
                        Please bind CBX first and<br/>select Power Control
                    </p>
                </div>
            </div>
        </div>
    );
};
