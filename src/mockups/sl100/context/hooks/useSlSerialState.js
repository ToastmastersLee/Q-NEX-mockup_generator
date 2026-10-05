import { useState } from 'react';

const INITIAL_LCD_STATE = {
  power: true,
  energySaving: false,
  screenLock: false,
  childLock: false,
  inputSource: 'OPS', // 'OPS' | 'HDMI' | 'Android'
  volume: 55,
  brightness: 80,
  page: 1,
};

export function useSlSerialState() {
  const [serialTab, setSerialTab] = useState('ptz'); // 'ptz' | 'lcd1' | 'lcd2' | 'lcd3'

  const [ptzState, setPtzState] = useState({
    power: true,
    focusAf: true,
    zoom: 40,
    pan: 0,
    tilt: 0,
    lastAction: 'Ready',
  });

  const [lcdStates, setLcdStates] = useState({
    lcd1: { ...INITIAL_LCD_STATE, name: 'Interactive LCD Display 1', volume: 65 },
    lcd2: { ...INITIAL_LCD_STATE, name: 'Interactive LCD Display 2', volume: 45 },
    lcd3: { ...INITIAL_LCD_STATE, name: 'Interactive LCD Display 3', volume: 50 },
  });

  const updatePtzField = (key, val) => {
    setPtzState((prev) => ({ ...prev, [key]: val }));
  };

  const updateLcdField = (lcdId, key, val) => {
    setLcdStates((prev) => ({
      ...prev,
      [lcdId]: {
        ...prev[lcdId],
        [key]: val,
      },
    }));
  };

  return {
    serialTab,
    setSerialTab,
    ptzState,
    setPtzState,
    updatePtzField,
    lcdStates,
    setLcdStates,
    updateLcdField,
  };
}
