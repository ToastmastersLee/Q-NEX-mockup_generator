import { ChevronLeft } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { QrCodeIcon } from '../common/QrCodeIcon';

export function DeviceInfoPage() {
  const { setScreen } = useSl100();

  return (
    <div className="sl100-page-content sl100-device-info-page">
      <div className="sl100-subpage-layout-wrap">
        {/* Leftmost Back Button matching Row 1 */}
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        {/* 2-Column Main Information Content (Photo 3) */}
        <div className="sl100-device-info-main-grid">
          {/* Column 1: Device IP + Device ID with QR code */}
          <div className="sl100-device-info-col1">
            {/* Row 1: Device IP */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Device IP</span>
              <span className="sl100-info-card-val">192.168.8.228(00-E2-69-E4-1B-3E)</span>
            </div>

            {/* Row 2: Device ID spanning 2 rows height with QR Code */}
            <div className="sl100-info-device-id-card">
              <div className="sl100-device-id-top-row">
                <span className="sl100-info-card-label">Device ID</span>
                <span className="sl100-info-card-val">805078600107</span>
              </div>
              <div className="sl100-device-id-qr-wrap">
                <QrCodeIcon size={58} />
              </div>
            </div>
          </div>

          {/* Column 2: 3 Rows */}
          <div className="sl100-device-info-col2">
            {/* Row 1: Device Firmware Version */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Device Firmware Version</span>
              <span className="sl100-info-card-val">0700020104</span>
            </div>

            {/* Row 2: Panel Firmware Version */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Panel Firmware Version</span>
              <span className="sl100-info-card-val">V1.0.0.1</span>
            </div>

            {/* Row 3: Device Online Status */}
            <div className="sl100-info-row-card">
              <span className="sl100-info-card-label">Device Online Status</span>
              <span className="sl100-info-card-val online">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
