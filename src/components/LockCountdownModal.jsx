

export const LockCountdownModal = ({ isDark, countdown, onCancel, onExecute }) => {
    // Backdrop theme classes
    const backdropClass = isDark
        ? 'bg-black/40 backdrop-blur-xs'
        : 'bg-black/20';

    // Modal card theme classes
    const cardClass = isDark
        ? 'bg-[#182740]/90 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-white rounded-[2rem] w-[28rem] p-8'
        : 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black rounded-3xl w-[28rem] p-8';

    // Cancel Button theme classes
    const cancelBtnClass = isDark
        ? 'bg-[#3b4c6b] hover:bg-[#485c80] text-white/95 hover:text-white transition-all active:scale-95 shadow-md shadow-black/10'
        : 'bg-white border-2 border-black hover:bg-gray-100 text-black font-bold active:translate-x-0.5 active:translate-y-0.5';

    // Execute Now Button theme classes
    const executeBtnClass = isDark
        ? 'bg-gradient-to-r from-[#00d4ff] to-[#00f2fe] text-white hover:brightness-110 shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all active:scale-95'
        : 'bg-blue-600 text-white border-2 border-black font-bold hover:bg-blue-700 active:translate-x-0.5 active:translate-y-0.5';

    return (
        <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-2xl select-none ${backdropClass}`}>
            <div className={`flex flex-col items-center gap-8 text-center transition-all duration-300 ${cardClass}`}>
                <h3 className="text-xl font-semibold leading-relaxed px-4">
                    Automatically lock screen after {countdown} seconds
                </h3>

                <div className="flex gap-6 w-full px-2">
                    <button 
                        onClick={onCancel}
                        className={`flex-1 py-3 px-6 rounded-full text-base font-semibold transition-all cursor-pointer ${cancelBtnClass}`}
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onExecute}
                        className={`flex-1 py-3 px-6 rounded-full text-base font-bold transition-all cursor-pointer ${executeBtnClass}`}
                    >
                        Execute Now
                    </button>
                </div>
            </div>
        </div>
    );
};
