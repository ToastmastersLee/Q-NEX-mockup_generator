import { useState } from 'react';

export function useNmpSystemState() {
    const [theme, setTheme] = useState('dark'); // 'dark' | 'wireframe'
    const [isDisconnected, setIsDisconnected] = useState(false);
    const [isAndroidEthernetOpen, setIsAndroidEthernetOpen] = useState(false);
    const [panelIpAddress, setPanelIpAddress] = useState('192.168.101.108');
    const [isScheduledPowerOffEnabled, setIsScheduledPowerOffEnabled] = useState(false);
    const [scheduledPowerOffTime, setScheduledPowerOffTime] = useState(null);

    const isDark = theme === 'dark';

    return {
        theme,
        setTheme,
        isDark,
        isDisconnected,
        setIsDisconnected,
        isAndroidEthernetOpen,
        setIsAndroidEthernetOpen,
        panelIpAddress,
        setPanelIpAddress,
        isScheduledPowerOffEnabled,
        setIsScheduledPowerOffEnabled,
        scheduledPowerOffTime,
        setScheduledPowerOffTime
    };
}
