import { Lock, Power } from 'lucide-react';

export function PowerOnScreen({ onPowerOn, onLock }) {
  return (
    <div className="ndp-lock-screen" style={{ justifyContent: 'space-between', paddingBottom: '48px' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="ndp-lock-brand">
          <span className="ndp-logo-mark" />
          <span>nex</span>
        </div>
        <button 
          className="ndp-icon-btn" 
          type="button" 
          onClick={onLock}
          style={{ width: '42px', height: '42px', display: 'grid', placeItems: 'center', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.05)' }}
        >
          <Lock size={18} />
        </button>
      </div>

      {/* Center Power Orb */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button className="ndp-unlock-orb" type="button" onClick={onPowerOn} style={{ marginTop: 0 }}>
          <Power size={46} />
        </button>
      </div>
      
      {/* Bottom Spacer to balance the top bar height */}
      <div style={{ height: '42px' }} />
    </div>
  );
}
