import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { SetPasswordModal } from './SetPasswordModal';

export function PasswordUnlockPage() {
  const {
    setScreen,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    setPassword,
  } = useSl100();

  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = (checked) => {
    if (checked) {
      setModalOpen(true);
    } else {
      setPasswordUnlockEnabled(false);
    }
  };

  const handleConfirmPassword = (newPwd) => {
    setPassword(newPwd);
    setPasswordUnlockEnabled(true);
    setModalOpen(false);
  };

  return (
    <div className="sl100-page-content sl100-password-unlock-page">
      <div className="sl100-subpage-header">
        <button
          type="button"
          className="sl100-subpage-back-btn"
          onClick={() => setScreen('settings-screen')}
          title="Back to Screen Settings"
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <span className="sl100-subpage-title">Password Unlock</span>
      </div>

      <div className="sl100-option-row" style={{ maxWidth: '420px', marginTop: '16px' }}>
        <span className="sl100-option-label">Password Unlock</span>
        <ToggleSwitch
          checked={passwordUnlockEnabled}
          onChange={handleToggle}
        />
      </div>

      <SetPasswordModal
        isOpen={modalOpen}
        onConfirm={handleConfirmPassword}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
