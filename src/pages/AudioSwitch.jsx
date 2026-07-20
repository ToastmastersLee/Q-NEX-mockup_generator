import { useState } from 'react';
import { HdmiIcon } from '../assets/Icons';
import { Music } from 'lucide-react';

export const AudioSwitch = ({ isDark }) => {
    const [selectedSource, setSelectedSource] = useState('audio1');

    const options = [
        { id: 'hdmiA', label: 'HDMI A', isMusic: false },
        { id: 'audio1', label: 'Audio in 1', isMusic: true },
        { id: 'audio2', label: 'Audio in 2', isMusic: true },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full px-8 w-full overflow-hidden animate-fade-in">
            {/* Outer Box Container matching CPL20 UI design */}
            <div className={`w-[95%] max-w-[60rem] my-auto relative flex flex-col p-8 md:p-12 rounded-[2.5rem] transition-colors duration-300 ${
                isDark 
                    ? 'bg-[#3b4356]/90 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] border border-white/10' 
                    : 'bg-gray-100 border border-gray-300 shadow-xl'
            }`}>
                {/* Inner Box Container */}
                <div className={`w-full flex items-center justify-center rounded-[2rem] px-6 py-12 ${
                    isDark 
                        ? 'bg-[#313848] shadow-[inset_0_2px_8px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.2)] border border-white/5' 
                        : 'bg-white border border-gray-200'
                }`}>
                    <div className="flex items-center justify-center gap-12 md:gap-20">
                        {options.map((option) => {
                            const isSelected = selectedSource === option.id;
                            return (
                                <div key={option.id} className="flex flex-col items-center gap-4">
                                    <button
                                        onClick={() => setSelectedSource(option.id)}
                                        className={`w-32 h-32 md:w-36 md:h-36 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                            isSelected
                                                ? 'bg-gradient-to-b from-[#00b4ff] to-[#0072ff] text-white shadow-[0_0_35px_rgba(0,180,255,0.65)] scale-105'
                                                : isDark
                                                    ? 'bg-[#272f3d] text-slate-300 hover:bg-[#30394a] border border-white/10 shadow-md active:scale-95'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 shadow-sm active:scale-95'
                                        }`}
                                    >
                                        {option.isMusic ? (
                                            <Music className="w-12 h-12 stroke-[1.8]" />
                                        ) : (
                                            <HdmiIcon className="w-12 h-12 stroke-[1.8]" />
                                        )}
                                    </button>
                                    <span className={`text-sm md:text-base font-semibold tracking-wide ${
                                        isSelected 
                                            ? (isDark ? 'text-white' : 'text-blue-600 font-bold') 
                                            : (isDark ? 'text-gray-300' : 'text-gray-600')
                                    }`}>
                                        {option.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
