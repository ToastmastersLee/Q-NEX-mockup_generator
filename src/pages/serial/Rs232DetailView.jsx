import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { OnOffButtons } from '../../components/OnOffButtons';
import { HdmiIcon } from '../../assets/Icons';
import { WindowsIcon, AndroidIcon, IconButton } from './SerialIcons';

export const Rs232DetailView = ({
    isDark,
    rs232Power,
    setRs232Power,
    rs232Input,
    setRs232Input,
    onBack,
    cardClass,
    innerCardClass
}) => {
    const [rs232ActiveBtn, setRs232ActiveBtn] = useState(null);

    const handleRs232Press = (btn) => {
        setRs232ActiveBtn(btn);
        setTimeout(() => setRs232ActiveBtn(null), 200);
    };

    return (
        <div className="h-full w-full px-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="w-full max-w-[66rem] min-h-full mx-auto flex flex-col justify-center py-4 gap-4">
                {/* Header */}
                <div className="flex items-center justify-center relative mb-4">
                    <button 
                        className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={onBack}
                        aria-label="Back"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>RS232</h2>
                </div>

                {/* Power */}
                <div className={cardClass}>
                    <div className={innerCardClass}>
                        <div className="flex items-center justify-between py-2">
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                            <OnOffButtons isOn={rs232Power} onToggle={setRs232Power} isDark={isDark} />
                        </div>
                    </div>
                </div>

                {/* Input Source */}
                <div className={cardClass}>
                    <div className={innerCardClass}>
                        <div className={`flex items-center justify-between py-2 transition-opacity ${!rs232Power ? 'opacity-50 pointer-events-none' : ''}`}>
                            <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Input Source</span>
                            <div className="flex items-center gap-2">
                                <IconButton active={rs232Input === 'windows'} onClick={() => setRs232Input('windows')} label="Windows" isDark={isDark}>
                                    <WindowsIcon className="w-4 h-4" />
                                </IconButton>
                                <IconButton active={rs232Input === 'hdmi'} onClick={() => setRs232Input('hdmi')} label="HDMI" isDark={isDark}>
                                    <HdmiIcon className="w-4 h-4" />
                                </IconButton>
                                <IconButton active={rs232Input === 'android'} onClick={() => setRs232Input('android')} label="Android" isDark={isDark}>
                                    <AndroidIcon className="w-4 h-4" />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Command Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    {['HDMI2', 'HDMI3', 'Mute', 'Unmute', 'VOL+', 'VOL-'].map(cmd => {
                        const id = cmd.toLowerCase().replace('+', 'plus').replace('-', 'minus');
                        return (
                            <button 
                                key={id}
                                className={`py-4 rounded-xl font-semibold transition-all ${
                                    rs232ActiveBtn === id
                                    ? 'bg-blue-600 text-white shadow-lg scale-[0.98]'
                                    : (isDark 
                                        ? 'bg-[#3b4356] text-gray-200 border border-white/5 hover:bg-[#434b5f]' 
                                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200')
                                }`}
                                onPointerDown={() => handleRs232Press(id)}
                            >
                                {cmd}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
