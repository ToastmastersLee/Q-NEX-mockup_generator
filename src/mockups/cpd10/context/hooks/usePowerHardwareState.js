import { useState, useCallback } from 'react';
import { getScreenFromUrl } from '../../constants/screens';

export function usePowerHardwareState() {
  const [powerState, setPowerState] = useState('on'); // 'on' | 'closing' | 'off'
  const [shutdownPromptOpen, setShutdownPromptOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(() => getScreenFromUrl() === 'lock');
  const [orientationFlipped, setOrientationFlipped] = useState(false);
  const [screenOrientation, setScreenOrientationState] = useState('Wall Mount');

  const requestShutdown = useCallback(() => {
    setShutdownPromptOpen(true);
  }, []);

  const confirmShutdown = useCallback(() => {
    setShutdownPromptOpen(false);
    setPowerState('closing');
    setTimeout(() => {
      setPowerState('off');
    }, 2400);
  }, []);

  const powerOn = useCallback(() => {
    setPowerState('on');
  }, []);

  const setScreenOrientation = useCallback((orientation) => {
    setScreenOrientationState(orientation);
    const isFlipped = orientation === 'Desktop' || orientation === 'Inverted';
    setOrientationFlipped(isFlipped);
  }, []);

  const toggleScreenOrientation = useCallback(() => {
    setScreenOrientationState((prev) => {
      const next = prev === 'Wall Mount' ? 'Desktop' : 'Wall Mount';
      setOrientationFlipped(next === 'Desktop');
      return next;
    });
  }, []);

  return {
    powerState,
    setPowerState,
    shutdownPromptOpen,
    setShutdownPromptOpen,
    requestShutdown,
    confirmShutdown,
    powerOn,
    isLocked,
    setIsLocked,
    orientationFlipped,
    setOrientationFlipped,
    screenOrientation,
    setScreenOrientation,
    toggleScreenOrientation,
  };
}
