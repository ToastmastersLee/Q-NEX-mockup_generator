import { useState } from 'react';
import { Volume2, VolumeX, Monitor } from 'lucide-react';
import {
  ProjectorScreenIcon,
  PowerControlIcon,
  VideoSwitchIcon,
  SerialIcon,
  RemoteControlIcon,
} from '../../../assets/Icons';
import { GlassPanel, IconButton } from '../components/common';
import { AirPage } from './AirPage';
import './HomePage.css';


export function HomePage({ homepageWidgets }) {
  const [activeBtn, setActiveBtn] = useState(null);

  const handlePress = (btn) => {
    setActiveBtn(btn);
    setTimeout(() => setActiveBtn(null), 200);
  };

  return (
    <div className="ndp-page ndp-scroll-page" style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
      {homepageWidgets.map((widgetId) => {
        if (widgetId === 'air') {
          return <AirPage key="air" compact />;
        }
        if (widgetId === 'projector') {
          return (
            <GlassPanel key="projector">
              <div className="ndp-section-title">
                <ProjectorScreenIcon />
                <h2>Projection<br />Screen</h2>
              </div>
              <div className="ndp-projector-box">
                <IconButton label="Up" active={activeBtn === 'up'} onClick={() => handlePress('up')}><ProjectorScreenIcon /></IconButton>
                <IconButton label="Stop" active={activeBtn === 'stop'} onClick={() => handlePress('stop')}><Monitor size={38} /></IconButton>
                <IconButton label="Down" active={activeBtn === 'down'} onClick={() => handlePress('down')}><ProjectorScreenIcon /></IconButton>
                <span>Up</span>
                <span>Stop</span>
                <span>Down</span>
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'power') {
          return (
            <GlassPanel key="power">
              <div className="ndp-section-title">
                <PowerControlIcon />
                <h2>Power Control</h2>
              </div>
              <div className="ndp-onoff" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center' }}>Display ON</button>
                <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center' }}>External ON</button>
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'video') {
          return (
            <GlassPanel key="video">
              <div className="ndp-section-title">
                <VideoSwitchIcon />
                <h2>Video Switch</h2>
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', width: '100%', justifyContent: 'space-between' }}>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center', padding: '6px' }}>OPS</button>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center', padding: '6px' }}>HDMI 1</button>
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'volume') {
          return (
            <GlassPanel key="volume">
              <div className="ndp-section-title">
                <Volume2 size={18} />
                <h2>Volume Control</h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginTop: '12px' }}>
                <VolumeX size={16} />
                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ width: '70%', height: '100%', background: '#00c8ff', borderRadius: '2px' }} />
                  <div style={{ position: 'absolute', left: '70%', top: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%' }} />
                </div>
                <Volume2 size={16} />
              </div>
            </GlassPanel>
          );
        }
        if (widgetId === 'serial') {
          return (
            <GlassPanel key="serial">
              <div className="ndp-section-title">
                <SerialIcon />
                <h2>Serial Control</h2>
              </div>
              <button className="ndp-device-select" style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}>Send RS232 Power ON</button>
            </GlassPanel>
          );
        }
        if (widgetId === 'remote') {
          return (
            <GlassPanel key="remote">
              <div className="ndp-section-title">
                <RemoteControlIcon />
                <h2>Remote Control</h2>
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '12px', width: '100%' }}>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center' }}>Menu</button>
                <button className="ndp-device-select" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
              </div>
            </GlassPanel>
          );
        }
        return null;
      })}
      {homepageWidgets.length === 0 && (
        <GlassPanel className="ndp-cbx-panel">
          <div className="ndp-empty-state">No home modules selected</div>
        </GlassPanel>
      )}
    </div>
  );
}
