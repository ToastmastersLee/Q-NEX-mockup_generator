/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useLcsSystemState } from './useLcsSystemState';
import { useLcsInteractiveState } from './useLcsInteractiveState';
import { useLcsDirectorState } from './useLcsDirectorState';
import { useLcsSettingsState } from './useLcsSettingsState';

const LcsContext = createContext(null);

export function useLcs() {
  const context = useContext(LcsContext);
  if (!context) {
    throw new Error('useLcs must be used within an LcsProvider');
  }
  return context;
}

export function LcsProvider({ children }) {
  const isRemoteClassroomView = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'remote_classroom';
  
  const urlSearch = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialSection = urlSearch?.get('section') || (urlSearch?.get('mode') === 'discussion' ? 'interactive' : null);
  const initialSessionType = urlSearch?.get('mode') === 'discussion' ? 'discussion' : 'standard';
  const initialSubPage = urlSearch?.get('page') || ((urlSearch?.get('mode') === 'discussion' || urlSearch?.get('page') === 'start') ? 'start' : 'home');

  // Set English document title based on mode
  useEffect(() => {
    if (isRemoteClassroomView) {
      document.title = "Remote Classroom View - LCS Host";
    } else {
      document.title = "LCS Station - Main Classroom Host";
    }
  }, [isRemoteClassroomView]);

  // 1. System, Theme, Hardware, File Manager & Toast state
  const systemState = useLcsSystemState({ initialSection });

  // 2. Interactive Classroom & Discussion Room state
  const interactiveState = useLcsInteractiveState({
    initialSessionType,
    initialSubPage
  });

  // 3. Director Layout, Channels, Recording & BroadcastChannel sync
  const directorState = useLcsDirectorState({
    isRemoteClassroomView,
    interactiveCallState: interactiveState.interactiveCallState,
    setInteractiveCallState: interactiveState.setInteractiveCallState,
    selectedRemoteHost: interactiveState.selectedRemoteHost,
    setSelectedRemoteHost: interactiveState.setSelectedRemoteHost,
    showMicToast: interactiveState.showMicToast,
    setShowMicToast: interactiveState.setShowMicToast,
    selectedPgmSource: interactiveState.selectedPgmSource,
    setSelectedPgmSource: interactiveState.setSelectedPgmSource,
    discussionPgmSource: interactiveState.discussionPgmSource,
    setDiscussionPgmSource: interactiveState.setDiscussionPgmSource
  });

  // 4. Complex Settings, Advance Verification Keypad & Diagnostics
  const settingsState = useLcsSettingsState({
    isRemoteClassroomView,
    showToast: systemState.showToast
  });

  const value = {
    isRemoteClassroomView,
    ...systemState,
    ...interactiveState,
    ...directorState,
    ...settingsState
  };

  return (
    <LcsContext.Provider value={value}>
      {children}
    </LcsContext.Provider>
  );
}
