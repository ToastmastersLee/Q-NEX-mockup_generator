import { Home, Settings, Lock, Power } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

export function Sidebar() {
  const { screen, setScreen, isLocked, setIsLocked, powerState, setPowerState } = useCpd10();

  const isHomeActive = screen.startsWith('home');
  const isSettingsActive = screen.startsWith('settings');

  return (
    <aside className="cpd10-sidebar">
      <div className="cpd10-sidebar-top">
        {/* Home Button */}
        <button
          type="button"
          className={`cpd10-nav-btn ${isHomeActive ? 'is-active' : ''}`}
          onClick={() => setScreen('home')}
          title="Home Dashboard"
        >
          <Home size={22} strokeWidth={2.2} />
        </button>

        {/* Settings Button */}
        <button
          type="button"
          className={`cpd10-nav-btn ${isSettingsActive ? 'is-active' : ''}`}
          onClick={() => setScreen('settings')}
          title="Settings"
        >
          <Settings size={22} strokeWidth={2.2} />
        </button>

        {/* Lock Screen Button */}
        <button
          type="button"
          className={`cpd10-nav-btn ${isLocked ? 'is-active' : ''}`}
          onClick={() => setIsLocked(!isLocked)}
          title="Lock Screen"
        >
          <Lock size={22} strokeWidth={2.2} />
        </button>
      </div>

      <div className="cpd10-sidebar-bottom">
        {/* Power Button */}
        <button
          type="button"
          className={`cpd10-nav-btn power ${powerState === 'on' ? 'power-on' : 'power-off'}`}
          onClick={() => setPowerState(powerState === 'on' ? 'off' : 'on')}
          title="System Power"
        >
          <Power size={22} strokeWidth={2.2} />
        </button>
      </div>
    </aside>
  );
}
