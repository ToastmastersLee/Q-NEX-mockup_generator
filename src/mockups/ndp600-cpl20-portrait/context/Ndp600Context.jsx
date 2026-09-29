import { useMemo } from 'react';
import { Ndp600Context } from './ndp600ContextInstance';
import { useNdpNavState } from './hooks/useNdpNavState';
import { useNdpSettingsState } from './hooks/useNdpSettingsState';
import { useNdpLockState } from './hooks/useNdpLockState';
import { useNdpDeviceState } from './hooks/useNdpDeviceState';

export function Ndp600Provider({ children }) {
    const nav = useNdpNavState();
    const settings = useNdpSettingsState();
    const lock = useNdpLockState();
    const device = useNdpDeviceState();

    const value = useMemo(() => ({
        ...nav,
        ...settings,
        ...lock,
        ...device
    }), [nav, settings, lock, device]);

    return (
        <Ndp600Context.Provider value={value}>
            {children}
        </Ndp600Context.Provider>
    );
}
