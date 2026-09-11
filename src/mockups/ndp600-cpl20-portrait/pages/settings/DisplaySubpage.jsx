import { ChevronRight } from 'lucide-react';

export function DisplaySubpage({ 
  brightness, 
  setBrightness, 
  autoLockTime, 
  setAutoLockTime, 
  screenSaver, 
  setScreenSaver, 
  screenSleep, 
  setScreenSleep,
  isDark 
}) {
  const autoLockChoices = ['1 Minute', '2 Minutes', '5 Minutes', '10 Minutes', 'Never'];
  const screenSaverChoices = ['Never', '1 Minute', '2 Minutes', '5 Minutes', '10 Minutes'];
  const screenSleepChoices = ['1 Minute', '5 Minutes', '10 Minutes', '30 Minutes', 'Never'];

  const toggleChoice = (current, choices, setter) => {
    const idx = choices.indexOf(current);
    const nextIdx = (idx + 1) % choices.length;
    setter(choices[nextIdx]);
  };

  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {/* Brightness */}
        <div className="ndp-settings-row">
          <span className="ndp-settings-label">Brightness</span>
          <div className="ndp-slider-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={brightness} 
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="ndp-slider"
              style={{
                background: `linear-gradient(to right, #00c8ff 0%, #00c8ff ${brightness}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ${brightness}%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 100%)`
              }}
            />
          </div>
        </div>

        {/* Auto-Lock Screen */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(autoLockTime, autoLockChoices, setAutoLockTime)}
        >
          <span className="ndp-settings-label">Auto-Lock Screen</span>
          <span className="ndp-settings-value">
            {autoLockTime}
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Screen Saver */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(screenSaver, screenSaverChoices, setScreenSaver)}
        >
          <span className="ndp-settings-label">Screen Saver</span>
          <span className="ndp-settings-value">
            {screenSaver}
            <ChevronRight size={18} />
          </span>
        </div>

        {/* Screen Sleep */}
        <div 
          className="ndp-settings-row is-clickable" 
          onClick={() => toggleChoice(screenSleep, screenSleepChoices, setScreenSleep)}
        >
          <span className="ndp-settings-label">Screen Sleep</span>
          <span className="ndp-settings-value">
            {screenSleep}
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
