import { useState } from 'react';

export function useNdpSettingsState() {
    const [brightness, setBrightness] = useState(80);
    const [autoLockTime, setAutoLockTime] = useState('2 Minutes');
    const [screenSaver, setScreenSaver] = useState('Never');
    const [screenSleep, setScreenSleep] = useState('10 Minutes');
    const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(true);
    const [password, setPassword] = useState('8888');
    const [homepageWidgets, setHomepageWidgets] = useState(['air', 'projector']);
    const [deviceName, setDeviceName] = useState('3F NDP600');
    const [panelIpAddress, setPanelIpAddress] = useState('192.168.110.125');
    const [cloudServerAddress, setCloudServerAddress] = useState('https://test.qnextech.com');
    const [isCloudServerModalOpen, setIsCloudServerModalOpen] = useState(false);
    const [isAndroidEthernetOpen, setIsAndroidEthernetOpen] = useState(false);
    const [isDisconnectConfirmOpen, setIsDisconnectConfirmOpen] = useState(false);

    return {
        brightness,
        setBrightness,
        autoLockTime,
        setAutoLockTime,
        screenSaver,
        setScreenSaver,
        screenSleep,
        setScreenSleep,
        passwordUnlockEnabled,
        setPasswordUnlockEnabled,
        password,
        setPassword,
        homepageWidgets,
        setHomepageWidgets,
        deviceName,
        setDeviceName,
        panelIpAddress,
        setPanelIpAddress,
        cloudServerAddress,
        setCloudServerAddress,
        isCloudServerModalOpen,
        setIsCloudServerModalOpen,
        isAndroidEthernetOpen,
        setIsAndroidEthernetOpen,
        isDisconnectConfirmOpen,
        setIsDisconnectConfirmOpen
    };
}
