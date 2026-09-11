import { Loader2 } from 'lucide-react';

export const ControlBindingSubpage = ({
    isDark,
    testResult,
    setSubPage,
    setIsFaqOpen,
    cardBgClass,
    textMainClass,
    textSubClass,
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

                    {/* Test Status/Results Content */}
                    <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-2">
                        {testResult === 'loading' && (
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className={`text-sm font-medium ${textMainClass} flex flex-col gap-1.5`}>
                                    <p>1. Detecting connection with Touch Panel in Secondary room...</p>
                                    <p className="text-gray-400 font-bold">...</p>
                                    <p>2. Switching to HDMI OUT C...</p>
                                </div>
                                
                                {/* Loading Panel Box */}
                                <div className={`mt-4 px-10 py-5 rounded-xl flex flex-col items-center gap-2.5 border ${
                                    isDark ? 'bg-slate-900/40 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
                                }`} style={{ minWidth: '180px' }}>
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    <span className={`text-xs font-semibold ${textSubClass}`}>Loading...</span>
                                </div>
                            </div>
                        )}

                        {testResult === 'success' && (
                            <div className="flex flex-col items-center gap-1.5 text-center">
                                <div className={`text-sm font-medium ${textMainClass} flex flex-col gap-1`}>
                                    <p>1. Detecting connection with Touch Panel in Slave Room...</p>
                                    <p className="text-emerald-500 font-bold mb-4">Success</p>
                                    <p>2. Switching to HDMI OUT C...</p>
                                    <p className="text-emerald-500 font-bold">Success</p>
                                </div>
                            </div>
                        )}

                        {testResult === 'failed' && (
                            <div className={`text-sm font-medium ${textMainClass} flex flex-col gap-4 max-w-xl text-center`}>
                                <div>
                                    <p>1. Detecting connection with Touch Panel in Secondary room...</p>
                                    <p className="text-rose-500 font-bold text-xs mt-1.5 px-4 leading-relaxed max-w-lg mx-auto">
                                        Result: Failed. Please go back to the previous step and check the IP address of the secondary room device is correct.
                                    </p>
                                </div>
                                <div className="mt-1">
                                    <p>2. Switching to HDMI OUT C...</p>
                                    <p className="text-rose-500 font-bold text-xs mt-1.5 px-4 leading-relaxed max-w-lg mx-auto">
                                        Result: Failed. Please check that the device is properly connected. Also, make sure that the NMP you selected is not already assigned as a Secondary Room by other devices, otherwise, you may need to return to the previous step and choose a different NMP.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Bottom Action Row */}
                <div className="flex justify-center gap-6 mt-2 pb-1">
                    <button 
                        onClick={() => setSubPage('connection-instruction')}
                        className={`px-12 py-2.5 rounded-full font-bold text-sm transition-all ${
                            isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setSubPage('setup-complete')}
                        disabled={testResult !== 'success'}
                        className={`px-12 py-2.5 rounded-full font-bold text-sm transition-all text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 shadow-md disabled:opacity-30 disabled:cursor-not-allowed active:scale-95`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};
