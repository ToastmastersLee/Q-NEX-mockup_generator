import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

export function Qa1400Panel() {
  const { qa1400State, setQa1400State } = useCpd10();
  const [page, setPage] = useState(1);

  const updateField = (key, val) => {
    setQa1400State((prev) => ({ ...prev, [key]: val }));
  };

  const handleSliderClick = (e, field) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.round((clickX / rect.width) * 100);
    const clamped = Math.max(0, Math.min(100, percentage));
    updateField(field, clamped);
  };

  return (
    <div className="cpd10-serial-device-container">
      {page === 1 ? (
        <div className="cpd10-qa1400-layout">
          {/* Top Section: 2x2 Toggles Grid on Left + Input Source Card on Right */}
          <div className="cpd10-qa1400-top-section">
            {/* 2x2 Grid of 4 Control Cards */}
            <div className="cpd10-qa1400-toggles-grid">
              {/* 1. Power */}
              <div className="cpd10-serial-card">
                <span className="cpd10-serial-card-title">Power</span>
                <div className="cpd10-circular-btn-group">
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${qa1400State.power ? 'is-active' : ''}`}
                    onClick={() => updateField('power', true)}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${!qa1400State.power ? 'is-active' : ''}`}
                    onClick={() => updateField('power', false)}
                  >
                    OFF
                  </button>
                </div>
              </div>

              {/* 2. Energy saving */}
              <div className="cpd10-serial-card">
                <span className="cpd10-serial-card-title">Energy saving</span>
                <div className="cpd10-circular-btn-group">
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${qa1400State.energySaving === true ? 'is-active' : ''}`}
                    onClick={() => updateField('energySaving', true)}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${qa1400State.energySaving === false ? 'is-active' : ''}`}
                    onClick={() => updateField('energySaving', false)}
                  >
                    OFF
                  </button>
                </div>
              </div>

              {/* 3. Screen Lock */}
              <div className="cpd10-serial-card">
                <span className="cpd10-serial-card-title">Screen Lock</span>
                <div className="cpd10-circular-btn-group">
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${qa1400State.screenLock ? 'is-active' : ''}`}
                    onClick={() => updateField('screenLock', true)}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${!qa1400State.screenLock ? 'is-active' : ''}`}
                    onClick={() => updateField('screenLock', false)}
                  >
                    OFF
                  </button>
                </div>
              </div>

              {/* 4. Child Lock */}
              <div className="cpd10-serial-card">
                <span className="cpd10-serial-card-title">Child Lock</span>
                <div className="cpd10-circular-btn-group">
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${qa1400State.childLock ? 'is-active' : ''}`}
                    onClick={() => updateField('childLock', true)}
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    className={`cpd10-circle-btn ${!qa1400State.childLock ? 'is-active' : ''}`}
                    onClick={() => updateField('childLock', false)}
                  >
                    OFF
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Input Source (Matches height of the 2x2 grid) */}
            <div className="cpd10-serial-card cpd10-input-source-card">
              <span className="cpd10-serial-card-title center">Input Source</span>
              <div className="cpd10-source-btn-stack">
                {['Ops', 'HDMI', 'Android'].map((src) => (
                  <button
                    key={src}
                    type="button"
                    className={`cpd10-source-btn ${qa1400State.inputSource === src ? 'is-active' : ''}`}
                    onClick={() => updateField('inputSource', src)}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Vol. and Brightness spanning the FULL width below */}
          <div className="cpd10-qa1400-sliders-row">
            {/* 5. Volume Slider */}
            <div className="cpd10-serial-card cpd10-slider-card">
              <span className="cpd10-serial-card-title">Vol.</span>
              <div
                className="cpd10-capsule-gauge-track"
                onClick={(e) => handleSliderClick(e, 'volume')}
                title={`Volume: ${qa1400State.volume}%`}
              >
                <div
                  className="cpd10-capsule-gauge-fill"
                  style={{ width: `${qa1400State.volume}%` }}
                />
              </div>
            </div>

            {/* 6. Brightness Slider */}
            <div className="cpd10-serial-card cpd10-slider-card">
              <span className="cpd10-serial-card-title">Brightness</span>
              <div
                className="cpd10-capsule-gauge-track"
                onClick={(e) => handleSliderClick(e, 'brightness')}
                title={`Brightness: ${qa1400State.brightness}%`}
              >
                <div
                  className="cpd10-capsule-gauge-fill"
                  style={{ width: `${qa1400State.brightness}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Page 2 placeholder/continuation */
        <div className="cpd10-page2-placeholder">
          <span>QA1400 PRO · 第 2 页配置</span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>（待后续截图补充）</span>
        </div>
      )}

      {/* Bottom Pagination centered across the page */}
      <div className="cpd10-pagination-bar">
        <button
          type="button"
          className="cpd10-page-arrow-btn"
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <span className="cpd10-page-indicator">{page}/2</span>
        <button
          type="button"
          className="cpd10-page-arrow-btn"
          disabled={page === 2}
          onClick={() => setPage(2)}
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
