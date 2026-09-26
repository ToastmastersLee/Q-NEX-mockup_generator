import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { ToggleSwitch } from '../common/ToggleSwitch';

/**
 * OtherSettingsPage
 * Recreates the Other Settings page (media_1790430447603.jpg).
 * Features:
 * - Header: Power on/off settings
 *   Subtitle: When the devices is turned on/off, it will automatically send the power on/off command to all serial devices.
 * - Row 1: Power on linkage (ToggleSwitch)
 * - Row 2: Shutdown linkage (ToggleSwitch)
 */
export function OtherSettingsPage() {
  const {
    setScreen,
    powerOnLinkage,
    setPowerOnLinkage,
    shutdownLinkage,
    setShutdownLinkage,
  } = useCpd10();

  return (
    <div className="cpd10-page-content cpd10-other-settings-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings')}
        title="Back to Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. Header (Col 2, Row 1) */}
      <div className="cpd10-other-header-area">
        <h3 className="cpd10-other-header-title">Power on/off settings</h3>
        <p className="cpd10-other-header-desc">
          When the devices is turned on/off, it will automatically send the power on/off command to all serial devices.
        </p>
      </div>

      {/* Row 1: Power on linkage (Col 2, Row 2) */}
      <div className="cpd10-info-row cpd10-other-row-1">
        <span className="cpd10-info-label">Power on linkage</span>
        <ToggleSwitch
          checked={powerOnLinkage}
          onChange={(val) => setPowerOnLinkage(val)}
        />
      </div>

      {/* Row 2: Shutdown linkage (Col 2, Row 3) */}
      <div className="cpd10-info-row cpd10-other-row-2">
        <span className="cpd10-info-label">Shutdown linkage</span>
        <ToggleSwitch
          checked={shutdownLinkage}
          onChange={(val) => setShutdownLinkage(val)}
        />
      </div>
    </div>
  );
}
