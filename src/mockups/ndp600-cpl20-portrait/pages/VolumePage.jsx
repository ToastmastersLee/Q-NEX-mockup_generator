import { useState, Fragment } from 'react';
import { Music, VolumeX, Mic, MicOff, Plus, Minus } from 'lucide-react';
import { GlassPanel, IconButton } from '../components/common';
import './VolumePage.css';


export function VolumeControl({ icon: Icon, activeIcon: ActiveIcon, isMuted, onMuteToggle, values, onChange }) {
  const CurrentIcon = isMuted ? ActiveIcon : Icon;
  return (
    <GlassPanel className="ndp-volume-panel">
      <IconButton label="Toggle Mute" active={isMuted} onClick={onMuteToggle}>
        <CurrentIcon size={34} />
      </IconButton>
      {values.map((item, index) => (
        <Fragment key={item.label}>
          {index === 1 && <div className="ndp-fader-divider" />}
          <div className="ndp-fader">
            <button type="button" onClick={() => onChange(item.label, 1)}><Plus size={26} /></button>
            <div className="ndp-fader-tick is-top" />
            <strong>{item.value}</strong>
            <div className="ndp-fader-tick is-bottom" />
            <button type="button" onClick={() => onChange(item.label, -1)}><Minus size={24} /></button>
            <span>{item.label}</span>
          </div>
        </Fragment>
      ))}
    </GlassPanel>
  );
}

export function VolumePage() {
  const [speaker, setSpeaker] = useState({ Audio: 5, Treble: 3, Bass: 3, isMuted: true });
  const [mic, setMic] = useState({ Audio: 3, Treble: 3, Bass: 3, isMuted: true });

  const handleSpeakerChange = (label, change) => {
    setSpeaker(prev => ({
      ...prev,
      [label]: Math.max(0, Math.min(10, prev[label] + change))
    }));
  };

  const handleMicChange = (label, change) => {
    setMic(prev => ({
      ...prev,
      [label]: Math.max(0, Math.min(10, prev[label] + change))
    }));
  };

  return (
    <div className="ndp-page">
      <VolumeControl 
        icon={Music} 
        activeIcon={VolumeX}
        isMuted={speaker.isMuted}
        onMuteToggle={() => setSpeaker(prev => ({ ...prev, isMuted: !prev.isMuted }))}
        values={[
          { label: 'Audio', value: speaker.Audio },
          { label: 'Treble', value: speaker.Treble },
          { label: 'Bass', value: speaker.Bass }
        ]} 
        onChange={handleSpeakerChange}
      />
      <VolumeControl 
        icon={Mic} 
        activeIcon={MicOff}
        isMuted={mic.isMuted}
        onMuteToggle={() => setMic(prev => ({ ...prev, isMuted: !prev.isMuted }))}
        values={[
          { label: 'Audio', value: mic.Audio },
          { label: 'Treble', value: mic.Treble },
          { label: 'Bass', value: mic.Bass }
        ]} 
        onChange={handleMicChange}
      />
    </div>
  );
}
