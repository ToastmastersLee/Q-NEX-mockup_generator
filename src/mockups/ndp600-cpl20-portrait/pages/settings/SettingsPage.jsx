import { useState, useRef, Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { Modal } from '../../../../components/Modal';
import './settings.css';


export function SettingsPage({ 
  onDisconnectionClick, 
  onResolutionClick, 
  onLanguageClick, 
  onDisplayClick, 
  onCustomizeClick, 
  onPasswordUnlockClick, 
  onPanelIpClick, 
  panelIpAddress, 
  deviceName, 
  setDeviceName, 
  isDark,
  onCloudServerAddressClick,
  isDisconnectedMode = false
}) {
  const [tempDeviceName, setTempDeviceName] = useState('');
  const [isDeviceNameModalOpen, setIsDeviceNameModalOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleDeviceNameClick = () => {
    clickCountRef.current += 1;
    if (clickCountRef.current === 4) {
      setTempDeviceName(deviceName);
      setIsDeviceNameModalOpen(true);
      clickCountRef.current = 0;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 800);
  };

  return (
    <Fragment>
      <div className="ndp-page ndp-scroll-page">
        <div className="ndp-settings-list">
          {!isDisconnectedMode && (
            <>
              {/* Device Name */}
              <div className="ndp-settings-row is-clickable" onClick={handleDeviceNameClick}>
                <span className="ndp-settings-label">Device Name</span>
                <span className="ndp-settings-value">{deviceName}</span>
              </div>

              {/* Device ID with QR code */}
              <div className="ndp-settings-row has-qr">
                <span className="ndp-settings-label">Device ID</span>
                <div className="ndp-settings-value-container">
                  <span className="ndp-settings-value">572B1B12905F</span>
                  <svg width="64" height="64" viewBox="0 0 29 29" fill="none" className="bg-white p-1 rounded-sm border border-gray-300 text-black">
                    <path d="M0 0h7v7H0zm22 0h7v7h-7zM0 22h7v7H0z" fill="currentColor" />
                    <path d="M2 2h3v3H2zm20 0h3v3h-3zM2 24h3v3H2z" fill="currentColor" />
                    <path d="M9 0h1v3H9zm2 0h3v1h-3zm4 0h2v2h-2zm3 0h2v1h-2zm-9 4h2v1H9zm3 0h3v1h-3zm4 1h1v2h-1zm1-1h1v1h-1zm-6 2h1v1h-1zm1 0h2v2h-2zm-8 4h1v2H2zm2 0h2v1H4zm5 0h1v1H9zm2 0h3v1h-3zm4 0h1v3h-1zm3 0h1v1h-1zm2 0h1v2h-1zm-15 2h2v1H6zm4 0h2v2h-2zm6 1h2v1h-2zm5-1h1v2h-1zm-12 2h3v1h-3zm4 0h2v1h-2zm2 0h1v1h-1zm-11 2h2v2H7zm4 0h1v2h-1zm2 0h3v1h-3zm4 0h1v1h-1zm2 0h2v2h-2z" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </>
          )}

          {/* Panel IP */}
          <div className="ndp-settings-row is-clickable" onClick={onPanelIpClick}>
            <span className="ndp-settings-label">Panel IP</span>
            <span className="ndp-settings-value">
              {panelIpAddress} (1C:54:E6:25:57:8B)
              <ChevronRight size={18} />
            </span>
          </div>

          {/* Language */}
          <div className="ndp-settings-row is-clickable" onClick={onLanguageClick}>
            <span className="ndp-settings-label">Language</span>
            <span className="ndp-settings-value">
              <ChevronRight size={18} />
            </span>
          </div>

          {!isDisconnectedMode && (
            <>
              {/* HDMI OUT Resolution */}
              <div className="ndp-settings-row is-clickable" onClick={onResolutionClick}>
                <span className="ndp-settings-label">HDMI OUT Resolution</span>
                <span className="ndp-settings-value">
                  <ChevronRight size={18} />
                </span>
              </div>

              {/* Display */}
              <div className="ndp-settings-row is-clickable" onClick={onDisplayClick}>
                <span className="ndp-settings-label">Display</span>
                <span className="ndp-settings-value">
                  <ChevronRight size={18} />
                </span>
              </div>

              {/* Customize */}
              <div className="ndp-settings-row is-clickable" onClick={onCustomizeClick}>
                <span className="ndp-settings-label">Customize</span>
                <span className="ndp-settings-value">
                  <ChevronRight size={18} />
                </span>
              </div>

              {/* Password Unlock */}
              <div className="ndp-settings-row is-clickable" onClick={onPasswordUnlockClick}>
                <span className="ndp-settings-label">Password Unlock</span>
                <span className="ndp-settings-value">
                  <ChevronRight size={18} />
                </span>
              </div>
            </>
          )}

          {/* Date & Time */}
          <div className="ndp-settings-row is-clickable">
            <span className="ndp-settings-label">Date & Time</span>
            <span className="ndp-settings-value">
              <ChevronRight size={18} />
            </span>
          </div>

          {/* Software Version */}
          <div className="ndp-settings-row is-clickable">
            <span className="ndp-settings-label">Software Version</span>
            <span className="ndp-settings-value">
              V 1.0.1.4
              <ChevronRight size={18} />
            </span>
          </div>

          {/* Q-NEX Cloud Server Address */}
          <div className="ndp-settings-row is-clickable" onClick={onCloudServerAddressClick}>
            <span className="ndp-settings-label">Q-NEX Cloud Server Address</span>
            <span className="ndp-settings-value">
              <ChevronRight size={18} />
            </span>
          </div>

          {!isDisconnectedMode && (
            /* Disconnection */
            <div className="ndp-settings-row is-clickable" onClick={onDisconnectionClick}>
              <span className="ndp-settings-label">Disconnection</span>
              <span className="ndp-settings-value"></span>
            </div>
          )}

          {/* Clear Cache & Restart Touch Panel */}
          <div className="ndp-settings-row is-clickable">
            <span className="ndp-settings-label">Clear Cache & Restart Touch Panel</span>
            <span className="ndp-settings-value"></span>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isDeviceNameModalOpen} 
        isDark={isDark} 
        onClose={() => setIsDeviceNameModalOpen(false)} 
        onConfirm={() => { setDeviceName(tempDeviceName); setIsDeviceNameModalOpen(false); }}
      >
        <div className={`px-5 py-4 w-full rounded-2xl text-xl ${isDark ? 'bg-[#1a2332]' : 'bg-slate-100'}`}>
          <input 
            type="text" 
            value={tempDeviceName} 
            onChange={(e) => setTempDeviceName(e.target.value)} 
            className={`w-full bg-transparent outline-none ${isDark ? 'text-white' : 'text-black'}`} 
            autoFocus 
          />
        </div>
      </Modal>
    </Fragment>
  );
}
