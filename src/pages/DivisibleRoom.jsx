import { useState } from 'react';
import {
    MainDivisibleView,
    DeviceSelectSubpage,
    EditDeviceSubpage,
    AddDeviceSubpage,
    ConnectionInstructionSubpage,
    ControlBindingSubpage,
    SetupCompleteSubpage,
} from './divisible-room';

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
    // Local states
    const [isEditingPrimary, setIsEditingPrimary] = useState(false);
    const [tempPrimaryName, setTempPrimaryName] = useState(primaryRoomNmpName);
    
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

        setSecondaryDevices(prev => 
            prev.map(d => d.id === editingDeviceId ? { ...d, name: editName.trim(), id: editId.trim(), ip: editIp.trim() } : d)
        );
        
        setSubPage('device-select');
    };

    // Layout Styling Classes based on theme
    const cardBgClass = isDark ? 'bg-[#182232] border border-gray-700/50' : 'bg-gray-50 border border-gray-300';
    const textMainClass = isDark ? 'text-gray-100' : 'text-gray-800';
    const textSubClass = isDark ? 'text-gray-400' : 'text-gray-500';

    if (subPage === 'divisible-room') {
        return (
            <MainDivisibleView
                isDark={isDark}
                isDivisibleRoomModeEnabled={isDivisibleRoomModeEnabled}
                handleToggleMode={handleToggleMode}
                primaryRoomNmpName={primaryRoomNmpName}
                tempPrimaryName={tempPrimaryName}
                setTempPrimaryName={setTempPrimaryName}
                isEditingPrimary={isEditingPrimary}
                setIsEditingPrimary={setIsEditingPrimary}
                savePrimaryName={savePrimaryName}
                selectedSecondaryDevices={selectedSecondaryDevices}
                setSubPage={setSubPage}
                cardBgClass={cardBgClass}
                textMainClass={textMainClass}
                textSubClass={textSubClass}
            />
        );
    }

    if (subPage === 'device-select') {
        return (
            <DeviceSelectSubpage 
                isDark={isDark}
                secondaryDevices={secondaryDevices}
                setEditingDeviceId={setEditingDeviceId}
                setEditName={setEditName}
                setEditId={setEditId}
                setEditIp={setEditIp}
                setSubPage={setSubPage}
                handleCheckboxToggle={handleCheckboxToggle}
                cardBgClass={cardBgClass}
                textMainClass={textMainClass}
                textSubClass={textSubClass}
            />
        );
    }

    if (subPage === 'edit-device') {
        return (
            <EditDeviceSubpage 
                isDark={isDark}
                editName={editName}
                setEditName={setEditName}
                editId={editId}
                setEditId={setEditId}
                editIp={editIp}
                setEditIp={setEditIp}
                handleSaveEdit={handleSaveEdit}
                setSubPage={setSubPage}
                cardBgClass={cardBgClass}
            />
        );
    }

    if (subPage === 'add-device') {
        return (
            <AddDeviceSubpage 
                isDark={isDark}
                addName={addName}
                setAddName={setAddName}
                addId={addId}
                setAddId={setAddId}
                addIp={addIp}
                setAddIp={setAddIp}
                secondaryDevices={secondaryDevices}
                setSecondaryDevices={setSecondaryDevices}
                onShowToast={onShowToast}
                setSubPage={setSubPage}
                cardBgClass={cardBgClass}
            />
        );
    }

    if (subPage === 'connection-instruction') {
        return (
            <ConnectionInstructionSubpage 
                isDark={isDark}
                activeConnectionPage={activeConnectionPage}
                setActiveConnectionPage={setActiveConnectionPage}
                secondaryDevices={secondaryDevices}
                setSubPage={setSubPage}
                cardBgClass={cardBgClass}
                textSubClass={textSubClass}
            />
        );
    }

    if (subPage === 'control-binding') {
        return (
            <ControlBindingSubpage 
                isDark={isDark}
                testResult={testResult}
                setSubPage={setSubPage}
                setIsFaqOpen={setIsFaqOpen}
                cardBgClass={cardBgClass}
                textMainClass={textMainClass}
                textSubClass={textSubClass}
            />
        );
    }

    if (subPage === 'setup-complete') {
        return (
            <SetupCompleteSubpage 
                isDark={isDark}
                setSubPage={setSubPage}
                setIsDivisibleRoomModeEnabled={setIsDivisibleRoomModeEnabled}
                onShowToast={onShowToast}
                setIsFaqOpen={setIsFaqOpen}
                cardBgClass={cardBgClass}
                textMainClass={textMainClass}
            />
        );
    }

    return null;
};
