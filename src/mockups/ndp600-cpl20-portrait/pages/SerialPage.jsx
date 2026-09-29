import { useState } from 'react';
import {
  ChevronRight,
  Monitor,
  Radio,
  Disc3,
  CircleStop,
} from 'lucide-react';
import { HdmiIcon, PowerControlIcon, VideoSwitchIcon } from '../../../assets/Icons';
import {
  GlassPanel,
  SoftRow,
  SegButton,
  IconButton,
  WindowsIcon,
  AndroidIcon,
} from '../components/common';
import { Rs232Subpage } from '../components/serial/Rs232Subpage';
import { Rs485Subpage } from '../components/serial/Rs485Subpage';
import { CurtainSubpage } from '../components/serial/CurtainSubpage';
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
      <Rs232Subpage 
        onBack={() => setActiveDetail(null)}
        rs232Power={rs232Power}
        setRs232Power={setRs232Power}
        rs232Input={rs232Input}
        setRs232Input={setRs232Input}
        rs232ActiveBtn={rs232ActiveBtn}
        handleRs232Press={handleRs232Press}
      />
    );
  }

  if (activeDetail === 'RS485') {
    return (
      <Rs485Subpage 
        onBack={() => setActiveDetail(null)}
      />
    );
  }

  if (activeDetail === 'e-Curtain') {
    return (
      <CurtainSubpage 
        onBack={() => setActiveDetail(null)}
        cbx1ActiveBtn={cbx1ActiveBtn}
        handleCbx1Press={handleCbx1Press}
      />
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
