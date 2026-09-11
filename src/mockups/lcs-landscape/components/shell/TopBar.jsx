import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useLcs } from '../../context/LcsContext';

export function TopBar() {
  const {
    remainingHours,
    timeString,
    isMuted,
    setIsMuted,
    isSettingsOpen,
    setIsSettingsOpen
  } = useLcs();

  return (
    <div className="lcs-top-bar">
      <div className="lcs-top-left">
        <span className="lcs-brand">IQ</span>
      </div>
      <div className="lcs-top-center">
        <span className="lcs-recording-time">
          Remaining recording time: {remainingHours} hours
        </span>
      </div>
      <div className="lcs-top-right">
        <span className="lcs-clock">{timeString}</span>
        <button 
          type="button" 
          className="lcs-top-icon" 
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button 
          type="button" 
          className="lcs-top-icon" 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          title="Settings"
        >
          <Settings size={15} className={isSettingsOpen ? 'rotate-45' : ''} />
        </button>
      </div>
    </div>
  );
}
