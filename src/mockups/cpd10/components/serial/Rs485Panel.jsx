import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

export function Rs485Panel() {
  const { rs485State, setRs485State } = useCpd10();

  const updateField = (key, val) => {
    setRs485State((prev) => ({ ...prev, [key]: val }));
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
      <div className="cpd10-qa1400-layout">
        {/* Top Section: 2x2 Toggles Grid + Input Source Card */}
        <div className="cpd10-qa1400-top-section">
          {/* 2x2 Grid of 4 Control Cards */}
          <div className="cpd10-qa1400-toggles-grid">
            {/* 1. Power */}
            <div className="cpd10-serial-card">
              <span className="cpd10-serial-card-title">Power</span>
              <div className="cpd10-circular-btn-group">
                <button
                  type="button"
                  className={`cpd10-circle-btn ${rs485State.power ? 'is-active' : ''}`}
                  onClick={() => updateField('power', true)}
                >
                  ON
                </button>
                <button
                  type="button"
                  className={`cpd10-circle-btn ${!rs485State.power ? 'is-active' : ''}`}
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
                  className={`cpd10-circle-btn ${rs485State.energySaving === true ? 'is-active' : ''}`}
                  onClick={() => updateField('energySaving', true)}
                >
                  ON
                </button>
                <button
                  type="button"
                  className={`cpd10-circle-btn ${rs485State.energySaving === false ? 'is-active' : ''}`}
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
                  className={`cpd10-circle-btn ${rs485State.screenLock ? 'is-active' : ''}`}
                  onClick={() => updateField('screenLock', true)}
                >
                  ON
                </button>
                <button
                  type="button"
                  className={`cpd10-circle-btn ${!rs485State.screenLock ? 'is-active' : ''}`}
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
                  className={`cpd10-circle-btn ${rs485State.childLock ? 'is-active' : ''}`}
                  onClick={() => updateField('childLock', true)}
                >
                  ON
                </button>
                <button
                  type="button"
                  className={`cpd10-circle-btn ${!rs485State.childLock ? 'is-active' : ''}`}
                  onClick={() => updateField('childLock', false)}
                >
                  OFF
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Input Source */}
          <div className="cpd10-serial-card cpd10-input-source-card">
            <span className="cpd10-serial-card-title center">Input Source</span>
            <div className="cpd10-source-btn-stack">
              {['Ops', 'HDMI', 'Android'].map((src) => (
                <button
                  key={src}
                  type="button"
                  className={`cpd10-source-btn ${rs485State.inputSource === src ? 'is-active' : ''}`}
                  onClick={() => updateField('inputSource', src)}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Vol. and Brightness */}
        <div className="cpd10-qa1400-sliders-row">
          <div className="cpd10-serial-card cpd10-slider-card">
            <span className="cpd10-serial-card-title">Vol.</span>
            <div
              className="cpd10-capsule-gauge-track"
              onClick={(e) => handleSliderClick(e, 'volume')}
              title={`Volume: ${rs485State.volume}%`}
            >
              <div
                className="cpd10-capsule-gauge-fill"
                style={{ width: `${rs485State.volume}%` }}
              />
            </div>
          </div>

          <div className="cpd10-serial-card cpd10-slider-card">
            <span className="cpd10-serial-card-title">Brightness</span>
            <div
              className="cpd10-capsule-gauge-track"
              onClick={(e) => handleSliderClick(e, 'brightness')}
              title={`Brightness: ${rs485State.brightness}%`}
            >
              <div
                className="cpd10-capsule-gauge-fill"
                style={{ width: `${rs485State.brightness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Pagination for RS485-02 is 1/1 */}
      <div className="cpd10-pagination-bar">
        <button
          type="button"
          className="cpd10-page-arrow-btn"
          disabled={true}
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <span className="cpd10-page-indicator">1/1</span>
        <button
          type="button"
          className="cpd10-page-arrow-btn"
          disabled={true}
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
