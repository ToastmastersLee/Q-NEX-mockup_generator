import { useCpd10 } from '../../context/Cpd10Context';
import { HomePage } from '../home/HomePage';
import { SerialPage } from '../serial/SerialPage';
import { SettingsHub } from '../settings/SettingsHub';
import { DeviceInfoPage } from '../settings/DeviceInfoPage';
import { PanelSettingsPage } from '../settings/PanelSettingsPage';
import { PasswordUnlockPage } from '../settings/PasswordUnlockPage';
import { LanguageSettingsPage } from '../settings/LanguageSettingsPage';
import { SerialSettingsPage } from '../settings/SerialSettingsPage';

export function ScreenRenderer() {
  const { screen } = useCpd10();

  if (screen.startsWith('serial')) {
    return <SerialPage key="serial" />;
  }

  if (screen === 'settings-device-info') {
    return <DeviceInfoPage key="device-info" />;
  }

  if (screen === 'settings-panel') {
    return <PanelSettingsPage key="panel-settings" />;
  }

  if (screen === 'settings-password-unlock') {
    return <PasswordUnlockPage key="password-unlock" />;
  }

  if (screen === 'settings-language') {
    return <LanguageSettingsPage key="language-settings" />;
  }

  if (screen === 'settings-serial') {
    return <SerialSettingsPage key="serial-settings" />;
  }

  if (screen.startsWith('settings')) {
    return <SettingsHub key="settings" />;
  }

  // Default to HomePage
  return <HomePage key="home" />;
}
