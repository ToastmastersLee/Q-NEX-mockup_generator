import { Sun, Moon } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { Sidebar } from './Sidebar';
import { ScreenRenderer } from './ScreenRenderer';

export function Cpd10Shell() {
  const { theme, setTheme, orientationFlipped } = useCpd10();

  const isLight = theme === 'light';

  return (
    <div className={`cpd10-app-container ${isLight ? 'is-light' : 'is-dark'}`}>
      {/* Top Utility Bar */}
      <div className="cpd10-debug-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong>CPD10 串口控制面板</strong>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>端口: 5177</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="cpd10-theme-toggle-btn"
          onClick={() => setTheme(isLight ? 'dark' : 'light')}
          title="切换 Light / Dark 主题模式"
        >
          {isLight ? (
            <>
              <Moon size={14} />
              <span>切为 Dark 模式</span>
            </>
          ) : (
            <>
              <Sun size={14} />
              <span>切为 Light 模式</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Hardware Enclosure (183 × 116 mm ratio) */}
      <div className={`cpd10-bezel ${orientationFlipped ? 'flipped' : ''}`}>
        <div className="cpd10-screen-viewport">
          <Sidebar />
          <div className="cpd10-main-canvas">
            <ScreenRenderer />
          </div>
        </div>
      </div>
    </div>
  );
}
