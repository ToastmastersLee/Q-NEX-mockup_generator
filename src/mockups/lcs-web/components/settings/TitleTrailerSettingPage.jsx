import { useState, useRef } from 'react';
import {
} from 'lucide-react';
import { useTranslation } from '../../i18n';

const initialTitleTrailerPresets = [
  { id: 1, name: 'Preset1', imageUrl: null, filename: '', duration: '0' },
  { id: 2, name: 'Preset2', imageUrl: null, filename: '', duration: '0' },
  { id: 3, name: 'Preset3', imageUrl: null, filename: '', duration: '0' },
  { id: 4, name: 'Preset4', imageUrl: null, filename: '', duration: '0' },
  { id: 5, name: 'Preset5', imageUrl: null, filename: '', duration: '0' },
];

function TitleTrailerSection({ titleKey, presets, activeId, setActiveId, updatePreset, onSave }) {
  const { t } = useTranslation('titleTrailer');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const activePreset = presets.find(p => p.id === activeId) || presets[0];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updatePreset(activeId, { imageUrl: url, filename: file.name });
    }
  };

  const handleDelete = () => {
    updatePreset(activeId, { imageUrl: null, filename: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const sectionLabel = titleKey === 'title' ? t('titleSection', '片头') : t('trailerSection', '片尾');
  const presetLabel = titleKey === 'title' ? t('titlePreset', '片头预设') : t('trailerPreset', '片尾预设');

  return (
    <div className="lcs-web-title-trailer-block">
      <div className="lcs-web-section-title">{sectionLabel}</div>
      <div className="lcs-web-card lcs-web-title-trailer-card">
        {/* Preset Row */}
        <div className="lcs-web-tt-section">
          <label className="lcs-web-tt-label">{presetLabel}</label>
          <div className="lcs-web-presets-row">
            {presets.map(p => {
              const isActive = p.id === activeId;
              const isEditing = editingId === p.id;
              return (
                <div
                  key={p.id}
                  className={`lcs-web-preset-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveId(p.id)}
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
                        updatePreset(p.id, { name: val });
                      }}
                      onBlur={() => setEditingId(null)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') setEditingId(null);
                      }}
                    />
                  ) : (
                    <span
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        setEditingId(p.id);
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
                      setActiveId(p.id);
                      setEditingId(isEditing ? null : p.id);
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

        {/* Main Content Layout */}
        <div className="lcs-web-tt-main-layout">
          {/* Left: Video Preview Box */}
          <div className="lcs-web-tt-preview-box">
            {activePreset.imageUrl ? (
              <img src={activePreset.imageUrl} alt={`${sectionLabel} Preview`} className="lcs-web-tt-preview-img" />
            ) : (
              <div className="lcs-web-tt-empty-preview" />
            )}
          </div>

          {/* Right: Controls & Tips */}
          <div className="lcs-web-tt-controls-panel">
            {/* File Upload Row */}
            <div className="lcs-web-tt-file-row">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/bmp"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="lcs-web-choose-file-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                {t('chooseFile', '选择文件')}
              </button>
              <span className="lcs-web-tt-filename">{activePreset.filename || t('noFileSelected', '未选择任何文件')}</span>
              <button
                type="button"
                className="lcs-web-tt-delete-btn"
                onClick={handleDelete}
              >
                {t('delete', '删除')}
              </button>
            </div>

            {/* Duration Row */}
            <div className="lcs-web-tt-duration-row">
              <label className="lcs-web-tt-duration-label">{t('duration', '持续时间')}</label>
              <input
                type="text"
                className="lcs-web-tt-duration-input"
                value={activePreset.duration}
                onChange={e => updatePreset(activeId, { duration: e.target.value })}
              />
              <span className="lcs-web-tt-duration-unit">{t('unitSecond', 'S')}</span>
            </div>

            {/* Tips */}
            <div className="lcs-web-tt-tips">
              <strong>{t('tipTitle', '操作提示:')}</strong>
              <p>{t('tip1', '1.支持bmp/jpg/png格式的图片;')}</p>
              <p>{t('tip2', '2.图片分辨率不能大于1920*1080;')}</p>
              <p>{t('tip3', '3.图片宽高比必须为16:9;')}</p>
              <p>{t('tip4', '4.持续时间单位为秒。')}</p>
            </div>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => onSave(sectionLabel)}>
          {t('ok', '确定')}
        </button>
      </div>
    </div>
  );
}

export function TitleTrailerSettingPage() {
  const [titlePresets, setTitlePresets] = useState(initialTitleTrailerPresets);
  const [trailerPresets, setTrailerPresets] = useState(initialTitleTrailerPresets);
  const [activeTitleId, setActiveTitleId] = useState(1);
  const [activeTrailerId, setActiveTrailerId] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const updateTitlePreset = (id, patch) => {
    setTitlePresets(curr => curr.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const updateTrailerPreset = (id, patch) => {
    setTrailerPresets(curr => curr.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const handleSave = (sectionName) => {
    setToastMessage(`${sectionName} configuration saved successfully!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-titletrailer-page">
      <TitleTrailerSection
        titleKey="title"
        presets={titlePresets}
        activeId={activeTitleId}
        setActiveId={setActiveTitleId}
        updatePreset={updateTitlePreset}
        onSave={handleSave}
      />

      <div className="mt-6">
        <TitleTrailerSection
          titleKey="trailer"
          presets={trailerPresets}
          activeId={activeTrailerId}
          setActiveId={setActiveTrailerId}
          updatePreset={updateTrailerPreset}
          onSave={handleSave}
        />
      </div>

      {toastMessage && (
        <div className="lcs-web-toast">
          {toastMessage}
        </div>
      )}
    </section>
  );
}
