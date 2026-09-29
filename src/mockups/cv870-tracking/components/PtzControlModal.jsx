import { useState } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  X, 
  Check, 
  Save 
} from 'lucide-react';

export function PtzControlModal({
  isOpen,
  onClose,
  title,
  onSave,
  lang,
  initialPan = 0,
  initialTilt = 0,
  initialZoom = 1.0
}) {
  const [pan, setPan] = useState(initialPan);
  const [tilt, setTilt] = useState(initialTilt);
  const [zoom, setZoom] = useState(initialZoom);
  const [isSet, setIsSet] = useState(false);

  if (!isOpen) return null;

  const handleSet = () => {
    setIsSet(true);
  };

  const handleSave = () => {
    onSave({ pan, tilt, zoom, isSet: true });
    onClose();
  };

  return (
    <div className="cv870-modal-backdrop" onClick={onClose}>
      <div className="cv870-modal-box" onClick={e => e.stopPropagation()}>
        <div className="cv870-modal-header">
          <span>{title || (lang === 'zh' ? '特写画面微调 (Close-up Settings)' : 'Close-up Settings')}</span>
          <button
            type="button"
            className="cv870-action-btn"
            style={{ padding: '4px', border: 'none' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="cv870-modal-body">
          <div className="cv870-ptz-dialog">
            {/* Live Camera Preview with Crosshair and Transform */}
            <div style={{
              width: '100%',
              height: '240px',
              background: '#090d16',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${zoom}) translate(${pan * 2}px, ${tilt * 2}px)`,
                transition: 'transform 0.15s ease-out'
              }}>
                {/* Classroom blackboard / podium mock scene */}
                <div style={{
                  width: '90%',
                  height: '80%',
                  background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                  borderRadius: '6px',
                  border: '2px solid #3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#94a3b8',
                  fontSize: '13px',
                  fontWeight: 600,
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                }}>
                  {lang === 'zh' ? '特写画面预览目标' : 'Close-up Target View'}
                </div>
              </div>

              {/* Center Crosshair Overlay */}
              <div style={{
                position: 'absolute',
                width: '24px',
                height: '24px',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ position: 'absolute', width: '100%', height: '1.5px', background: '#ef4444' }} />
                <div style={{ position: 'absolute', height: '100%', width: '1.5px', background: '#ef4444' }} />
              </div>

              {/* Status Info Tag */}
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                background: 'rgba(0,0,0,0.7)',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#e2e8f0',
                display: 'flex',
                gap: '8px'
              }}>
                <span>Pan: {pan > 0 ? `+${pan}` : pan}</span>
                <span>Tilt: {tilt > 0 ? `+${tilt}` : tilt}</span>
                <span>Zoom: {zoom.toFixed(1)}x</span>
                {isSet && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓ SET</span>}
              </div>
            </div>

            {/* D-Pad Directional Controls & Zoom Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div className="cv870-ptz-dpad">
                <div />
                <button
                  type="button"
                  className="cv870-ptz-btn"
                  onClick={() => setTilt(t => t - 1)}
                  title="Tilt Up"
                >
                  <ChevronUp size={20} />
                </button>
                <div />

                <button
                  type="button"
                  className="cv870-ptz-btn"
                  onClick={() => setPan(p => p - 1)}
                  title="Pan Left"
                >
                  <ChevronLeft size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }} />
                </div>
                <button
                  type="button"
                  className="cv870-ptz-btn"
                  onClick={() => setPan(p => p + 1)}
                  title="Pan Right"
                >
                  <ChevronRight size={20} />
                </button>

                <div />
                <button
                  type="button"
                  className="cv870-ptz-btn"
                  onClick={() => setTilt(t => t + 1)}
                  title="Tilt Down"
                >
                  <ChevronDown size={20} />
                </button>
                <div />
              </div>

              {/* Zoom Buttons & Set */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  className="cv870-action-btn"
                  style={{ justifyContent: 'center' }}
                  onClick={() => setZoom(z => Math.min(3.0, z + 0.2))}
                >
                  <ZoomIn size={16} />
                  <span>Zoom +</span>
                </button>

                <button
                  type="button"
                  className="cv870-action-btn"
                  style={{ justifyContent: 'center' }}
                  onClick={() => setZoom(z => Math.max(1.0, z - 0.2))}
                >
                  <ZoomOut size={16} />
                  <span>Zoom -</span>
                </button>

                <button
                  type="button"
                  className="cv870-action-btn"
                  style={{
                    justifyContent: 'center',
                    background: isSet ? '#10b981' : '#3b82f6',
                    color: '#fff',
                    borderColor: 'transparent',
                    fontWeight: 700
                  }}
                  onClick={handleSet}
                >
                  <Check size={16} />
                  <span>{isSet ? (lang === 'zh' ? '已设定' : 'Set Done') : 'Set'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="cv870-modal-footer">
          <button
            type="button"
            className="cv870-action-btn"
            onClick={onClose}
          >
            {lang === 'zh' ? '取消' : 'Cancel'}
          </button>

          <button
            type="button"
            className="cv870-btn-next"
            style={{ flex: 'none', padding: '8px 20px' }}
            onClick={handleSave}
          >
            <Save size={16} />
            <span>{lang === 'zh' ? '保存 (Save)' : 'Save'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
