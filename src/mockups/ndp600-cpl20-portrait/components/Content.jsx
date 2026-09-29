import { HomePage } from '../pages/HomePage';
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
import { useNdp600 } from '../context/useNdp600';

export function Content() {
  const {
    activeTab,
    navConfig,
    handleNavConfigChange,
    settingsSubpage,
    setSettingsSubpage,
    panelIpAddress,
    deviceName,
    setDeviceName,
    theme,
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
    setIsDisconnectConfirmOpen,
    setIsAndroidEthernetOpen,
    setIsCloudServerModalOpen
  } = useNdp600();

  const isDark = theme === 'dark';

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
          onSetPasswordClick={() => setSettingsSubpage('password-setting')}
        />
      );
    }
    if (settingsSubpage === 'password-setting') {
      return (
        <PasswordSettingSubpage 
          currentPassword={password}
          onSave={(newPass) => {
            setPassword(newPass);
            setSettingsSubpage('password-unlock');
          }}
          onCancel={() => setSettingsSubpage('password-unlock')}
        />
      );
    }
    return (
      <SettingsPage 
        onDisconnectionClick={() => setIsDisconnectConfirmOpen(true)}
        onSubpageSelect={(sub) => setSettingsSubpage(sub)}
        onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
        panelIpAddress={panelIpAddress}
        deviceName={deviceName}
        setDeviceName={setDeviceName}
        cloudServerAddress={cloudServerAddress}
        onCloudServerAddressClick={() => setIsCloudServerModalOpen(true)}
      />
    );
  }
  return null;
}
