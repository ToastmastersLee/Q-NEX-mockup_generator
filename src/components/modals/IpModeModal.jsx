export const IpModeModal = ({
    isDark,
    ipMode,
    onSelectMode,
    onClose,
    dialogBgClass,
    flatBtnClass
}) => {
    return (
        <div className="absolute inset-0 z-40 bg-black/40 backdrop-blur-xs flex items-center justify-center rounded-2xl">
            <div className={`w-80 p-6 rounded-md flex flex-col gap-6 ${dialogBgClass}`}>
                <h3 className="text-lg font-bold">Ethernet ip mode</h3>
                
                <div className="flex flex-col gap-4">
                    {/* Static Radio Option */}
                    <label 
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => onSelectMode('static')}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${ipMode === 'static' ? (isDark ? 'border-blue-400' : 'border-blue-600') : 'border-gray-400'}`}>
                            {ipMode === 'static' && (
                                <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                            )}
                        </div>
                        <span className="text-sm font-semibold capitalize">static</span>
                    </label>

                    {/* DHCP Radio Option */}
                    <label 
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => onSelectMode('dhcp')}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${ipMode === 'dhcp' ? (isDark ? 'border-blue-400' : 'border-blue-600') : 'border-gray-400'}`}>
                            {ipMode === 'dhcp' && (
                                <div className={`w-2.5 h-2.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                            )}
                        </div>
                        <span className="text-sm font-semibold capitalize">dhcp</span>
                    </label>
                </div>

                <div className="flex justify-end gap-2 mt-2">
                    <button 
                        onClick={onClose}
                        className={`text-sm tracking-wide uppercase transition-all cursor-pointer ${flatBtnClass}`}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
