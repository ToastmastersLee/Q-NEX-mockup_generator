import { useState, useRef, useEffect, useCallback } from 'react';
import nmpWireframe from '../../../assets/NMP211-Wireframe-Orange.png';

export const SingleRoomDiagram = ({ textSubClass, testStatus = 'idle' }) => {
    const containerRef = useRef(null);
    const in3Ref = useRef(null);
    const audioInRef = useRef(null);
    const outCRef = useRef(null);
    const audioOutRef = useRef(null);

    const [coords, setCoords] = useState({
        in3: { x: 0, y: 0 },
        audioIn: { x: 0, y: 0 },
        outC: { x: 0, y: 0 },
        audioOut: { x: 0, y: 0 }
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

        setCoords({
            in3: getCenter(in3Ref.current),
            audioIn: getCenter(audioInRef.current),
            outC: getCenter(outCRef.current),
            audioOut: getCenter(audioOutRef.current)
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

    const yMid = coords.in3 && coords.outC ? (coords.in3.y + coords.outC.y) / 2 : 0;

    return (
        <div ref={containerRef} className="relative w-full flex flex-col gap-6 items-center px-16 py-4">
            {/* Top Panel - Secondary NMP */}
            <div className="relative w-[90%]">
                <img 
                    src={nmpWireframe} 
                    alt="Secondary NMP"
                    className="w-full opacity-90 object-contain" 
                    onLoad={updateCoords}
                />
                <div className={`text-left text-[10px] mt-1 font-bold ${textSubClass}`}>
                    Device of Secondary Room
                </div>
                
                {/* Overlays for Top Panel Ports */}
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
                <img src={nmpWireframe} alt="Primary NMP" className="w-full opacity-90 object-contain" />
                <div className={`text-left text-[10px] mt-1 font-bold ${textSubClass}`}>
                    Device of Primary Room
                </div>
                
                {/* Overlays for Bottom Panel Ports */}
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

            {/* SVG Cable Lines */}
            {coords.in3.x > 0 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                    <path 
                        d={`M ${coords.in3.x} ${coords.in3.y} L ${coords.in3.x} ${yMid} L ${coords.outC.x} ${yMid} L ${coords.outC.x} ${coords.outC.y}`}
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                        className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                    />
                    <path 
                        d={`M ${coords.audioIn.x} ${coords.audioIn.y} L ${coords.audioIn.x} ${yMid} L ${coords.audioOut.x} ${yMid} L ${coords.audioOut.x} ${coords.audioOut.y}`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray={testStatus === 'testing' ? '4' : '0'}
                        className={testStatus === 'testing' ? 'animate-[dash_1s_linear_infinite]' : ''}
                    />
                </svg>
            )}

            {/* Port Cable Labels */}
            {coords.in3.x > 0 && (
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
            )}
        </div>
    );
};
