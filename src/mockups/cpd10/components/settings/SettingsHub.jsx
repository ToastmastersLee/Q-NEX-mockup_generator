import { Server, MonitorCog, Languages, SlidersHorizontal } from 'lucide-react';
import { SerialPortSettingsIcon, HdmiPortSettingsIcon } from '../common/Cpd10SettingsIcons';
import { useCpd10 } from '../../context/Cpd10Context';

export function SettingsHub() {
  const { setScreen } = useCpd10();

  const settingsCards = [
    {
      id: 'device-info',
      label: 'Device Information',
      icon: Server,
      targetScreen: 'settings-device-info',
    },
    {
      id: 'panel-settings',
      label: 'Panel Settings',
      icon: MonitorCog,
      targetScreen: null,
    },
    {
      id: 'language-settings',
      label: 'Language Settings',
      icon: Languages,
      targetScreen: null,
    },
    {
      id: 'serial-settings',
      label: 'Serial Port Settings',
      icon: SerialPortSettingsIcon,
      targetScreen: null,
    },
    {
      id: 'hdmi-res',
      label: 'HDMI OUT Resolution',
      icon: HdmiPortSettingsIcon,
      targetScreen: null,
    },
    {
      id: 'other-settings',
      label: 'Other Settings',
      icon: SlidersHorizontal,
      targetScreen: null,
    },
  ];

  return (
    <div className="cpd10-page-content cpd10-settings-hub-page">
      <div className="cpd10-settings-grid">
        {settingsCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              type="button"
              className="cpd10-settings-tile"
              onClick={() => {
                if (card.targetScreen) {
                  setScreen(card.targetScreen);
                }
              }}
            >
              <div className="cpd10-settings-tile-icon-circle">
                <Icon size={26} strokeWidth={2} />
              </div>
              <span className="cpd10-settings-tile-label">{card.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
