import { useMemo } from 'react';
import { NmpContext } from './nmpContextInstance';
import { useNmpNavState } from './hooks/useNmpNavState';
import { useNmpLockState } from './hooks/useNmpLockState';
import { useNmpVideoState } from './hooks/useNmpVideoState';
import { useNmpDivisibleState } from './hooks/useNmpDivisibleState';
import { useNmpSystemState } from './hooks/useNmpSystemState';

export function NmpProvider({ children }) {
    const nav = useNmpNavState();
    const lock = useNmpLockState();
    const video = useNmpVideoState();
    const divisible = useNmpDivisibleState(nav.settingsSubPage);
    const system = useNmpSystemState();

    const value = useMemo(() => ({
        ...nav,
        ...lock,
        ...video,
        ...divisible,
        ...system
    }), [nav, lock, video, divisible, system]);

    return (
        <NmpContext.Provider value={value}>
            {children}
        </NmpContext.Provider>
    );
}
