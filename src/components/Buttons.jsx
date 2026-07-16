
import { HdmiIcon, DocCamIcon } from '../assets/Icons';
import * as LucideIcons from 'lucide-react';

const renderIcon = (iconName, className) => {
    if (iconName === 'hdmi') return <HdmiIcon className={className} />;
    if (iconName === 'docCam') return <DocCamIcon className={className} />;
    
    // Convert kebab-case or lucide name to PascalCase
    let PascalIcon = iconName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    if (PascalIcon === 'RefreshCw') PascalIcon = 'RefreshCw';
    
    const LucideIcon = LucideIcons[PascalIcon];
    if (LucideIcon) return <LucideIcon className={className} strokeWidth={1.5} />;
    
    return null;
};

export const RowButton = ({ label, icon, active, onClick, isDark, hideLabel }) => (
    <div className={`flex items-center cursor-pointer group ${hideLabel ? '' : 'gap-3'}`} onClick={onClick}>
        {!hideLabel && <span className={`text-xs font-semibold tracking-wide transition-colors ${isDark ? (active ? 'text-gray-100' : 'text-[#8b9cb0] group-hover:text-gray-300') : (active ? 'text-black' : 'text-gray-500 group-hover:text-black')}`}>{label}</span>}
        <button className={`w-[3.25rem] h-[3.25rem] rounded-full flex items-center justify-center transition-all duration-300 ${active ? (isDark ? 'bg-gradient-to-br from-[#00D4FF] to-[#0060FF] text-white shadow-[0_0_20px_rgba(0,150,255,0.5)] border border-[#00D4FF]/30' : 'bg-blue-500 text-white border-2 border-black shadow-lg') : (isDark ? 'bg-[#363d4f] text-[#a0aab8] shadow-[-3px_-3px_8px_rgba(255,255,255,0.03),3px_3px_8px_rgba(0,0,0,0.4)] border border-white/5 group-hover:bg-[#3b4356] group-hover:text-white' : 'bg-white border-2 border-gray-300 text-gray-600 group-hover:bg-gray-100')}`}>
            {renderIcon(icon, icon === 'docCam' ? "w-6 h-6" : "w-[1.4rem] h-[1.4rem]")}
        </button>
    </div>
);

export const LargeButton = ({ label, icon, active, onClick, isDark, compact }) => {
    const sizeClass = compact ? 'w-[5.5rem] h-[5.5rem]' : 'w-[7.5rem] h-[7.5rem]';
    const iconSizeClass = compact 
        ? (icon === 'docCam' ? "w-8 h-8" : "w-7 h-7")
        : (icon === 'docCam' ? "w-12 h-12" : "w-11 h-11");
    const textClass = compact ? 'text-[13px] gap-3' : 'text-[15px] gap-5';
    
    return (
        <div className={`flex flex-col items-center cursor-pointer group ${textClass}`} onClick={onClick}>
            <button className={`${sizeClass} rounded-full flex items-center justify-center transition-all duration-300 ${active ? (isDark ? 'bg-gradient-to-br from-[#00D4FF] to-[#0060FF] text-white shadow-[0_0_35px_rgba(0,150,255,0.5)] border border-[#00D4FF]/30' : 'bg-blue-500 text-white border-4 border-black shadow-2xl') : (isDark ? 'bg-[#363d4f] text-[#a0aab8] shadow-[-5px_-5px_12px_rgba(255,255,255,0.03),5px_5px_15px_rgba(0,0,0,0.4)] border border-white/5 group-hover:bg-[#3b4356] group-hover:text-white' : 'bg-gray-100 border-2 border-gray-300 text-gray-600 group-hover:bg-gray-200')}`}>
                {renderIcon(icon, iconSizeClass)}
            </button>
            <span className={`font-bold tracking-wide transition-colors ${isDark ? (active ? 'text-gray-100' : 'text-[#8b9cb0] group-hover:text-gray-300') : (active ? 'text-black' : 'text-gray-600 group-hover:text-black')}`}>{label}</span>
        </div>
    );
};
