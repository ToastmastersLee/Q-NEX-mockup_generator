import { Lock, Unlock, Volume2, VolumeX, Power } from 'lucide-react';
import { IconButton } from '../common';

export function BottomDock({ locked, muted, setLocked, setMuted }) {
  return (
    <footer className="ndp-bottom-dock">
      <IconButton label={locked ? 'Unlock' : 'Lock'} onClick={() => setLocked(true)}>
        {locked ? <Unlock size={24} /> : <Lock size={24} />}
      </IconButton>
      <div className="ndp-dock-divider" />
      <button className={`ndp-volume-half is-left ${muted ? 'is-active' : ''}`} type="button" onClick={() => setMuted(true)} aria-label="Mute">
        <VolumeX size={25} />
      </button>
      <button className={`ndp-volume-half is-right ${!muted ? 'is-active' : ''}`} type="button" onClick={() => setMuted(false)} aria-label="Volume">
        <Volume2 size={25} />
      </button>
      <div className="ndp-dock-divider" />
      <IconButton label="Power" className="ndp-power-btn">
        <Power size={26} />
      </IconButton>
    </footer>
  );
}
