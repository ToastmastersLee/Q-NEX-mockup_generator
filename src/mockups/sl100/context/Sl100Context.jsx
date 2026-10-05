import { useState, useEffect, useCallback } from 'react';
import { getScreenFromUrl, updateUrlScreen, getThemeFromUrl, updateUrlTheme } from '../constants/screens';
import { useSlAudioState } from './hooks/useSlAudioState';
import { useSlVideoSwitchState } from './hooks/useSlVideoSwitchState';
import { useSlLecternState } from './hooks/useSlLecternState';
import { useSlSerialState } from './hooks/useSlSerialState';
import { useSlPanelConfigState } from './hooks/useSlPanelConfigState';
import { Sl100Context } from './Sl100ContextInstance';

export function Sl100Provider({ children }) {
  const [screen, setScreenState] = useState(() => getScreenFromUrl());
  const [theme, setThemeState] = useState(() => getThemeFromUrl());

  const audio = useSlAudioState();
  const video = useSlVideoSwitchState();
  const lectern = useSlLecternState();
  const serial = useSlSerialState();
  const panel = useSlPanelConfigState();

  // Sync state when navigating between predefined presets
  const applyPresetState = useCallback((targetScreen) => {
    if (targetScreen === 'home-dup-ops') {
      video.setDuplicateMode(true);
      video.setDuplicateInput('ops');
    } else if (targetScreen === 'home-dup-hdmi') {
      video.setDuplicateMode(true);
      video.setDuplicateInput('hdmi');
    } else if (targetScreen === 'home-dup-typec') {
      video.setDuplicateMode(true);
      video.setDuplicateInput('typec');
    } else if (targetScreen === 'home-matrix') {
      video.setDuplicateMode(false);
    } else if (targetScreen === 'serial-ptz') {
      serial.setSerialTab('ptz');
    } else if (targetScreen === 'serial-lcd1') {
      serial.setSerialTab('lcd1');
    } else if (targetScreen === 'serial-lcd2') {
      serial.setSerialTab('lcd2');
    } else if (targetScreen === 'serial-lcd3') {
      serial.setSerialTab('lcd3');
    }
  }, [video, serial]);

  const setScreen = useCallback((newScreenId, syncUrl = true) => {
    setScreenState(newScreenId);
    applyPresetState(newScreenId);
    if (syncUrl) {
      updateUrlScreen(newScreenId);
    }
  }, [applyPresetState]);

  const setTheme = useCallback((newTheme, syncUrl = true) => {
    setThemeState(newTheme);
    panel.setTheme(newTheme);
    if (syncUrl) {
      updateUrlTheme(newTheme);
    }
  }, [panel]);

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
    ...lectern,
    ...serial,
    ...panel,
  };

  return (
    <Sl100Context.Provider value={value}>
      {children}
    </Sl100Context.Provider>
  );
}
