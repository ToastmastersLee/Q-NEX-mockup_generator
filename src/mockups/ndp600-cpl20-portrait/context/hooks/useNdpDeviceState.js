import { useState } from 'react';
import { readQuery } from '../../constants/nav';

export function useNdpDeviceState() {
    const [muted, setMuted] = useState(false);
    const [theme, setTheme] = useState(readQuery('theme') === 'light' ? 'light' : 'dark');
    const [isDisconnected, setIsDisconnected] = useState(readQuery('status') === 'disconnected');
    const [isDisconnectedSettingsOpen, setIsDisconnectedSettingsOpen] = useState(false);
    const [showPowerOnScreen, setShowPowerOnScreen] = useState(false);

    const isLight = theme === 'light';

    return {
        muted,
        setMuted,
        theme,
        setTheme,
        isLight,
        isDisconnected,
        setIsDisconnected,
        isDisconnectedSettingsOpen,
        setIsDisconnectedSettingsOpen,
        showPowerOnScreen,
        setShowPowerOnScreen
    };
}
