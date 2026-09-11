import { useState, useRef } from 'react';
import {
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function OsdSettingPage() {
  const { t } = useTranslation('osd');
  const [color, setColor] = useState('black');
  const [type, setType] = useState('datetime');
  const [corner, setCorner] = useState('top-right');
  const [posX, setPosX] = useState(65);
  const [posY, setPosY] = useState(6);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const colorOptions = [
    { value: 'black', label: t('colorBlack', '黑色') },
    { value: 'white', label: t('colorWhite', '白色') },
  ];

  const typeOptions = [
    { value: 'datetime', label: t('contentDateTime', '日期+时间') },
    { value: 'date', label: t('contentDate', '日期') },
    { value: 'time', label: t('contentTime', '时间') },
  ];

  const previewRef = useRef(null);
  const isDragging = useRef(false);
  const startDragMouse = useRef({ x: 0, y: 0 });
  const startDragPos = useRef({ x: 65, y: 6 });

  const handleStartDrag = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startDragMouse.current = { x: e.clientX, y: e.clientY };
    startDragPos.current = { x: posX, y: posY };

    const onMouseMove = (moveEvent) => {
      if (!isDragging.current || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const deltaX = moveEvent.clientX - startDragMouse.current.x;
      const deltaY = moveEvent.clientY - startDragMouse.current.y;
      const deltaXPercent = (deltaX / rect.width) * 100;
      const deltaYPercent = (deltaY / rect.height) * 100;

      const newX = Math.max(0, Math.min(68, startDragPos.current.x + deltaXPercent));
      const newY = Math.max(0, Math.min(84, startDragPos.current.y + deltaYPercent));

      let newCorner = null;
      if (newX < 20 && newY < 20) newCorner = 'top-left';
      else if (newX < 20 && newY > 60) newCorner = 'bottom-left';
      else if (newX > 50 && newY < 20) newCorner = 'top-right';
      else if (newX > 50 && newY > 60) newCorner = 'bottom-right';

      setPosX(newX);
      setPosY(newY);
      setCorner(newCorner);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const setCornerPosition = (targetCorner) => {
    setCorner(targetCorner);
    if (targetCorner === 'top-left') {
      setPosX(5);
      setPosY(6);
    } else if (targetCorner === 'bottom-left') {
      setPosX(5);
      setPosY(80);
    } else if (targetCorner === 'top-right') {
      setPosX(65);
      setPosY(6);
    } else if (targetCorner === 'bottom-right') {
      setPosX(65);
      setPosY(80);
    }
  };

  const colorMap = {
    black: '#000000',
    white: '#ffffff',
    'Black': '#000000',
    '黑色': '#000000',
    'White': '#ffffff',
    '白色': '#ffffff',
  };

  const getOsdText = () => {
    if (type === 'date' || type === 'Date' || type === '日期') return '2026-08-20';
    if (type === 'time' || type === 'Time' || type === '时间') return '11:40:10';
    return '2026-08-20 11:40:10';
  };

  const handleSave = () => {
    setToastMessage(t('osdSaved', 'OSD configuration saved successfully!'));
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-osd-page">
      <div className="lcs-web-section-title">{t('pageTitle', 'OSD设置')}</div>
      <div className="lcs-web-card lcs-web-osd-card">
        {/* Controls Row */}
        <div className="lcs-web-osd-controls-row">
          <div className="lcs-web-control-item">
            <span>{t('color', '颜色')}</span>
            <NativeSelect
              value={color}
              options={colorOptions}
              onChange={setColor}
            />
          </div>
          <div className="lcs-web-control-item">
            <span>{t('displayContent', '显示内容')}</span>
            <NativeSelect
              value={type}
              options={typeOptions}
              onChange={setType}
            />
          </div>
        </div>

        {/* Preview & Controls Layout */}
        <div className="lcs-web-osd-main-layout">
          {/* Left: Video Preview Box */}
          <div className="lcs-web-osd-preview-box" ref={previewRef}>
            <div
              className="lcs-web-osd-drag-box"
              style={{
                left: `${posX}%`,
                top: `${posY}%`,
              }}
              onMouseDown={handleStartDrag}
            >
              <span
                className="lcs-web-osd-text-render"
                style={{
                  color: colorMap[color] || '#000000',
                }}
              >
                {getOsdText()}
              </span>
            </div>
          </div>

          {/* Right: Position Selector & Tips */}
          <div className="lcs-web-osd-controls-panel">
            <div className="lcs-web-position-section">
              <label className="lcs-web-position-label">{t('displayPosition', '显示位置')}</label>
              <div className="lcs-web-position-grid">
                {/* Top-Left */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${corner === 'top-left' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('top-left')}
                  title="Top Left"
                >
                  <span className="pos-indicator pos-tl" />
                </button>

                {/* Bottom-Left */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${corner === 'bottom-left' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('bottom-left')}
                  title="Bottom Left"
                >
                  <span className="pos-indicator pos-bl" />
                </button>

                {/* Top-Right */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${corner === 'top-right' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('top-right')}
                  title="Top Right"
                >
                  <span className="pos-indicator pos-tr" />
                </button>

                {/* Bottom-Right */}
                <button
                  type="button"
                  className={`lcs-web-pos-btn ${corner === 'bottom-right' ? 'is-active' : ''}`}
                  onClick={() => setCornerPosition('bottom-right')}
                  title="Bottom Right"
                >
                  <span className="pos-indicator pos-br" />
                </button>
              </div>
            </div>

            <div className="lcs-web-osd-tips">
              <strong>{t('tipTitle', '操作提示:')}</strong>
              <p>{t('tip1', '1.单击显示位置下方按钮可改变OSD的位置。')}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="lcs-web-ok mt-4" type="button" onClick={handleSave}>
        {t('ok', '确定')}
      </button>

      {toastMessage && (
        <div className="lcs-web-toast">
          {toastMessage}
        </div>
      )}
    </section>
  );
}
