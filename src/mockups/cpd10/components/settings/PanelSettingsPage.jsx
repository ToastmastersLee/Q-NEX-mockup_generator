import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { WheelPickerDrawer } from './WheelPickerDrawer';

const TIME_OPTIONS = ['Never', '1 min', '2 min', '5 min', '10 min', '30 min'];
const ORIENTATION_OPTIONS = ['Desktop', 'Wall Mount'];

/**
 * PanelSettingsPage
 * Recreates the Panel Settings page on CPD10 (media_1790411727587.png & media_1790411742720.png).
 * 6 rows in a tight grid layout with interactive capsule slider, toggles, and wheel drawers.
 */
export function PanelSettingsPage() {
  const {
    setScreen,
    panelBrightness,
    setPanelBrightness,
    buttonSoundEffects,
    setButtonSoundEffects,
    screenSleep,
    setScreenSleep,
    autoLockScreen,
    setAutoLockScreen,
    passwordUnlockEnabled,
    screenOrientation,
    setScreenOrientation,
  } = useCpd10();

  // Active drawer picker state
  const [activePicker, setActivePicker] = useState(null); // 'sleep' | 'autoLock' | 'orientation' | null

  // Brightness bar interaction
  const sliderRef = useRef(null);

  const handleBrightnessChange = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX === undefined) return;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((offsetX / rect.width) * 100);
    setPanelBrightness(percent);
  };

  return (
    <div className="cpd10-page-content cpd10-panel-settings-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings')}
        title="Back to Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. Options (Col 2, Rows 1-6) */}
      {/* Row 1: Display brightness */}
      <div className="cpd10-info-row cpd10-panel-row-1">
        <span className="cpd10-info-label">Display brightness</span>
        <div
          ref={sliderRef}
          className="cpd10-brightness-capsule-track"
          onClick={handleBrightnessChange}
          onMouseDown={(e) => {
            handleBrightnessChange(e);
            const onMove = (moveEvent) => handleBrightnessChange(moveEvent);
            const onUp = () => {
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
          title={`Brightness: ${panelBrightness}%`}
        >
          <div
            className="cpd10-brightness-capsule-fill"
            style={{ width: `${Math.max(10, panelBrightness)}%` }}
          />
        </div>
      </div>

      {/* Row 2: Button sound effects */}
      <div className="cpd10-info-row cpd10-panel-row-2">
        <span className="cpd10-info-label">Button sound effects</span>
        <ToggleSwitch
          checked={buttonSoundEffects}
          onChange={(val) => setButtonSoundEffects(val)}
        />
      </div>

      {/* Row 3: Screen sleep */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-panel-row-3"
        onClick={() => setActivePicker('sleep')}
      >
        <span className="cpd10-info-label">Screen sleep</span>
        <div className="cpd10-info-chevron-val">
          <span>{screenSleep}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 4: Auto-Lock screen */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-panel-row-4"
        onClick={() => setActivePicker('autoLock')}
      >
        <span className="cpd10-info-label">Auto-Lock screen</span>
        <div className="cpd10-info-chevron-val">
          <span>{autoLockScreen}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 5: Password Unlock */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-panel-row-5"
        onClick={() => setScreen('settings-password-unlock')}
      >
        <span className="cpd10-info-label">Password Unlock</span>
        <div className="cpd10-info-chevron-val">
          <span>{passwordUnlockEnabled ? 'ON' : 'OFF'}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 6: Screen orientation */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-panel-row-6"
        onClick={() => setActivePicker('orientation')}
      >
        <span className="cpd10-info-label">Screen orientation</span>
        <div className="cpd10-info-chevron-val">
          <span>{screenOrientation}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Bottom Wheel Picker Drawer */}
      <WheelPickerDrawer
        isOpen={activePicker === 'sleep'}
        options={TIME_OPTIONS}
        value={screenSleep}
        onSelect={(val) => setScreenSleep(val)}
        onClose={() => setActivePicker(null)}
      />

      <WheelPickerDrawer
        isOpen={activePicker === 'autoLock'}
        options={TIME_OPTIONS}
        value={autoLockScreen}
        onSelect={(val) => setAutoLockScreen(val)}
        onClose={() => setActivePicker(null)}
      />

      <WheelPickerDrawer
        isOpen={activePicker === 'orientation'}
        options={ORIENTATION_OPTIONS}
        value={screenOrientation}
        onSelect={(val) => setScreenOrientation(val)}
        onClose={() => setActivePicker(null)}
      />
    </div>
  );
}
