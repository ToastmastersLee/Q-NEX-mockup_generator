import { useState, useEffect } from 'react';
import { readQuery } from '../../constants/nav';

export function useNdpLockState() {
    const [locked, setLocked] = useState(readQuery('screen') === 'lock');
    const [isLocking, setIsLocking] = useState(false);
    const [lockCountdown, setLockCountdown] = useState(9);

    useEffect(() => {
        let timer;
        if (isLocking && lockCountdown > 0) {
            timer = setInterval(() => {
                setLockCountdown(prev => prev - 1);
            }, 1000);
        } else if (isLocking && lockCountdown === 0) {
            const lockTimer = setTimeout(() => {
                setLocked(true);
                setIsLocking(false);
            }, 0);
            return () => clearTimeout(lockTimer);
        }
        return () => clearInterval(timer);
    }, [isLocking, lockCountdown]);

    const handleStartLock = () => {
        setLockCountdown(9);
        setIsLocking(true);
    };

    const cancelLock = () => {
        setIsLocking(false);
    };

    const executeLock = () => {
        setLocked(true);
        setIsLocking(false);
    };

    return {
        locked,
        setLocked,
        isLocking,
        lockCountdown,
        handleStartLock,
        cancelLock,
        executeLock
    };
}
