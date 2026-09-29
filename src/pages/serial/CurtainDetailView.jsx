import { ChevronLeft } from 'lucide-react';

export const CurtainDetailView = ({
    isDark,
    onBack,
    cbx1ActiveBtn,
    handleCbx1Press
}) => {
    return (
        <div className="h-full w-full px-8 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[66rem] min-h-[26rem] mx-auto min-h-full flex flex-col justify-center py-4">
                <div className={`w-full flex-1 flex flex-col p-6 rounded-[2.5rem] relative ${isDark ? 'bg-[#3b4356] shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] border border-white/5' : 'bg-gray-100 border border-gray-300 shadow-lg'}`}>
                    <div className="flex items-center justify-center relative mb-8">
                        <button 
                            className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={onBack}
                            aria-label="Back"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>e-Curtain</h2>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-3 gap-6 items-center px-12">
                        {['Up', 'Down', 'Stop', 'Dimming1', 'Dimming2', 'All Window'].map(btn => {
                            const id = btn.toLowerCase().replace(' ', '');
                            return (
                                <button 
                                    key={id}
                                    onPointerDown={() => handleCbx1Press(id)}
                                    className={`h-16 rounded-2xl flex items-center justify-center text-lg font-bold transition-all ${
                                        cbx1ActiveBtn === id 
                                        ? (isDark ? 'bg-[#007AFF] text-white shadow-[0_0_15px_rgba(0,122,255,0.5)]' : 'bg-[#007AFF] text-white')
                                        : (isDark ? 'bg-[#2a303e] text-gray-300 border border-white/10 hover:bg-[#353c4d]' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50')
                                    }`}
                                >
                                    {btn}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
