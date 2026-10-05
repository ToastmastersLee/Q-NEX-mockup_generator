import { useState } from 'react';

export function useSlLecternState() {
  const [liftTableHeight, setLiftTableHeight] = useState('middle'); // 'high' | 'middle' | 'low'
  const [electricLock, setElectricLock] = useState('lock'); // 'lock' | 'unlock'

  return {
    liftTableHeight,
    setLiftTableHeight,
    electricLock,
    setElectricLock,
  };
}
