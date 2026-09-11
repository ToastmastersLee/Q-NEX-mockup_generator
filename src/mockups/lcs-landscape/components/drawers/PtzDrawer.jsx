import { useLcs } from '../../context/LcsContext';

export function PtzDrawer() {
  const {
    activeMenuSection,
    setActiveMenuSection,
    channelImages,
    ptzActiveChannel,
    setPtzActiveChannel,
    ptzSpeed,
    setPtzSpeed,
    ptzPresetMode,
    setPtzPresetMode,
    showToast
  } = useLcs();

  if (activeMenuSection !== 'ptz') {
    return null;
  }

  return (
    <div className="lcs-ptz-preview-layout">
      <div className="lcs-ptz-preview-viewport">
        <img 
          src={channelImages[ptzActiveChannel]} 
          alt="ptz-preview" 
          className="lcs-ptz-preview-img" 
        />
        <div className="lcs-ptz-preview-placeholder-overlay">
          <svg className="lcs-ptz-film-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
            <polygon points="9.5 9 15.5 12 9.5 15 9.5 9" fill="currentColor" />
          </svg>
        </div>
        <span className="lcs-split-label active">
          {ptzActiveChannel.toUpperCase()} ({
            ptzActiveChannel === 'ch3' ? 'Teacher Close' : 
            ptzActiveChannel === 'ch4' ? 'Student Close' : 
            ptzActiveChannel === 'ch5' ? 'Teacher Pan' : 
            'Student Pan'
          })
        </span>
      </div>
      
      {/* PTZ bottom control drawer */}
      <div className="lcs-ptz-drawer">
        {/* Title & Close */}
        <div className="lcs-ptz-drawer-top">
          <span className="lcs-ptz-drawer-title">PTZ Ctrl</span>
          <button 
            type="button" 
            className="lcs-ptz-drawer-close"
            onClick={() => setActiveMenuSection(null)}
          >
            ✕
          </button>
        </div>

        <div className="lcs-ptz-drawer-body">
          {/* Left section: Channel grid */}
          <div className="lcs-ptz-drawer-col channels-col">
            {['ch3', 'ch4', 'ch5', 'ch6'].map((ch) => (
              <button
                key={ch}
                type="button"
                className={`lcs-ptz-channel-capsule ${ptzActiveChannel === ch ? 'is-active' : ''}`}
                onClick={() => setPtzActiveChannel(ch)}
              >
                {ch.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="lcs-ptz-drawer-divider" />

          {/* Middle-left section: D-pad */}
          <div className="lcs-ptz-drawer-col dpad-col">
            <div className="lcs-ptz-dpad-circle">
              <button 
                type="button" 
                className="ptz-circle-arrow-btn up"
                onClick={() => showToast(`Pan Up: Tilt camera ${ptzActiveChannel.toUpperCase()} up`)}
              >
                ▲
              </button>
              <div className="ptz-circle-arrow-row">
                <button 
                  type="button" 
                  className="ptz-circle-arrow-btn left"
                  onClick={() => showToast(`Pan Left: Pan camera ${ptzActiveChannel.toUpperCase()} left`)}
                >
                  ◀
                </button>
                <div className="ptz-circle-arrow-center">
                  <div className="ptz-circle-arrow-center-dot" />
                </div>
                <button 
                  type="button" 
                  className="ptz-circle-arrow-btn right"
                  onClick={() => showToast(`Pan Right: Pan camera ${ptzActiveChannel.toUpperCase()} right`)}
                >
                  ▶
                </button>
              </div>
              <button 
                type="button" 
                className="ptz-circle-arrow-btn down"
                onClick={() => showToast(`Pan Down: Tilt camera ${ptzActiveChannel.toUpperCase()} down`)}
              >
                ▼
              </button>
            </div>
          </div>

          <div className="lcs-ptz-drawer-divider" />

          {/* Middle section: Zoom & Speed */}
          <div className="lcs-ptz-drawer-col zoom-speed-col">
            <div className="lcs-ptz-zoom-group">
              <span className="lcs-ptz-group-label">Zoom</span>
              <div className="lcs-ptz-zoom-btns">
                <button 
                  type="button" 
                  className="lcs-ptz-zoom-btn"
                  onClick={() => showToast(`Zoom In (+) for ${ptzActiveChannel.toUpperCase()}`)}
                >
                  <span>+</span> zoom
                </button>
                <button 
                  type="button" 
                  className="lcs-ptz-zoom-btn"
                  onClick={() => showToast(`Zoom Out (-) for ${ptzActiveChannel.toUpperCase()}`)}
                >
                  <span>-</span> zoom
                </button>
              </div>
            </div>
            <div className="lcs-ptz-speed-group">
              <div className="lcs-ptz-speed-text">
                <span>Speed</span> <strong>{ptzSpeed}</strong>
              </div>
              <div className="lcs-ptz-speed-slider-wrapper">
                <input 
                  type="range" 
                  min="1" 
                  max="8" 
                  value={ptzSpeed} 
                  className="lcs-ptz-speed-slider"
                  onChange={(e) => setPtzSpeed(parseInt(e.target.value))}
                />
                <div className="lcs-ptz-speed-ticks">
                  {[1,2,3,4,5,6,7,8].map(tick => (
                    <span key={tick} className={`lcs-ptz-speed-tick ${ptzSpeed >= tick ? 'is-active' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lcs-ptz-drawer-divider" />

          {/* Right section: Presets */}
          <div className="lcs-ptz-drawer-col presets-col">
            <div className="lcs-ptz-presets-modes">
              <button 
                type="button" 
                className={`lcs-ptz-preset-mode-btn ${ptzPresetMode === 'set' ? 'is-active' : ''}`}
                onClick={() => setPtzPresetMode('set')}
              >
                Set
              </button>
              <button 
                type="button" 
                className={`lcs-ptz-preset-mode-btn ${ptzPresetMode === 'call' ? 'is-active' : ''}`}
                onClick={() => setPtzPresetMode('call')}
              >
                Call
              </button>
            </div>
            <div className="lcs-ptz-preset-numbers">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  className="lcs-ptz-preset-num"
                  onClick={() => {
                    if (ptzPresetMode === 'set') {
                      showToast(`Preset ${num} Saved for ${ptzActiveChannel.toUpperCase()}`);
                    } else {
                      showToast(`Calling Preset ${num} for ${ptzActiveChannel.toUpperCase()}`);
                    }
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
