import { useState } from 'react';
import { DEFAULT_SERIAL_PORT_CONFIGS } from '../../constants/serialConfigs';
import { getThemeFromUrl, updateUrlTheme } from '../../constants/screens';

export function useSlPanelConfigState() {
  const [theme, setThemeState] = useState(getThemeFromUrl());
  const [screenBrightness, setScreenBrightness] = useState(85);
  const [keyTone, setKeyTone] = useState(true);
  const [screenSleepTime, setScreenSleepTime] = useState(15);
  const [autoLockTime, setAutoLockTime] = useState(5);
  const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(false);
  const [password, setPassword] = useState('1234');
  const [isLocked, setIsLocked] = useState(false);
  const [powerState, setPowerState] = useState('on'); // 'on' | 'closing' | 'off'
  const [shutdownPromptOpen, setShutdownPromptOpen] = useState(false);
  const [serialImportPromptOpen, setSerialImportPromptOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const [hdmiResolution, setHdmiResolution] = useState({
    outA: '1920*1080',
    outB: '1920*1080',
    outC: '1920*1080',
  });

  const [powerLinkage, setPowerLinkage] = useState({
    powerOnLinkage: true,
    shutdownLinkage: true,
  });

  const [serialPortConfigs, setSerialPortConfigs] = useState(DEFAULT_SERIAL_PORT_CONFIGS);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    updateUrlTheme(newTheme);
  };

  const requestShutdown = () => setShutdownPromptOpen(true);
  const confirmShutdown = () => {
    setShutdownPromptOpen(false);
    setPowerState('closing');
    setTimeout(() => {
      setPowerState('off');
    }, 1500);
  };
  const powerOn = () => setPowerState('on');

  return {
    theme,
    setTheme,
    screenBrightness,
    setScreenBrightness,
    keyTone,
    setKeyTone,
    screenSleepTime,
    setScreenSleepTime,
    autoLockTime,
    setAutoLockTime,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    password,
    setPassword,
    isLocked,
    setIsLocked,
    powerState,
    setPowerState,
    shutdownPromptOpen,
    setShutdownPromptOpen,
    requestShutdown,
    confirmShutdown,
    powerOn,
    serialImportPromptOpen,
    setSerialImportPromptOpen,
    language,
    setLanguage,
    hdmiResolution,
    setHdmiResolution,
    powerLinkage,
    setPowerLinkage,
    serialPortConfigs,
    setSerialPortConfigs,
  };
}
