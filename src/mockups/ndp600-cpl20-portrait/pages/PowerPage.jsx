import { useState } from 'react';
import { GlassPanel, SoftRow, Toggle } from '../components/common';
import './HomePage.css';


export function PowerPage() {
  const [displayPower, setDisplayPower] = useState(true);
  const [lightPower, setLightPower] = useState(true);

  return (
    <div className="ndp-page">
      <GlassPanel>
        <h2>NDP600</h2>
        <div className="ndp-power-list">
          <SoftRow label="power">
            <Toggle checked={displayPower} onClick={() => setDisplayPower((value) => !value)} />
          </SoftRow>
          <SoftRow label="Light">
            <Toggle checked={lightPower} onClick={() => setLightPower((value) => !value)} />
          </SoftRow>
        </div>
      </GlassPanel>
      <GlassPanel className="ndp-cbx-panel">
        <h2>CBX</h2>
        <div className="ndp-empty-state">Please bind CBX first and select Power Control</div>
      </GlassPanel>
    </div>
  );
}
