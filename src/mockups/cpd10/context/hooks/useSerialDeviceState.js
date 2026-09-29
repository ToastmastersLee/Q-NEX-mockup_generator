import { useState, useCallback } from 'react';
import { getScreenFromUrl } from '../../constants/screens';
import { DEFAULT_SERIAL_PORT_CONFIGS } from '../../constants/serialConfigs';

export function useSerialDeviceState() {
  const [serialTab, setSerialTab] = useState(() => {
    const s = getScreenFromUrl();
    if (s === 'serial-ta4532') return 'ta4532';
    if (s === 'serial-3m') return '3m';
    if (s === 'serial-rs485') return 'rs485';
    return 'qa1400';
  });

  const [qa1400State, setQa1400State] = useState({
    power: true,
    energySaving: false,
    screenLock: false,
    childLock: false,
    volume: 50,
    brightness: 50,
    inputSource: 'Ops',
  });

  const [ta4532State, setTa4532State] = useState({
    power: true,
    recording: false,
  });

  const [threeMState, setThreeMState] = useState({
    power: null, // neutral per Image 1
  });

  const [rs485State, setRs485State] = useState({
    power: true,
    energySaving: false,
    screenLock: false,
    childLock: false,
    volume: 50,
    brightness: 50,
    inputSource: 'Ops',
  });

  const [serialConfigs, setSerialConfigs] = useState(DEFAULT_SERIAL_PORT_CONFIGS);
  const [activeSerialTab, setActiveSerialTab] = useState('RS232-01');

  const updateSerialPortConfig = useCallback((portKey, updates) => {
    setSerialConfigs((prev) => ({
      ...prev,
      [portKey]: {
        ...prev[portKey],
        ...updates,
      },
    }));
  }, []);

  const updateSerialPortCodes = useCallback((portKey, newCodes) => {
    setSerialConfigs((prev) => ({
      ...prev,
      [portKey]: {
        ...prev[portKey],
        codes: newCodes,
      },
    }));
  }, []);

  return {
    serialTab,
    setSerialTab,
    qa1400State,
    setQa1400State,
    ta4532State,
    setTa4532State,
    threeMState,
    setThreeMState,
    rs485State,
    setRs485State,
    serialConfigs,
    setSerialConfigs,
    activeSerialTab,
    setActiveSerialTab,
    updateSerialPortConfig,
    updateSerialPortCodes,
  };
}
