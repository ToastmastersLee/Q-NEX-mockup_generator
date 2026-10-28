import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { ChromaKeyDialog } from './modals/ChromaKeyDialog';

export function VideoMattingSettingPage() {
  const { t } = useTranslation('videoMatting');
  const [scenes, setScenes] = useState([{ id: 1, name: '' }, { id: 2, name: '' }]);
  const [editing, setEditing] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const sceneLabel = scene => scene.name || `${t('scene')} ${scene.id}`;
  const showToast = text => { setToastMessage(text); setTimeout(() => setToastMessage(''), 3000); };

  return <section className="lcs-web-page lcs-web-matting-page">
    <div className="lcs-web-section-title">{t('pageTitle')}</div>
    <div className="lcs-web-card">
      <h3 className="lcs-web-card-inner-title">{t('cardTitleScene')}</h3>
      <div className="lcs-web-matting-grid">
        <button type="button" className="lcs-web-matting-add-box" aria-label={t('addScene')} onClick={() => {
          const next = { id: Math.max(0, ...scenes.map(s => s.id)) + 1, name: '' };
          setScenes(curr => [...curr, next]);
          setEditing(next);
        }}><Plus size={36} color="#ffffff" /></button>
        {scenes.map(scene => <div key={scene.id} className="lcs-web-scene-card">
          <div className="lcs-web-scene-header">{sceneLabel(scene)}</div>
          <div className="lcs-web-scene-preview">
            <div className="lcs-web-scene-placeholder">{sceneLabel(scene)}</div>
            <div className="lcs-web-scene-actions">
              <button type="button" className="lcs-web-scene-btn-matting" onClick={() => setEditing(scene)}>{t('matting')}</button>
              <button type="button" className="lcs-web-scene-btn-delete" onClick={() => {
                if (window.confirm(t('deleteTip'))) {
                  setScenes(curr => curr.filter(s => s.id !== scene.id));
                  showToast(t('sceneDeleted'));
                }
              }}>{t('delete')}</button>
            </div>
          </div>
        </div>)}
      </div>
    </div>
    {editing && <ChromaKeyDialog scene={editing} sceneNames={scenes.filter(s => s.id !== editing.id).map(sceneLabel)} onClose={() => setEditing(null)} onSave={scene => {
      setScenes(curr => curr.map(s => s.id === scene.id ? scene : s));
      setEditing(null);
      showToast(t('saved'));
    }} />}
    {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
  </section>;
}
