import { Plus, Check } from 'lucide-react';

export const DeviceSelectSubpage = ({
    isDark,
    secondaryDevices,
    setEditingDeviceId,
    setEditName,
    setEditId,
    setEditIp,
    setSubPage,
    handleCheckboxToggle,
    cardBgClass,
    textMainClass,
    textSubClass,
}) => {
    return (
        <div className="p-4 h-full flex flex-col relative select-none">
            <div className="max-w-4xl w-full mx-auto flex flex-col gap-2.5 flex-1 justify-between">
                
                {/* Device Selection Outer Box */}
                <div className={`rounded-xl p-4 ${cardBgClass} flex-1 flex flex-col`}>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-600/30">
                        <span className={`text-sm font-bold ${textMainClass}`}>
                            Device Selection {secondaryDevices.filter(d => d.checked).length}
                        </span>
                        <button 
                            onClick={() => setSubPage('add-device')}
                            className={`p-1 rounded-full border transition-all ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            title="Add custom device"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* List/Grid of Devices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1 py-1">
                        {secondaryDevices.map(device => {
                            const isChecked = device.checked;
                            return (
                                <div 
                                    key={device.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isDark ? 'bg-[#202c3d]/30 border-gray-700/50 hover:bg-[#202c3d]/60' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                >
                                    {/* Checkbox and Text */}
                                    <div 
                                        className="flex items-center gap-3 cursor-pointer flex-1"
                                        onClick={() => handleCheckboxToggle(device.id)}
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? (isDark ? 'bg-[#007AFF] border-[#007AFF]' : 'bg-blue-600 border-blue-600') : (isDark ? 'border-gray-500 hover:border-gray-400' : 'border-gray-400 hover:border-gray-500')}`}>
                                            {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                        </div>
                                        <span className={`font-bold text-sm text-left truncate max-w-[200px] ${isChecked ? (isDark ? 'text-blue-400' : 'text-blue-600') : textMainClass}`}>
                                            {device.name}/{device.id}
                                        </span>
                                    </div>

                                    {/* Edit Pill Button */}
                                    <button 
                                        onClick={() => {
                                            setEditingDeviceId(device.id);
                                            setEditName(device.name);
                                            setEditId(device.id);
                                            setEditIp(device.ip);
                                            setSubPage('edit-device');
                                        }}
                                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isDark ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                                    >
                                        Edit
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Note */}
                    <div className={`text-left text-[11px] ${textSubClass} mt-2`}>
                        *Note: secondary room devices must be unbound before they can be associated with another primary room
                    </div>
                </div>

                {/* Next Button Action */}
                <div className="flex justify-center mt-2 pb-1">
                    <button 
                        onClick={() => setSubPage('connection-instruction')}
                        className={isDark 
                            ? 'px-16 py-2.5 rounded-full font-bold text-sm transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20 active:scale-95 hover:opacity-95'
                            : 'px-16 py-2.5 rounded-full font-bold text-sm border-2 border-black bg-white text-black active:translate-x-0.5 active:translate-y-0.5 shadow-md'
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
