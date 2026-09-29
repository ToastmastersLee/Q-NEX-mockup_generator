import { 
    ChevronLeft, 
    ChevronRight, 
    ChevronUp, 
    ChevronDown, 
    Plus, 
    Minus, 
    Scan, 
    MapPin, 
    RefreshCcw 
} from 'lucide-react';
import classroomFeed from '../../assets/classroom_feed.png';

export const Rs485DetailView = ({ isDark, onBack }) => {
    return (
        <div className="h-full w-full px-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="w-full max-w-[66rem] min-h-full mx-auto flex flex-col justify-center py-4 gap-4">
                {/* Header */}
                <div className="flex items-center justify-center relative mb-4">
                    <button 
                        className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-[#2a303e] text-gray-300 hover:text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={onBack}
                        aria-label="Back"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>RS485</h2>
                </div>

                <div className="grid grid-cols-2 gap-6 items-start">
                    {/* Left Side: Camera feed and zoom controls */}
                    <div className="flex flex-col gap-4">
                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/5 bg-[#1e2530]">
                            <img 
                                src={classroomFeed} 
                                alt="Classroom Feed" 
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Zoom Controls */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                                <button className="w-8 h-8 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 active:scale-95 transition-all">
                                    <Plus className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-black/70 active:scale-95 transition-all">
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Camera Action Row */}
                        <div className="flex items-center justify-center gap-4 py-2">
                            <button className="w-11 h-11 rounded-full border border-white/10 bg-[#3b4356] text-gray-200 flex items-center justify-center text-[11px] font-bold hover:bg-white/10 active:scale-95 transition-all">
                                ON
                            </button>
                            <button className="w-11 h-11 rounded-full border border-white/10 bg-[#3b4356] text-gray-200 flex items-center justify-center text-[11px] font-bold hover:bg-white/10 active:scale-95 transition-all">
                                OFF
                            </button>
                            <button className="w-11 h-11 rounded-full border border-white/10 bg-[#3b4356] text-gray-200 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all">
                                <Scan className="w-5 h-5" />
                            </button>
                            <button className="w-11 h-11 rounded-full border border-white/10 bg-[#3b4356] text-gray-200 flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all">
                                <MapPin className="w-5 h-5" />
                            </button>
                            <button className="w-11 h-11 rounded-full border border-white/10 bg-[#3b4356] text-gray-200 flex items-center justify-center text-[9px] font-bold hover:bg-white/10 active:scale-95 transition-all">
                                Preset
                            </button>
                        </div>
                    </div>

                    {/* Right Side: PTZ Wheel */}
                    <div className="flex items-center justify-center py-6">
                        <div className="relative w-44 h-44 rounded-full border border-white/10 bg-[#3c5878]/20 shadow-inner flex items-center justify-center">
                            <button className="absolute w-11 h-11 rounded-full flex items-center justify-center text-[#dcefff] hover:bg-white/10 hover:text-white transition-all top-1.5 left-1/2 -translate-x-1/2" type="button"><ChevronUp size={24} /></button>
                            <button className="absolute w-11 h-11 rounded-full flex items-center justify-center text-[#dcefff] hover:bg-white/10 hover:text-white transition-all left-1.5 top-1/2 -translate-y-1/2" type="button"><ChevronLeft size={24} /></button>
                            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/10 bg-[#3c5878]/60 text-[#dcefff] flex items-center justify-center shadow hover:bg-gradient-to-br hover:from-[#05c8ec] hover:to-[#127bff] hover:text-white transition-all" type="button"><RefreshCcw size={20} /></button>
                            <button className="absolute w-11 h-11 rounded-full flex items-center justify-center text-[#dcefff] hover:bg-white/10 hover:text-white transition-all right-1.5 top-1/2 -translate-y-1/2" type="button"><ChevronRight size={24} /></button>
                            <button className="absolute w-11 h-11 rounded-full flex items-center justify-center text-[#dcefff] hover:bg-white/10 hover:text-white transition-all bottom-1.5 left-1/2 -translate-x-1/2" type="button"><ChevronDown size={24} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
