import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getScreenFromUrl, updateUrlScreen, getThemeFromUrl, updateUrlTheme } from '../constants/screens';
import { useAudioState } from './hooks/useAudioState';
import { useVideoSwitchState } from './hooks/useVideoSwitchState';
import { usePowerHardwareState } from './hooks/usePowerHardwareState';
import { useSerialDeviceState } from './hooks/useSerialDeviceState';
import { usePanelConfigState } from './hooks/usePanelConfigState';

const Cpd10Context = createContext(null);

export function Cpd10Provider({ children }) {
  const [screen, setScreenState] = useState(() => getScreenFromUrl());
  const [theme, setThemeState] = useState(() => getThemeFromUrl());

  const audio = useAudioState();
  const video = useVideoSwitchState();
  const power = usePowerHardwareState();
  const serial = useSerialDeviceState();
  const panel = usePanelConfigState();

  // Sync state when navigating between predefined presets
  const applyPresetState = useCallback((targetScreen) => {
    if (targetScreen === 'home-dup-hdmi3') {
      video.setDuplicateMode(true);
      video.setDuplicateInput('hdmi3');
      audio.setSpeakerMuted(false);
      audio.setMicMuted(false);
      video.setDisplayPower(true);
      video.setExternalPower(true);
    } else if (targetScreen === 'home-dup-hdmi1') {
      video.setDuplicateMode(true);
      video.setDuplicateInput('hdmi1');
      audio.setSpeakerMuted(true);
      audio.setMicMuted(true);
      video.setDisplayPower(true);
      video.setExternalPower(false);
    } else if (targetScreen === 'home-matrix') {
      video.setDuplicateMode(false);
      audio.setSpeakerMuted(false);
      audio.setMicMuted(false);
      video.setDisplayPower(true);
      video.setExternalPower(true);
    } else if (targetScreen === 'serial-qa1400') {
      serial.setSerialTab('qa1400');
    } else if (targetScreen === 'serial-ta4532') {
      serial.setSerialTab('ta4532');
    } else if (targetScreen === 'serial-3m') {
      serial.setSerialTab('3m');
    } else if (targetScreen === 'serial-rs485') {
      serial.setSerialTab('rs485');
    }
  }, [audio, video, serial]);

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
    ...video,
    ...audio,
    ...serial,
    ...power,
    ...panel,
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
