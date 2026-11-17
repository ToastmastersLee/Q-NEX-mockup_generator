import { useState } from 'react';
import { readQuery } from '../../constants/nav';

export function useNdpDeviceState() {
    const [muted, setMuted] = useState(false);
    const [theme, setThemeState] = useState(readQuery('theme') === 'light' ? 'light' : 'dark');
    const [isDisconnected, setIsDisconnected] = useState(readQuery('status') === 'disconnected');
    const [isDisconnectedSettingsOpen, setIsDisconnectedSettingsOpen] = useState(false);
    const [showPowerOnScreen, setShowPowerOnScreen] = useState(false);

    const setTheme = (valOrFn) => {
        setThemeState(prev => {
            const next = typeof valOrFn === 'function' ? valOrFn(prev) : valOrFn;
            try {
                const url = new URL(window.location.href);
                if (next === 'light') {
                    url.searchParams.set('theme', 'light');
                } else {
                    url.searchParams.delete('theme');
                }
                window.history.replaceState({}, '', url.toString());
            } catch {
                // ignore in non-browser env
            }
            return next;
        });
    };

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
