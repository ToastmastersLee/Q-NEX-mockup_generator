import React, { useState, useEffect } from 'react';
import { Home, RefreshCw, Link as LinkIcon, Settings, Lock, ChevronLeft } from 'lucide-react';

export const TopBar = ({ 
    isDark, 
    activeTab, 
    onSettingsClick, 
    onHomeClick, 
    onLockClick,
    title,
    showBackButton,
    onBack
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const formatDay = (date) => date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const formatDate = (date) => date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }).toUpperCase();

    const topBarClass = isDark ? 'bg-transparent border-none' : 'bg-white border-b-2 border-black';

    return (
        <div className={`h-24 flex items-center justify-between px-8 relative ${topBarClass}`}>
            <div className="flex items-center gap-4 h-full">
                {showBackButton ? (
                    <button 
                        onClick={onBack} 
                        className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800 text-white' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                ) : (
                    <>
                        <span className={`text-5xl font-light ${isDark ? 'text-gray-100' : 'text-black'}`}>{formatTime(currentTime)}</span>
                        <div className={`flex flex-col text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="font-semibold">{formatDay(currentTime)}</span>
                            <span className="opacity-70 tracking-widest">{formatDate(currentTime)}</span>
                        </div>
                    </>
                )}
            </div>
            
            {title && (
                <div className={`absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-black'}`}>
                    {title}
                </div>
            )}

            <div className="flex gap-4 text-gray-300">
                {activeTab !== 'home' && (
                    <button onClick={onHomeClick} className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`}>
                        <Home className="w-5 h-5" />
                    </button>
                )}
                <button className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`}>
                    <RefreshCw className="w-5 h-5" />
                </button>
                <button className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`}>
                    <LinkIcon className="w-5 h-5" />
                </button>
                <button onClick={onSettingsClick} className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`}>
                    <Settings className="w-5 h-5" />
                </button>
                <button onClick={onLockClick} className={`p-3 rounded-full border-[1.5px] ${isDark ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100 text-black'} transition-colors`} title="Lock Screen">
                    <Lock className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
