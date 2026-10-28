import { useState } from 'react';
import { useTranslation } from '../../../i18n';
import { TeacherDebugCard } from './TeacherDebugCard';
import { StudentDebugCard } from './StudentDebugCard';
import { BoardDebugCard } from './BoardDebugCard';

export function TrackerDebugPage() {
  const { t } = useTranslation('trackerDebug');
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-tracker-debug-page">
      <div className="lcs-web-section-title">{t('pageTitle', '跟踪调试')}</div>

      {/* Top 2 Columns: Teacher & Student */}
      <div className="lcs-web-debug-grid">
        <TeacherDebugCard onToast={triggerToast} />
        <StudentDebugCard onToast={triggerToast} />
      </div>

      {/* Bottom Card: Board */}
      <BoardDebugCard onToast={triggerToast} />

      {toastMessage && (
        <div className="lcs-web-toast">
          {toastMessage}
        </div>
      )}
    </section>
  );
}
