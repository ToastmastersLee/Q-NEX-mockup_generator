

export const ToggleSwitch = ({ isOn, onToggle, isDark, disabled }) => {
    const activeBgDark = disabled ? 'bg-[#4b5563]' : 'bg-[#007AFF]';
    const activeBgLight = disabled ? 'bg-gray-400' : 'bg-blue-500';
    
    const trackDarkClass = isOn 
        ? `${activeBgDark} shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]`
        : 'bg-[#212634] shadow-[inset_0_2px_6px_rgba(0,0,0,0.5),inset_0_-1px_2px_rgba(255,255,255,0.05)]';
        
    const trackLightClass = isOn ? `${activeBgLight} shadow-inner` : 'bg-gray-300 shadow-inner';

    return (
        <div 
            onClick={disabled ? undefined : onToggle}
            className={`w-[3.5rem] h-[1.75rem] rounded-full flex items-center px-1 ${disabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} transition-colors duration-300 ${isDark ? trackDarkClass : trackLightClass}`}
        >
            <div 
                className={`w-[1.25rem] h-[1.25rem] rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-[1.75rem]' : 'translate-x-0'}`}
            />
        </div>
    );
};
