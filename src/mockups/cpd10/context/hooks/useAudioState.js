import { useState } from 'react';
import { getScreenFromUrl } from '../../constants/screens';

export function useAudioState() {
  const [speakerVolume, setSpeakerVolume] = useState(40);
  const [speakerMuted, setSpeakerMuted] = useState(() => getScreenFromUrl() === 'home-dup-hdmi1');
  const [micVolume, setMicVolume] = useState(50);
  const [micMuted, setMicMuted] = useState(() => getScreenFromUrl() === 'home-dup-hdmi1');

  return {
    speakerVolume,
    setSpeakerVolume,
    speakerMuted,
    setSpeakerMuted,
    micVolume,
    setMicVolume,
    micMuted,
    setMicMuted,
  };
}
