import { ChevronLeft } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { QrCodeIcon } from '../common/QrCodeIcon';

export function DeviceInfoPage() {
  const { setScreen } = useCpd10();

  return (
    <div className="cpd10-page-content cpd10-device-info-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings')}
        title="Back to Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. All 5 Options (Col 2, Rows 1-5, identical width) */}
      {/* Row 1: Device IP */}
      <div className="cpd10-info-row cpd10-info-row-ip">
        <span className="cpd10-info-label">Device IP</span>
        <span className="cpd10-info-val">192.168.110.72(00-E2-69-E4-1A-EE)</span>
      </div>

      {/* Row 2: Device ID with QR Code */}
      <div className="cpd10-info-row cpd10-info-row-device-id">
        <span className="cpd10-info-label">Device ID</span>
        <div className="cpd10-device-id-val-wrapper">
          <span className="cpd10-info-val">74151B770608</span>
          <QrCodeIcon size={46} />
        </div>
      </div>

      {/* Row 3: Device Firmware Version */}
      <div className="cpd10-info-row">
        <span className="cpd10-info-label">Device Firmware Version</span>
        <span className="cpd10-info-val">1000010115</span>
      </div>

      {/* Row 4: Panel Firmware Version */}
      <div className="cpd10-info-row">
        <span className="cpd10-info-label">Panel Firmware Version</span>
        <span className="cpd10-info-val">V1.0.0.1</span>
      </div>

      {/* Row 5: Device Online Status */}
      <div className="cpd10-info-row">
        <span className="cpd10-info-label">Device Online Status</span>
        <span className="cpd10-info-val online-status">Online</span>
      </div>
    </div>
  );
}
