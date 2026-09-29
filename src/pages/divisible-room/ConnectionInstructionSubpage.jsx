import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SingleRoomDiagram } from './components/SingleRoomDiagram';
import { MultiRoomDiagram } from './components/MultiRoomDiagram';

export const ConnectionInstructionSubpage = ({
    isDark,
    activeConnectionPage,
    setActiveConnectionPage,
    setSubPage,
    cardBgClass,
    textSubClass,
    testStatus = 'idle',
}) => {
    return (
        <div className="p-4 h-full flex flex-col justify-between select-none relative">
            <div className="max-w-4xl w-full mx-auto flex flex-col gap-3 flex-1 justify-between relative">
                
                {/* Card container */}
                <div 
                    className={`rounded-xl p-4 flex-1 flex flex-col justify-center relative ${cardBgClass} overflow-hidden`}
                    style={{ minHeight: '260px' }}
                >
                    {activeConnectionPage === 1 ? (
                        <SingleRoomDiagram 
                            textSubClass={textSubClass} 
                            testStatus={testStatus} 
                        />
                    ) : (
                        <MultiRoomDiagram 
                            textSubClass={textSubClass} 
                            testStatus={testStatus} 
                        />
                    )}

                    {/* Page switching capsules/chevrons */}
                    {activeConnectionPage === 1 ? (
                        <button 
                            onClick={() => setActiveConnectionPage(2)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white' : 'border-gray-300 bg-white hover:bg-gray-100 text-black'} shadow-md`}
                            aria-label="Next Page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button 
                            onClick={() => setActiveConnectionPage(1)}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white' : 'border-gray-300 bg-white hover:bg-gray-100 text-black'} shadow-md`}
                            aria-label="Previous Page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Bottom Action Row */}
                <div className="flex justify-center gap-6 mt-2 pb-1">
                    <button 
                        onClick={() => setSubPage('device-select')}
                        className={`px-12 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setSubPage('control-binding')}
                        className="px-12 py-2.5 rounded-full font-bold text-sm transition-all text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-95 shadow-md active:scale-95"
                    >
                        Test
                    </button>
                </div>

            </div>
        </div>
    );
};
