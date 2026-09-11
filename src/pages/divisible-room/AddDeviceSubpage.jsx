export const AddDeviceSubpage = ({
    isDark,
    addName,
    setAddName,
    addId,
    setAddId,
    addIp,
    setAddIp,
    secondaryDevices,
    setSecondaryDevices,
    onShowToast,
    setSubPage,
    cardBgClass,
}) => {
    return (
        <div className="p-4 h-full flex flex-col justify-center overflow-y-auto">
            <div className="max-w-xl w-full mx-auto pb-4 flex flex-col gap-4">
                
                {/* Device Add Card */}
                <div className={`p-5 rounded-xl ${cardBgClass} shadow-md`}>
                    <div className="flex flex-col gap-3">
                        
                        {/* Device Name Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Device Name
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={addName} 
                                    onChange={(e) => setAddName(e.target.value)}
                                    placeholder="Please enter the device name"
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                        {/* Device ID Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Device ID
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={addId} 
                                    onChange={(e) => setAddId(e.target.value)}
                                    placeholder="Please enter the correct 12-digit device ID"
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                        {/* Touch Panel IP Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Touch Panel IP
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={addIp} 
                                    onChange={(e) => setAddIp(e.target.value)}
                                    placeholder="Please enter the touch panel IP address"
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex justify-center gap-6">
                    <button 
                        onClick={() => {
                            setAddName('');
                            setAddId('');
                            setAddIp('');
                            setSubPage('device-select');
                        }}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => {
                            if (!addName.trim() || !addId.trim() || !addIp.trim()) {
                                onShowToast("All fields are required.");
                                return;
                            }
                            if (secondaryDevices.some(d => d.id === addId.trim())) {
                                onShowToast("A device with this ID already exists.");
                                return;
                            }
                            setSecondaryDevices(prev => [
                                ...prev,
                                { name: addName.trim(), id: addId.trim(), ip: addIp.trim(), checked: false }
                            ]);
                            setAddName('');
                            setAddId('');
                            setAddIp('');
                            setSubPage('device-select');
                        }}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all text-white ${isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};
