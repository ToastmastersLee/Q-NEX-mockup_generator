import { useState } from 'react';
import { 
  X, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  ZoomIn,
  ZoomOut,
  Save,
  Check
} from 'lucide-react';
import classroomFeed from '../../../assets/classroom_feed.png';

export function CloseUpSettingsModal({
  isOpen,
  title = 'Close-up Settings',
  targetType = 'desk', // 'desk' | 'blackboard_left' | 'blackboard_right'
  onClose,
  onSave
}) {
  const [zoomLevel, setZoomLevel] = useState(1.4);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handlePan = (dx, dy) => {
    setPanOffset(prev => ({
      x: Math.max(-50, Math.min(50, prev.x + dx)),
      y: Math.max(-50, Math.min(50, prev.y + dy))
    }));
  };

  const handleZoom = (dz) => {
    setZoomLevel(prev => Math.max(1, Math.min(3, +(prev + dz).toFixed(1))));
  };

  const handleSetConfirm = () => {
    setIsSaved(true);
    setTimeout(() => {
      onSave?.({ zoomLevel, panOffset });
      onClose?.();
      setIsSaved(false);
    }, 600);
  };

  return (
    <div className="cms-modal-backdrop">
      <div className="cms-dialog-window cms-closeup-dialog">
        {/* Titlebar */}
        <div className="cms-dialog-titlebar">
          <span className="cms-dialog-title">{title}</span>
          <button type="button" className="cms-dialog-close" onClick={onClose}>
            <X size={13} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="cms-closeup-body">
          {/* Left Preview Pane */}
          <div className="cms-closeup-preview">
            <div 
              className="cms-closeup-viewport"
              style={{
                backgroundImage: `url(${classroomFeed})`,
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundPosition: `${50 + panOffset.x}% ${45 + panOffset.y}%`
              }}
            >
              {/* Framing target box */}
              <div className="cms-framing-box">
                <span className="cms-framing-target-tag">
                  {targetType === 'blackboard_left' ? 'Left Blackboard' :
                   targetType === 'blackboard_right' ? 'Right Blackboard' : 'Podium / Desk Area'}
                </span>
              </div>
            </div>
            <div className="cms-closeup-info">
              <span>Zoom: {zoomLevel}x</span>
              <span>Pan X: {panOffset.x > 0 ? `+${panOffset.x}` : panOffset.x}° | Y: {panOffset.y > 0 ? `+${panOffset.y}` : panOffset.y}°</span>
            </div>
          </div>

          {/* Right PTZ & Zoom Controls */}
          <div className="cms-closeup-controls">
            <div className="cms-ctrl-section-label">PTZ</div>

            {/* 8-Way Arrow Grid */}
            <div className="cms-closeup-ptz-grid">
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(-4, -4)}>↖</button>
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(0, -4)}>
                <ChevronUp size={14} />
              </button>
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(4, -4)}>↗</button>

              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(-4, 0)}>
                <ChevronLeft size={14} />
              </button>
              <div className="cms-ptz-btn is-center">PTZ</div>
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(4, 0)}>
                <ChevronRight size={14} />
              </button>

              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(-4, 4)}>↙</button>
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(0, 4)}>
                <ChevronDown size={14} />
              </button>
              <button type="button" className="cms-ptz-btn" onClick={() => handlePan(4, 4)}>↘</button>
            </div>

            {/* Zoom Controls */}
            <div className="cms-closeup-zoom-row">
              <button
                type="button"
                className="cms-btn cms-btn-tool"
                onClick={() => handleZoom(0.2)}
                title="Zoom In"
              >
                <Plus size={12} />
                <span>Zoom</span>
              </button>
              <button
                type="button"
                className="cms-btn cms-btn-tool"
                onClick={() => handleZoom(-0.2)}
                title="Zoom Out"
              >
                <Minus size={12} />
              </button>
            </div>

            {/* Set Button */}
            <button
              type="button"
              className={`cms-btn cms-btn-primary cms-btn-set ${isSaved ? 'is-success' : ''}`}
              onClick={handleSetConfirm}
            >
              {isSaved ? <Check size={14} /> : null}
              <span>{isSaved ? 'Position Set!' : 'Set'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
