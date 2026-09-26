import { useCpd10 } from '../../context/Cpd10Context';

export const SERIAL_TABS = [
  { id: 'qa1400', label: 'QA1400 PRO' },
  { id: 'ta4532', label: 'RS232-2 TA4532' },
  { id: '3m', label: '3M-8635/8670/8745/8770' },
  { id: 'rs485', label: 'RS485-02' },
];

export function SerialTabs() {
  const { serialTab, setSerialTab } = useCpd10();

  return (
    <div className="cpd10-serial-tabs-nav">
      {SERIAL_TABS.map((tab) => {
        const isActive = serialTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`cpd10-serial-tab-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => setSerialTab(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
