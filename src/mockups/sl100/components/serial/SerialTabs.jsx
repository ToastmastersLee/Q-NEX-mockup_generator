import { useSl100 } from '../../context/useSl100';
import { SL100_SERIAL_TABS } from '../../constants/serialConfigs';

export function SerialTabs() {
  const { serialTab, setSerialTab } = useSl100();

  return (
    <div className="sl100-serial-tabs-nav">
      {SL100_SERIAL_TABS.map((tab, index) => {
        const isActive = serialTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`sl100-serial-tab-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => setSerialTab(tab.id)}
            title={`${tab.label} (${index + 1})`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
