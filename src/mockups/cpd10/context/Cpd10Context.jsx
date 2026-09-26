import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getScreenFromUrl, updateUrlScreen, getThemeFromUrl, updateUrlTheme } from '../constants/screens';

const Cpd10Context = createContext(null);

export function Cpd10Provider({ children }) {
  const [screen, setScreenState] = useState(() => getScreenFromUrl());
  const [theme, setThemeState] = useState(() => getThemeFromUrl());

  // Home Dashboard States
  const [duplicateMode, setDuplicateMode] = useState(() => {
    const s = getScreenFromUrl();
    return s !== 'home-matrix';
  });

  const [duplicateInput, setDuplicateInput] = useState(() => {
    const s = getScreenFromUrl();
    if (s === 'home-dup-hdmi1') return 'hdmi1';
    return 'hdmi3';
  });

  const [matrixOutputs, setMatrixOutputs] = useState({
    outA: 'hdmi1',
    outB: 'hdmi1',
    outC: 'hdmi1',
  });

  // Audio (Speaker & Mic)
  const [speakerVolume, setSpeakerVolume] = useState(40);
  const [speakerMuted, setSpeakerMuted] = useState(() => getScreenFromUrl() === 'home-dup-hdmi1');
  const [micVolume, setMicVolume] = useState(50);
  const [micMuted, setMicMuted] = useState(() => getScreenFromUrl() === 'home-dup-hdmi1');

  // Bottom Row Powers
  const [displayPower, setDisplayPower] = useState(true);
  const [externalPower, setExternalPower] = useState(() => getScreenFromUrl() !== 'home-dup-hdmi1');
  const [projectorScreenState, setProjectorScreenState] = useState(null); // 'up' | 'pause' | 'down'

  // Serial Port Page States
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

  // Global / Hardware Mockup State
  const [powerState, setPowerState] = useState('on');
  const [isLocked, setIsLocked] = useState(false);
  const [orientationFlipped, setOrientationFlipped] = useState(false);

  // Panel Settings States (Batch 3)
  const [panelBrightness, setPanelBrightness] = useState(80);
  const [buttonSoundEffects, setButtonSoundEffects] = useState(false);
  const [screenSleep, setScreenSleep] = useState('5 min');
  const [autoLockScreen, setAutoLockScreen] = useState('2 min');
  const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(false);
  const [panelPassword, setPanelPassword] = useState('1234');
  const [screenOrientation, setScreenOrientation] = useState('Wall Mount');

  // Set single matrix output
  const setMatrixOutput = useCallback((outId, inId) => {
    setMatrixOutputs((prev) => ({ ...prev, [outId]: inId }));
  }, []);

  // Sync state when navigating between predefined presets
  const applyPresetState = useCallback((targetScreen) => {
    if (targetScreen === 'home-dup-hdmi3') {
      setDuplicateMode(true);
      setDuplicateInput('hdmi3');
      setSpeakerMuted(false);
      setMicMuted(false);
      setDisplayPower(true);
      setExternalPower(true);
    } else if (targetScreen === 'home-dup-hdmi1') {
      setDuplicateMode(true);
      setDuplicateInput('hdmi1');
      setSpeakerMuted(true);
      setMicMuted(true);
      setDisplayPower(true);
      setExternalPower(false);
    } else if (targetScreen === 'home-matrix') {
      setDuplicateMode(false);
      setSpeakerMuted(false);
      setMicMuted(false);
      setDisplayPower(true);
      setExternalPower(true);
    } else if (targetScreen === 'serial-qa1400') {
      setSerialTab('qa1400');
    } else if (targetScreen === 'serial-ta4532') {
      setSerialTab('ta4532');
    } else if (targetScreen === 'serial-3m') {
      setSerialTab('3m');
    } else if (targetScreen === 'serial-rs485') {
      setSerialTab('rs485');
    }
  }, []);

  const setScreen = useCallback((newScreenId, syncUrl = true) => {
    setScreenState(newScreenId);
    applyPresetState(newScreenId);
    if (syncUrl) {
      updateUrlScreen(newScreenId);
    }
  }, [applyPresetState]);

  const setTheme = useCallback((newTheme, syncUrl = true) => {
    setThemeState(newTheme);
    if (syncUrl) {
      updateUrlTheme(newTheme);
    }
  }, []);

  // Sync on popstate
  useEffect(() => {
    const handlePopState = () => {
      const urlScreen = getScreenFromUrl();
      const urlTheme = getThemeFromUrl();
      setScreenState(urlScreen);
      setThemeState(urlTheme);
      applyPresetState(urlScreen);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [applyPresetState]);

  const value = {
    screen,
    setScreen,
    theme,
    setTheme,
    duplicateMode,
    setDuplicateMode,
    duplicateInput,
    setDuplicateInput,
    matrixOutputs,
    setMatrixOutput,
    speakerVolume,
    setSpeakerVolume,
    speakerMuted,
    setSpeakerMuted,
    micVolume,
    setMicVolume,
    micMuted,
    setMicMuted,
    displayPower,
    setDisplayPower,
    externalPower,
    setExternalPower,
    projectorScreenState,
    setProjectorScreenState,
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
    powerState,
    setPowerState,
    isLocked,
    setIsLocked,
    orientationFlipped,
    setOrientationFlipped,
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
    screenOrientation,
    setScreenOrientation,
  };

  return (
    <Cpd10Context.Provider value={value}>
      {children}
    </Cpd10Context.Provider>
  );
}

export function useCpd10() {
  const context = useContext(Cpd10Context);
  if (!context) {
    throw new Error('useCpd10 must be used within a Cpd10Provider');
  }
  return context;
}
