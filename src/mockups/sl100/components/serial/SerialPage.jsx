import { useSl100 } from '../../context/useSl100';
import { SerialTabs } from './SerialTabs';
import { PtzCameraPanel } from './PtzCameraPanel';
import { InteractiveDisplayPanel } from './InteractiveDisplayPanel';

export function SerialPage() {
  const { serialTab } = useSl100();

  return (
    <div className="sl100-serial-page-container">
      {/* 4 Tabs on top matching Images 3, 4, 5 */}
      <SerialTabs />

      {/* Main Subpanel Body */}
      <div className="sl100-serial-body">
        {serialTab === 'ptz' ? (
          <PtzCameraPanel />
        ) : (
          <InteractiveDisplayPanel lcdId={serialTab} />
        )}
      </div>
    </div>
  );
}
