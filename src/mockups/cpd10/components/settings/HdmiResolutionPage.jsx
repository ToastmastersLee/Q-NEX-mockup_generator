import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';
import { WheelPickerDrawer } from './WheelPickerDrawer';

const RESOLUTION_OPTIONS = ['1920x1080', '3840x2160'];

/**
 * HdmiResolutionPage
 * Recreates the HDMI OUT Resolution subpage (media_1790430435449.jpg & media_1790430441561.jpg).
 * Features:
 * - 3 Output Rows: HDMI OUT A, HDMI OUT B, HDMI OUT C
 * - WheelPickerDrawer with options: 1920x1080, 3840x2160
 */
export function HdmiResolutionPage() {
  const { setScreen, hdmiResolutions, updateHdmiResolution } = useCpd10();
  const [activePicker, setActivePicker] = useState(null); // 'outA' | 'outB' | 'outC' | null

  const hdmiOutputs = [
    { key: 'outA', label: 'HDMI OUT A', value: hdmiResolutions.outA },
    { key: 'outB', label: 'HDMI OUT B', value: hdmiResolutions.outB },
    { key: 'outC', label: 'HDMI OUT C', value: hdmiResolutions.outC },
  ];

  return (
    <div className="cpd10-page-content cpd10-hdmi-res-page">
      {/* 1. Back button (Col 1, Row 1) */}
      <button
        type="button"
        className="cpd10-subpage-back-btn"
        onClick={() => setScreen('settings')}
        title="Back to Settings"
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      {/* 2. HDMI OUT Rows (Col 2, Rows 1-3) */}
      {hdmiOutputs.map((item, index) => (
        <div
          key={item.key}
          className={`cpd10-info-row cpd10-panel-row-clickable cpd10-hdmi-row-${index + 1}`}
          onClick={() => setActivePicker(item.key)}
        >
          <span className="cpd10-info-label">{item.label}</span>
          <div className="cpd10-info-chevron-val">
            <span>{item.value}</span>
            <ChevronRight size={18} strokeWidth={2.2} />
          </div>
        </div>
      ))}

      {/* Bottom Wheel Picker Drawer */}
      <WheelPickerDrawer
        isOpen={Boolean(activePicker)}
        options={RESOLUTION_OPTIONS}
        value={activePicker ? hdmiResolutions[activePicker] : ''}
        onSelect={(val) => {
          if (activePicker) {
            updateHdmiResolution(activePicker, val);
          }
        }}
        onClose={() => setActivePicker(null)}
      />
    </div>
  );
}
