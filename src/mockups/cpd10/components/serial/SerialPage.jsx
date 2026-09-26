import { useCpd10 } from '../../context/Cpd10Context';
import { SerialTabs } from './SerialTabs';
import { Qa1400Panel } from './Qa1400Panel';
import { Ta4532Panel } from './Ta4532Panel';
import { ThreeMPanel } from './ThreeMPanel';
import { Rs485Panel } from './Rs485Panel';

export function SerialPage() {
  const { serialTab } = useCpd10();

  return (
    <div className="cpd10-page-content cpd10-serial-page">
      {/* Top Device Tabs */}
      <SerialTabs />

      {/* Device Panels */}
      <div className="cpd10-serial-content-body">
        {serialTab === 'qa1400' && <Qa1400Panel key="qa1400" />}
        {serialTab === 'ta4532' && <Ta4532Panel key="ta4532" />}
        {serialTab === '3m' && <ThreeMPanel key="3m" />}
        {serialTab === 'rs485' && <Rs485Panel key="rs485" />}
      </div>
    </div>
  );
}
