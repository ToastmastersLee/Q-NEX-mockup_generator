import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight, Plus, Check, ChevronLeft, Loader2 } from 'lucide-react';
import { ToggleSwitch } from '../components/ToggleSwitch';
import nmpWireframe from '../assets/NMP211-Wireframe-Orange.png';

export const DivisibleRoom = ({
    isDark,
    subPage,
    setSubPage,
    isDivisibleRoomModeEnabled,
    setIsDivisibleRoomModeEnabled,
    primaryRoomNmpName,
    setPrimaryRoomNmpName,
    secondaryDevices,
    setSecondaryDevices,
    editingDeviceId,
    setEditingDeviceId,
    activeConnectionPage,
    setActiveConnectionPage,
    onShowToast,
    testResult,
    setIsFaqOpen
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
        if (subPage === 'connection-instruction') {
            const timer = setTimeout(updateCoords, 150);
            window.addEventListener('resize', updateCoords);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', updateCoords);
            };
        }
    }, [subPage, activeConnectionPage, secondaryDevices, updateCoords]);

    // Local states
    const [isEditingPrimary, setIsEditingPrimary] = useState(false);
    const [tempPrimaryName, setTempPrimaryName] = useState(primaryRoomNmpName);
    const [testStatus] = useState('idle'); // 'idle' | 'testing' | 'success'
    

    
    // Add Device Modal State
    const [addName, setAddName] = useState('');
    const [addId, setAddId] = useState('');
    const [addIp, setAddIp] = useState('');

    // Edit Device Local States
    const activeEditingDevice = secondaryDevices.find(d => d.id === editingDeviceId);
    const [editName, setEditName] = useState(activeEditingDevice?.name || '');
    const [editId, setEditId] = useState(activeEditingDevice?.id || '');
    const [editIp, setEditIp] = useState(activeEditingDevice?.ip || '');

    const selectedSecondaryDevices = secondaryDevices.filter(d => d.checked);

    // Save Primary Room NMP Name
    const savePrimaryName = () => {
        if (tempPrimaryName.trim()) {
            setPrimaryRoomNmpName(tempPrimaryName.trim());
        } else {
            setTempPrimaryName(primaryRoomNmpName);
        }
        setIsEditingPrimary(false);
    };

    // Toggle Divisible Room Mode
    const handleToggleMode = () => {
        if (!isDivisibleRoomModeEnabled) {
            // Turning ON -> requires at least one checked device
            if (selectedSecondaryDevices.length === 0) {
                onShowToast("Please select the device to be controlled first.");
                return;
            }
            setIsDivisibleRoomModeEnabled(true);
        } else {
            setIsDivisibleRoomModeEnabled(false);
        }
    };

    // Handle Checkbox Toggles
    const handleCheckboxToggle = (id) => {
        setSecondaryDevices(prev => 
            prev.map(d => d.id === id ? { ...d, checked: !d.checked } : d)
        );
    };

    // Save Edited Device Details
    const handleSaveEdit = () => {
        if (!editName.trim() || !editId.trim() || !editIp.trim()) {
            onShowToast("All fields are required.");
            return;
        }

        // Update list
        setSecondaryDevices(prev => 
            prev.map(d => d.id === editingDeviceId ? { ...d, name: editName.trim(), id: editId.trim(), ip: editIp.trim() } : d)
        );
        
        // Return to device selection
        setSubPage('device-select');
    };

    // Layout Styling Classes based on theme
    const cardBgClass = isDark ? 'bg-[#182232] border border-gray-700/50' : 'bg-gray-50 border border-gray-300';
    const textMainClass = isDark ? 'text-gray-100' : 'text-gray-800';
    const textSubClass = isDark ? 'text-gray-400' : 'text-gray-500';
    
    // RENDER: Screen 1 - Main Divisible Room Mode
    if (subPage === 'divisible-room') {
        return (
            <div className="p-4 h-full flex flex-col overflow-y-auto">
                <div className="max-w-3xl w-full mx-auto pb-4 flex flex-col gap-4">
                    {/* Mode Toggle Switch Row */}
                    <div className={`flex justify-between items-center py-3 border-b ${isDark ? 'border-gray-600/50' : 'border-gray-300'}`}>
                        <div className="flex flex-col text-left">
                            <span className={`text-lg font-bold ${textMainClass}`}>Divisible Room Mode</span>
                        </div>
                        <ToggleSwitch 
                            isOn={isDivisibleRoomModeEnabled} 
                            onToggle={handleToggleMode} 
                            isDark={isDark} 
                        />
                    </div>

                    {/* NMP of Primary Room */}
                    <div className="flex flex-col text-left">
                        <span className={`text-xs font-bold tracking-wider uppercase mb-1.5 ${textSubClass}`}>
                            NMP of Primary Room
                        </span>
                        <div 
                            className={`p-3 rounded-xl flex items-center justify-between min-h-[52px] ${cardBgClass} transition-all duration-200 hover:ring-2 hover:ring-blue-500/20`}
                            onDoubleClick={() => {
                                setTempPrimaryName(primaryRoomNmpName);
                                setIsEditingPrimary(true);
                            }}
                        >
                            {isEditingPrimary ? (
                                <div className="flex-1 flex gap-2 items-center">
                                    <input
                                        type="text"
                                        value={tempPrimaryName}
                                        onChange={(e) => setTempPrimaryName(e.target.value)}
                                        onBlur={savePrimaryName}
                                        onKeyDown={(e) => { if (e.key === 'Enter') savePrimaryName(); }}
                                        className={`w-full bg-transparent outline-none font-bold text-base ${isDark ? 'text-white border-b border-blue-400' : 'text-black border-b border-blue-600'}`}
                                        autoFocus
                                    />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); savePrimaryName(); }}
                                        className="p-1 rounded-full hover:bg-gray-500/20 text-emerald-500"
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <span className={`font-bold text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                    {primaryRoomNmpName}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* NMP of Secondary Room */}
                    <div className="flex flex-col text-left">
                        <div className="flex justify-between items-center mb-2">
                            <span className={`text-xs font-bold tracking-wider uppercase ${textSubClass}`}>
                                NMP of Secondary Room
                            </span>
                            <button 
                                onClick={() => setSubPage('device-select')}
                                className={`flex items-center gap-1 text-sm font-bold transition-all hover:scale-102 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                            >
                                <span>Select device</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className={`p-3 rounded-xl min-h-[110px] flex flex-col gap-2 ${cardBgClass}`}>
                            {selectedSecondaryDevices.length > 0 && (
                                <div className="flex flex-col gap-2 w-full">
                                    {selectedSecondaryDevices.map(device => (
                                        <div 
                                            key={device.id} 
                                            className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all ${isDark ? 'bg-[#202c3d]/50 hover:bg-[#202c3d]' : 'bg-white border border-gray-200'}`}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className={`font-semibold text-sm ${textMainClass}`}>{device.name}</span>
                                                <span className={`text-xs ${textSubClass}`}>ID: {device.id}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-xs font-mono px-2 py-0.5 rounded ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                    {device.ip}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // RENDER: Screen 2 - Device Selection
    if (subPage === 'device-select') {
        return (
            <div className="p-4 h-full flex flex-col relative select-none">
                <div className="max-w-4xl w-full mx-auto flex flex-col gap-2.5 flex-1 justify-between">
                    
                    {/* Device Selection Outer Box */}
                    <div className={`rounded-xl p-4 ${cardBgClass} flex-1 flex flex-col`}>
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-600/30">
                            <span className={`text-sm font-bold ${textMainClass}`}>
                                Device Selection {secondaryDevices.filter(d => d.checked).length}
                            </span>
                            <button 
                                onClick={() => setSubPage('add-device')}
                                className={`p-1 rounded-full border transition-all ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                                title="Add custom device"
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* List/Grid of Devices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1 py-1">
                            {secondaryDevices.map(device => {
                                const isChecked = device.checked;
                                return (
                                    <div 
                                        key={device.id}
                                        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isDark ? 'bg-[#202c3d]/30 border-gray-700/50 hover:bg-[#202c3d]/60' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        {/* Checkbox and Text */}
                                        <div 
                                            className="flex items-center gap-3 cursor-pointer flex-1"
                                            onClick={() => handleCheckboxToggle(device.id)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? (isDark ? 'bg-[#007AFF] border-[#007AFF]' : 'bg-blue-600 border-blue-600') : (isDark ? 'border-gray-500 hover:border-gray-400' : 'border-gray-400 hover:border-gray-500')}`}>
                                                {isChecked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                                            </div>
                                            <span className={`font-bold text-sm text-left truncate max-w-[200px] ${isChecked ? (isDark ? 'text-blue-400' : 'text-blue-600') : textMainClass}`}>
                                                {device.name}/{device.id}
                                            </span>
                                        </div>

                                        {/* Edit Pill Button */}
                                        <button 
                                            onClick={() => {
                                                setEditingDeviceId(device.id);
                                                setEditName(device.name);
                                                setEditId(device.id);
                                                setEditIp(device.ip);
                                                setSubPage('edit-device');
                                            }}
                                            className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${isDark ? 'border-blue-400 text-blue-400 hover:bg-blue-400/10' : 'border border-blue-600 text-blue-600 hover:bg-blue-50'}`}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Note */}
                        <div className={`text-left text-[11px] ${textSubClass} mt-2`}>
                            *Note: secondary room devices must be unbound before they can be associated with another primary room
                        </div>
                    </div>

                    {/* Next Button Action */}
                    <div className="flex justify-center mt-2 pb-1">
                        <button 
                            onClick={() => setSubPage('connection-instruction')}
                            className={isDark 
                                ? 'px-16 py-2.5 rounded-full font-bold text-sm transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20 active:scale-95 hover:opacity-95'
                                : 'px-16 py-2.5 rounded-full font-bold text-sm border-2 border-black bg-white text-black active:translate-x-0.5 active:translate-y-0.5 shadow-md'
                            }
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        );
    }

    // RENDER: Screen 3 - Edit Device
    if (subPage === 'edit-device') {
        return (
            <div className="p-8 h-full flex flex-col justify-center overflow-y-auto">
                <div className="max-w-xl w-full mx-auto pb-10 flex flex-col gap-6">
                    
                    {/* Device Edit Card */}
                    <div className={`p-6 rounded-2xl ${cardBgClass} shadow-md`}>
                        <div className="flex flex-col gap-4">
                            
                            {/* Device Name Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device Name
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Device ID Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device ID
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={editId}
                                        onChange={(e) => setEditId(e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Touch Panel IP Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Touch Panel IP
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={editIp}
                                        onChange={(e) => setEditIp(e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-sm ${isDark ? 'bg-[#202c3d] border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex justify-center gap-6">
                        <button 
                            onClick={() => setSubPage('device-select')}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveEdit}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all text-white ${isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // RENDER: Screen 4 - Add Devices
    if (subPage === 'add-device') {
        return (
            <div className="p-4 h-full flex flex-col justify-center overflow-y-auto">
                <div className="max-w-xl w-full mx-auto pb-4 flex flex-col gap-4">
                    
                    {/* Device Add Card */}
                    <div className={`p-5 rounded-xl ${cardBgClass} shadow-md`}>
                        <div className="flex flex-col gap-3">
                            
                            {/* Device Name Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device Name
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addName} 
                                        onChange={(e) => setAddName(e.target.value)}
                                        placeholder="Please enter the device name"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Device ID Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device ID
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addId} 
                                        onChange={(e) => setAddId(e.target.value)}
                                        placeholder="Please enter the correct 12-digit device ID"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Touch Panel IP Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Touch Panel IP
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addIp} 
                                        onChange={(e) => setAddIp(e.target.value)}
                                        placeholder="Please enter the touch panel IP address"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex justify-center gap-6">
                        <button 
                            onClick={() => {
                                setAddName('');
                                setAddId('');
                                setAddIp('');
                                setSubPage('device-select');
                            }}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (!addName.trim() || !addId.trim() || !addIp.trim()) {
                                    onShowToast("All fields are required.");
                                    return;
                                }
                                if (secondaryDevices.some(d => d.id === addId.trim())) {
                                    onShowToast("A device with this ID already exists.");
                                    return;
                                }
                                setSecondaryDevices(prev => [
                                    ...prev,
                                    { name: addName.trim(), id: addId.trim(), ip: addIp.trim(), checked: false }
                                ]);
                                setAddName('');
                                setAddId('');
                                setAddIp('');
                                setSubPage('device-select');
                            }}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all text-white ${isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // RENDER: Screen 3 - Connection Instruction (Step 2/4)
    if (subPage === 'connection-instruction') {
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
    }

    // RENDER: Screen 4 - Add Devices
    if (subPage === 'add-device') {
        return (
            <div className="p-4 h-full flex flex-col justify-center overflow-y-auto">
                <div className="max-w-xl w-full mx-auto pb-4 flex flex-col gap-4">
                    
                    {/* Device Add Card */}
                    <div className={`p-5 rounded-xl ${cardBgClass} shadow-md`}>
                        <div className="flex flex-col gap-3">
                            
                            {/* Device Name Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device Name
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addName} 
                                        onChange={(e) => setAddName(e.target.value)}
                                        placeholder="Please enter the device name"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Device ID Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Device ID
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addId} 
                                        onChange={(e) => setAddId(e.target.value)}
                                        placeholder="Please enter the correct 12-digit device ID"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                            {/* Touch Panel IP Field */}
                            <div className="grid grid-cols-3 items-center gap-4 py-1 text-left">
                                <label className={`text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Touch Panel IP
                                </label>
                                <div className="col-span-2">
                                    <input 
                                        type="text" 
                                        value={addIp} 
                                        onChange={(e) => setAddIp(e.target.value)}
                                        placeholder="Please enter the touch panel IP address"
                                        className={`w-full px-4 py-2 rounded-lg border outline-none font-bold text-xs ${isDark ? 'bg-[#202c3d] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-300 text-black placeholder-gray-400 focus:border-blue-600'}`}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="flex justify-center gap-6">
                        <button 
                            onClick={() => {
                                setAddName('');
                                setAddId('');
                                setAddIp('');
                                setSubPage('device-select');
                            }}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${isDark ? 'bg-[#334155] text-gray-200 hover:bg-[#475569]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (!addName.trim() || !addId.trim() || !addIp.trim()) {
                                    onShowToast("All fields are required.");
                                    return;
                                }
                                if (secondaryDevices.some(d => d.id === addId.trim())) {
                                    onShowToast("A device with this ID already exists.");
                                    return;
                                }
                                setSecondaryDevices(prev => [
                                    ...prev,
                                    { name: addName.trim(), id: addId.trim(), ip: addIp.trim(), checked: false }
                                ]);
                                setAddName('');
                                setAddId('');
                                setAddIp('');
                                setSubPage('device-select');
                            }}
                            className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all text-white ${isDark ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/10' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
                        >
                            Next
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    // RENDER: Screen 5 - Control Binding (Step 3/4)
    // RENDER: Screen 5 - Control Binding (Step 3/4) / Testing (3/4)
    if (subPage === 'control-binding') {
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
    }

    // RENDER: Screen 6 - Setup Complete (Step 4/4)
    if (subPage === 'setup-complete') {
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
    }

    return null;
};
