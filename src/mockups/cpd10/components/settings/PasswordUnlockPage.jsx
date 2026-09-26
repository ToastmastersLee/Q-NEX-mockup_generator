import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { ToggleSwitch } from '../common/ToggleSwitch';
import { SetPasswordModal } from './SetPasswordModal';

/**
 * PasswordUnlockPage
 * Recreates the Password Unlock configuration page (media_1790411761816.png).
 * Has a top row with back button and single card containing "Password Unlock" toggle.
 */
export function PasswordUnlockPage() {
  const {
    setScreen,
    passwordUnlockEnabled,
    setPasswordUnlockEnabled,
    setPanelPassword,
  } = useCpd10();

  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = (checked) => {
    if (checked) {
      // Prompt modal to enter new password
      setModalOpen(true);
    } else {
      setPasswordUnlockEnabled(false);
    }
  };

  const handleConfirmPassword = (newPwd) => {
    setPanelPassword(newPwd);
    setPasswordUnlockEnabled(true);
    setModalOpen(false);
  };

  const handleCancelPassword = () => {
    setModalOpen(false);
  };

  return (
    <div className="cpd10-page-content cpd10-password-unlock-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings-panel')}
        title="Back to Panel Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. Password Unlock Row (Col 2, Row 1) */}
      <div className="cpd10-info-row cpd10-info-row-single">
        <span className="cpd10-info-label">Password Unlock</span>
        <ToggleSwitch
          checked={passwordUnlockEnabled}
          onChange={handleToggle}
        />
      </div>

      {/* Set Password Modal */}
      <SetPasswordModal
        isOpen={modalOpen}
        onConfirm={handleConfirmPassword}
        onCancel={handleCancelPassword}
      />
    </div>
  );
}
