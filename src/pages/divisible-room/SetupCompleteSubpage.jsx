export const SetupCompleteSubpage = ({
    isDark,
    setSubPage,
    setIsDivisibleRoomModeEnabled,
    onShowToast,
    setIsFaqOpen,
    cardBgClass,
    textMainClass,
}) => {
    return (
        <div className="p-4 h-full flex flex-col justify-between select-none relative">
            <div className="max-w-3xl w-full mx-auto flex flex-col gap-3 flex-1 justify-between relative">
                
                {/* Card container */}
                <div className={`rounded-xl p-6 flex-1 flex flex-col justify-center items-center ${cardBgClass} relative`} style={{ minHeight: '260px' }}>
                    
                    {/* FAQ Button */}
                    <button 
                        onClick={() => setIsFaqOpen(true)}
                        className="absolute top-4 right-6 flex items-center gap-1 text-amber-500/90 hover:text-amber-400 font-bold text-xs select-none cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="underline decoration-1 underline-offset-2">FAQ</span>
                    </button>

                    <div className="flex flex-col items-center gap-6 w-full max-w-2xl text-center px-4">
                        <p className={`text-sm md:text-base font-semibold leading-relaxed ${textMainClass}`}>
                            Please verify that the audio & video in the secondary room have been consistently switched to the same as in the primary room.
                        </p>
                        <p className={`text-sm md:text-base font-semibold leading-relaxed ${textMainClass}`}>
                            If Not the same, please go back to the previous steps and verify that the HDMI and audio connections are correct.
                        </p>
                    </div>

                </div>

                {/* Bottom Action Row */}
                <div className="flex justify-center gap-6 mt-2 pb-1">
                    <button 
                        onClick={() => setSubPage('control-binding')}
                        className={`px-12 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => {
                            setIsDivisibleRoomModeEnabled(true);
                            setSubPage('divisible-room');
                            onShowToast("Divisible Room Mode activated!");
                        }}
                        className={`px-12 py-2.5 rounded-full font-bold text-sm transition-all text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 shadow-md active:scale-95`}
                    >
                        Complete
                    </button>
                </div>

            </div>
        </div>
    );
};
