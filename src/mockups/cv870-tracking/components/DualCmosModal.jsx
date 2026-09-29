import { useState } from 'react';
import { 
  X, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  Target
} from 'lucide-react';
import classroomFeed from '../../../assets/classroom_feed.png';

export function DualCmosModal({
  isOpen,
  onClose,
  onConfirm
}) {
  const [offset, setOffset] = useState({ x: 12, y: -8 });
  const [isCalibrated, setIsCalibrated] = useState(false);

  if (!isOpen) return null;

  const handleAdjust = (dx, dy) => {
    setOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
  };

  const handleConfirm = () => {
    setIsCalibrated(true);
    setOffset({ x: 0, y: 0 });
    setTimeout(() => {
      onConfirm?.();
      onClose?.();
      setIsCalibrated(false);
    }, 700);
  };

  return (
    <div className="cms-modal-backdrop">
      <div className="cms-dialog-window cms-cmos-dialog">
        {/* Titlebar */}
        <div className="cms-dialog-titlebar">
          <span className="cms-dialog-title">Dual CMOS Electronic Center Calibration</span>
          <button type="button" className="cms-dialog-close" onClick={onClose}>
            <X size={13} />
          </button>
        </div>

        <div className="cms-cmos-body">
          {/* Live calibration preview */}
          <div className="cms-cmos-preview">
            <img src={classroomFeed} alt="Live feed" className="cms-cmos-bg" />

            {/* Primary Sensor Center Crosshair (Fixed Red) */}
            <div className="cms-crosshair is-primary" style={{ left: '50%', top: '50%' }}>
              <div className="cms-crosshair-h" />
              <div className="cms-crosshair-v" />
              <span className="cms-crosshair-label">CMOS 1 (Tracking)</span>
            </div>

            {/* Secondary Sensor Center Crosshair (Adjustable Blue/Green) */}
            <div
              className={`cms-crosshair is-secondary ${offset.x === 0 && offset.y === 0 ? 'is-aligned' : ''}`}
              style={{
                left: `calc(50% + ${offset.x}px)`,
                top: `calc(50% + ${offset.y}px)`
              }}
            >
              <div className="cms-crosshair-h" />
              <div className="cms-crosshair-v" />
              <span className="cms-crosshair-label">
                CMOS 2 ({offset.x === 0 && offset.y === 0 ? 'ALIGNED ✓' : `ΔX:${offset.x} ΔY:${offset.y}`})
              </span>
            </div>

            <div className="cms-cmos-banner">
              {offset.x === 0 && offset.y === 0 ? (
                <span style={{ color: '#10b981', fontWeight: 600 }}>
                  ✓ Dual CMOS centers are aligned! Click OK to apply.
                </span>
              ) : (
                <span>Use direction buttons to adjust both CMOS centers to identical coordinates.</span>
              )}
            </div>
          </div>

          {/* Right Adjust Controls */}
          <div className="cms-cmos-controls">
            <div className="cms-ctrl-section-label">Center Correction</div>

            <div className="cms-closeup-ptz-grid">
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(-2, -2)}>↖</button>
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(0, -2)}>
                <ChevronUp size={14} />
              </button>
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(2, -2)}>↗</button>

              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(-2, 0)}>
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="cms-ptz-btn is-center"
                style={{ fontSize: '10px' }}
                onClick={() => setOffset({ x: 0, y: 0 })}
                title="Auto Zero Offset"
              >
                AUTO
              </button>
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(2, 0)}>
                <ChevronRight size={14} />
              </button>

              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(-2, 2)}>↙</button>
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(0, 2)}>
                <ChevronDown size={14} />
              </button>
              <button type="button" className="cms-ptz-btn" onClick={() => handleAdjust(2, 2)}>↘</button>
            </div>

            <div className="cms-cmos-offset-stats">
              <div>Offset X: <strong>{offset.x} px</strong></div>
              <div>Offset Y: <strong>{offset.y} px</strong></div>
            </div>

            <button
              type="button"
              className={`cms-btn cms-btn-primary ${isCalibrated ? 'is-success' : ''}`}
              style={{ width: '100%', marginTop: '12px', padding: '8px' }}
              onClick={handleConfirm}
            >
              {isCalibrated ? <Check size={14} /> : null}
              <span>{isCalibrated ? 'Calibrated!' : 'OK'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
