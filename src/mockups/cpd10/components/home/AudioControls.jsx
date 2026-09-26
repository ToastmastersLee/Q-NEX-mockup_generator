import { Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

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
  } = useCpd10();

  const handleSliderClick = (e, setter) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;
    // Value from 0 to 100 (bottom is 0, top is 100)
    const rawVal = Math.round(((height - clickY) / height) * 100);
    const clamped = Math.max(0, Math.min(100, rawVal));
    setter(clamped);
  };

  return (
    <div className="cpd10-panel cpd10-audio-panel">
      <div className="cpd10-audio-columns">
        {/* Speaker Column */}
        <div className="cpd10-audio-col">
          <span className="cpd10-audio-label">Speaker</span>
          <div
            className="cpd10-vertical-fader-track"
            onClick={(e) => handleSliderClick(e, setSpeakerVolume)}
          >
            <div
              className={`cpd10-vertical-fader-fill speaker ${speakerMuted ? 'is-muted' : ''}`}
              style={{ height: `${speakerMuted ? 0 : speakerVolume}%` }}
            />
          </div>
          <button
            type="button"
            className={`cpd10-audio-mute-btn ${speakerMuted ? 'is-muted' : ''}`}
            onClick={() => setSpeakerMuted(!speakerMuted)}
            title="Toggle Speaker Mute"
          >
            {speakerMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Mic Column */}
        <div className="cpd10-audio-col">
          <span className="cpd10-audio-label">Mic</span>
          <div
            className="cpd10-vertical-fader-track"
            onClick={(e) => handleSliderClick(e, setMicVolume)}
          >
            <div
              className={`cpd10-vertical-fader-fill mic ${micMuted ? 'is-muted' : ''}`}
              style={{ height: `${micMuted ? 0 : micVolume}%` }}
            />
          </div>
          <button
            type="button"
            className={`cpd10-audio-mute-btn ${micMuted ? 'is-muted' : ''}`}
            onClick={() => setMicMuted(!micMuted)}
            title="Toggle Mic Mute"
          >
            {micMuted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
