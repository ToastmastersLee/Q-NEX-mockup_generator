import { useState } from 'react';
import {
  Plus,
} from 'lucide-react';
import { useTranslation } from '../../i18n';

export function VideoMattingSettingPage() {
  const { t, isZh } = useTranslation('videoMatting');
  const [scenes, setScenes] = useState([
    { id: 1, name: isZh ? '场景一' : 'Scene 1', image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: isZh ? '场景二' : 'Scene 2', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
  ]);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddScene = () => {
    const nextId = scenes.length + 1;
    const name = isZh ? `场景${nextId}` : `Scene ${nextId}`;
    setScenes(curr => [...curr, { id: nextId, name, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80' }]);
    showToast(t('newSceneAdded', '已添加新场景'));
  };

  const handleDelete = (id) => {
    setScenes(curr => curr.filter(s => s.id !== id));
    showToast(t('sceneDeleted', '已删除场景'));
  };

  return (
    <section className="lcs-web-page lcs-web-matting-page">
      <div className="lcs-web-section-title">{t('pageTitle', '抠像设置')}</div>

      <div className="lcs-web-card">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleScene', '场景设置')}</h3>
        <div className="lcs-web-matting-grid">
          {/* Add Scene Card */}
          <div className="lcs-web-matting-add-box" onClick={handleAddScene} title={t('addScene', '添加场景')}>
            <Plus size={36} color="#ffffff" />
          </div>

          {/* Existing Scenes */}
          {scenes.map(s => (
            <div key={s.id} className="lcs-web-scene-card">
              <div className="lcs-web-scene-header">{s.name}</div>
              <div className="lcs-web-scene-preview">
                <img src={s.image} alt={s.name} />
                <div className="lcs-web-scene-actions">
                  <button type="button" className="lcs-web-scene-btn-matting" onClick={() => showToast(t('enterMatting', `进入${s.name}抠像`, { name: s.name }))}>
                    {t('matting', '抠像')}
                  </button>
                  <button type="button" className="lcs-web-scene-btn-delete" onClick={() => handleDelete(s.id)}>
                    {t('delete', '删除')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
