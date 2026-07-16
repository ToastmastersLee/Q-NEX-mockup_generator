import { useState } from 'react';
import { VolumeX, Volume2, Mic, MicOff } from 'lucide-react';

const VerticalStepper = ({ label, value, onChange, isDark }) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className={`w-[3.5rem] h-[13rem] rounded-full flex flex-col items-center justify-between py-2 ${isDark ? 'bg-[#353c4d] shadow-[inset_0_15px_30px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(0,0,0,0.3)] border border-white/5' : 'bg-gray-200 shadow-inner'}`}>
                <button 
                    onClick={() => onChange(Math.min(20, value + 1))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-3xl font-light transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:bg-black/5'}`}
                >
                    +
                </button>
                <span className={`text-[1.35rem] font-light ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {value}
                </span>
                <button 
                    onClick={() => onChange(Math.max(0, value - 1))}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-3xl font-light transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:bg-black/5'}`}
                >
                    -
                </button>
            </div>
            <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-200' : 'text-black'}`}>
                {label}
            </span>
        </div>
    );
};

export const Volume = ({ isDark }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeakerMuted, setIsSpeakerMuted] = useState(true);
    const [isMicMuted, setIsMicMuted] = useState(true);
    const [audioVol, setAudioVol] = useState(9);
    const [treble, setTreble] = useState(4);
    const [bass, setBass] = useState(4);
    const [micVol, setMicVol] = useState(9);

    return (
        <div className="flex items-center justify-center h-full w-full px-8 py-4 overflow-hidden">
            <div className={`w-full max-w-[66rem] h-full max-h-[26rem] flex flex-col rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                
                {/* Top Left Segment Control */}
                <div className={`absolute top-8 left-8 w-[9rem] h-[2.75rem] rounded-full p-1 flex items-center ${isDark ? 'bg-[#212634] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.05)]' : 'bg-gray-300 shadow-inner'}`}>
                    <button 
                        onClick={() => setIsMuted(true)}
                        className={`flex-1 h-full rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-[#007AFF] text-white shadow-[0_2px_5px_rgba(0,0,0,0.4)]' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <VolumeX className="w-[1.1rem] h-[1.1rem]" strokeWidth={2.5} />
                    </button>
                    <button 
                        onClick={() => setIsMuted(false)}
                        className={`flex-1 h-full rounded-full flex items-center justify-center transition-all ${!isMuted ? 'bg-[#007AFF] text-white shadow-[0_2px_5px_rgba(0,0,0,0.4)]' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <Volume2 className="w-[1.1rem] h-[1.1rem]" strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 flex items-center justify-center pt-8">
                    {/* Left Section (Speaker) */}
                    <div className="flex items-center pr-[4.5rem]">
                        {/* Large Speaker Button */}
                        <div className="mr-14">
                            <div 
                                onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
                                className={`w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                                    isSpeakerMuted 
                                    ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_24px_rgba(0,122,255,0.5)]' : 'bg-[#007AFF] text-white shadow-xl')
                                    : (isDark ? 'bg-[#363d4f] text-[#8b9cb0] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 hover:text-white' : 'bg-gray-100 border-2 border-gray-300 shadow-xl hover:bg-gray-200')
                                }`}
                            >
                                {isSpeakerMuted ? <VolumeX className="w-10 h-10" /> : <Volume2 className="w-10 h-10" />}
                            </div>
                        </div>
                        
                        <div className="flex gap-10">
                            <VerticalStepper label="Audio" value={audioVol} onChange={setAudioVol} isDark={isDark} />
                            <VerticalStepper label="Treble" value={treble} onChange={setTreble} isDark={isDark} />
                            <VerticalStepper label="Bass" value={bass} onChange={setBass} isDark={isDark} />
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className={`h-[12rem] w-px ${isDark ? 'bg-white/10' : 'bg-black/20'}`}></div>

                    {/* Right Section (Mic) */}
                    <div className="flex items-center pl-[4.5rem]">
                        {/* Large Mic Button */}
                        <div className="mr-14">
                            <div 
                                onClick={() => setIsMicMuted(!isMicMuted)}
                                className={`w-[6.5rem] h-[6.5rem] rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                                    isMicMuted 
                                    ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_24px_rgba(0,122,255,0.5)]' : 'bg-[#007AFF] text-white shadow-xl')
                                    : (isDark ? 'bg-[#363d4f] text-[#8b9cb0] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 hover:text-white' : 'bg-gray-100 border-2 border-gray-300 shadow-xl hover:bg-gray-200')
                                }`}
                            >
                                {isMicMuted ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                            </div>
                        </div>
                        
                        <div className="flex gap-10">
                            <VerticalStepper label="Mic" value={micVol} onChange={setMicVol} isDark={isDark} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
