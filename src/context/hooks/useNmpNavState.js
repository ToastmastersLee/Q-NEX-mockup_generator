import { useState } from 'react';

export const allNavItems = [
    { id: 'powerCtrl', label: 'Power Control', icon: 'powerControl' },
    { id: 'video', label: 'Video Switch', icon: 'videoSwitch' },
    { id: 'vol', label: 'Vol.', icon: 'volume-2' },
    { id: 'serial', label: 'Serial Control', icon: 'serial' },
    { id: 'air', label: 'Air Conditioner', icon: 'airConditioner' },
    { id: 'projector', label: 'Projection Screen', icon: 'projectorScreen' },
    { id: 'remote', label: 'Remote Control', icon: 'remoteControl' },
    { id: 'audioSwitch', label: 'Audio Switch', icon: 'audioSwitch', isObsolete: true }
];

export function useNmpNavState() {
    const [activeTab, setActiveTab] = useState('powerCtrl');
    const [settingsSubPage, setSettingsSubPage] = useState(null);
    const [navConfig, setNavConfig] = useState({
        powerCtrl: true,
        video: true,
        vol: true,
        serial: true,
        air: true,
        projector: true,
        remote: true,
        audioSwitch: false
    });

    const handleBack = () => {
        if (settingsSubPage === 'power-off' || settingsSubPage === 'navigation-bar') {
            setSettingsSubPage('customize');
        } else if (settingsSubPage === 'customize') {
            setSettingsSubPage(null);
        } else if (settingsSubPage === 'divisible-room') {
            setSettingsSubPage(null);
        } else if (settingsSubPage === 'device-select') {
            setSettingsSubPage('divisible-room');
        } else if (settingsSubPage === 'edit-device') {
            setSettingsSubPage('device-select');
        } else if (settingsSubPage === 'add-device') {
            setSettingsSubPage('device-select');
        } else if (settingsSubPage === 'connection-instruction') {
            setSettingsSubPage('device-select');
        } else if (settingsSubPage === 'control-binding') {
            setSettingsSubPage('connection-instruction');
        } else if (settingsSubPage === 'setup-complete') {
            setSettingsSubPage('control-binding');
        }
    };

    return {
        activeTab,
        setActiveTab,
        settingsSubPage,
        setSettingsSubPage,
        navConfig,
        setNavConfig,
        allNavItems,
        handleBack
    };
}
