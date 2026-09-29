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
} from 'lucide-react';
import classroomFeed from '../../../../assets/classroom_feed.png';
import { IconButton } from '../common';

export const Rs485Subpage = ({ onBack }) => {
    return (
        <div className="ndp-page no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%', padding: '10px 4px 10px' }}>
                <div style={{ position: 'absolute', left: 4 }}>
                    <IconButton onClick={onBack} aria-label="Back"><ChevronLeft /></IconButton>
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
};
