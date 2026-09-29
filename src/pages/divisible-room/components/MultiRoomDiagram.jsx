import { useState, useRef, useEffect, useCallback } from 'react';
import nmpWireframe from '../../../assets/NMP211-Wireframe-Orange.png';

export const MultiRoomDiagram = ({ textSubClass, testStatus = 'idle' }) => {
    const containerRef = useRef(null);
    const in3LeftRef = useRef(null);
    const audioInLeftRef = useRef(null);
    const in3RightRef = useRef(null);
    const audioInRightRef = useRef(null);
    const outCBottomRef = useRef(null);
    const audioOutBottomRef = useRef(null);
    const hdmiSplitterRef = useRef(null);
    const audioSplitterRef = useRef(null);

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
    }, []);

    useEffect(() => {
        const timer = setTimeout(updateCoords, 150);
        window.addEventListener('resize', updateCoords);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateCoords);
        };
    }, [updateCoords]);

    return (
        <div ref={containerRef} className="relative w-full flex flex-col gap-5 items-center px-4 py-2">
            {/* Top Row - Two Secondary NMPs side-by-side */}
            <div className="flex justify-between w-full gap-6">
                {/* Left Secondary NMP */}
                <div className="relative w-[48%]">
                    <img src={nmpWireframe} alt="Secondary NMP Left" className="w-full opacity-90 object-contain" onLoad={updateCoords} />
                    <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                        Device of Secondary Room
                    </div>
                    
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

                    <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '8%', left: '41%' }}>IN 3</div>
                    <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '41%', left: '60%' }}>AUDIO IN</div>
                </div>

                {/* Right Secondary NMP */}
                <div className="relative w-[48%]">
                    <img src={nmpWireframe} alt="Secondary NMP Right" className="w-full opacity-90 object-contain" />
                    <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                        Device of Secondary Room
                    </div>
                    
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

                    <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '8%', left: '41%' }}>IN 3</div>
                    <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 -translate-y-full whitespace-nowrap" style={{ top: '41%', left: '60%' }}>AUDIO IN</div>
                </div>
            </div>

            {/* Middle Row - Splitters side by side */}
            <div className="flex gap-16 justify-center my-0.5 z-10">
                <div 
                    ref={hdmiSplitterRef}
                    className="bg-[#d97706]/20 border border-[#d97706] text-[#d97706] dark:bg-red-500/20 dark:border-red-500 dark:text-red-500 rounded px-2.5 py-1 text-[8px] font-bold shadow-sm whitespace-nowrap flex flex-col items-center justify-center min-w-[110px]"
                >
                    HDMI splitter & Extender
                </div>
                <div 
                    ref={audioSplitterRef}
                    className="bg-[#15803d]/20 border border-[#15803d] text-[#15803d] dark:bg-emerald-500/20 dark:border-emerald-500 dark:text-emerald-500 rounded px-2.5 py-1 text-[8px] font-bold shadow-sm whitespace-nowrap flex flex-col items-center justify-center min-w-[110px]"
                >
                    Audio splitter & Extender
                </div>
            </div>

            {/* Bottom Row - Primary NMP */}
            <div className="relative w-[50%]">
                <img src={nmpWireframe} alt="Primary NMP" className="w-full opacity-90 object-contain" />
                <div className={`text-left text-[9px] mt-1 font-bold ${textSubClass}`}>
                    Device of Primary Room
                </div>
                
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

                <div className="absolute text-[7px] font-bold bg-red-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap" style={{ top: '23%', left: '46%' }}>OUT C</div>
                <div className="absolute text-[7px] font-bold bg-emerald-500 text-white px-1 py-0.2 rounded transform -translate-x-1/2 translate-y-full whitespace-nowrap" style={{ top: '63%', left: '63%' }}>AUDIO OUT</div>
            </div>

            {/* SVG Drawing the cables */}
            {coordsMult.in3Left.x > 0 && (
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
            )}

            {/* Labels on SVG paths */}
            {coordsMult.in3Left.x > 0 && (
                <>
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
            )}
        </div>
    );
};
