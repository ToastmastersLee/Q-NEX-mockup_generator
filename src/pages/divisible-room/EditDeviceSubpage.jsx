export const EditDeviceSubpage = ({
    isDark,
    editName,
    setEditName,
    editId,
    setEditId,
    editIp,
    setEditIp,
    handleSaveEdit,
    setSubPage,
    cardBgClass,
}) => {
    return (
        <div className="p-8 h-full flex flex-col justify-center overflow-y-auto">
            <div className="max-w-xl w-full mx-auto pb-10 flex flex-col gap-6">
                
                {/* Device Edit Card */}
                <div className={`p-6 rounded-2xl ${cardBgClass} shadow-md`}>
                    <div className="flex flex-col gap-4">
                        
                        {/* Device Name Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Device Name
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                        {/* Device ID Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Device ID
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={editId}
                                    onChange={(e) => setEditId(e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                        {/* Touch Panel IP Field */}
                        <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                            <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Touch Panel IP
                            </label>
                            <div className="col-span-2">
                                <input 
                                    type="text" 
                                    value={editIp}
                                    onChange={(e) => setEditIp(e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Action Row */}
                <div className="flex justify-center gap-6">
                    <button 
                        onClick={() => setSubPage('device-select')}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveEdit}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all text-white ${isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};
