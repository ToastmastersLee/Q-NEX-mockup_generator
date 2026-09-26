import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { WheelPickerDrawer } from './WheelPickerDrawer';
import { ControlCodeEditorModal } from './ControlCodeEditorModal';
import {
  SERIAL_PORT_TABS,
  SERIAL_DEVICE_TYPE_OPTIONS,
  SERIAL_CODE_LIST_OPTIONS,
  SERIAL_BAUD_RATE_OPTIONS,
  SERIAL_PARITY_CHECK_OPTIONS,
} from '../../constants/serialConfigs';

/**
 * SerialSettingsPage
 * Recreates the Serial Port Settings interface seen in Photos 1~5 (media_1790428406805.jpg ~ media_1790428419263.jpg).
 * Features:
 * - 4 Port Tabs: RS232-01, RS232-02, RS485-01, RS485-02
 * - Row 1: Device type (Interactive LCD Display, etc.)
 * - Row 2: Name input with live character counter (10/20)
 * - Row 3: Code list (Customize, TR1310C Pro, QA1300 Pro, QA1400 Pro, TE1410D Pro)
 * - Row 4: Baud rate (1200 ~ 115200)
 * - Row 5: Parity check (None, Odd, Even)
 * - Row 6: Control code > (Opens full Control Code Editor)
 */
export function SerialSettingsPage() {
  const {
    setScreen,
    serialConfigs,
    activeSerialTab,
    setActiveSerialTab,
    updateSerialPortConfig,
    updateSerialPortCodes,
  } = useCpd10();

  // Active drawer picker state: 'deviceType' | 'codeList' | 'baudRate' | 'parityCheck' | null
  const [activePicker, setActivePicker] = useState(null);

  // Full Control Code Editor modal state
  const [isControlCodeOpen, setIsControlCodeOpen] = useState(false);

  const currentConfig = serialConfigs[activeSerialTab] || {
    port: activeSerialTab,
    deviceType: 'Interactive LCD Display',
    name: 'QA1400 PRO',
    codeList: 'Customize',
    baudRate: '9600',
    parityCheck: 'None',
    codes: [],
  };

  const handleNameChange = (e) => {
    const val = e.target.value.slice(0, 20);
    updateSerialPortConfig(activeSerialTab, { name: val });
  };

  return (
    <div className="cpd10-page-content cpd10-serial-settings-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings')}
        title="Back to Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. Top Segmented Port Tabs (Col 2, Row 1) */}
      <div className="cpd10-serial-tabs-strip">
        {SERIAL_PORT_TABS.map((tabKey) => {
          const isActive = tabKey === activeSerialTab;
          return (
            <button
              key={tabKey}
              type="button"
              className={`cpd10-serial-tab-pill ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                setActiveSerialTab(tabKey);
                setActivePicker(null);
              }}
            >
              <span>{tabKey}</span>
            </button>
          );
        })}
      </div>

      {/* Row 1: Device type */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-serial-row-1"
        onClick={() => setActivePicker('deviceType')}
      >
        <span className="cpd10-info-label">Device type</span>
        <div className="cpd10-info-chevron-val">
          <span>{currentConfig.deviceType}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 2: Name with live character counter */}
      <div className="cpd10-info-row cpd10-serial-row-2">
        <span className="cpd10-info-label">Name</span>
        <div className="cpd10-serial-name-input-box">
          <input
            type="text"
            className="cpd10-serial-name-input"
            value={currentConfig.name}
            onChange={handleNameChange}
            maxLength={20}
            spellCheck={false}
          />
          <span className="cpd10-serial-name-counter">
            {currentConfig.name.length}/20
          </span>
        </div>
      </div>

      {/* Row 3: Code list */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-serial-row-3"
        onClick={() => setActivePicker('codeList')}
      >
        <span className="cpd10-info-label">Code list</span>
        <div className="cpd10-info-chevron-val">
          <span>{currentConfig.codeList}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 4: Baud rate */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-serial-row-4"
        onClick={() => setActivePicker('baudRate')}
      >
        <span className="cpd10-info-label">Baud rate</span>
        <div className="cpd10-info-chevron-val">
          <span>{currentConfig.baudRate}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 5: Parity check */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-serial-row-5"
        onClick={() => setActivePicker('parityCheck')}
      >
        <span className="cpd10-info-label">Parity check</span>
        <div className="cpd10-info-chevron-val">
          <span>{currentConfig.parityCheck}</span>
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Row 6: Control code */}
      <div
        className="cpd10-info-row cpd10-panel-row-clickable cpd10-serial-row-6"
        onClick={() => setIsControlCodeOpen(true)}
      >
        <span className="cpd10-info-label">Control code</span>
        <div className="cpd10-info-chevron-val">
          <ChevronRight size={18} strokeWidth={2.2} />
        </div>
      </div>

      {/* Bottom Option Drawers */}
      <WheelPickerDrawer
        isOpen={activePicker === 'deviceType'}
        options={SERIAL_DEVICE_TYPE_OPTIONS}
        value={currentConfig.deviceType}
        onSelect={(val) => updateSerialPortConfig(activeSerialTab, { deviceType: val })}
        onClose={() => setActivePicker(null)}
      />

      <WheelPickerDrawer
        isOpen={activePicker === 'codeList'}
        options={SERIAL_CODE_LIST_OPTIONS}
        value={currentConfig.codeList}
        onSelect={(val) => updateSerialPortConfig(activeSerialTab, { codeList: val })}
        onClose={() => setActivePicker(null)}
      />

      <WheelPickerDrawer
        isOpen={activePicker === 'baudRate'}
        options={SERIAL_BAUD_RATE_OPTIONS}
        value={currentConfig.baudRate}
        onSelect={(val) => updateSerialPortConfig(activeSerialTab, { baudRate: val })}
        onClose={() => setActivePicker(null)}
      />

      <WheelPickerDrawer
        isOpen={activePicker === 'parityCheck'}
        options={SERIAL_PARITY_CHECK_OPTIONS}
        value={currentConfig.parityCheck}
        onSelect={(val) => updateSerialPortConfig(activeSerialTab, { parityCheck: val })}
        onClose={() => setActivePicker(null)}
      />

      {/* Full Control Code Editor Modal (Photo 5) */}
      <ControlCodeEditorModal
        isOpen={isControlCodeOpen}
        codes={currentConfig.codes}
        onConfirm={(updatedCodes) => {
          updateSerialPortCodes(activeSerialTab, updatedCodes);
          setIsControlCodeOpen(false);
        }}
        onCancel={() => setIsControlCodeOpen(false)}
      />
    </div>
  );
}
