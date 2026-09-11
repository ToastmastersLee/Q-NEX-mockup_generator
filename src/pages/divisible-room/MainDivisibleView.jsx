import { ChevronRight, Check } from 'lucide-react';
import { ToggleSwitch } from '../../components/ToggleSwitch';

export const MainDivisibleView = ({
    isDark,
    isDivisibleRoomModeEnabled,
    handleToggleMode,
    primaryRoomNmpName,
    tempPrimaryName,
    setTempPrimaryName,
    isEditingPrimary,
    setIsEditingPrimary,
    savePrimaryName,
    selectedSecondaryDevices,
    setSubPage,
    cardBgClass,
    textMainClass,
    textSubClass,
}) => {
    return (
        <div className="p-4 h-full flex flex-col overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto pb-4 flex flex-col gap-4">
                {/* Mode Toggle Switch Row */}
                <div className={`flex justify-between items-center py-3 border-b ${isDark ? 'border-gray-600/50' : 'border-gray-300'}`}>
                    <div className="flex flex-col text-left">
                        <span className={`text-lg font-bold ${textMainClass}`}>Divisible Room Mode</span>
                    </div>
                    <ToggleSwitch 
                        isOn={isDivisibleRoomModeEnabled} 
                        onToggle={handleToggleMode} 
                        isDark={isDark} 
                    />
                </div>

                {/* NMP of Primary Room */}
                <div className="flex flex-col text-left">
                    <span className={`text-xs font-bold tracking-wider uppercase mb-1.5 ${textSubClass}`}>
                        NMP of Primary Room
                    </span>
                    <div 
                        className={`p-3 rounded-xl flex items-center justify-between min-h-[52px] ${cardBgClass} transition-all duration-200 hover:ring-2 hover:ring-blue-500/20`}
                        onDoubleClick={() => {
                            setTempPrimaryName(primaryRoomNmpName);
                            setIsEditingPrimary(true);
                        }}
                    >
                        {isEditingPrimary ? (
                            <div className="flex-1 flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={tempPrimaryName}
                                    onChange={(e) => setTempPrimaryName(e.target.value)}
                                    onBlur={savePrimaryName}
                                    onKeyDown={(e) => { if (e.key === 'Enter') savePrimaryName(); }}
                                    className={`w-full bg-transparent outline-none font-bold text-base ${isDark ? 'text-white border-b border-blue-400' : 'text-black border-b border-blue-600'}`}
                                    autoFocus
                                />
                                <button 
                                    onClick={(e) => { e.stopPropagation(); savePrimaryName(); }}
                                    className="p-1 rounded-full hover:bg-gray-500/20 text-emerald-500"
                                >
                                    <Check className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <span className={`font-bold text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                {primaryRoomNmpName}
                            </span>
                        )}
                    </div>
                </div>

                {/* NMP of Secondary Room */}
                <div className="flex flex-col text-left">
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-xs font-bold tracking-wider uppercase ${textSubClass}`}>
                            NMP of Secondary Room
                        </span>
                        <button 
                            onClick={() => setSubPage('device-select')}
                            className={`flex items-center gap-1 text-sm font-bold transition-all hover:scale-102 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                            <span>Select device</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className={`p-3 rounded-xl min-h-[110px] flex flex-col gap-2 ${cardBgClass}`}>
                        {selectedSecondaryDevices.length > 0 && (
                            <div className="flex flex-col gap-2 w-full">
                                {selectedSecondaryDevices.map(device => (
                                    <div 
                                        key={device.id} 
                                        className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all ${isDark ? 'bg-[#202c3d]/50 hover:bg-[#202c3d]' : 'bg-white border border-gray-200'}`}
                                    >
                                        <div className="flex flex-col text-left">
                                            <span className={`font-semibold text-sm ${textMainClass}`}>{device.name}</span>
                                            <span className={`text-xs ${textSubClass}`}>ID: {device.id}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                {device.ip}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
