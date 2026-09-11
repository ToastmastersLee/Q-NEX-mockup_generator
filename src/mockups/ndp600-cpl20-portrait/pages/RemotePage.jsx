import { useState } from 'react';
import { GlassPanel } from '../components/common';
import './RemotePage.css';


export function RemotePage() {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePress = (idx) => {
    setActiveBtn(idx);
    setTimeout(() => setActiveBtn(null), 150);
  };

  const buttons = [
    "Power On",
    "Power Off",
    "Cool 25°C Med",
    "Cool 29°C Low",
    "Heat 27°C Med",
    "Heat 30°C High"
  ];

  return (
    <div className="ndp-page ndp-scroll-page">
      <GlassPanel>
        <div className="ndp-remote-grid">
          {buttons.map((label, idx) => (
            <button
              key={idx}
              type="button"
              className={`ndp-remote-btn ${activeBtn === idx ? 'is-active' : ''}`}
              onPointerDown={() => handlePress(idx)}
            >
              {label}
            </button>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
