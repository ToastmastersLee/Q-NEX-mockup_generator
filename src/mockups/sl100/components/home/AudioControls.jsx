import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

export function AudioControls() {
  const {
    speakerVolume,
    setSpeakerVolume,
    speakerMuted,
    setSpeakerMuted,
    micVolume,
    setMicVolume,
    micMuted,
    setMicMuted,
  } = useSl100();

  const handleSliderClick = (e, setter) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;
    const rawVal = Math.round(((height - clickY) / height) * 100);
    const clamped = Math.max(0, Math.min(100, rawVal));
    setter(clamped);
  };

  return (
    <div className="sl100-panel sl100-audio-panel">
      <div className="sl100-audio-columns">
        {/* Speaker Column */}
        <div className="sl100-audio-col">
          <span className="sl100-audio-label">Speaker</span>
          <div
            className="sl100-vertical-fader-track"
            onClick={(e) => handleSliderClick(e, setSpeakerVolume)}
          >
            <div
              className={`sl100-vertical-fader-fill speaker ${speakerMuted ? 'is-muted' : ''}`}
              style={{ height: `${speakerMuted ? 0 : speakerVolume}%` }}
            />
          </div>
          <button
            type="button"
            className={`sl100-audio-mute-btn ${speakerMuted ? 'is-muted' : ''}`}
            onClick={() => setSpeakerMuted(!speakerMuted)}
            title="Toggle Speaker Mute"
          >
            {speakerMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Mic Column */}
        <div className="sl100-audio-col">
          <span className="sl100-audio-label">MIC</span>
          <div
            className="sl100-vertical-fader-track"
            onClick={(e) => handleSliderClick(e, setMicVolume)}
          >
            <div
              className={`sl100-vertical-fader-fill mic ${micMuted ? 'is-muted' : ''}`}
              style={{ height: `${micMuted ? 0 : micVolume}%` }}
            />
          </div>
          <button
            type="button"
            className={`sl100-audio-mute-btn ${micMuted ? 'is-muted' : ''}`}
            onClick={() => setMicMuted(!micMuted)}
            title="Toggle Mic Mute"
          >
            {micMuted ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
