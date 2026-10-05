import { useSl100 } from '../../context/useSl100';
import { HomePage } from '../home/HomePage';
import { SerialPage } from '../serial/SerialPage';
import { TimerPage } from '../timer/TimerPage';
import { SettingsHub } from '../settings/SettingsHub';
import { DeviceInfoPage } from '../settings/DeviceInfoPage';
import { ScreenSettingsPage } from '../settings/ScreenSettingsPage';
import { PasswordUnlockPage } from '../settings/PasswordUnlockPage';
import { LanguageSettingsPage } from '../settings/LanguageSettingsPage';
import { SerialSettingsPage } from '../settings/SerialSettingsPage';
import { HdmiResolutionPage } from '../settings/HdmiResolutionPage';
import { OtherSettingsPage } from '../settings/OtherSettingsPage';

export function ScreenRenderer() {
  const { screen } = useSl100();

  if (screen.startsWith('home')) {
    return <HomePage />;
  }

  if (screen.startsWith('serial')) {
    return <SerialPage />;
  }

  if (screen === 'timer') {
    return <TimerPage />;
  }

  if (screen === 'settings-device-info') {
    return <DeviceInfoPage />;
  }

  if (screen === 'settings-screen' || screen === 'settings-panel') {
    return <ScreenSettingsPage />;
  }

  if (screen === 'settings-password-unlock') {
    return <PasswordUnlockPage />;
  }

  if (screen === 'settings-language') {
    return <LanguageSettingsPage />;
  }

  if (screen === 'settings-serial') {
    return <SerialSettingsPage />;
  }

  if (screen === 'settings-hdmi-res') {
    return <HdmiResolutionPage />;
  }

  if (screen === 'settings-other') {
    return <OtherSettingsPage />;
  }

  if (screen.startsWith('settings')) {
    return <SettingsHub />;
  }

  return <HomePage />;
}
