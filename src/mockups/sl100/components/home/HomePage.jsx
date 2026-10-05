import { useSl100 } from '../../context/useSl100';
import { VideoSwitchDuplicate } from './VideoSwitchDuplicate';
import { VideoSwitchMatrix } from './VideoSwitchMatrix';
import { AudioControls } from './AudioControls';
import { LiftTableCard } from './LiftTableCard';
import { ElectricLockCard } from './ElectricLockCard';
import { SerialPortCard } from './SerialPortCard';

export function HomePage() {
  const { duplicateMode } = useSl100();

  return (
    <div className="sl100-home-container">
      {/* 1. Video Switcher (Duplicate or Matrix) */}
      <div className="sl100-home-col-video">
        {duplicateMode ? <VideoSwitchDuplicate /> : <VideoSwitchMatrix />}
      </div>

      {/* 2. Speaker and MIC Controls */}
      <div className="sl100-home-col-audio">
        <AudioControls />
      </div>

      {/* 3. Lectern Lift Table */}
      <div className="sl100-home-col-lift">
        <LiftTableCard />
      </div>

      {/* 4. Rightmost Stack: Electric Lock + Serial Port Entry */}
      <div className="sl100-home-col-side">
        <ElectricLockCard />
        <SerialPortCard />
      </div>
    </div>
  );
}
