import { ChevronUp, ChevronDown } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

export function InteractiveDisplayPanel({ lcdId = 'lcd1' }) {
  const { lcdStates, updateLcdField } = useSl100();
  const currentLcd = lcdStates[lcdId] || lcdStates.lcd1;

  const handleUpdate = (field, val) => {
    updateLcdField(lcdId, field, val);
  };

  const handleSliderClick = (e, field) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;
    const rawVal = Math.round(((height - clickY) / height) * 100);
    const clamped = Math.max(0, Math.min(100, rawVal));
    handleUpdate(field, clamped);
  };

  return (
    <div className="sl100-lcd-container">
      {/* 1. 2x2 Toggle Cards Grid */}
      <div className="sl100-lcd-toggles-grid">
        {/* Power */}
        <div className="sl100-panel sl100-lcd-card">
          <span className="sl100-panel-title">Power</span>
          <div className="sl100-round-btn-group">
            <button
              type="button"
              className={`sl100-round-btn ${currentLcd.power ? 'is-active' : ''}`}
              onClick={() => handleUpdate('power', true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`sl100-round-btn ${!currentLcd.power ? 'is-active' : ''}`}
              onClick={() => handleUpdate('power', false)}
            >
              OFF
            </button>
          </div>
        </div>

        {/* Energy saving */}
        <div className="sl100-panel sl100-lcd-card">
          <span className="sl100-panel-title">Energy saving</span>
          <div className="sl100-round-btn-group">
            <button
              type="button"
              className={`sl100-round-btn ${currentLcd.energySaving ? 'is-active' : ''}`}
              onClick={() => handleUpdate('energySaving', true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`sl100-round-btn ${!currentLcd.energySaving ? 'is-active' : ''}`}
              onClick={() => handleUpdate('energySaving', false)}
            >
              OFF
            </button>
          </div>
        </div>

        {/* Screen Lock */}
        <div className="sl100-panel sl100-lcd-card">
          <span className="sl100-panel-title">Screen Lock</span>
          <div className="sl100-round-btn-group">
            <button
              type="button"
              className={`sl100-round-btn ${currentLcd.screenLock ? 'is-active' : ''}`}
              onClick={() => handleUpdate('screenLock', true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`sl100-round-btn ${!currentLcd.screenLock ? 'is-active' : ''}`}
              onClick={() => handleUpdate('screenLock', false)}
            >
              OFF
            </button>
          </div>
        </div>

        {/* Child lock */}
        <div className="sl100-panel sl100-lcd-card">
          <span className="sl100-panel-title">Child lock</span>
          <div className="sl100-round-btn-group">
            <button
              type="button"
              className={`sl100-round-btn ${currentLcd.childLock ? 'is-active' : ''}`}
              onClick={() => handleUpdate('childLock', true)}
            >
              ON
            </button>
            <button
              type="button"
              className={`sl100-round-btn ${!currentLcd.childLock ? 'is-active' : ''}`}
              onClick={() => handleUpdate('childLock', false)}
            >
              OFF
            </button>
          </div>
        </div>
      </div>

      {/* 2. Input Source Stack */}
      <div className="sl100-panel sl100-lcd-source-panel">
        <span className="sl100-panel-title center">Input Source</span>
        <div className="sl100-lcd-source-stack">
          {['OPS', 'HDMI', 'Android'].map((src) => (
            <button
              key={src}
              type="button"
              className={`sl100-source-btn ${currentLcd.inputSource === src ? 'is-active' : ''}`}
              onClick={() => handleUpdate('inputSource', src)}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Volume Fader */}
      <div className="sl100-panel sl100-lcd-fader-panel">
        <span className="sl100-panel-title center">Vol.</span>
        <div
          className="sl100-lcd-fader-track"
          onClick={(e) => handleSliderClick(e, 'volume')}
          title={`Volume: ${currentLcd.volume}%`}
        >
          <div
            className="sl100-lcd-fader-fill volume"
            style={{ height: `${currentLcd.volume}%` }}
          />
        </div>
      </div>

      {/* 4. Brightness Fader */}
      <div className="sl100-panel sl100-lcd-fader-panel">
        <span className="sl100-panel-title center">Brightness</span>
        <div
          className="sl100-lcd-fader-track"
          onClick={(e) => handleSliderClick(e, 'brightness')}
          title={`Brightness: ${currentLcd.brightness}%`}
        >
          <div
            className="sl100-lcd-fader-fill brightness"
            style={{ height: `${currentLcd.brightness}%` }}
          />
        </div>
      </div>

      {/* 5. Rightmost Vertical Pagination Indicator */}
      <div className="sl100-lcd-pagination-col">
        <button type="button" className="sl100-page-caret" disabled>
          <ChevronUp size={14} />
        </button>
        <span className="sl100-page-num">1/1</span>
        <button type="button" className="sl100-page-caret" disabled>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
