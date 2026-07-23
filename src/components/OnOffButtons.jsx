export const OnOffButtons = ({ isOn, onToggle, isDark, disabled }) => {
    const activeDarkBtn = 'bg-gradient-to-br from-[#00D4FF] to-[#0060FF] text-white shadow-[0_0_15px_rgba(0,150,255,0.4)] border border-[#00D4FF]/30';
    const activeLightBtn = 'bg-[#007AFF] text-white shadow-md border border-blue-600';
    
    const inactiveDarkBtn = 'text-[#8b9cb0] hover:text-white bg-transparent';
    const inactiveLightBtn = 'text-gray-500 hover:text-gray-900 bg-transparent';

    const handleSelectOn = () => {
        if (disabled) return;
        if (typeof onToggle === 'function') {
            onToggle(true);
        }
    };

    const handleSelectOff = () => {
        if (disabled) return;
        if (typeof onToggle === 'function') {
            onToggle(false);
        }
    };

    return (
        <div className={`p-1 rounded-full flex items-center gap-1 transition-all ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${
            isDark 
                ? 'bg-[#212634] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.05)] border border-white/5' 
                : 'bg-gray-200/80 shadow-inner border border-gray-300'
        }`}>
            {/* ON Button */}
            <button
                type="button"
                onClick={handleSelectOn}
                disabled={disabled}
                className={`w-16 h-8 rounded-full font-bold text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    isOn 
                        ? (isDark ? activeDarkBtn : activeLightBtn) 
                        : (isDark ? inactiveDarkBtn : inactiveLightBtn)
                }`}
            >
                ON
            </button>

            {/* OFF Button */}
            <button
                type="button"
                onClick={handleSelectOff}
                disabled={disabled}
                className={`w-16 h-8 rounded-full font-bold text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    !isOn 
                        ? (isDark ? activeDarkBtn : activeLightBtn) 
                        : (isDark ? inactiveDarkBtn : inactiveLightBtn)
                }`}
            >
                OFF
            </button>
        </div>
    );
};
