import { useState } from 'react';

export function useSlAudioState() {
  const [speakerVolume, setSpeakerVolume] = useState(70);
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [micVolume, setMicVolume] = useState(65);
  const [micMuted, setMicMuted] = useState(false);

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
