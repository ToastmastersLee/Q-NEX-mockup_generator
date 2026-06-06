import React from 'react';
import { 
    SerialIcon, PowerControlIcon, VideoSwitchIcon, 
    AirConditionerIcon, ProjectorScreenIcon, RemoteControlIcon 
} from '../assets/Icons';
import { Power, Volume2 } from 'lucide-react';

export const BottomNav = ({ isDark, activeTab, setActiveTab, navConfig, allNavItems }) => {
    const bottomBarClass = isDark ? 'bg-transparent border-none' : 'bg-white border-t-2 border-black';
    const iconColorActive = isDark ? 'text-blue-500' : 'text-black font-extrabold scale-110';
    const iconColorInactive = isDark ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className={`h-28 flex items-center justify-start px-6 gap-2 ${bottomBarClass}`}>
            {/* Main Power Button - Always Visible */}
            <div className={`pr-6 mr-2 flex-shrink-0 border-r ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
                <button className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <Power className="w-7 h-7" />
                </button>
            </div>
            
            {/* Dynamic Menu Items */}
            <div className="flex-1 flex items-center justify-around h-full">
                {allNavItems.map((item, idx) => navConfig[item.id] && (
                    <button 
                        key={idx} 
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center justify-center gap-2 transition-all duration-300 h-full px-4 ${activeTab === item.id ? iconColorActive : iconColorInactive}`}
                    >
                        {item.icon === 'serial' ? <SerialIcon className="w-7 h-7" /> : 
                         item.icon === 'powerControl' ? <PowerControlIcon className="w-7 h-7" /> : 
                         item.icon === 'videoSwitch' ? <VideoSwitchIcon className="w-7 h-7" /> : 
                         item.icon === 'airConditioner' ? <AirConditionerIcon className="w-7 h-7" /> : 
                         item.icon === 'projectorScreen' ? <ProjectorScreenIcon className="w-7 h-7" /> : 
                         item.icon === 'remoteControl' ? <RemoteControlIcon className="w-7 h-7" /> : 
                         item.icon === 'volume-2' ? <Volume2 className="w-7 h-7" /> : 
                         null}
                        <span className="text-[11px] font-semibold tracking-wider whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
