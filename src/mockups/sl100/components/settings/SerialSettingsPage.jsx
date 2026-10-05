import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { DropdownMenu } from '../common/DropdownMenu';
import { ControlCodeEditorModal } from './ControlCodeEditorModal';
import {
  SERIAL_PORT_TABS,
  SERIAL_DEVICE_TYPE_OPTIONS,
  SERIAL_CODE_LIST_OPTIONS,
  SERIAL_BAUD_RATE_OPTIONS,
  SERIAL_PARITY_CHECK_OPTIONS,
} from '../../constants/serialConfigs';

export function SerialSettingsPage() {
  const { setScreen, serialPortConfigs, setSerialPortConfigs } = useSl100();
  const [activePortTab, setActivePortTab] = useState(SERIAL_PORT_TABS[0]);
  const [activePicker, setActivePicker] = useState(null); // 'deviceType' | 'codeList' | 'baudRate' | 'parityCheck' | null
  const [isControlCodeOpen, setIsControlCodeOpen] = useState(false);

  const currentConfig = serialPortConfigs[activePortTab] || {
    port: activePortTab,
    deviceType: 'Interactive LCD Display',
    name: 'Interactive LCD Display',
    protocol: 'TR1310C Pro',
    codeList: 'TR1310C Pro',
    baudRate: '9600',
    parityCheck: 'None',
    codes: [],
  };

  const updateCurrentConfig = (field, val) => {
    setSerialPortConfigs((prev) => ({
      ...prev,
      [activePortTab]: {
        ...prev[activePortTab],
        [field]: val,
      },
    }));
  };

  const handleNameChange = (e) => {
    updateCurrentConfig('name', e.target.value.slice(0, 25));
  };

  const isPtz = currentConfig.deviceType === 'PTZ Camera' || activePortTab === 'RS232-01';

  return (
    <div className="sl100-page-content sl100-serial-settings-page">
      <div className="sl100-subpage-layout-wrap">
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="sl100-serial-settings-main-wrap">
          {/* Top Segmented Tab Strip */}
          <div className="sl100-serial-tab-capsule-bar">
            {SERIAL_PORT_TABS.map((tabKey) => {
              const isActive = tabKey === activePortTab;
              return (
                <button
                  key={tabKey}
                  type="button"
                  className={`sl100-serial-tab-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setActivePortTab(tabKey);
                    setActivePicker(null);
                  }}
                >
                  {tabKey}
                </button>
              );
            })}
          </div>

          {/* 2-Column Setting Grid */}
          <div className="sl100-serial-fields-grid">
            {/* Left Column */}
            <div className="sl100-serial-col">
              {/* Row 1: Device Type with Inline Dropdown (Matches Real Machine Photo) */}
              <div
                className="sl100-serial-card-row clickable"
                style={{ position: 'relative' }}
                onClick={() => setActivePicker(activePicker === 'deviceType' ? null : 'deviceType')}
              >
                <span className="sl100-serial-card-label">Device type</span>
                <div className="sl100-serial-dropdown-val">
                  <span>{currentConfig.deviceType}</span>
                  <ChevronDown size={14} className="sl100-dropdown-arrow" />
                </div>

                <DropdownMenu
                  isOpen={activePicker === 'deviceType'}
                  options={SERIAL_DEVICE_TYPE_OPTIONS}
                  value={currentConfig.deviceType}
                  onSelect={(val) => updateCurrentConfig('deviceType', val)}
                  onClose={() => setActivePicker(null)}
                  align="right"
                  minWidth="175px"
                />
              </div>

              {/* Row 2 */}
              {isPtz ? (
                <div className="sl100-serial-card-row">
                  <span className="sl100-serial-card-label">Serial Protocol</span>
                  <span className="sl100-serial-plain-val">{currentConfig.protocol || 'VISCA'}</span>
                </div>
              ) : (
                <div
                  className="sl100-serial-card-row"
                  style={{ position: 'relative' }}
                >
                  <span className="sl100-serial-card-label">Code list</span>
                  <div className="sl100-serial-btn-val">
                    <span className="sl100-serial-val-text">{currentConfig.codeList}</span>
                    <button
                      type="button"
                      className="sl100-capsule-pill-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePicker(activePicker === 'codeList' ? null : 'codeList');
                      }}
                    >
                      Select
                    </button>
                  </div>

                  <DropdownMenu
                    isOpen={activePicker === 'codeList'}
                    options={SERIAL_CODE_LIST_OPTIONS}
                    value={currentConfig.codeList}
                    onSelect={(val) => updateCurrentConfig('codeList', val)}
                    onClose={() => setActivePicker(null)}
                    align="right"
                    minWidth="160px"
                  />
                </div>
              )}

              {/* Row 3 (Interactive LCD only) */}
              {!isPtz && (
                <div
                  className="sl100-serial-card-row clickable"
                  style={{ position: 'relative' }}
                  onClick={() => setActivePicker(activePicker === 'parityCheck' ? null : 'parityCheck')}
                >
                  <span className="sl100-serial-card-label">Parity check</span>
                  <div className="sl100-serial-dropdown-val">
                    <span>{currentConfig.parityCheck}</span>
                    <ChevronDown size={14} className="sl100-dropdown-arrow" />
                  </div>

                  <DropdownMenu
                    isOpen={activePicker === 'parityCheck'}
                    options={SERIAL_PARITY_CHECK_OPTIONS}
                    value={currentConfig.parityCheck}
                    onSelect={(val) => updateCurrentConfig('parityCheck', val)}
                    onClose={() => setActivePicker(null)}
                    align="right"
                    minWidth="140px"
                  />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="sl100-serial-col">
              {/* Row 1: Name */}
              <div className="sl100-serial-card-row">
                <span className="sl100-serial-card-label">Name</span>
                <div className="sl100-serial-name-group">
                  <input
                    type="text"
                    className="sl100-serial-name-input"
                    value={currentConfig.name}
                    onChange={handleNameChange}
                    maxLength={25}
                    spellCheck={false}
                  />
                  <span className="sl100-serial-counter">
                    {currentConfig.name.length}/25
                  </span>
                </div>
              </div>

              {/* Row 2 (Interactive LCD only) */}
              {!isPtz && (
                <div
                  className="sl100-serial-card-row clickable"
                  style={{ position: 'relative' }}
                  onClick={() => setActivePicker(activePicker === 'baudRate' ? null : 'baudRate')}
                >
                  <span className="sl100-serial-card-label">Baud rate</span>
                  <div className="sl100-serial-dropdown-val">
                    <span>{currentConfig.baudRate}</span>
                    <ChevronDown size={14} className="sl100-dropdown-arrow" />
                  </div>

                  <DropdownMenu
                    isOpen={activePicker === 'baudRate'}
                    options={SERIAL_BAUD_RATE_OPTIONS}
                    value={currentConfig.baudRate}
                    onSelect={(val) => updateCurrentConfig('baudRate', val)}
                    onClose={() => setActivePicker(null)}
                    align="right"
                    minWidth="130px"
                  />
                </div>
              )}

              {/* Row 3 (Interactive LCD only) */}
              {!isPtz && (
                <div className="sl100-serial-card-row">
                  <span className="sl100-serial-card-label">Control code</span>
                  <button
                    type="button"
                    className="sl100-capsule-pill-btn"
                    onClick={() => setIsControlCodeOpen(true)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ControlCodeEditorModal
        isOpen={isControlCodeOpen}
        codes={currentConfig.codes}
        onConfirm={(updatedCodes) => {
          updateCurrentConfig('codes', updatedCodes);
          setIsControlCodeOpen(false);
        }}
        onCancel={() => setIsControlCodeOpen(false)}
      />
    </div>
  );
}
