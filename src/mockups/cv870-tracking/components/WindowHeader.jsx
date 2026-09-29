import { useState, useEffect } from 'react';
import { HelpCircle, Minus, Square, X } from 'lucide-react';

export function WindowHeader({ title = 'CameraCMS - [V1.0.27.97-2023.030]', onMinimize, onMaximize, onClose }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cms-window-header">
      <div className="cms-win-title">
        <span className="cms-win-app-icon" />
        <span className="cms-win-app-name">{title}</span>
      </div>

      <div className="cms-win-right">
        {/* Real-time System Metrics */}
        <div className="cms-sys-metrics">
          <div className="cms-metric-item">
            <span className="cms-metric-label">NET</span>
            <div className="cms-meter-bars">
              <span className="cms-bar on" />
              <span className="cms-bar on" />
              <span className="cms-bar" />
            </div>
          </div>
          <div className="cms-metric-item">
            <span className="cms-metric-label">CPU</span>
            <div className="cms-meter-bars">
              <span className="cms-bar on" />
              <span className="cms-bar" />
              <span className="cms-bar" />
            </div>
          </div>
          <div className="cms-metric-item">
            <span className="cms-metric-label">RAM</span>
            <div className="cms-meter-bars">
              <span className="cms-bar on" />
              <span className="cms-bar on" />
              <span className="cms-bar on" />
            </div>
          </div>

          <div className="cms-live-clock">{timeStr || '09:57:49'}</div>
        </div>

        {/* Windows System Control Buttons */}
        <div className="cms-win-controls">
          <button type="button" className="cms-ctrl-btn" title="Help" onClick={onMinimize}>
            <HelpCircle size={12} />
          </button>
          <button type="button" className="cms-ctrl-btn" title="Minimize" onClick={onMinimize}>
            <Minus size={12} />
          </button>
          <button type="button" className="cms-ctrl-btn" title="Maximize" onClick={onMaximize}>
            <Square size={10} />
          </button>
          <button type="button" className="cms-ctrl-btn is-close" title="Close" onClick={onClose}>
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
