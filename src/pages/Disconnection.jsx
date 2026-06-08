import React, { useState, useEffect, useRef } from 'react';
import { Settings, Lock, Loader2, CheckCircle } from 'lucide-react';

const EditableLabel = ({ value, onChange, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const spanRef = useRef(null);

    useEffect(() => {
        if (isEditing && spanRef.current) {
            spanRef.current.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(spanRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }, [isEditing]);

    return (
        <span
            ref={spanRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onDoubleClick={() => setIsEditing(true)}
            onBlur={(e) => {
                setIsEditing(false);
                if (onChange) onChange(e.target.textContent);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    spanRef.current.blur();
                }
            }}
            className={`outline-none cursor-text select-text ${isEditing ? 'bg-blue-500/30 px-1 rounded' : ''} ${className}`}
            title="Double-click to edit label"
        >
            {value}
        </span>
    );
};

export const Disconnection = ({ isDark, onConnect }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [ipAddress, setIpAddress] = useState('192.168.1.150');
    const [labelText, setLabelText] = useState('NMP311 IP');
    const [isConnecting, setIsConnecting] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

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

    const handleConnectClick = () => {
        if (isConnecting || isConnected) return;
        setIsConnecting(true);
        
        // Simulate a connection attempt
        setTimeout(() => {
            setIsConnecting(false);
            setIsConnected(true);
            
            // Trigger connection success and exit disconnection page
            setTimeout(() => {
                onConnect(); // Switches back to the review page
            }, 1000);
        }, 1500);
    };

    // Dark Mode Theme Classes
    const bgClass = isDark 
        ? 'bg-gradient-to-b from-[#b5cce8] to-[#99b5d4]' 
        : 'bg-white border-4 border-black';
        
    const logoClass = isDark ? 'text-white' : 'text-black';
    const clockTextClass = isDark ? 'text-white/95' : 'text-black';
    const lockIconClass = isDark ? 'text-white/80' : 'text-black';

    // Modal Style
    const modalClass = isDark
        ? 'bg-[#152033]/85 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-white'
        : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black';

    // Ethernet Fieldset
    const fieldsetClass = isDark
        ? 'border-white/10'
        : 'border-2 border-black';
        
    const legendClass = isDark
        ? 'text-gray-300'
        : 'text-black font-bold';

    // NMP311 IP block
    const labelBlockClass = isDark
        ? 'bg-[#1e2d42] border border-white/15 text-gray-200'
        : 'bg-gray-200 border-2 border-black text-black font-bold';

    // IP Input block
    const inputClass = isDark
        ? 'bg-[#0f172a]/60 border border-white/10 text-white focus:border-[#00eecd]/50 focus:ring-1 focus:ring-[#00eecd]/50'
        : 'bg-white border-2 border-black text-black focus:bg-gray-50';

    // Action buttons (Settings & Cloud)
    const iconBtnClass = isDark
        ? 'border border-white/20 bg-white/5 text-white hover:bg-white/10 active:scale-95'
        : 'border-2 border-black bg-white text-black hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5';

    // Connect button
    const connectBtnClass = isDark
        ? (isConnected 
            ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
            : 'bg-gradient-to-r from-blue-500 to-[#00d4ff] text-white shadow-[0_0_15px_rgba(0,170,255,0.4)] hover:brightness-110 active:scale-95')
        : (isConnected
            ? 'bg-emerald-500 text-white border-2 border-black font-bold'
            : 'bg-blue-600 text-white border-2 border-black font-bold hover:bg-blue-700 active:translate-x-0.5 active:translate-y-0.5');

    return (
        <div className={`w-full h-full flex flex-col items-center justify-between p-8 relative overflow-hidden select-none ${bgClass}`}>
            
            {/* Top Bar inside Disconnection screen */}
            <div className="w-full flex items-center justify-between z-10">
                {/* Q-NEX Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        {isDark ? (
                            <>
                                {/* Outer ring */}
                                <div className="absolute inset-0 rounded-full border-[3px] border-white"></div>
                                {/* Green/Cyan dot at bottom right */}
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

                {/* Center Lock icon and clock */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <Lock className={`w-5 h-5 ${lockIconClass}`} />
                    <span className={`text-5xl font-light tracking-wider mt-1 ${clockTextClass}`}>
                        {formatTime(currentTime)}
                    </span>
                </div>

                {/* Right alignment spacer */}
                <div className="w-20"></div>
            </div>

            {/* Central Error Modal */}
            <div className={`w-full max-w-xl p-8 rounded-3xl z-10 transition-all duration-300 ${modalClass}`}>
                <h3 className="text-xl font-semibold text-center mb-6 tracking-wide">
                    Fail to connect, please check the network
                </h3>

                {/* Ethernet Settings fieldset */}
                <fieldset className={`border rounded-2xl px-6 py-6 mb-8 w-full flex flex-col ${fieldsetClass}`}>
                    <legend className={`px-4 text-center text-sm font-semibold tracking-wide ${legendClass}`}>
                        Ethernet
                    </legend>

                    <div className="flex items-center gap-4 w-full">
                        {/* Label Container */}
                        <div className={`px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap ${labelBlockClass}`}>
                            <EditableLabel 
                                value={labelText} 
                                onChange={setLabelText} 
                            />
                        </div>

                        {/* Editable IP Address Input */}
                        <input 
                            type="text" 
                            value={ipAddress} 
                            onChange={(e) => setIpAddress(e.target.value)} 
                            className={`flex-1 px-4 py-2.5 rounded-xl text-base font-semibold tracking-wider outline-none transition-all ${inputClass}`}
                            placeholder="Enter IP Address"
                            disabled={isConnecting || isConnected}
                        />
                    </div>
                </fieldset>

                {/* Bottom Row Controls */}
                <div className="flex items-center justify-between w-full">
                    {/* Settings and Cloud buttons */}
                    <div className="flex gap-4">
                        <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${iconBtnClass}`}
                            title="Ethernet Settings"
                            disabled={isConnecting || isConnected}
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                        <button 
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${iconBtnClass}`}
                            title="Cloud Settings"
                            disabled={isConnecting || isConnected}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5.5 h-5.5">
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                                <path d="M12 12v9" />
                                <path d="m16 16-4-4-4 4" />
                            </svg>
                        </button>
                    </div>

                    {/* Connect Button */}
                    <button 
                        onClick={handleConnectClick}
                        className={`px-8 py-3 rounded-full font-bold text-base tracking-wide flex items-center justify-center gap-2 transition-all min-w-[9.5rem] cursor-pointer ${connectBtnClass}`}
                        disabled={isConnecting || isConnected}
                    >
                        {isConnecting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Connecting...</span>
                            </>
                        ) : isConnected ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                <span>Connected!</span>
                            </>
                        ) : (
                            <span>Connect</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Bottom spacer for centering balance */}
            <div className="h-6"></div>
        </div>
    );
};
