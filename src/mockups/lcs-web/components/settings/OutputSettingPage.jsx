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
  const [contentUvc, setContentUvc] = useState('filmVideo');

  const contentOptions = [
    { value: 'compositeView', label: t('compositeView', '合成画面') },
    { value: 'filmVideo', label: t('filmVideo', '电影') },
    { value: 'localDirector', label: t('localDirector', '本地导播') },
  ];

  const uvcResOptions = [
    { value: 'adaptive', label: t('adaptive', '自适应') },
    { value: '1080P30', label: '1080P30' },
    { value: '720P30', label: '720P30' },
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
            <NativeSelect value={resOut1} options={['4K@30', '1080P60', '1080P30']} onChange={setResOut1} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentOut1} options={contentOptions} onChange={setContentOut1} />
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
            <NativeSelect value={resOut2} options={['1080P60', '4K@30', '1080P30']} onChange={setResOut2} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentOut2} options={contentOptions} onChange={setContentOut2} />
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
            <NativeSelect value={resUvc} options={uvcResOptions} onChange={setResUvc} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('outContent', '输出内容')}</span>
            <NativeSelect value={contentUvc} options={contentOptions} onChange={setContentUvc} />
          </div>
        </div>
      </div>

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
