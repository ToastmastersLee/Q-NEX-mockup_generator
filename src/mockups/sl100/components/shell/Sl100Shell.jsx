import { Sun, Moon, FileSpreadsheet, Lock, Unlock } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { Sidebar } from './Sidebar';
import { ScreenRenderer } from './ScreenRenderer';
import { SerialImportModal } from '../common/SerialImportModal';
import { LockScreen } from '../common/LockScreen';
import { ShutdownConfirmModal } from '../common/ShutdownConfirmModal';
import { ClosingScreen } from '../common/ClosingScreen';
import { SCREEN_REGISTRY } from '../../constants/screens';

export function Sl100Shell() {
  const {
    screen,
    setScreen,
    theme,
    setTheme,
    serialImportPromptOpen,
    setSerialImportPromptOpen,
    isLocked,
    setIsLocked,
    shutdownPromptOpen,
    setShutdownPromptOpen,
    confirmShutdown,
    powerState,
    powerOn,
  } = useSl100();

  const isLight = theme === 'light';

  return (
    <div className={`sl100-app-container ${isLight ? 'is-light' : 'is-dark'}`}>
      {/* Top Quick Debug & Control Bar */}
      <div className="sl100-debug-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong>SL100 讲台本地控制屏</strong>
          <span className="sl100-port-badge">端口: 5179</span>
          <select
            className="sl100-screen-select"
            value={screen}
            onChange={(e) => setScreen(e.target.value)}
            title="快速切换预设视图"
          >
            {SCREEN_REGISTRY.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="sl100-debug-btn"
            onClick={() => setSerialImportPromptOpen(true)}
            title="模拟插入U盘配置文件"
          >
            <FileSpreadsheet size={13} />
            <span>模拟U盘配置</span>
          </button>

          <button
            type="button"
            className="sl100-debug-btn"
            onClick={() => setIsLocked(!isLocked)}
            title="锁定/解锁屏幕"
          >
            {isLocked ? <Unlock size={13} /> : <Lock size={13} />}
            <span>{isLocked ? '当前: 锁定 (点击解锁)' : '锁定屏幕'}</span>
          </button>

          <button
            type="button"
            className="sl100-debug-btn"
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            title="切换 Light / Dark 模式"
          >
            {isLight ? <Moon size={13} /> : <Sun size={13} />}
            <span>{isLight ? 'Dark 模式' : 'Light 模式'}</span>
          </button>
        </div>
      </div>

      {/* Simulated Hardware Podium Bezel (Ultra-Wide ~4:1 Bar Screen) */}
      <div className="sl100-podium-housing">
        {/* 4:1 Aspect Ratio Screen Bezel */}
        <div className="sl100-screen-bezel">
          <div className="sl100-screen-viewport">
            <Sidebar />
            <main className="sl100-main-canvas">
              <ScreenRenderer />
            </main>

            {/* Overlays */}
            <LockScreen />
            <ShutdownConfirmModal
              isOpen={shutdownPromptOpen}
              onConfirm={confirmShutdown}
              onCancel={() => setShutdownPromptOpen(false)}
            />
            <ClosingScreen
              state={powerState}
              onPowerOn={powerOn}
            />
            <SerialImportModal
              isOpen={serialImportPromptOpen}
              onImport={() => setSerialImportPromptOpen(false)}
              onCancel={() => setSerialImportPromptOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
