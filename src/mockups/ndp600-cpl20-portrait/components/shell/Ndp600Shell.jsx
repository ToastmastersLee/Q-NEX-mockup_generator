import { ChevronLeft } from 'lucide-react';
import { LockCountdownModal } from '../../../../components/LockCountdownModal';
import { AndroidEthernet } from '../../../../pages/AndroidEthernet';
import { Disconnection } from '../../../../pages/Disconnection';

import { TopTools } from './TopTools';
import { Sidebar } from './Sidebar';
import { BottomDock } from './BottomDock';
import { LeftControls } from './LeftControls';
import { DisconnectedSettingsView } from './DisconnectedSettingsView';

import { LockScreen } from '../modals/LockScreen';
import { PowerOnScreen } from '../modals/PowerOnScreen';
import { DisconnectConfirmModal } from '../modals/DisconnectConfirmModal';
import { CloudServerModal } from '../modals/CloudServerModal';

import { Content } from '../Content';
import { useNdp600 } from '../../context/useNdp600';

export const Ndp600Shell = () => {
  const {
    activeTab,
    setActiveTab,
    settingsSubpage,
    setSettingsSubpage,
    navConfig,
    handleNavConfigChange,
    itemsOrder,
    setItemsOrder,
    handleSettingsBack,
    locked,
    setLocked,
    isLocking,
    lockCountdown,
    handleStartLock,
    cancelLock,
    executeLock,
    muted,
    setMuted,
    theme,
    isLight,
    isDisconnected,
    setIsDisconnected,
    isDisconnectedSettingsOpen,
    setIsDisconnectedSettingsOpen,
    showPowerOnScreen,
    setShowPowerOnScreen,
    isAndroidEthernetOpen,
    setIsAndroidEthernetOpen,
    panelIpAddress,
    setPanelIpAddress,
    deviceName,
    setDeviceName,
    isDisconnectConfirmOpen,
    setIsDisconnectConfirmOpen,
    cloudServerAddress,
    setCloudServerAddress,
    isCloudServerModalOpen,
    setIsCloudServerModalOpen,
    brightness,
    setBrightness,
    autoLockTime,
    setAutoLockTime,
    screenSaver,
    setScreenSaver,
    screenSleep,
    setScreenSleep,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    password,
    setPassword,
    homepageWidgets,
    setHomepageWidgets
  } = useNdp600();

  return (
    <main className={`ndp-stage ${isLight ? 'is-light' : ''}`}>
      <div className="ndp-layout-container">
        {/* Left Side Controls */}
        <LeftControls
          isDisconnected={isDisconnected}
          onDisconnectedChange={(checked) => {
            setIsDisconnected(checked);
            if (!checked) {
              setActiveTab('home');
              setSettingsSubpage(null);
            }
          }}
          navConfig={navConfig}
          onNavConfigChange={handleNavConfigChange}
        />

        {/* Center Device */}
        <div className="ndp-device-wrapper">
          <div className="ndp-device">
            <div className={`ndp-screen ${isLight ? 'is-light' : ''} relative`}>
              {isAndroidEthernetOpen && (
                <div className="absolute inset-0 z-50 overflow-hidden shadow-2xl">
                  <AndroidEthernet 
                    isDark={!isLight} 
                    initialIp={panelIpAddress}
                    onSave={(newIp) => {
                      setPanelIpAddress(newIp);
                      setIsAndroidEthernetOpen(false);
                    }}
                    onBack={() => setIsAndroidEthernetOpen(false)} 
                  />
                </div>
              )}
              {isDisconnected ? (
                isDisconnectedSettingsOpen ? (
                  <DisconnectedSettingsView
                    settingsSubpage={settingsSubpage}
                    setSettingsSubpage={setSettingsSubpage}
                    setIsDisconnectedSettingsOpen={setIsDisconnectedSettingsOpen}
                    isLight={isLight}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    autoLockTime={autoLockTime}
                    setAutoLockTime={setAutoLockTime}
                    screenSaver={screenSaver}
                    setScreenSaver={setScreenSaver}
                    screenSleep={screenSleep}
                    setScreenSleep={setScreenSleep}
                    navConfig={navConfig}
                    handleNavConfigChange={handleNavConfigChange}
                    itemsOrder={itemsOrder}
                    setItemsOrder={setItemsOrder}
                    homepageWidgets={homepageWidgets}
                    setHomepageWidgets={setHomepageWidgets}
                    passwordUnlockEnabled={passwordUnlockEnabled}
                    setPasswordUnlockEnabled={setPasswordUnlockEnabled}
                    password={password}
                    setPassword={setPassword}
                    setIsDisconnectConfirmOpen={setIsDisconnectConfirmOpen}
                    setIsAndroidEthernetOpen={setIsAndroidEthernetOpen}
                    panelIpAddress={panelIpAddress}
                    deviceName={deviceName}
                    setDeviceName={setDeviceName}
                    cloudServerAddress={cloudServerAddress}
                    setIsCloudServerModalOpen={setIsCloudServerModalOpen}
                  />
                ) : (
                  <Disconnection 
                    isDark={!isLight} 
                    onConnect={() => {
                      setIsDisconnected(false);
                      setShowPowerOnScreen(true);
                      setIsDisconnectedSettingsOpen(false);
                    }}
                    onSettingsClick={() => {
                      setIsDisconnectedSettingsOpen(true);
                      setSettingsSubpage(null);
                    }}
                    title="Connection Setting"
                    initialLabelText="NDP600 IP"
                    initialIpAddress="192.168.5.105"
                  />
                )
              ) : showPowerOnScreen ? (
                <PowerOnScreen 
                  onPowerOn={() => {
                    setShowPowerOnScreen(false);
                    setActiveTab('home');
                    setSettingsSubpage(null);
                  }}
                  onLock={() => {
                    setLocked(true);
                    setActiveTab('home');
                  }}
                />
              ) : locked ? (
                <LockScreen 
                  setLocked={setLocked} 
                  passwordUnlockEnabled={passwordUnlockEnabled}
                  password={password}
                  isDark={theme === 'dark'}
                />
              ) : (
                <>
                  {isLocking && (
                    <LockCountdownModal 
                      isDark={theme === 'dark'}
                      countdown={lockCountdown}
                      onCancel={cancelLock}
                      onExecute={executeLock}
                    />
                  )}
                  {isDisconnectConfirmOpen && (
                    <DisconnectConfirmModal 
                      isDark={theme === 'dark'}
                      onCancel={() => setIsDisconnectConfirmOpen(false)}
                      onExecute={() => {
                        setIsDisconnectConfirmOpen(false);
                        setIsDisconnected(true);
                      }}
                    />
                  )}
                  {isCloudServerModalOpen && (
                    <CloudServerModal 
                      isDark={theme === 'dark'}
                      initialValue={cloudServerAddress}
                      onCancel={() => setIsCloudServerModalOpen(false)}
                      onSave={(val) => {
                        setCloudServerAddress(val);
                        setIsCloudServerModalOpen(false);
                      }}
                    />
                  )}
                  <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={(tabId) => {
                      setActiveTab(tabId);
                      setSettingsSubpage(null);
                    }} 
                    navConfig={navConfig} 
                    itemsOrder={itemsOrder}
                  />
                  <div className="ndp-main">
                    <TopTools 
                      onSettingsClick={() => {
                        setActiveTab('settings');
                        setSettingsSubpage(null);
                      }} 
                    />
                    {activeTab === 'settings' && (
                      settingsSubpage ? (
                        <button className="ndp-back-title" type="button" onClick={handleSettingsBack}>
                          <ChevronLeft size={22} />
                          <span>
                            {settingsSubpage === 'resolution' && 'HDMI OUT Resolution'}
                            {settingsSubpage === 'language' && 'Language'}
                            {settingsSubpage === 'display' && 'Display & Lock'}
                            {settingsSubpage === 'customize' && 'Customize'}
                            {settingsSubpage === 'customize-nav' && 'Navigation Bar'}
                            {settingsSubpage === 'customize-template' && 'Choose Widget'}
                            {settingsSubpage === 'password-unlock' && 'Password Unlock'}
                            {settingsSubpage === 'password-setting' && 'Set Password'}
                          </span>
                        </button>
                      ) : (
                        <h1 className="ndp-page-title">Setting</h1>
                      )
                    )}
                    <Content />
                  </div>
                  <BottomDock 
                    activeTab={activeTab} 
                    muted={muted} 
                    onMuteToggle={() => setMuted(!muted)} 
                    onLockClick={handleStartLock} 
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
