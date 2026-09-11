import { useState, useEffect } from 'react';
import { ChevronLeft, Sun, Moon } from 'lucide-react';
import { LockCountdownModal } from '../../components/LockCountdownModal';
import { AndroidEthernet } from '../../pages/AndroidEthernet';
import { Disconnection } from '../../pages/Disconnection';

import { navItems, defaultNavConfig, readQuery, getInitialTab } from './constants/nav';
import { TopTools } from './components/shell/TopTools';
import { Sidebar } from './components/shell/Sidebar';
import { BottomDock } from './components/shell/BottomDock';
import { LeftControls } from './components/shell/LeftControls';
import { DisconnectedSettingsView } from './components/shell/DisconnectedSettingsView';

import { LockScreen } from './components/modals/LockScreen';
import { PowerOnScreen } from './components/modals/PowerOnScreen';
import { DisconnectConfirmModal } from './components/modals/DisconnectConfirmModal';
import { CloudServerModal } from './components/modals/CloudServerModal';

import { Content } from './components/Content';
import './styles.css';

export default function Ndp600PortraitApp() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [settingsSubpage, setSettingsSubpage] = useState(null);
  const [locked, setLocked] = useState(readQuery('screen') === 'lock');
  const [muted, setMuted] = useState(false);
  const [theme, setTheme] = useState(readQuery('theme') === 'light' ? 'light' : 'dark');
  const [isDisconnected, setIsDisconnected] = useState(readQuery('status') === 'disconnected');
  const [isDisconnectedSettingsOpen, setIsDisconnectedSettingsOpen] = useState(false);
  const [navConfig, setNavConfig] = useState(defaultNavConfig);
  const [isAndroidEthernetOpen, setIsAndroidEthernetOpen] = useState(false);
  const [panelIpAddress, setPanelIpAddress] = useState('192.168.110.125');
  const [deviceName, setDeviceName] = useState('3F NDP600');
  const [isDisconnectConfirmOpen, setIsDisconnectConfirmOpen] = useState(false);
  const [showPowerOnScreen, setShowPowerOnScreen] = useState(false);
  const [cloudServerAddress, setCloudServerAddress] = useState('https://test.qnextech.com');
  const [isCloudServerModalOpen, setIsCloudServerModalOpen] = useState(false);

  const [isLocking, setIsLocking] = useState(false);
  const [lockCountdown, setLockCountdown] = useState(9);

  const [brightness, setBrightness] = useState(80);
  const [autoLockTime, setAutoLockTime] = useState('2 Minutes');
  const [screenSaver, setScreenSaver] = useState('Never');
  const [screenSleep, setScreenSleep] = useState('10 Minutes');
  const [passwordUnlockEnabled, setPasswordUnlockEnabled] = useState(true);
  const [password, setPassword] = useState('8888');
  const [homepageWidgets, setHomepageWidgets] = useState(['air', 'projector']);
  const [itemsOrder, setItemsOrder] = useState(['power', 'video', 'volume', 'serial', 'air', 'projector', 'remote']);

  useEffect(() => {
    let timer;
    if (isLocking && lockCountdown > 0) {
      timer = setInterval(() => {
        setLockCountdown(prev => prev - 1);
      }, 1000);
    } else if (isLocking && lockCountdown === 0) {
      const lockTimer = setTimeout(() => {
        setLocked(true);
        setIsLocking(false);
      }, 0);
      return () => clearTimeout(lockTimer);
    }
    return () => clearInterval(timer);
  }, [isLocking, lockCountdown]);

  const handleStartLock = () => {
    setLockCountdown(9);
    setIsLocking(true);
  };

  const handleNavConfigChange = (id) => {
    const next = { ...navConfig, [id]: !navConfig[id] };
    setNavConfig(next);
    if (activeTab === id && !next[id]) {
      const fallback = navItems.find((item) => item.id !== 'home' && next[item.id]);
      setActiveTab(fallback?.id ?? 'home');
    }
  };

  const isLight = theme === 'light';

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
                      onCancel={() => setIsLocking(false)}
                      onExecute={() => {
                        setLocked(true);
                        setIsLocking(false);
                      }}
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
                        <button className="ndp-back-title" type="button" onClick={() => {
                          if (settingsSubpage === 'customize-nav' || settingsSubpage === 'customize-template') {
                            setSettingsSubpage('customize');
                          } else if (settingsSubpage === 'password-setting') {
                            setSettingsSubpage('password-unlock');
                          } else {
                            setSettingsSubpage(null);
                          }
                        }}>
                          <ChevronLeft size={22} />
                          <span>
                            {settingsSubpage === 'resolution' && 'HDMI OUT Resolution'}
                            {settingsSubpage === 'language' && 'Language'}
                            {settingsSubpage === 'display' && 'Display'}
                            {settingsSubpage === 'customize' && 'Customize'}
                            {settingsSubpage === 'customize-nav' && 'Navigation bar'}
                            {settingsSubpage === 'customize-template' && 'Choose Widget'}
                            {settingsSubpage === 'password-unlock' && 'Password Unlock'}
                            {settingsSubpage === 'password-setting' && 'Password setting'}
                          </span>
                        </button>
                      ) : (
                        <h1 className="ndp-screen-title">Setting</h1>
                      )
                    )}
                    <div className="ndp-content">
                      <Content 
                        activeTab={activeTab} 
                        navConfig={navConfig} 
                        handleNavConfigChange={handleNavConfigChange}
                        onDisconnectionClick={() => setIsDisconnectConfirmOpen(true)} 
                        settingsSubpage={settingsSubpage}
                        setSettingsSubpage={setSettingsSubpage}
                        onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
                        panelIpAddress={panelIpAddress}
                        deviceName={deviceName}
                        setDeviceName={setDeviceName}
                        isDark={theme === 'dark'}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        autoLockTime={autoLockTime}
                        setAutoLockTime={setAutoLockTime}
                        screenSaver={screenSaver}
                        setScreenSaver={setScreenSaver}
                        screenSleep={screenSleep}
                        setScreenSleep={setScreenSleep}
                        passwordUnlockEnabled={passwordUnlockEnabled}
                        setPasswordUnlockEnabled={setPasswordUnlockEnabled}
                        password={password}
                        setPassword={setPassword}
                        homepageWidgets={homepageWidgets}
                        setHomepageWidgets={setHomepageWidgets}
                        itemsOrder={itemsOrder}
                        setItemsOrder={setItemsOrder}
                        cloudServerAddress={cloudServerAddress}
                        onCloudServerAddressClick={() => setIsCloudServerModalOpen(true)}
                      />
                    </div>
                    <BottomDock locked={locked} muted={muted} setLocked={handleStartLock} setMuted={setMuted} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Theme Toggle */}
        <div className="ndp-right-controls">
          <button className="ndp-theme-button" type="button" onClick={() => setTheme(isLight ? 'dark' : 'light')}>
            {isLight ? <Moon size={22} /> : <Sun size={22} />}
            <span>{isLight ? 'Dark Theme' : 'Light Theme'}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
