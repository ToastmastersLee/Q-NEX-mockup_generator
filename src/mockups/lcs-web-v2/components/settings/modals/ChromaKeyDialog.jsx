import { useState, useRef } from 'react';
import { ModalShell, NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';

export function ChromaKeyDialog({ scene, sceneNames, onClose, onSave }) {
  const { t } = useTranslation('videoMatting');
  const { t: common } = useTranslation();
  const [name, setName] = useState(scene.name || '');
  const [enabled, setEnabled] = useState(scene.enabled || false);
  const [color, setColor] = useState(scene.color || 'green');
  const [threshold, setThreshold] = useState(scene.threshold || '');
  const [background, setBackground] = useState(scene.background || '');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(false);
  const fileInput = useRef(null);

  const uploadBackground = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!/image\/(png|jpeg)/.test(file.type)) return setError(t('imageFormatTip'));
    const url = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = url;
      await image.decode();
      if (image.width !== 1920 || image.height !== 1080) return setError(t('imageResolutionTip'));
      setBackground(file.name);
      setError('');
    } catch { setError(t('imageFormatTip')); }
    finally { URL.revokeObjectURL(url); }
  };

  return <ModalShell title={t('pageTitle')} onClose={onClose}>
    <form className="lcs-web-modal-body" onSubmit={event => {
      event.preventDefault();
      if (!name.trim()) return setError(t('sceneNameEmpty'));
      if (sceneNames.includes(name.trim())) return setError(t('sceneNameExist'));
      onSave({ ...scene, name: name.trim(), enabled, color, threshold, background });
    }}>
      <div className="lcs-web-keying-preview" aria-label={t('preview')}>{t('preview')}</div>
      <div className="lcs-web-field"><label htmlFor="key-scene-name">{t('sceneName')}</label><input id="key-scene-name" className="lcs-web-compact-input" value={name} placeholder={t('sceneName')} onChange={event => setName(event.target.value)} /></div>
      <div className="lcs-web-field"><label htmlFor="key-enabled">{t('keyingSwitch')}</label><input id="key-enabled" type="checkbox" checked={enabled} onChange={event => setEnabled(event.target.checked)} /></div>
      <div className="lcs-web-field"><label htmlFor="key-color">{t('screenColor')}</label><NativeSelect id="key-color" value={color} disabled={enabled} options={['green', 'blue'].map(value => ({ value, label: t(value) }))} onChange={setColor} /></div>
      <p className="text-xs text-slate-500">{t('changeColorTip')}</p>
      <div className="lcs-web-field"><label htmlFor="key-background">{t('backgroundImage')}</label><div><input ref={fileInput} id="key-background" type="file" hidden accept="image/png,image/jpeg" onChange={uploadBackground} aria-label={t('uploadImage')} /><button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => fileInput.current.click()}>{t('uploadImage')}</button><span className="text-xs ml-3">{background || common('actions.noFilesSelected')}</span></div></div>
      <p className="text-xs text-slate-500">{t('imageFormatTip')} {t('imageResolutionTip')}</p>
      <h4 className="mt-6 font-semibold text-sm">{t('paramAdjust')}</h4>
      <div className="lcs-web-field"><label htmlFor="key-threshold">{t('thresholdRange')}</label><input id="key-threshold" className="lcs-web-compact-input" value={threshold} onChange={event => setThreshold(event.target.value)} /></div>
      <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => setNotice(true)}>{t('autoAdjust')}</button>
      {notice && <p className="text-xs text-slate-500 mt-3">{common('previewNotice')}</p>}
      {error && <p role="alert" className="lcs-web-form-error mt-4">{error}</p>}
      <div className="lcs-web-form-actions"><button type="button" className="lcs-web-btn-blue-outline-sm" onClick={onClose}>{common('actions.cancel')}</button><button type="submit" className="lcs-web-btn-blue-sm">{common('actions.save')}</button></div>
    </form>
  </ModalShell>;
}
