import { useState, useRef } from 'react';
import {
} from 'lucide-react';

const initialLogoPresets = [
  { id: 1, name: 'Preset1', logoUrl: null, posX: 5, posY: 6, corner: 'top-left' },
  { id: 2, name: 'Preset2', logoUrl: null, posX: 5, posY: 6, corner: 'top-left' },
  { id: 3, name: 'Preset3', logoUrl: null, posX: 5, posY: 6, corner: 'top-left' },
  { id: 4, name: 'Preset4', logoUrl: null, posX: 5, posY: 6, corner: 'top-left' },
  { id: 5, name: 'Preset5', logoUrl: null, posX: 5, posY: 6, corner: 'top-left' },
];

export function LogoSettingPage() {
  const [presets, setPresets] = useState(initialLogoPresets);
  const [activePresetId, setActivePresetId] = useState(1);
  const [editingPresetId, setEditingPresetId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;
  const fileInputRef = useRef(null);

  const previewRef = useRef(null);
  const isDragging = useRef(false);
  const startDragMouse = useRef({ x: 0, y: 0 });
  const startDragPos = useRef({ x: 5, y: 6 });

  const activePreset = presets.find(p => p.id === activePresetId) || presets[0];

  const updateActivePreset = (patch) => {
    setPresets(curr => curr.map(p => p.id === activePresetId ? { ...p, ...patch } : p));
  };

  const handleStartDrag = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startDragMouse.current = { x: e.clientX, y: e.clientY };
    startDragPos.current = { x: activePreset.posX, y: activePreset.posY };

    const onMouseMove = (moveEvent) => {
      if (!isDragging.current || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const deltaX = moveEvent.clientX - startDragMouse.current.x;
      const deltaY = moveEvent.clientY - startDragMouse.current.y;
      const deltaXPercent = (deltaX / rect.width) * 100;
      const deltaYPercent = (deltaY / rect.height) * 100;

      const newX = Math.max(0, Math.min(84, startDragPos.current.x + deltaXPercent));
      const newY = Math.max(0, Math.min(82, startDragPos.current.y + deltaYPercent));

      let corner = null;
      if (newX < 15 && newY < 15) corner = 'top-left';
      else if (newX < 15 && newY > 65) corner = 'bottom-left';
      else if (newX > 65 && newY < 15) corner = 'top-right';
      else if (newX > 65 && newY > 65) corner = 'bottom-right';

      updateActivePreset({ posX: newX, posY: newY, corner });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const setCornerPosition = (corner) => {
    if (corner === 'top-left') {
      updateActivePreset({ posX: 5, posY: 6, corner: 'top-left' });
    } else if (corner === 'bottom-left') {
      updateActivePreset({ posX: 5, posY: 76, corner: 'bottom-left' });
    } else if (corner === 'top-right') {
      updateActivePreset({ posX: 80, posY: 6, corner: 'top-right' });
    } else if (corner === 'bottom-right') {
      updateActivePreset({ posX: 80, posY: 76, corner: 'bottom-right' });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateActivePreset({ logoUrl: url });
      setToastMessage('Logo image updated!');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleSave = () => {
    setToastMessage('Logo configuration saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-logo-page">
      <div className="lcs-web-section-title">Logo</div>
      <div className="lcs-web-card lcs-web-logo-card">
        {/* Preset Row */}
        <div className="lcs-web-logo-section">
          <label className="lcs-web-logo-label">Logo Preset</label>
          <div className="lcs-web-presets-row">
            {presets.map(p => {
              const isActive = p.id === activePresetId;
              const isEditing = editingPresetId === p.id;
              return (
                <div
                  key={p.id}
                  className={`lcs-web-preset-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setActivePresetId(p.id);
                  }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      className="lcs-web-preset-edit-input"
                      value={p.name}
                      autoFocus
                      onClick={e => e.stopPropagation()}
                      onChange={e => {
                        const val = e.target.value;
                        setPresets(curr => curr.map(item => item.id === p.id ? { ...item, name: val } : item));
                      }}
                      onBlur={() => setEditingPresetId(null)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') setEditingPresetId(null);
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingPresetId(p.id);
                      }}
                    >
                      {p.name}
                    </span>
                  )}
                  <button
                    type="button"
                    className="lcs-web-preset-icon-btn"
                    title="Rename preset"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePresetId(p.id);
                      setEditingPresetId(isEditing ? null : p.id);
                    }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preview & Controls Layout */}
        <div className="lcs-web-logo-main-layout">
          {/* Left: Video Preview Box */}
          <div className="lcs-web-logo-preview-box" ref={previewRef}>
            <div
              className="lcs-web-logo-drag-box"
              style={{
                left: `${activePreset.posX}%`,
                top: `${activePreset.posY}%`,
              }}
              onMouseDown={handleStartDrag}
            >
              {activePreset.logoUrl ? (
                <img src={activePreset.logoUrl} alt="Logo" className="lcs-web-logo-img" />
              ) : (
                <div className="lcs-web-default-logo">
                  <span>IQ</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Controls & Position & Tips */}
          <div className="lcs-web-logo-controls-panel">
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="lcs-web-choose-file-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </button>
            </div>

            <div className="lcs-web-position-section">
              <label className="lcs-web-position-label">Logo Position</label>
              <div className="lcs-web-position-grid">
                {/* Top-Left */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${activePreset.corner === 'top-left' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('top-left')}
                  title="Top Left"
                >
                  <span className="pos-indicator pos-tl" />
                </button>

                {/* Bottom-Left */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${activePreset.corner === 'bottom-left' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('bottom-left')}
                  title="Bottom Left"
                >
                  <span className="pos-indicator pos-bl" />
                </button>

                {/* Top-Right */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${activePreset.corner === 'top-right' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('top-right')}
                  title="Top Right"
                >
                  <span className="pos-indicator pos-tr" />
                </button>

                {/* Bottom-Right */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${activePreset.corner === 'bottom-right' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('bottom-right')}
                  title="Bottom Right"
                >
                  <span className="pos-indicator pos-br" />
                </button>
              </div>
            </div>

            <div className="lcs-web-logo-tips">
              <strong>TIP:</strong>
              <p>1.Only 24bit and 32bit PNG images are supported;</p>
              <p>2.The image resolution cannot be greater than 1920*1080;</p>
              <p>3.Move the selection box in the preview area to change the position of the logo;</p>
              <p>4.The picture should not exceed the video display range.</p>
            </div>
          </div>
        </div>
      </div>

      <button className="lcs-web-ok mt-4" type="button" onClick={handleSave}>
        OK
      </button>

      {toastMessage && (
        <div className="lcs-web-toast">
          {toastMessage}
        </div>
      )}
    </section>
  );
}
