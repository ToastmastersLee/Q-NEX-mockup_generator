import { useState, useRef, useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

export function Ta4532Panel() {
  const { ta4532State, setTa4532State } = useCpd10();
  const [isRemoteReadyActive, setIsRemoteReadyActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleRemoteReadyPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRemoteReadyActive(true);
    timerRef.current = setTimeout(() => {
      setIsRemoteReadyActive(false);
    }, 280);
  };

  const updateField = (key, val) => {
    setTa4532State((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="cpd10-serial-device-container">
      <div className="cpd10-ta4532-grid-layout">
        {/* Top Row: Power & Record */}
        <div className="cpd10-ta4532-top-row">
          {/* 1. Power */}
          <div className="cpd10-serial-card">
            <span className="cpd10-serial-card-title">Power</span>
            <div className="cpd10-circular-btn-group">
              <button
                type="button"
                className={`cpd10-circle-btn ${ta4532State.power ? 'is-active' : ''}`}
                onClick={() => updateField('power', true)}
              >
                ON
              </button>
              <button
                type="button"
                className={`cpd10-circle-btn ${!ta4532State.power ? 'is-active' : ''}`}
                onClick={() => updateField('power', false)}
              >
                OFF
              </button>
            </div>
          </div>

          {/* 2. Record */}
          <div className="cpd10-serial-card">
            <span className="cpd10-serial-card-title">Record</span>
            <div className="cpd10-circular-btn-group">
              <button
                type="button"
                className={`cpd10-circle-btn record-play ${ta4532State.recording ? 'is-active' : ''}`}
                onClick={() => updateField('recording', true)}
                title="Start Recording"
              >
                <Play size={14} fill="currentColor" />
              </button>
              <button
                type="button"
                className={`cpd10-circle-btn record-stop ${!ta4532State.recording ? 'is-active' : ''}`}
                onClick={() => updateField('recording', false)}
                title="Stop Recording"
              >
                <Square size={13} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Remote Ready momentary action button */}
        <div className="cpd10-ta4532-bottom-row">
          <button
            type="button"
            className={`cpd10-serial-card cpd10-remote-ready-card ${isRemoteReadyActive ? 'is-active' : ''}`}
            onClick={handleRemoteReadyPress}
            title="Trigger Remote Ready"
          >
            <span className="cpd10-remote-ready-text">Remote Ready</span>
          </button>
        </div>
      </div>
    </div>
  );
}
