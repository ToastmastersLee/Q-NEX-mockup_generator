import { useState, useEffect } from 'react';

export function useNmpLockState() {
    const [isLocked, setIsLocked] = useState(false);
    const [isLockCountdown, setIsLockCountdown] = useState(false);
    const [lockCountdownTime, setLockCountdownTime] = useState(10);

    // Lock screen countdown effect
    useEffect(() => {
        let timer;
        if (isLockCountdown && lockCountdownTime > 0) {
            timer = setTimeout(() => {
                setLockCountdownTime(prev => prev - 1);
            }, 1000);
        } else if (isLockCountdown && lockCountdownTime === 0) {
            const lockTimer = setTimeout(() => {
                setIsLocked(true);
                setIsLockCountdown(false);
            }, 0);
            return () => clearTimeout(lockTimer);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isLockCountdown, lockCountdownTime]);

    const handleLockClick = () => {
        setLockCountdownTime(10);
        setIsLockCountdown(true);
    };

    const cancelLockCountdown = () => {
        setIsLockCountdown(false);
        setLockCountdownTime(10);
    };

    const executeLockNow = () => {
        setIsLocked(true);
        setIsLockCountdown(false);
    };

    const unlock = () => {
        setIsLocked(false);
    };

    return {
        isLocked,
        setIsLocked,
        isLockCountdown,
        lockCountdownTime,
        handleLockClick,
        cancelLockCountdown,
        executeLockNow,
        unlock
    };
}
