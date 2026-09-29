import { Monitor, Radio, Disc3, CircleStop, ChevronRight } from 'lucide-react';
import { OnOffButtons } from '../../components/OnOffButtons';
import { HdmiIcon, PowerControlIcon, VideoSwitchIcon } from '../../assets/Icons';
import { WindowsIcon, AndroidIcon, IconButton } from './SerialIcons';

export const SerialDashboard = ({
    isDark,
    rs232Power,
    setRs232Power,
    rs232Input,
    setRs232Input,
    rs485Power,
    setRs485Power,
    cbx3Power,
    setCbx3Power,
    lectureCapture,
    setLectureCapture,
    cbx1ActiveBtn,
    handleCbx1Press,
    setActiveDetail,
    cardClass,
    innerCardClass,
    headerClass,
    titleClass
}) => {
    return (
        <div className="h-full w-full px-8 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[66rem] min-h-full mx-auto flex flex-col justify-center py-4">
                <div className="grid grid-cols-2 gap-6" style={{ gridAutoRows: 'minmax(12rem, auto)' }}>
                
                    {/* RS232 */}
                    <div className={cardClass}>
                        <div className={headerClass + " justify-between w-full pr-2"}>
                            <div className="flex items-center gap-3">
                                <Monitor className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                <h3 className={titleClass}>RS232</h3>
                            </div>
                            <button 
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                onClick={() => setActiveDetail('RS232')}
                                aria-label="Open RS232 details"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className={innerCardClass}>
                            <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                                <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                                <OnOffButtons isOn={rs232Power} onToggle={setRs232Power} isDark={isDark} />
                            </div>
                            <div className={`flex items-center justify-between pt-3 transition-opacity ${!rs232Power ? 'opacity-50 pointer-events-none' : ''}`}>
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

                    {/* RS485 */}
                    <div className={cardClass}>
                        <div className={headerClass + " justify-between w-full pr-2"}>
                            <div className="flex items-center gap-3">
                                <Radio className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                <h3 className={titleClass}>RS485</h3>
                            </div>
                            <button 
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                onClick={() => setActiveDetail('RS485')}
                                aria-label="Open RS485 details"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className={innerCardClass}>
                            <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                                <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                                <OnOffButtons isOn={rs485Power} onToggle={setRs485Power} isDark={isDark} />
                            </div>
                        </div>
                    </div>

                    {/* e-Curtain */}
                    <div className={cardClass}>
                        <div className={`flex items-center justify-between mb-3 pl-2`}>
                            <div className="flex items-center gap-3">
                                <PowerControlIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                                <h3 className={titleClass}>e-Curtain</h3>
                            </div>
                            <button 
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}
                                onClick={() => setActiveDetail('e-Curtain')}
                                aria-label="Open e-Curtain details"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className={`${innerCardClass} flex-row items-center justify-center gap-6`}>
                            <button 
                                onPointerDown={() => handleCbx1Press('up')}
                                className={`flex-1 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                                    cbx1ActiveBtn === 'up' 
                                    ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_12px_rgba(0,122,255,0.4)]' : 'bg-[#007AFF] text-white') 
                                    : (isDark ? 'bg-[#2a303e] text-gray-300 hover:bg-[#353c4d]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                                }`}
                            >
                                Up
                            </button>
                            <button 
                                onPointerDown={() => handleCbx1Press('down')}
                                className={`flex-1 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                                    cbx1ActiveBtn === 'down' 
                                    ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_12px_rgba(0,122,255,0.4)]' : 'bg-[#007AFF] text-white') 
                                    : (isDark ? 'bg-[#2a303e] text-gray-300 hover:bg-[#353c4d]' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                                }`}
                            >
                                Down
                            </button>
                        </div>
                    </div>

                    {/* CBX 3 */}
                    <div className={cardClass}>
                        <div className={headerClass}>
                            <VideoSwitchIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                            <h3 className={titleClass}>CBX 3</h3>
                        </div>
                        <div className={innerCardClass}>
                            <div className={`flex items-center justify-between pb-3 ${isDark ? 'border-b border-white/10' : 'border-b border-gray-200'}`}>
                                <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</span>
                                <OnOffButtons isOn={cbx3Power} onToggle={setCbx3Power} isDark={isDark} />
                            </div>
                            <div className={`flex items-center justify-between pt-3 transition-opacity ${!cbx3Power ? 'opacity-50 pointer-events-none' : ''}`}>
                                <span className={`text-[14px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Lecture Capture</span>
                                <div className="flex items-center gap-2">
                                    <IconButton active={lectureCapture} onClick={() => setLectureCapture(true)} isDark={isDark}>
                                        <Disc3 className="w-5 h-5" />
                                    </IconButton>
                                    <IconButton active={!lectureCapture} onClick={() => setLectureCapture(false)} isDark={isDark}>
                                        <CircleStop className="w-5 h-5" />
                                    </IconButton>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
