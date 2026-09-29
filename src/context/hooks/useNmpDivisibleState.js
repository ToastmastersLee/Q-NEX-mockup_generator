import { useState, useRef, useEffect, useCallback } from 'react';

export function useNmpDivisibleState(settingsSubPage) {
    const [isDivisibleRoomModeEnabled, setIsDivisibleRoomModeEnabled] = useState(false);
    const [primaryRoomNmpName, setPrimaryRoomNmpName] = useState('3F-NMP/12345678');
    const [secondaryDevices, setSecondaryDevices] = useState([
        { name: '3F-Left Room', id: '0A501D7F0602', ip: '192.168.101.109', checked: false },
        { name: '3F-Right Room', id: '74151B770608', ip: '192.168.101.110', checked: false },
        { name: '3F-Rear Classroom', id: '7C171B770608', ip: '192.168.101.111', checked: false },
        { name: '3F-Sub Meeting Room', id: '924578600107', ip: '192.168.101.112', checked: false }
    ]);
    const [editingDeviceId, setEditingDeviceId] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [activeConnectionPage, setActiveConnectionPage] = useState(1);

    // Connection Testing States
    const [simulatedBranch, setSimulatedBranch] = useState('success'); // 'success' | 'failed'
    const [testResult, setTestResult] = useState('loading'); // 'loading' | 'success' | 'failed'
    const [isFaqOpen, setIsFaqOpen] = useState(false);

    const simulatedBranchRef = useRef(simulatedBranch);
    useEffect(() => {
        simulatedBranchRef.current = simulatedBranch;
    }, [simulatedBranch]);

    useEffect(() => {
        if (settingsSubPage === 'control-binding') {
            const timer = setTimeout(() => {
                setTestResult(simulatedBranchRef.current);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [settingsSubPage]);

    const handleSelectBranch = (branch) => {
        setSimulatedBranch(branch);
        setTestResult(branch);
    };

    // Automatically default connection instruction page based on checked device count
    useEffect(() => {
        if (settingsSubPage === 'connection-instruction') {
            const count = secondaryDevices.filter(d => d.checked).length;
            const timer = setTimeout(() => {
                setActiveConnectionPage(count > 1 ? 2 : 1);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [settingsSubPage, secondaryDevices]);

    const showToast = useCallback((msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    }, []);

    return {
        isDivisibleRoomModeEnabled,
        setIsDivisibleRoomModeEnabled,
        primaryRoomNmpName,
        setPrimaryRoomNmpName,
        secondaryDevices,
        setSecondaryDevices,
        editingDeviceId,
        setEditingDeviceId,
        toastMessage,
        showToast,
        activeConnectionPage,
        setActiveConnectionPage,
        simulatedBranch,
        setSimulatedBranch,
        testResult,
        setTestResult,
        isFaqOpen,
        setIsFaqOpen,
        handleSelectBranch
    };
}
