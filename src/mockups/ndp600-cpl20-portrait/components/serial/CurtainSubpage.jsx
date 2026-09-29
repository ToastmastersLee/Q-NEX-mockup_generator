import { ChevronLeft } from 'lucide-react';
import { GlassPanel, IconButton } from '../common';

export const CurtainSubpage = ({
    onBack,
    cbx1ActiveBtn,
    handleCbx1Press
}) => {
    return (
        <div className="ndp-page ndp-scroll-page">
            <GlassPanel style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '30px' }}>
                    <div style={{ position: 'absolute', left: 0 }}>
                        <IconButton onClick={onBack} aria-label="Back"><ChevronLeft /></IconButton>
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
};
