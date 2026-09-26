import { Sun, Moon, RotateCw, FileSpreadsheet, Lock, Unlock } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { Sidebar } from './Sidebar';
import { ScreenRenderer } from './ScreenRenderer';
import { SerialImportModal } from '../common/SerialImportModal';
import { LockScreen } from '../common/LockScreen';

export function Cpd10Shell() {
  const {
    theme,
    setTheme,
    orientationFlipped,
    toggleScreenOrientation,
    serialImportPromptOpen,
    setSerialImportPromptOpen,
    isLocked,
    setIsLocked,
  } = useCpd10();

  const isLight = theme === 'light';

  return (
    <div className={`cpd10-app-container ${isLight ? 'is-light' : 'is-dark'}`}>
      {/* Top Utility Bar */}
      <div className="cpd10-debug-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong>CPD10 串口控制面板</strong>
          <span style={{ fontSize: '11px', opacity: 0.7 }}>端口: 5177</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Orientation Toggle Button */}
          <button
            type="button"
            className="cpd10-theme-toggle-btn"
            onClick={toggleScreenOrientation}
            title="倒转屏幕方向 (180°)"
          >
            <RotateCw size={13} />
            <span>{orientationFlipped ? '方向: 倒转 (180°)' : '方向: 正常 (0°)'}</span>
          </button>

          {/* Simulate USB Serial Config File Detection */}
          <button
            type="button"
            className="cpd10-theme-toggle-btn"
            onClick={() => setSerialImportPromptOpen(true)}
            title="模拟插入包含串口配置的U盘"
          >
            <FileSpreadsheet size={13} />
            <span>模拟检测到配置文件</span>
          </button>

          {/* Lock Screen Toggle Button */}
          <button
            type="button"
            className="cpd10-theme-toggle-btn"
            onClick={() => setIsLocked(!isLocked)}
            title="锁定/解锁屏幕"
          >
            {isLocked ? <Unlock size={13} /> : <Lock size={13} />}
            <span>{isLocked ? '当前: 锁屏状态 (点击解锁)' : '锁定屏幕'}</span>
          </button>

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
      </div>

      {/* Simulated Hardware Enclosure (183 × 116 mm ratio) */}
      <div className={`cpd10-bezel ${orientationFlipped ? 'flipped' : ''}`}>
        <div className="cpd10-screen-viewport">
          <Sidebar />
          <div className="cpd10-main-canvas">
            <ScreenRenderer />
          </div>

          {/* Physical Lock Screen (media_1790431162130.jpg) */}
          <LockScreen />

          {/* Serial Configuration File Detected Modal (media_1790419850109.jpg) */}
          <SerialImportModal
            isOpen={serialImportPromptOpen}
            onImport={() => {
              setSerialImportPromptOpen(false);
            }}
            onCancel={() => setSerialImportPromptOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
