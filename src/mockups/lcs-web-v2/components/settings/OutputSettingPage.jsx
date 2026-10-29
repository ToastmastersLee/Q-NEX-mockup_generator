import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';
import { DisplaySettingsModal } from './modals/DisplaySettingsModal';
import { AudioSettingsModal } from './modals/AudioSettingsModal';

export function OutputSettingPage() {
  const { t } = useTranslation('output');
  const [modalOutput, setModalOutput] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const [resOut1, setResOut1] = useState('4K@30');
  const [contentOut1, setContentOut1] = useState('compositeView');

  const [resOut2, setResOut2] = useState('1080P60');
  const [contentOut2, setContentOut2] = useState('localDirector');

  const [resUvc, setResUvc] = useState('adaptive');
  const [contentUvc, setContentUvc] = useState('Film');

  const contentOptions = [
    { value: 'compositeView', label: t('compositeView', '合成画面') },
    { value: 'localDirector', label: t('localDirector', '本地导播') },
  ];

  const uvcContentOptions = ['Film', 'Computer', 'Computer2', 'Teacher', 'Student', 'Teacher_F.', 'Student_F.'].map((value, index) => ({ value, label: t(`sources.${['film', 'computer', 'computer2', 'teacher', 'student', 'teacher_full', 'student_full'][index]}`) }));
  const uvcResOptions = [
    { value: 'adaptive', label: t('adaptive', '自适应') },
  ];

  return (
    <section className="lcs-web-page lcs-web-output-page">
      <div className="lcs-web-section-title">{t('pageTitle', '输出设置')}</div>

      <div className="lcs-web-card">
        {/* Row 1: HDMI OUT1 */}
        <div className="flex items-center gap-8 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('hdmiOut1', 'HDMI OUT1')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outResolution', '输出分辨率')}</span>
            <NativeSelect value={resOut1} options={["4K@30", "1080P60"]} onChange={setResOut1} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentOut1} options={contentOptions} disabled onChange={setContentOut1} />
          </div>
          <button
            type="button"
            className="lcs-web-btn-blue-sm"
            onClick={() => { setModalOutput(t('hdmiOut1', 'HDMI OUT1')); setModalType('display'); }}
          >
            {t('displaySetting', '显示设置')}
          </button>
          <button
            type="button"
            className="lcs-web-btn-blue-sm"
            onClick={() => { setModalOutput(t('hdmiOut1', 'HDMI OUT1')); setModalType('audio'); }}
          >
            {t('audioSetting', '音频设置')}
          </button>
        </div>

        {/* Row 2: HDMI OUT2 */}
        <div className="flex items-center gap-8 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('hdmiOut2', 'HDMI OUT2')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outResolution', '输出分辨率')}</span>
            <NativeSelect value={resOut2} options={["1080P60"]} onChange={setResOut2} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentOut2} options={contentOptions} disabled onChange={setContentOut2} />
          </div>
          <button
            type="button"
            className="lcs-web-btn-blue-sm"
            onClick={() => { setModalOutput(t('hdmiOut2', 'HDMI OUT2')); setModalType('display'); }}
          >
            {t('displaySetting', '显示设置')}
          </button>
          <button
            type="button"
            className="lcs-web-btn-blue-sm"
            onClick={() => { setModalOutput(t('hdmiOut2', 'HDMI OUT2')); setModalType('audio'); }}
          >
            {t('audioSetting', '音频设置')}
          </button>
        </div>

        {/* Row 3: UVC */}
        <div className="flex items-center gap-8 py-3 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('uvcOut', 'UVC')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outResolution', '输出分辨率')}</span>
            <NativeSelect value={resUvc} options={uvcResOptions} disabled onChange={setResUvc} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentUvc} options={uvcContentOptions} onChange={setContentUvc} />
          </div>
        </div>
      </div>

      <p className="lcs-web-option-help">{t('sourceHelp')}</p>
      <p className="lcs-web-option-help">{t('readOnlyHelp')}</p>

      {modalType === 'display' && (
        <DisplaySettingsModal output={modalOutput} onClose={() => setModalType(null)} />
      )}
      {modalType === 'audio' && (
        <AudioSettingsModal output={modalOutput} onClose={() => setModalType(null)} />
      )}

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}

