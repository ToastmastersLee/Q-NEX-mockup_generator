import { useState, useCallback } from 'react';

export function usePanelConfigState() {
  const [panelBrightness, setPanelBrightness] = useState(80);
  const [buttonSoundEffects, setButtonSoundEffects] = useState(false);
  const [screenSleep, setScreenSleep] = useState('5 min');
  const [autoLockScreen, setAutoLockScreen] = useState('2 min');
  const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(false);
  const [panelPassword, setPanelPassword] = useState('1234');
  const [serialImportPromptOpen, setSerialImportPromptOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // HDMI OUT Resolutions (Photos 1~2: HDMI OUT A/B/C)
  const [hdmiResolutions, setHdmiResolutions] = useState({
    outA: '3840x2160',
    outB: '1920x1080',
    outC: '3840x2160',
  });

  const updateHdmiResolution = useCallback((outKey, res) => {
    setHdmiResolutions((prev) => ({ ...prev, [outKey]: res }));
  }, []);

  // Other Settings (Photo 3: Power linkage)
  const [powerOnLinkage, setPowerOnLinkage] = useState(false);
  const [shutdownLinkage, setShutdownLinkage] = useState(false);

  return {
    panelBrightness,
    setPanelBrightness,
    buttonSoundEffects,
    setButtonSoundEffects,
    screenSleep,
    setScreenSleep,
    autoLockScreen,
    setAutoLockScreen,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    panelPassword,
    setPanelPassword,
    serialImportPromptOpen,
    setSerialImportPromptOpen,
    currentLanguage,
    setCurrentLanguage,
    hdmiResolutions,
    setHdmiResolutions,
    updateHdmiResolution,
    powerOnLinkage,
    setPowerOnLinkage,
    shutdownLinkage,
    setShutdownLinkage,
  };
}
