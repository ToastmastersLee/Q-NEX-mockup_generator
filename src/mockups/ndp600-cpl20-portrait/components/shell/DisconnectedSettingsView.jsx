import { ChevronLeft } from 'lucide-react';
import { SettingsPage } from '../../pages/settings/SettingsPage';
import { ResolutionSubpage } from '../../pages/settings/ResolutionSubpage';
import { LanguageSubpage } from '../../pages/settings/LanguageSubpage';
import { DisplaySubpage } from '../../pages/settings/DisplaySubpage';
import { CustomizeSubpage } from '../../pages/settings/CustomizeSubpage';
import { NavigationBarSubpage } from '../../pages/settings/NavigationBarSubpage';
import { ChooseWidgetSubpage } from '../../pages/settings/ChooseWidgetSubpage';
import { PasswordUnlockSubpage } from '../../pages/settings/PasswordUnlockSubpage';
import { PasswordSettingSubpage } from '../../pages/settings/PasswordSettingSubpage';

export function DisconnectedSettingsView({
  settingsSubpage,
  setSettingsSubpage,
  setIsDisconnectedSettingsOpen,
  isLight,
  brightness,
  setBrightness,
  autoLockTime,
  setAutoLockTime,
  screenSaver,
  setScreenSaver,
  screenSleep,
  setScreenSleep,
  navConfig,
  handleNavConfigChange,
  itemsOrder,
  setItemsOrder,
  homepageWidgets,
  setHomepageWidgets,
  passwordUnlockEnabled,
  setPasswordUnlockEnabled,
  password,
  setPassword,
  setIsDisconnectConfirmOpen,
  setIsAndroidEthernetOpen,
  panelIpAddress,
  deviceName,
  setDeviceName,
  cloudServerAddress,
  setIsCloudServerModalOpen,
}) {
  const handleBack = () => {
    if (settingsSubpage) {
      if (settingsSubpage === 'customize-nav' || settingsSubpage === 'customize-template') {
        setSettingsSubpage('customize');
      } else if (settingsSubpage === 'password-setting') {
        setSettingsSubpage('password-unlock');
      } else {
        setSettingsSubpage(null);
      }
    } else {
      setIsDisconnectedSettingsOpen(false);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden relative ${isLight ? 'bg-white text-black' : 'bg-[#152033] text-white'}`}>
      <div className={`p-4 flex items-center gap-2 z-10 ${isLight ? 'border-b border-black/10' : 'border-b border-white/10'}`}>
        <button 
          type="button" 
          className={`p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${isLight ? 'hover:bg-black/10 text-black' : 'hover:bg-white/10 text-white'}`}
          onClick={handleBack}
        >
          <ChevronLeft size={24} />
        </button>
        {settingsSubpage && (
          <span className="text-lg font-medium">
            {settingsSubpage === 'resolution' && 'HDMI OUT Resolution'}
            {settingsSubpage === 'language' && 'Language'}
            {settingsSubpage === 'display' && 'Display'}
            {settingsSubpage === 'customize' && 'Customize'}
            {settingsSubpage === 'customize-nav' && 'Navigation bar'}
            {settingsSubpage === 'customize-template' && 'Choose Widget'}
            {settingsSubpage === 'password-unlock' && 'Password Unlock'}
            {settingsSubpage === 'password-setting' && 'Password setting'}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {settingsSubpage === 'resolution' ? (
          <ResolutionSubpage />
        ) : settingsSubpage === 'language' ? (
          <LanguageSubpage />
        ) : settingsSubpage === 'display' ? (
          <DisplaySubpage 
            brightness={brightness}
            setBrightness={setBrightness}
            autoLockTime={autoLockTime}
            setAutoLockTime={setAutoLockTime}
            screenSaver={screenSaver}
            setScreenSaver={setScreenSaver}
            screenSleep={screenSleep}
            setScreenSleep={setScreenSleep}
            isDark={!isLight}
          />
        ) : settingsSubpage === 'customize' ? (
          <CustomizeSubpage onSubpageSelect={(sub) => setSettingsSubpage(sub)} />
        ) : settingsSubpage === 'customize-nav' ? (
          <NavigationBarSubpage 
            navConfig={navConfig}
            onNavConfigChange={handleNavConfigChange}
            itemsOrder={itemsOrder}
            setItemsOrder={setItemsOrder}
          />
        ) : settingsSubpage === 'customize-template' ? (
          <ChooseWidgetSubpage 
            homepageWidgets={homepageWidgets}
            setHomepageWidgets={setHomepageWidgets}
          />
        ) : settingsSubpage === 'password-unlock' ? (
          <PasswordUnlockSubpage 
            passwordUnlockEnabled={passwordUnlockEnabled}
            setPasswordUnlockEnabled={setPasswordUnlockEnabled}
            onPasswordSettingClick={() => setSettingsSubpage('password-setting')}
            setSettingsSubpage={setSettingsSubpage}
            isDark={!isLight}
          />
        ) : settingsSubpage === 'password-setting' ? (
          <PasswordSettingSubpage 
            password={password}
            setPassword={setPassword}
            setSettingsSubpage={setSettingsSubpage}
            setPasswordUnlockEnabled={setPasswordUnlockEnabled}
          />
        ) : (
          <SettingsPage 
            isDisconnectedMode={true}
            onDisconnectionClick={() => setIsDisconnectConfirmOpen(true)} 
            onResolutionClick={() => setSettingsSubpage('resolution')}
            onLanguageClick={() => setSettingsSubpage('language')}
            onDisplayClick={() => setSettingsSubpage('display')}
            onCustomizeClick={() => setSettingsSubpage('customize')}
            onPasswordUnlockClick={() => setSettingsSubpage('password-unlock')}
            onPanelIpClick={() => setIsAndroidEthernetOpen(true)}
            panelIpAddress={panelIpAddress}
            deviceName={deviceName}
            setDeviceName={setDeviceName}
            isDark={!isLight}
            cloudServerAddress={cloudServerAddress}
            onCloudServerAddressClick={() => setIsCloudServerModalOpen(true)}
          />
        )}
      </div>
    </div>
  );
}
