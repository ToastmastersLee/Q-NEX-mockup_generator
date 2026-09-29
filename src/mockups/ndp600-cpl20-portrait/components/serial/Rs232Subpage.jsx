import { ChevronLeft } from 'lucide-react';
import { HdmiIcon } from '../../../../assets/Icons';
import { GlassPanel, SoftRow, SegButton, IconButton, WindowsIcon, AndroidIcon } from '../common';

export const Rs232Subpage = ({
    onBack,
    rs232Power,
    setRs232Power,
    rs232Input,
    setRs232Input,
    rs232ActiveBtn,
    handleRs232Press
}) => {
    return (
        <div className="ndp-page ndp-scroll-page no-scrollbar">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 20px' }}>
                <div style={{ position: 'absolute', left: 4 }}>
                    <IconButton onClick={onBack} aria-label="Back"><ChevronLeft /></IconButton>
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
};
