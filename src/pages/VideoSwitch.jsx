import { RowButton, LargeButton } from '../components/Buttons';

export const VideoSwitch = ({ 
    isDark, 
    isDuplicateMode, setIsDuplicateMode,
    activeDuplicate, setActiveDuplicate,
    activeOutA, setActiveOutA,
    activeOutB, setActiveOutB,
    activeOutC, setActiveOutC
}) => {
    return (
        <div className="flex flex-col items-center justify-center h-full px-8 w-full overflow-hidden">
            {/* Outer Box */}
            <div className={`w-[95%] max-w-[64rem] my-auto relative flex flex-col p-5 pt-6 rounded-[2rem] ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                
                {/* Duplicate Mode Header */}
                <div className="flex justify-end mb-2 pr-4">
                    <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none group" onClick={() => setIsDuplicateMode(!isDuplicateMode)}>
                            <div className={`w-4 h-4 flex items-center justify-center rounded-[3px] transition-colors ${isDuplicateMode ? (isDark ? 'bg-[#007AFF] border-none' : 'bg-[#007AFF] border-none') : (isDark ? 'bg-transparent border border-gray-400 group-hover:border-gray-200' : 'bg-white border border-gray-400')}`}>
                                {isDuplicateMode && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <span className={`text-[15px] tracking-wide ${isDark ? 'text-gray-200 font-medium' : 'text-gray-800 font-semibold'}`}>Duplicate Mode</span>
                        </label>
                        <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center border-[1.5px] ${isDark ? 'border-[#EAB308] text-[#EAB308]' : 'border-black text-black'} cursor-help hover:opacity-80 transition-opacity`}>
                            <span className="text-[11px] font-bold">?</span>
                        </div>
                    </div>
                </div>

                {/* Inner Box */}
                <div className={`w-full flex flex-col justify-center rounded-[1.5rem] px-10 py-3 ${isDark ? 'bg-[#353c4d] shadow-[0_15px_30px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.05)] border border-white/5' : 'bg-white border border-gray-200'}`}>
                    {isDuplicateMode ? (
                        <div key="duplicate" className="flex justify-center items-center gap-20 py-8">
                            <LargeButton label="HDMI in 1" icon="laptop" active={activeDuplicate === 'hdmi1'} onClick={() => setActiveDuplicate('hdmi1')} isDark={isDark} />
                            <LargeButton label="HDMI in 2" icon="docCam" active={activeDuplicate === 'hdmi2'} onClick={() => setActiveDuplicate('hdmi2')} isDark={isDark} />
                            <LargeButton label="HDMI in 3" icon="hdmi" active={activeDuplicate === 'hdmi3'} onClick={() => setActiveDuplicate('hdmi3')} isDark={isDark} />
                        </div>
                    ) : (
                        <div className="flex flex-col w-full">
                            {/* Row A */}
                            <div className={`flex items-center justify-between py-5 ${isDark ? 'border-b border-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)]' : 'border-b border-gray-300'}`}>
                                <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-300' : 'text-black'}`}>HDMI out A</span>
                                <div className="flex items-center gap-16">
                                    <RowButton label="HDMI in 1" icon="laptop" active={activeOutA === 'hdmi1'} onClick={() => setActiveOutA('hdmi1')} isDark={isDark} />
                                    <RowButton label="HDMI in 2" icon="docCam" active={activeOutA === 'hdmi2'} onClick={() => setActiveOutA('hdmi2')} isDark={isDark} />
                                    <RowButton label="HDMI in 3" icon="hdmi" active={activeOutA === 'hdmi3'} onClick={() => setActiveOutA('hdmi3')} isDark={isDark} />
                                </div>
                            </div>

                            {/* Row B */}
                            <div className={`flex items-center justify-between py-5 ${isDark ? 'border-b border-black/40 shadow-[0_1px_0_rgba(255,255,255,0.02)]' : 'border-b border-gray-300'}`}>
                                <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-300' : 'text-black'}`}>HDMI out B</span>
                                <div className="flex items-center gap-16">
                                    <RowButton label="HDMI in 1" icon="laptop" active={activeOutB === 'hdmi1'} onClick={() => setActiveOutB('hdmi1')} isDark={isDark} />
                                    <RowButton label="HDMI in 2" icon="docCam" active={activeOutB === 'hdmi2'} onClick={() => setActiveOutB('hdmi2')} isDark={isDark} />
                                    <RowButton label="HDMI in 3" icon="hdmi" active={activeOutB === 'hdmi3'} onClick={() => setActiveOutB('hdmi3')} isDark={isDark} />
                                </div>
                            </div>

                            {/* Row C */}
                            <div className={`flex items-center justify-between py-5`}>
                                <span className={`text-[15px] font-bold tracking-wide ${isDark ? 'text-gray-300' : 'text-black'}`}>HDMI out C</span>
                                <div className="flex items-center gap-16">
                                    <RowButton label="HDMI in 1" icon="laptop" active={activeOutC === 'hdmi1'} onClick={() => setActiveOutC('hdmi1')} isDark={isDark} />
                                    <RowButton label="HDMI in 2" icon="docCam" active={activeOutC === 'hdmi2'} onClick={() => setActiveOutC('hdmi2')} isDark={isDark} />
                                    <RowButton label="HDMI in 3" icon="hdmi" active={activeOutC === 'hdmi3'} onClick={() => setActiveOutC('hdmi3')} isDark={isDark} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
