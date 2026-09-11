import { useState, useRef } from 'react';
import {
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

const initialSubtitlePresets = [
  { id: 1, name: 'Preset1', text: 'Default subtitles 1', font: 'Arial', size: '12', color: 'black', mode: 'fixed', topPercent: 82 },
  { id: 2, name: 'Preset2', text: 'Preset2', font: 'Arial', size: '12', color: 'black', mode: 'fixed', topPercent: 82 },
  { id: 3, name: 'Preset3', text: 'Preset3', font: 'Arial', size: '12', color: 'black', mode: 'fixed', topPercent: 82 },
  { id: 4, name: 'Preset4', text: 'Preset4', font: 'Arial', size: '12', color: 'black', mode: 'fixed', topPercent: 82 },
  { id: 5, name: 'Preset5', text: 'Preset5', font: 'Arial', size: '12', color: 'black', mode: 'fixed', topPercent: 82 },
];

export function SubtitleSettingPage() {
  const { t } = useTranslation('subtitle');
  const [presets, setPresets] = useState(initialSubtitlePresets);
  const [activePresetId, setActivePresetId] = useState(1);
  const [editingPresetId, setEditingPresetId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const previewRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startTop = useRef(82);

  const activePreset = presets.find(p => p.id === activePresetId) || presets[0];

  const updateActivePreset = (patch) => {
    setPresets(curr => curr.map(p => p.id === activePresetId ? { ...p, ...patch } : p));
  };

  const handleStartDrag = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startTop.current = activePreset.topPercent;

    const onMouseMove = (moveEvent) => {
      if (!isDragging.current || !previewRef.current) return;
      const rect = previewRef.current.getBoundingClientRect();
      const deltaY = moveEvent.clientY - startY.current;
      const deltaPercent = (deltaY / rect.height) * 100;
      let newTop = Math.max(0, Math.min(84, startTop.current + deltaPercent));
      updateActivePreset({ topPercent: newTop });
    };

    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleSave = () => {
    setToastMessage('Subtitle configuration saved successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const colorMap = {
    black: '#000000',
    white: '#ffffff',
    red: '#e60012',
    yellow: '#eab308',
    blue: '#178bff',
    green: '#10b981',
    Black: '#000000',
    White: '#ffffff',
    Red: '#e60012',
    Yellow: '#eab308',
    Blue: '#178bff',
    Green: '#10b981',
    '黑色': '#000000',
    '白色': '#ffffff',
    '红色': '#e60012',
    '黄色': '#eab308',
    '蓝色': '#178bff',
    '绿色': '#10b981',
  };

  const colorOptions = [
    { value: 'black', label: t('black', '黑色') },
    { value: 'white', label: t('white', '白色') },
    { value: 'red', label: t('red', '红色') },
    { value: 'yellow', label: t('yellow', '黄色') },
    { value: 'blue', label: t('blue', '蓝色') },
    { value: 'green', label: t('green', '绿色') },
  ];

  const modeOptions = [
    { value: 'fixed', label: t('fixedMode', '固定模式') },
    { value: 'scroll', label: t('scrollMode', '滚动模式') },
  ];

  return (
    <section className="lcs-web-page lcs-web-subtitle-page">
      <div className="lcs-web-section-title">{t('pageTitle', '字幕')}</div>
      <div className="lcs-web-card lcs-web-subtitle-card">
        {/* Preset Row */}
        <div className="lcs-web-subtitle-section">
          <label className="lcs-web-subtitle-label">{t('subtitlePreset', '字幕预设')}</label>
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

        {/* Formatting Controls Row */}
        <div className="lcs-web-subtitle-controls-row">
          <div className="lcs-web-control-item">
            <span>{t('font', '字体')}</span>
            <NativeSelect
              value={activePreset.font}
              options={['Arial', 'Times New Roman', 'Microsoft YaHei', 'SimSun', 'Verdana', 'Tahoma']}
              onChange={font => updateActivePreset({ font })}
            />
          </div>
          <div className="lcs-web-control-item">
            <span>{t('size', '大小')}</span>
            <NativeSelect
              value={activePreset.size}
              options={['10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48']}
              onChange={size => updateActivePreset({ size })}
            />
          </div>
          <div className="lcs-web-control-item">
            <span>{t('color', '颜色')}</span>
            <NativeSelect
              value={activePreset.color}
              options={colorOptions}
              onChange={color => updateActivePreset({ color })}
            />
          </div>
          <div className="lcs-web-control-item">
            <span>{t('mode', '字幕模式')}</span>
            <NativeSelect
              value={activePreset.mode}
              options={modeOptions}
              onChange={mode => updateActivePreset({ mode })}
            />
          </div>
        </div>

        {/* Subtitle Text Input Row */}
        <div className="lcs-web-subtitle-input-wrap">
          <input
            type="text"
            className="lcs-web-subtitle-text-input"
            value={activePreset.text}
            maxLength={25}
            placeholder="Default subtitles 1"
            onChange={e => updateActivePreset({ text: e.target.value })}
          />
          <span className="lcs-web-subtitle-char-count">{activePreset.text.length}/25</span>
        </div>

        {/* Video Preview and Tips Area */}
        <div className="lcs-web-subtitle-preview-layout">
          <div className="lcs-web-subtitle-preview-box" ref={previewRef}>
            <div
              className="lcs-web-subtitle-drag-box"
              style={{
                top: `${activePreset.topPercent}%`,
              }}
              onMouseDown={handleStartDrag}
            >
              <span
                className="lcs-web-subtitle-text-render"
                style={{
                  fontFamily: activePreset.font,
                  fontSize: `${Math.max(13, Number(activePreset.size) * 1.25)}px`,
                  color: colorMap[activePreset.color] || '#000000',
                }}
              >
                {activePreset.text || 'Default subtitles 1'}
              </span>
            </div>
          </div>

          <div className="lcs-web-subtitle-tips">
            <strong>{t('tipTitle', '操作提示:')}</strong>
            <p>{t('tip1', '1.单击选中上方预设按钮可查看对应设置的字幕;')}</p>
            <p>{t('tip2', '2.单击输入框可编辑修改文字并保存;')}</p>
            <p>{t('tip3', '3.移动预览区内的选框可改变字幕的位置。')}</p>
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
