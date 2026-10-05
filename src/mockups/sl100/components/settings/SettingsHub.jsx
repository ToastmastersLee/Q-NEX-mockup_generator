import {
  ServerRackIcon,
  ScreenSettingsIcon,
  LanguageSpeechIcon,
  SerialPortSettingsIcon,
  HdmiPortSettingsIcon,
  OtherSlidersIcon,
} from '../common/Sl100SettingsIcons';
import { useSl100 } from '../../context/useSl100';

export function SettingsHub() {
  const { setScreen } = useSl100();

  const settingsCards = [
    {
      id: 'device-info',
      label: 'Device Information',
      icon: ServerRackIcon,
      targetScreen: 'settings-device-info',
    },
    {
      id: 'screen-settings',
      label: 'Screen settings',
      icon: ScreenSettingsIcon,
      targetScreen: 'settings-screen',
    },
    {
      id: 'language-settings',
      label: 'Language settings',
      icon: LanguageSpeechIcon,
      targetScreen: 'settings-language',
    },
    {
      id: 'serial-settings',
      label: 'Serial port settings',
      icon: SerialPortSettingsIcon,
      targetScreen: 'settings-serial',
    },
    {
      id: 'hdmi-res',
      label: 'HDMI OUT Resolution',
      icon: HdmiPortSettingsIcon,
      targetScreen: 'settings-hdmi-res',
    },
    {
      id: 'other-settings',
      label: 'Other settings',
      icon: OtherSlidersIcon,
      targetScreen: 'settings-other',
    },
  ];

  return (
    <div className="sl100-page-content sl100-settings-hub-page">
      <div className="sl100-settings-grid">
        {settingsCards.map((card) => {
          const IconComp = card.icon;
          return (
            <button
              key={card.id}
              type="button"
              className="sl100-settings-tile"
              onClick={() => setScreen(card.targetScreen)}
              title={card.label}
            >
              <div className="sl100-settings-tile-icon-circle">
                <IconComp size={22} />
              </div>
              <span className="sl100-settings-tile-label">{card.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
