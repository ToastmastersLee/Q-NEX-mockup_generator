import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

export const LockScreen = ({ isDark, onUnlock }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const formatDayDate = (date) => {
        const day = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const dayNum = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
        const year = date.getFullYear();
        return `${day}, ${dayNum} ${month}, ${year}`;
    };

    // Dark Mode Theme Classes
    const bgClass = isDark 
        ? 'bg-[#1a2538]' 
        : 'bg-white border-4 border-black';
        
    const logoClass = isDark ? 'text-white' : 'text-black';
    const textClass = isDark ? 'text-white' : 'text-black';
    const subTextClass = isDark ? 'text-white/60' : 'text-gray-600 font-semibold';
    const lockIconClass = isDark ? 'text-white/80' : 'text-black';

    // Unlock Button Styling
    const buttonClass = isDark
        ? 'bg-[#182740] border-[3px] border-[#009bff] text-[#00d4ff] shadow-[0_0_25px_rgba(0,155,255,0.5)] hover:shadow-[0_0_35px_rgba(0,155,255,0.75)] hover:scale-105 active:scale-95'
        : 'bg-white border-4 border-black text-black hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5';

    // Ripple concentric rings (breathing effect)
    const ripples = isDark ? (
        <>
            <div className="absolute rounded-full border border-[#009bff]/20 w-[14rem] h-[14rem] animate-ping opacity-60 pointer-events-none" style={{ animationDuration: '3s' }}></div>
            <div className="absolute rounded-full border border-[#009bff]/10 w-[20rem] h-[20rem] animate-ping opacity-40 pointer-events-none" style={{ animationDuration: '4.5s', animationDelay: '1s' }}></div>
            
            {/* Breathing solid circles */}
            <div className="absolute rounded-full border-2 border-[#009bff]/10 w-[11rem] h-[11rem] animate-pulse pointer-events-none"></div>
            <div className="absolute rounded-full border-2 border-[#009bff]/5 w-[16rem] h-[16rem] animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }}></div>
        </>
    ) : (
        <>
            <div className="absolute rounded-full border-2 border-black/10 w-[11rem] h-[11rem] pointer-events-none"></div>
            <div className="absolute rounded-full border-2 border-black/5 w-[16rem] h-[16rem] pointer-events-none"></div>
        </>
    );

    return (
        <div className={`w-full h-full flex flex-col items-center justify-between p-8 relative overflow-hidden select-none ${bgClass}`}>
            
            {/* Q-NEX Logo (Top-Left) */}
            <div className="w-full flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        {isDark ? (
                            <>
                                <div className="absolute inset-0 rounded-full border-[3px] border-white"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00eecd] shadow-[0_0_8px_rgba(0,238,205,0.8)]"></div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 rounded-full border-[3px] border-black"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-black"></div>
                            </>
                        )}
                    </div>
                    <span className={`text-2xl font-bold tracking-wide ${logoClass}`}>nex</span>
                </div>
                {/* Spacer */}
                <div className="w-20"></div>
            </div>

            {/* Lock, Clock & Date Header (Center-Top area) */}
            <div className="flex flex-col items-center gap-1 z-10 mt-2">
                <Lock className={`w-6 h-6 ${lockIconClass}`} />
                <span className={`text-6xl font-light tracking-wider mt-1 ${textClass}`}>
                    {formatTime(currentTime)}
                </span>
                <span className={`text-xs tracking-widest mt-2 ${subTextClass}`}>
                    {formatDayDate(currentTime)}
                </span>
            </div>

            {/* Central Animated Unlock Button */}
            <div className="relative flex items-center justify-center flex-1 w-full max-h-[18rem]">
                {/* Concentric ripple rings */}
                {ripples}

                {/* Central Circle button */}
                <button 
                    onClick={onUnlock}
                    className={`w-24 h-24 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${buttonClass}`}
                    title="Unlock Screen"
                >
                    <Unlock className="w-9 h-9 stroke-[2.2]" />
                </button>
            </div>

            {/* Bottom balancing space */}
            <div className="h-6"></div>
        </div>
    );
};
