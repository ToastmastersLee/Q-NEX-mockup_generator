import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Scan,
  MapPin,
  RefreshCcw,
  Monitor,
  Radio,
  Disc3,
  CircleStop,
} from 'lucide-react';
import classroomFeed from '../../../assets/classroom_feed.png';
import { HdmiIcon, PowerControlIcon, VideoSwitchIcon } from '../../../assets/Icons';
import {
  GlassPanel,
  SoftRow,
  SegButton,
  IconButton,
  WindowsIcon,
  AndroidIcon,
} from '../components/common';
import './SerialPage.css';


export function SerialPage() {
  const [activeDetail, setActiveDetail] = useState(null);
  const [rs232Power, setRs232Power] = useState(true);
  const [rs232Input, setRs232Input] = useState('windows');
  
  const [rs485Power, setRs485Power] = useState(true);
  
  const [cbx1ActiveBtn, setCbx1ActiveBtn] = useState(null);
  const handleCbx1Press = (btn) => {
    setCbx1ActiveBtn(btn);
    setTimeout(() => setCbx1ActiveBtn(null), 200);
  };
  
  const [cbx3Power, setCbx3Power] = useState(true);
  const [lectureCapture, setLectureCapture] = useState(true);

  const [rs232ActiveBtn, setRs232ActiveBtn] = useState(null);
  const handleRs232Press = (btn) => {
    setRs232ActiveBtn(btn);
    setTimeout(() => setRs232ActiveBtn(null), 200);
  };

  if (activeDetail === 'RS232') {
    return (
      <div className="ndp-page ndp-scroll-page no-scrollbar">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 20px' }}>
          <div style={{ position: 'absolute', left: 4 }}>
            <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>RS232</h2>
        </div>
        
        {/* Power Card */}
        <GlassPanel style={{ flex: 'none' }}>
          <SoftRow label="Power">
            <SegButton active={rs232Power} onClick={() => setRs232Power(true)}>ON</SegButton>
            <SegButton active={!rs232Power} onClick={() => setRs232Power(false)}>OFF</SegButton>
          </SoftRow>
        </GlassPanel>
        
        {/* Input Source Card */}
        <GlassPanel style={{ flex: 'none' }}>
          <SoftRow 
            label="Input Source"
            style={{ opacity: rs232Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
          >
            <IconButton 
              label="Windows" 
              active={rs232Power && rs232Input === 'windows'} 
              onClick={() => rs232Power && setRs232Input('windows')}
            >
              <WindowsIcon />
            </IconButton>
            <IconButton 
              label="HDMI" 
              active={rs232Power && rs232Input === 'hdmi'} 
              onClick={() => rs232Power && setRs232Input('hdmi')}
            >
              <HdmiIcon />
            </IconButton>
            <IconButton 
              label="Android" 
              active={rs232Power && rs232Input === 'android'} 
              onClick={() => rs232Power && setRs232Input('android')}
            >
              <AndroidIcon />
            </IconButton>
          </SoftRow>
        </GlassPanel>

        {/* Command Buttons */}
        {['HDMI2', 'HDMI3', 'Mute', 'Unmute', 'VOL+', 'VOL-'].map(cmd => {
          const id = cmd.toLowerCase().replace('+', 'plus').replace('-', 'minus');
          return (
            <button 
              key={id}
              className={`ndp-wide-command ${rs232ActiveBtn === id ? 'is-active' : ''}`} 
              type="button"
              onPointerDown={() => handleRs232Press(id)}
              style={{ flex: 'none' }}
            >
              {cmd}
            </button>
          );
        })}
      </div>
    );
  }

  if (activeDetail === 'RS485') {
    return (
      <div className="ndp-page no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 10px' }}>
          <div style={{ position: 'absolute', left: 4 }}>
            <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>RS485</h2>
        </div>

        {/* Video Feed Box */}
        <div style={{ width: '100%', height: '210px', borderRadius: '24px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.08)', background: '#1e2530', flex: 'none' }}>
          <img 
            src={classroomFeed} 
            alt="Classroom Feed" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          
          {/* Zoom Controls */}
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button className="ndp-zoom-btn" type="button"><Plus size={18} /></button>
            <button className="ndp-zoom-btn" type="button"><Minus size={18} /></button>
          </div>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '8px 0' }}>
          <button className="ndp-ptz-action" type="button">ON</button>
          <button className="ndp-ptz-action" type="button">OFF</button>
          <button className="ndp-ptz-action" type="button"><Scan size={18} /></button>
          <button className="ndp-ptz-action" type="button"><MapPin size={18} /></button>
          <button className="ndp-ptz-action" type="button" style={{ fontSize: '9px', fontWeight: 'bold' }}>Preset</button>
        </div>

        {/* PTZ Control Wheel */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ptz-wheel">
            <button className="ptz-btn is-up" type="button"><ChevronUp size={24} /></button>
            <button className="ptz-btn is-left" type="button"><ChevronLeft size={24} /></button>
            <button className="ptz-center-btn" type="button"><RefreshCcw size={20} /></button>
            <button className="ptz-btn is-right" type="button"><ChevronRight size={24} /></button>
            <button className="ptz-btn is-down" type="button"><ChevronDown size={24} /></button>
          </div>
        </div>
      </div>
    );
  }

  if (activeDetail === 'e-Curtain') {
    return (
      <div className="ndp-page ndp-scroll-page">
        <GlassPanel style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '30px' }}>
            <div style={{ position: 'absolute', left: 0 }}>
              <IconButton onClick={() => setActiveDetail(null)}><ChevronLeft /></IconButton>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: 'inherit' }}>e-Curtain</h2>
          </div>
          {['Up', 'Down', 'Stop', 'Dimming1', 'Dimming2', 'All Window'].map(btn => {
            const id = btn.toLowerCase().replace(' ', '');
            return (
              <button 
                key={id}
                className={`ndp-wide-command ${cbx1ActiveBtn === id ? 'is-active' : ''}`} 
                type="button"
                onPointerDown={() => handleCbx1Press(id)}
              >
                {btn}
              </button>
            );
          })}
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="ndp-page ndp-scroll-page">
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <Monitor />
            <h2>RS232</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('RS232')}><ChevronRight /></IconButton>
        </div>
        <SoftRow label="Power">
          <SegButton active={rs232Power} onClick={() => setRs232Power(true)}>ON</SegButton>
          <SegButton active={!rs232Power} onClick={() => setRs232Power(false)}>OFF</SegButton>
        </SoftRow>
        <SoftRow 
          label="Input Source"
          style={{ opacity: rs232Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
        >
          <IconButton 
            label="Windows" 
            active={rs232Power && rs232Input === 'windows'} 
            onClick={() => rs232Power && setRs232Input('windows')}
          >
            <WindowsIcon />
          </IconButton>
          <IconButton 
            label="HDMI" 
            active={rs232Power && rs232Input === 'hdmi'} 
            onClick={() => rs232Power && setRs232Input('hdmi')}
          >
            <HdmiIcon />
          </IconButton>
          <IconButton 
            label="Android" 
            active={rs232Power && rs232Input === 'android'} 
            onClick={() => rs232Power && setRs232Input('android')}
          >
            <AndroidIcon />
          </IconButton>
        </SoftRow>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <Radio />
            <h2>RS485</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('RS485')}><ChevronRight /></IconButton>
        </div>
        <SoftRow label="Power">
          <SegButton active={rs485Power} onClick={() => setRs485Power(true)}>ON</SegButton>
          <SegButton active={!rs485Power} onClick={() => setRs485Power(false)}>OFF</SegButton>
        </SoftRow>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-card-heading">
          <div className="ndp-section-title">
            <PowerControlIcon />
            <h2>e-Curtain</h2>
          </div>
          <IconButton label="Expand" onClick={() => setActiveDetail('e-Curtain')}><ChevronRight /></IconButton>
        </div>
        <button 
          className={`ndp-wide-command ${cbx1ActiveBtn === 'up' ? 'is-active' : ''}`} 
          type="button"
          onPointerDown={() => handleCbx1Press('up')}
        >
          Up
        </button>
        <button 
          className={`ndp-wide-command ${cbx1ActiveBtn === 'down' ? 'is-active' : ''}`} 
          type="button"
          onPointerDown={() => handleCbx1Press('down')}
        >
          Down
        </button>
      </GlassPanel>
      <GlassPanel>
        <div className="ndp-section-title">
          <VideoSwitchIcon />
          <h2>CBX 3</h2>
        </div>
        <SoftRow label="Power">
          <SegButton active={cbx3Power} onClick={() => setCbx3Power(true)}>ON</SegButton>
          <SegButton active={!cbx3Power} onClick={() => setCbx3Power(false)}>OFF</SegButton>
        </SoftRow>
        <SoftRow 
          label="Lecture Capture"
          style={{ opacity: cbx3Power ? 1 : 0.5, transition: 'opacity 0.2s' }}
        >
          <SegButton active={cbx3Power && lectureCapture} onClick={() => cbx3Power && setLectureCapture(true)}>
            <Disc3 size={17} />
          </SegButton>
          <SegButton active={cbx3Power && !lectureCapture} onClick={() => cbx3Power && setLectureCapture(false)}>
            <CircleStop size={17} />
          </SegButton>
        </SoftRow>
      </GlassPanel>
    </div>
  );
}
