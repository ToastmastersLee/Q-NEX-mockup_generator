import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { DropdownMenu } from '../common/DropdownMenu';
import { SetPasswordModal } from './SetPasswordModal';

const TIME_OPTIONS = ['1 min', '2 min', '5 min', '10 min', '15 min', '30 min'];

export function ScreenSettingsPage() {
  const {
    setScreen,
    screenBrightness,
    setScreenBrightness,
    keyTone,
    setKeyTone,
    screenSleepTime,
    setScreenSleepTime,
    autoLockTime,
    setAutoLockTime,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    setPassword,
  } = useSl100();

  const [screenSleepEnabled, setScreenSleepEnabled] = useState(false);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [activePicker, setActivePicker] = useState(null); // 'sleep' | 'autoLock' | null
  const sliderRef = useRef(null);

  const handleBrightnessChange = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (clientX === undefined) return;
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.round((offsetX / rect.width) * 100);
    setScreenBrightness(percent);
  };

  const handleConfirmPassword = (newPwd) => {
    setPassword(newPwd);
    setPasswordUnlockEnabled(true);
    setPasswordModalOpen(false);
  };

  return (
    <div className="sl100-page-content sl100-screen-settings-page">
      <div className="sl100-subpage-layout-wrap">
        {/* Leftmost Back Button */}
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        {/* 2-Column Main Settings Grid (Photo 4) */}
        <div className="sl100-screen-settings-main-grid">
          {/* Column 1: 3 Rows */}
          <div className="sl100-screen-settings-col1">
            {/* Row 1: Display brightness */}
            <div className="sl100-info-row-card sl100-brightness-card">
              <span className="sl100-info-card-label">Display brightness</span>
              <div
                ref={sliderRef}
                className="sl100-brightness-capsule-bar"
                onClick={handleBrightnessChange}
                title={`Brightness: ${screenBrightness}%`}
              >
                <div
                  className="sl100-brightness-capsule-level"
                  style={{ width: `${Math.max(10, screenBrightness)}%` }}
                />
              </div>
            </div>

            {/* Row 2: Screen Sleep */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Screen Sleep</span>
              <div className="sl100-row-controls-right" style={{ position: 'relative' }}>
                <ToggleSwitch
                  checked={screenSleepEnabled}
                  onChange={(val) => setScreenSleepEnabled(val)}
                />
                <span className="sl100-no-action-label">No action</span>
                <button
                  type="button"
                  className="sl100-time-badge-btn"
                  onClick={() => setActivePicker(activePicker === 'sleep' ? null : 'sleep')}
                >
                  {screenSleepTime} min
                </button>

                <DropdownMenu
                  isOpen={activePicker === 'sleep'}
                  options={TIME_OPTIONS}
                  value={`${screenSleepTime} min`}
                  onSelect={(val) => setScreenSleepTime(parseInt(val, 10))}
                  onClose={() => setActivePicker(null)}
                  align="right"
                  minWidth="120px"
                />
              </div>
            </div>

            {/* Row 3: Password Unlock */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Password Unlock</span>
              <div className="sl100-row-controls-right">
                <ToggleSwitch
                  checked={passwordUnlockEnabled}
                  onChange={(val) => {
                    if (val) {
                      setPasswordModalOpen(true);
                    } else {
                      setPasswordUnlockEnabled(false);
                    }
                  }}
                />
                <button
                  type="button"
                  className="sl100-pill-action-btn"
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Edit password
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: 2 Rows */}
          <div className="sl100-screen-settings-col2">
            {/* Row 1: Button sound effects */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Button sound effects</span>
              <div className="sl100-row-controls-right">
                <ToggleSwitch
                  checked={keyTone}
                  onChange={(val) => setKeyTone(val)}
                />
              </div>
            </div>

            {/* Row 2: Auto-Lock Screen */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Auto-Lock Screen</span>
              <div className="sl100-row-controls-right" style={{ position: 'relative' }}>
                <ToggleSwitch
                  checked={autoLockEnabled}
                  onChange={(val) => setAutoLockEnabled(val)}
                />
                <span className="sl100-no-action-label">No action</span>
                <button
                  type="button"
                  className="sl100-time-badge-btn"
                  onClick={() => setActivePicker(activePicker === 'autoLock' ? null : 'autoLock')}
                >
                  {autoLockTime} min
                </button>

                <DropdownMenu
                  isOpen={activePicker === 'autoLock'}
                  options={TIME_OPTIONS}
                  value={`${autoLockTime} min`}
                  onSelect={(val) => setAutoLockTime(parseInt(val, 10))}
                  onClose={() => setActivePicker(null)}
                  align="right"
                  minWidth="120px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Password Modal (Photo 5) */}
      <SetPasswordModal
        isOpen={passwordModalOpen}
        onConfirm={handleConfirmPassword}
        onCancel={() => setPasswordModalOpen(false)}
      />
    </div>
  );
}
