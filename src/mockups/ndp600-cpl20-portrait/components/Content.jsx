import { HomePage } from '../pages/HomePage';
import { PowerPage } from '../pages/PowerPage';
import { VideoPage } from '../pages/VideoPage';
import { SerialPage } from '../pages/SerialPage';
import { VolumePage } from '../pages/VolumePage';
import { AirPage } from '../pages/AirPage';
import { RemotePage } from '../pages/RemotePage';
import { ProjectionScreen } from '../../../pages/ProjectionScreen';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { ResolutionSubpage } from '../pages/settings/ResolutionSubpage';
import { LanguageSubpage } from '../pages/settings/LanguageSubpage';
import { DisplaySubpage } from '../pages/settings/DisplaySubpage';
import { CustomizeSubpage } from '../pages/settings/CustomizeSubpage';
import { NavigationBarSubpage } from '../pages/settings/NavigationBarSubpage';
import { ChooseWidgetSubpage } from '../pages/settings/ChooseWidgetSubpage';
import { PasswordUnlockSubpage } from '../pages/settings/PasswordUnlockSubpage';
import { PasswordSettingSubpage } from '../pages/settings/PasswordSettingSubpage';

export function Content({ 
  activeTab, 
  navConfig, 
  handleNavConfigChange, 
  onDisconnectionClick, 
  settingsSubpage, 
  setSettingsSubpage, 
  onPanelIpClick, 
  panelIpAddress, 
  deviceName, 
  setDeviceName, 
  isDark,
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
  setHomepageWidgets,
  itemsOrder,
  setItemsOrder,
  cloudServerAddress,
  onCloudServerAddressClick
}) {
  if (activeTab === 'home') return <HomePage homepageWidgets={homepageWidgets} />;
  if (activeTab === 'video') return <VideoPage />;
  if (activeTab === 'serial') return <SerialPage />;
  if (activeTab === 'volume') return <VolumePage />;
  if (activeTab === 'air') return <div className="ndp-page"><AirPage /></div>;
  if (activeTab === 'remote') return <RemotePage />;
  if (activeTab === 'projector') return <ProjectionScreen isDark={isDark} vertical={true} />;
  if (activeTab === 'settings') {
    if (settingsSubpage === 'resolution') {
      return <ResolutionSubpage />;
    }
    if (settingsSubpage === 'language') {
      return <LanguageSubpage />;
    }
    if (settingsSubpage === 'display') {
      return (
        <DisplaySubpage 
          brightness={brightness}
          setBrightness={setBrightness}
          autoLockTime={autoLockTime}
          setAutoLockTime={setAutoLockTime}
          screenSaver={screenSaver}
          setScreenSaver={setScreenSaver}
          screenSleep={screenSleep}
          setScreenSleep={setScreenSleep}
          isDark={isDark}
        />
      );
    }
    if (settingsSubpage === 'customize') {
      return (
        <CustomizeSubpage 
          onSubpageSelect={(sub) => setSettingsSubpage(sub)}
        />
      );
    }
    if (settingsSubpage === 'customize-nav') {
      return (
        <NavigationBarSubpage 
          navConfig={navConfig}
          onNavConfigChange={handleNavConfigChange}
          itemsOrder={itemsOrder}
          setItemsOrder={setItemsOrder}
        />
      );
    }
    if (settingsSubpage === 'customize-template') {
      return (
        <ChooseWidgetSubpage 
          homepageWidgets={homepageWidgets}
          setHomepageWidgets={setHomepageWidgets}
        />
      );
    }
    if (settingsSubpage === 'password-unlock') {
      return (
        <PasswordUnlockSubpage 
          passwordUnlockEnabled={passwordUnlockEnabled}
          setPasswordUnlockEnabled={setPasswordUnlockEnabled}
          onPasswordSettingClick={() => {
            setSettingsSubpage('password-setting');
          }}
          setSettingsSubpage={setSettingsSubpage}
          isDark={isDark}
        />
      );
    }
    if (settingsSubpage === 'password-setting') {
      return (
        <PasswordSettingSubpage 
          password={password}
          setPassword={setPassword}
          setSettingsSubpage={setSettingsSubpage}
          setPasswordUnlockEnabled={setPasswordUnlockEnabled}
        />
      );
    }
    return (
      <SettingsPage 
        onDisconnectionClick={onDisconnectionClick} 
        onResolutionClick={() => setSettingsSubpage('resolution')}
        onLanguageClick={() => setSettingsSubpage('language')}
        onDisplayClick={() => setSettingsSubpage('display')}
        onCustomizeClick={() => setSettingsSubpage('customize')}
        onPasswordUnlockClick={() => setSettingsSubpage('password-unlock')}
        onPanelIpClick={onPanelIpClick}
        panelIpAddress={panelIpAddress}
        deviceName={deviceName}
        setDeviceName={setDeviceName}
        isDark={isDark}
        cloudServerAddress={cloudServerAddress}
        onCloudServerAddressClick={onCloudServerAddressClick}
      />
    );
  }
  return <PowerPage />;
}
