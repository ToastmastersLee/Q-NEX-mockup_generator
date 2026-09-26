import React from 'react';

/**
 * ClosingScreen & PowerOffScreen
 * Recreates the "Closing..." spinning dots loader & power-off black screen (media_1790431181918.jpg).
 */
export function ClosingScreen({ state, onPowerOn }) {
  if (state === 'on') return null;

  if (state === 'closing') {
    return (
      <div className="cpd10-closing-screen">
        <div className="cpd10-closing-content">
          {/* 12-dot circular spinning loader matching photo 2 */}
          <div className="cpd10-closing-spinner">
            {[...Array(12)].map((_, i) => (
              <span key={i} className={`cpd10-closing-dot dot-${i + 1}`} />
            ))}
          </div>
          <div className="cpd10-closing-text">Closing...</div>
        </div>
      </div>
    );
  }

  // state === 'off' (Full black screen, click to power back on)
  return (
    <div className="cpd10-power-off-screen" onClick={onPowerOn} title="点击屏幕开机">
      <div className="cpd10-power-off-hint">
        <span>已关机 · 点击屏幕任意位置开机</span>
      </div>
    </div>
  );
}
