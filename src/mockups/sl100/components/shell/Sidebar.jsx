import { Home, Settings, Clock, Lock, Power } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

export function Sidebar() {
  const { screen, setScreen, isLocked, setIsLocked, powerState, requestShutdown, powerOn } = useSl100();

  const isHomeActive = screen.startsWith('home');
  const isSettingsActive = screen.startsWith('settings');
  const isTimerActive = screen === 'timer';

  return (
    <aside className="sl100-sidebar">
      <div className="sl100-sidebar-top">
        {/* 1. Home Dashboard */}
        <button
          type="button"
          className={`sl100-nav-btn ${isHomeActive ? 'is-active' : ''}`}
          onClick={() => setScreen('home-dup-ops')}
          title="Home Dashboard"
        >
          <Home size={20} strokeWidth={2.2} />
        </button>

        {/* 2. Settings */}
        <button
          type="button"
          className={`sl100-nav-btn ${isSettingsActive ? 'is-active' : ''}`}
          onClick={() => setScreen('settings')}
          title="Settings"
        >
          <Settings size={20} strokeWidth={2.2} />
        </button>

        {/* 3. Timer / Clock (New on SL100 Podium) */}
        <button
          type="button"
          className={`sl100-nav-btn ${isTimerActive ? 'is-active' : ''}`}
          onClick={() => setScreen('timer')}
          title="Lecture Timer & Clock"
        >
          <Clock size={20} strokeWidth={2.2} />
        </button>

        {/* 4. Lock Screen */}
        <button
          type="button"
          className={`sl100-nav-btn ${isLocked ? 'is-active' : ''}`}
          onClick={() => setIsLocked(!isLocked)}
          title="Lock Screen"
        >
          <Lock size={20} strokeWidth={2.2} />
        </button>
      </div>

      <div className="sl100-sidebar-bottom">
        {/* 5. System Power */}
        <button
          type="button"
          className={`sl100-nav-btn power ${powerState === 'on' ? 'power-on' : 'power-off'}`}
          onClick={() => (powerState === 'on' ? requestShutdown() : powerOn())}
          title="System Power"
        >
          <Power size={20} strokeWidth={2.2} />
        </button>
      </div>
    </aside>
  );
}
