import { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';
import { DropdownMenu } from '../common/DropdownMenu';

const RESOLUTION_OPTIONS = ['1920*1080', '3840*2160'];

export function HdmiResolutionPage() {
  const { setScreen, hdmiResolution, setHdmiResolution } = useSl100();
  const [activePicker, setActivePicker] = useState(null); // 'outA' | 'outB' | 'outC' | null

  const hdmiOutputs = [
    { key: 'outA', label: 'HDMI OUT A', value: hdmiResolution.outA },
    { key: 'outB', label: 'HDMI OUT B', value: hdmiResolution.outB },
    { key: 'outC', label: 'HDMI OUT C', value: hdmiResolution.outC },
  ];

  const updateRes = (key, val) => {
    setHdmiResolution((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="sl100-page-content sl100-hdmi-res-page">
      <div className="sl100-subpage-layout-wrap">
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="sl100-device-info-main-grid" style={{ flex: 1 }}>
          <div className="sl100-device-info-col1">
            {hdmiOutputs.slice(0, 2).map((item) => (
              <div
                key={item.key}
                className="sl100-info-row-card"
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => setActivePicker(activePicker === item.key ? null : item.key)}
              >
                <span className="sl100-info-card-label">{item.label}</span>
                <div className="sl100-option-chevron-val">
                  <span>{item.value}</span>
                  <ChevronDown size={14} className="sl100-dropdown-arrow" />
                </div>

                <DropdownMenu
                  isOpen={activePicker === item.key}
                  options={RESOLUTION_OPTIONS}
                  value={item.value}
                  onSelect={(val) => updateRes(item.key, val)}
                  onClose={() => setActivePicker(null)}
                  align="right"
                  minWidth="140px"
                />
              </div>
            ))}
          </div>

          <div className="sl100-device-info-col2">
            {hdmiOutputs.slice(2, 3).map((item) => (
              <div
                key={item.key}
                className="sl100-info-row-card"
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => setActivePicker(activePicker === item.key ? null : item.key)}
              >
                <span className="sl100-info-card-label">{item.label}</span>
                <div className="sl100-option-chevron-val">
                  <span>{item.value}</span>
                  <ChevronDown size={14} className="sl100-dropdown-arrow" />
                </div>

                <DropdownMenu
                  isOpen={activePicker === item.key}
                  options={RESOLUTION_OPTIONS}
                  value={item.value}
                  onSelect={(val) => updateRes(item.key, val)}
                  onClose={() => setActivePicker(null)}
                  align="right"
                  minWidth="140px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
