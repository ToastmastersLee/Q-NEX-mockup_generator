import { useCpd10 } from '../../context/Cpd10Context';
import { HomePage } from '../home/HomePage';
import { SerialPage } from '../serial/SerialPage';
import { SettingsHub } from '../settings/SettingsHub';
import { DeviceInfoPage } from '../settings/DeviceInfoPage';

export function ScreenRenderer() {
  const { screen } = useCpd10();

  if (screen.startsWith('serial')) {
    return <SerialPage key="serial" />;
  }

  if (screen === 'settings-device-info') {
    return <DeviceInfoPage key="device-info" />;
  }

  if (screen.startsWith('settings')) {
    return <SettingsHub key="settings" />;
  }

  // Default to HomePage
  return <HomePage key="home" />;
}
