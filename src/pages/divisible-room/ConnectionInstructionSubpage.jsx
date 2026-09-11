import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import nmpWireframe from '../../assets/NMP211-Wireframe-Orange.png';

export const ConnectionInstructionSubpage = ({
    isDark,
    activeConnectionPage,
    setActiveConnectionPage,
    secondaryDevices,
    setSubPage,
    cardBgClass,
    textSubClass,
    testStatus = 'idle',
}) => {
    // Refs for port coordinates calculation (Single Connection)
    const containerRef = useRef(null);
    const in3Ref = useRef(null);
    const audioInRef = useRef(null);
    const outCRef = useRef(null);
    const audioOutRef = useRef(null);

    // Refs for multiple connection view (Page 2)
    const in3LeftRef = useRef(null);
    const audioInLeftRef = useRef(null);
    const in3RightRef = useRef(null);
    const audioInRightRef = useRef(null);
    const outCBottomRef = useRef(null);
    const audioOutBottomRef = useRef(null);
    const hdmiSplitterRef = useRef(null);
    const audioSplitterRef = useRef(null);

    const [coords, setCoords] = useState({
        in3: { x: 0, y: 0 },
        audioIn: { x: 0, y: 0 },
        outC: { x: 0, y: 0 },
        audioOut: { x: 0, y: 0 }
    });

    const [coordsMult, setCoordsMult] = useState({
        in3Left: { x: 0, y: 0 },
        audioInLeft: { x: 0, y: 0 },
        in3Right: { x: 0, y: 0 },
        audioInRight: { x: 0, y: 0 },
        outCBottom: { x: 0, y: 0 },
        audioOutBottom: { x: 0, y: 0 },
        hdmiSplitterTop: { x: 0, y: 0 },
        hdmiSplitterBottom: { x: 0, y: 0 },
        audioSplitterTop: { x: 0, y: 0 },
        audioSplitterBottom: { x: 0, y: 0 }
    });

    const updateCoords = useCallback(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        const getCenter = (el) => {
            if (!el) return { x: 0, y: 0 };
            const r = el.getBoundingClientRect();
            return {
                x: r.left - rect.left + r.width / 2,
                y: r.top - rect.top + r.height / 2
            };
        };

        const getEdge = (el, edge) => {
            if (!el) return { x: 0, y: 0 };
            const r = el.getBoundingClientRect();
            return {
                x: r.left - rect.left + r.width / 2,
                y: edge === 'top' ? r.top - rect.top : r.bottom - rect.top
            };
        };

        if (activeConnectionPage === 1) {
            setCoords({
                in3: getCenter(in3Ref.current),
                audioIn: getCenter(audioInRef.current),
                outC: getCenter(outCRef.current),
                audioOut: getCenter(audioOutRef.current)
            });
        } else {
            setCoordsMult({
                in3Left: getCenter(in3LeftRef.current),
                audioInLeft: getCenter(audioInLeftRef.current),
                in3Right: getCenter(in3RightRef.current),
                audioInRight: getCenter(audioInRightRef.current),
                outCBottom: getCenter(outCBottomRef.current),
                audioOutBottom: getCenter(audioOutBottomRef.current),
                hdmiSplitterTop: getEdge(hdmiSplitterRef.current, 'top'),
                hdmiSplitterBottom: getEdge(hdmiSplitterRef.current, 'bottom'),
                audioSplitterTop: getEdge(audioSplitterRef.current, 'top'),
                audioSplitterBottom: getEdge(audioSplitterRef.current, 'bottom')
            });
        }
    }, [activeConnectionPage]);

    useEffect(() => {
        const timer = setTimeout(updateCoords, 150);
        window.addEventListener('resize', updateCoords);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateCoords);
        };
    }, [activeConnectionPage, secondaryDevices, updateCoords]);

    const yMid = coords.in3 && coords.outC ? (coords.in3.y + coords.outC.y) / 2 : 0;

    return (
        <div className="p-4 h-full flex flex-col justify-between select-none relative">
            <div className="max-w-4xl w-full mx-auto flex flex-col gap-3 flex-1 justify-between relative">
                
                {/* Card container */}
                <div 
                    ref={containerRef} 
                    className={`rounded-xl p-4 flex-1 flex flex-col justify-center relative ${cardBgClass} overflow-hidden`}
                    style={{ minHeight: '260px' }}
                >
                    {activeConnectionPage === 1 ? (
                        /* ================= SINGLE SECONDARY ROOM DIAGRAM ================= */
                        <div className="relative w-full flex flex-col gap-6 items-center px-16 py-4">
                            
                            {/* Top Panel - Secondary NMP */}
                            <div className="relative w-[90%]">
                                <img 
                                    src={nmpWireframe} 
                                    className="w-full opacity-90 object-contain" 
                                    onLoad={updateCoords}
                                />
                                <div className={`text-left text-[10px] mt-1 font-bold ${textSubClass}`}>
                                    Device of Secondary Room
                                </div>
                                
                                {/* Absolute overlays for Top Panel Ports */}
                                <div 
                                    ref={in3Ref} 
                                    className="absolute border border-dashed border-red-500 rounded-sm"
                                    style={{ top: '10%', left: '39%', width: '3.5%', height: '30%' }}
                                />
                                <div 
                                    ref={audioInRef} 
                                    className="absolute border border-dashed border-emerald-500 rounded-sm"
                                    style={{ top: '43%', left: '58%', width: '3.5%', height: '30%' }}
                                />

                                {/* Badges */}
                                <div 
                                    className="absolute text-[8px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap"
                                    style={{ top: '8%', left: '41%' }}
                                >
                                    IN 3
                                </div>
                                <div 
                                    className="absolute text-[8px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap"
                                    style={{ top: '41%', left: '60%' }}
                                >
                                    AUDIO IN
                                </div>
                            </div>

                            {/* Bottom Panel - Primary NMP */}
                            <div className="relative w-[90%]">
                                <img src={nmpWireframe} className="w-full opacity-90 object-contain" />
                                <div className={`text-left text-[10px] mt-1 font-bold ${textSubClass}`}>
                                    Device of Primary Room
                                </div>
                                
                                {/* Absolute overlays for Bottom Panel Ports */}
                                <div 
                                    ref={outCRef} 
                                    className="absolute border border-dashed border-red-500 rounded-sm"
                                    style={{ top: '6%', left: '44%', width: '3.5%', height: '30%' }}
                                />
                                <div 
                                    ref={audioOutRef} 
                                    className="absolute border border-dashed border-emerald-500 rounded-sm"
                                    style={{ top: '43%', left: '61%', width: '3.5%', height: '30%' }}
                                />

                                {/* Badges */}
                                <div 
                                    className="absolute text-[8px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap"
                                    style={{ top: '23%', left: '46%' }}
                                >
                                    OUT C
                                </div>
                                <div 
                                    className="absolute text-[8px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap"
                                    style={{ top: '63%', left: '63%' }}
                                >
                                    AUDIO OUT
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ================= MULTIPLE SECONDARY ROOMS DIAGRAM ================= */
                        <div className="relative w-full flex flex-col gap-5 items-center px-4 py-2">
                            
                            {/* Top Row - Two Secondary NMPs side-by-side */}
                            <div className="flex justify-between w-full gap-6">
                                {/* Left Secondary NMP */}
                                <div className="relative w-[48%]">
                                    <img src={nmpWireframe} className="w-full opacity-90 object-contain" onLoad={updateCoords} />
                                    <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                                        Device of Secondary Room
                                    </div>
                                    
                                    {/* Port marker overlays */}
                                    <div 
                                        ref={in3LeftRef} 
                                        className="absolute border border-dashed border-red-500 rounded-sm"
                                        style={{ top: '10%', left: '39%', width: '3.5%', height: '30%' }}
                                    />
                                    <div 
                                        ref={audioInLeftRef} 
                                        className="absolute border border-dashed border-emerald-500 rounded-sm"
                                        style={{ top: '43%', left: '58%', width: '3.5%', height: '30%' }}
                                    />

                                    {/* Badges */}
                                    <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '8%', left: '41%' }}>IN 3</div>
                                    <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '41%', left: '60%' }}>AUDIO IN</div>
                                </div>

                                {/* Right Secondary NMP */}
                                <div className="relative w-[48%]">
                                    <img src={nmpWireframe} className="w-full opacity-90 object-contain" />
                                    <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                                        Device of Secondary Room
                                    </div>
                                    
                                    {/* Port marker overlays */}
                                    <div 
                                        ref={in3RightRef} 
                                        className="absolute border border-dashed border-red-500 rounded-sm"
                                        style={{ top: '10%', left: '39%', width: '3.5%', height: '30%' }}
                                    />
                                    <div 
                                        ref={audioInRightRef} 
                                        className="absolute border border-dashed border-emerald-500 rounded-sm"
                                        style={{ top: '43%', left: '58%', width: '3.5%', height: '30%' }}
                                    />

                                    {/* Badges */}
                                    <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '8%', left: '41%' }}>IN 3</div>
                                    <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '41%', left: '60%' }}>AUDIO IN</div>
                                </div>
                            </div>

                            {/* Middle Row - Splitters side by side */}
                            <div className="flex gap-16 justify-center my-0.5 z-10">
                                {/* HDMI Splitter */}
                                <div 
                                    ref={hdmiSplitterRef}
                                    className="bg-[#d97706]/20 border border-[#d97706] text-[#d97706] dark:bg-red-500/20 dark:border-red-500 dark:text-red-500 rounded px-2.5 py-1 text-[8px] font-bold shadow-sm whitespace-nowrap flex flex-col items-center justify-center min-w-[110px]"
                                >
                                    HDMI splitter & Extender
                                </div>
                                {/* Audio Splitter */}
                                <div 
                                    ref={audioSplitterRef}
                                    className="bg-[#15803d]/20 border border-[#15803d] text-[#15803d] dark:bg-emerald-500/20 dark:border-emerald-500 dark:text-emerald-500 rounded px-2.5 py-1 text-[8px] font-bold shadow-sm whitespace-nowrap flex flex-col items-center justify-center min-w-[110px]"
                                >
                                    Audio splitter & Extender
                                </div>
                            </div>

                            {/* Bottom Row - Primary NMP (centered, narrower width) */}
                            <div className="relative w-[50%]">
                                <img src={nmpWireframe} className="w-full opacity-90 object-contain" />
                                <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                                    Device of Primary Room
                                </div>
                                
                                {/* Port marker overlays */}
                                <div 
                                    ref={outCBottomRef} 
                                    className="absolute border border-dashed border-red-500 rounded-sm"
                                    style={{ top: '6%', left: '44%', width: '3.5%', height: '30%' }}
                                />
                                <div 
                                    ref={audioOutBottomRef} 
                                    className="absolute border border-dashed border-emerald-500 rounded-sm"
                                    style={{ top: '43%', left: '61%', width: '3.5%', height: '30%' }}
                                />

                                {/* Badges */}
                                <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap" style={{ top: '23%', left: '46%' }}>OUT C</div>
                                <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap" style={{ top: '63%', left: '63%' }}>AUDIO OUT</div>
                            </div>

                        </div>
                    )}

                    {/* SVG Drawing the cables */}
                    {activeConnectionPage === 1 ? (
                        coords.in3.x > 0 && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                {/* HDMI Line */}
                                <path 
                                    d={`M ${coords.in3.x} ${coords.in3.y} L ${coords.in3.x} ${yMid} L ${coords.outC.x} ${yMid} L ${coords.outC.x} ${coords.outC.y}`}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                                {/* Audio Line */}
                                <path 
                                    d={`M ${coords.audioIn.x} ${coords.audioIn.y} L ${coords.audioIn.x} ${yMid} L ${coords.audioOut.x} ${yMid} L ${coords.audioOut.x} ${coords.audioOut.y}`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                            </svg>
                        )
                    ) : (
                        coordsMult.in3Left.x > 0 && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                                {/* HDMI lines (Primary -> Splitter -> Left & Right) */}
                                <path 
                                    d={`M ${coordsMult.outCBottom.x} ${coordsMult.outCBottom.y} L ${coordsMult.outCBottom.x} ${coordsMult.hdmiSplitterBottom.y}`}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                                <path 
                                    d={`M ${coordsMult.hdmiSplitterTop.x} ${coordsMult.hdmiSplitterTop.y} L ${coordsMult.hdmiSplitterTop.x} ${(coordsMult.hdmiSplitterTop.y + coordsMult.in3Left.y) / 2} L ${coordsMult.in3Left.x} ${(coordsMult.hdmiSplitterTop.y + coordsMult.in3Left.y) / 2} L ${coordsMult.in3Left.x} ${coordsMult.in3Left.y}`}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                                <path 
                                    d={`M ${coordsMult.hdmiSplitterTop.x} ${coordsMult.hdmiSplitterTop.y} L ${coordsMult.hdmiSplitterTop.x} ${(coordsMult.hdmiSplitterTop.y + coordsMult.in3Right.y) / 2} L ${coordsMult.in3Right.x} ${(coordsMult.hdmiSplitterTop.y + coordsMult.in3Right.y) / 2} L ${coordsMult.in3Right.x} ${coordsMult.in3Right.y}`}
                                    fill="none"
                                    stroke="#ef4444"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />

                                {/* Audio lines (Primary -> Splitter -> Left & Right) */}
                                <path 
                                    d={`M ${coordsMult.audioOutBottom.x} ${coordsMult.audioOutBottom.y} L ${coordsMult.audioOutBottom.x} ${coordsMult.audioSplitterBottom.y}`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                                <path 
                                    d={`M ${coordsMult.audioSplitterTop.x} ${coordsMult.audioSplitterTop.y} L ${coordsMult.audioSplitterTop.x} ${(coordsMult.audioSplitterTop.y + coordsMult.audioInLeft.y) / 2} L ${coordsMult.audioInLeft.x} ${(coordsMult.audioSplitterTop.y + coordsMult.audioInLeft.y) / 2} L ${coordsMult.audioInLeft.x} ${coordsMult.audioInLeft.y}`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                                <path 
                                    d={`M ${coordsMult.audioSplitterTop.x} ${coordsMult.audioSplitterTop.y} L ${coordsMult.audioSplitterTop.x} ${(coordsMult.audioSplitterTop.y + coordsMult.audioInRight.y) / 2} L ${coordsMult.audioInRight.x} ${(coordsMult.audioSplitterTop.y + coordsMult.audioInRight.y) / 2} L ${coordsMult.audioInRight.x} ${coordsMult.audioInRight.y}`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                                    className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                                />
                            </svg>
                        )
                    )}

                    {/* Labels on SVG paths */}
                    {activeConnectionPage === 1 ? (
                        coords.in3.x > 0 && (
                            <>
                                <div 
                                    className="absolute text-red-500 font-bold text-[10px]"
                                    style={{ left: coords.in3.x - 36, top: coords.in3.y + 20 }}
                                >
                                    HDMI
                                </div>
                                <div 
                                    className="absolute text-emerald-500 font-bold text-[10px]"
                                    style={{ left: coords.audioIn.x - 32, top: coords.audioIn.y + 20 }}
                                >
                                    Audio
                                </div>
                            </>
                        )
                    ) : (
                        coordsMult.in3Left.x > 0 && (
                            <>
                                {/* Primary to Splitter Labels */}
                                <div 
                                    className="absolute text-red-500 font-bold text-[9px]"
                                    style={{ left: coordsMult.outCBottom.x - 32, top: (coordsMult.outCBottom.y + coordsMult.hdmiSplitterBottom.y) / 2 - 10 }}
                                >
                                    HDMI
                                </div>
                                <div 
                                    className="absolute text-emerald-500 font-bold text-[9px]"
                                    style={{ left: coordsMult.audioOutBottom.x - 32, top: (coordsMult.audioOutBottom.y + coordsMult.audioSplitterBottom.y) / 2 - 10 }}
                                >
                                    Audio
                                </div>

                                {/* Splitter to Left/Right branch Labels */}
                                <div 
                                    className="absolute text-red-500 font-bold text-[8px]"
                                    style={{ left: coordsMult.in3Left.x - 32, top: coordsMult.in3Left.y + 20 }}
                                >
                                    HDMI
                                </div>
                                <div 
                                    className="absolute text-emerald-500 font-bold text-[8px]"
                                    style={{ left: coordsMult.audioInLeft.x - 32, top: coordsMult.audioInLeft.y + 20 }}
                                >
                                    Audio
                                </div>
                                <div 
                                    className="absolute text-red-500 font-bold text-[8px]"
                                    style={{ left: coordsMult.in3Right.x - 32, top: coordsMult.in3Right.y + 20 }}
                                >
                                    HDMI
                                </div>
                                <div 
                                    className="absolute text-emerald-500 font-bold text-[8px]"
                                    style={{ left: coordsMult.audioInRight.x - 32, top: coordsMult.audioInRight.y + 20 }}
                                >
                                    Audio
                                </div>
                            </>
                        )
                    )}

                    {/* Page switching capsules/chevrons */}
                    {activeConnectionPage === 1 ? (
                        <button 
                            onClick={() => setActiveConnectionPage(2)}
                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white' : 'border-gray-300 bg-white hover:bg-gray-100 text-black'} shadow-md`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button 
                            onClick={() => setActiveConnectionPage(1)}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-16 rounded-full border flex items-center justify-center transition-all ${isDark ? 'border-gray-700 bg-gray-800/80 hover:bg-gray-700 text-white' : 'border-gray-300 bg-white hover:bg-gray-100 text-black'} shadow-md`}
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
