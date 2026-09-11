import { ChevronRight } from 'lucide-react';
import { Toggle } from '../../components/common';

export function PasswordUnlockSubpage({ 
  passwordUnlockEnabled, 
  setPasswordUnlockEnabled, 
  onPasswordSettingClick,
  setSettingsSubpage
}) {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {/* Password Unlock Toggle */}
        <div className="ndp-settings-row">
          <span className="ndp-settings-label">Password Unlock</span>
          <span className="ndp-settings-value">
            <Toggle 
              checked={passwordUnlockEnabled} 
              onClick={() => {
                if (!passwordUnlockEnabled) {
                  setSettingsSubpage('password-setting');
                } else {
                  setPasswordUnlockEnabled(false);
                }
              }} 
            />
          </span>
        </div>

        {/* Password setting */}
        <div className="ndp-settings-row is-clickable" onClick={onPasswordSettingClick}>
          <span className="ndp-settings-label">Password setting</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
