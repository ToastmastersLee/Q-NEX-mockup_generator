import { useState } from 'react';
import { useTranslation } from '../../i18n';

export function AudioSettingPage() {
  const { t } = useTranslation('audio');
  const [audioMode, setAudioMode] = useState('builtin');
  const [audioProcessing, setAudioProcessing] = useState(true);
  const [amplification, setAmplification] = useState(true);
  const [feedback, setFeedback] = useState(true);
  const [noiseLevel, setNoiseLevel] = useState(5);
  const [outputVol, setOutputVol] = useState(130);
  const [omniMute, setOmniMute] = useState(false);
  const [speakerMute, setSpeakerMute] = useState(false);
  const [inputMute, setInputMute] = useState(false);
  const [micLeft, setMicLeft] = useState(-9);
  const [micRight, setMicRight] = useState(-9);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-audio-page">
      <div className="lcs-web-section-title">{t('pageTitle', '音频设置')}</div>

      <div className="lcs-web-card">
        {/* Row 1: 音频模式 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('audioMode', '音频模式')}</span>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" name="audioMode" checked={audioMode === 'builtin'} onChange={() => setAudioMode('builtin')} />
            <span>{t('builtinAudioMode', '内置音频模式')}</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" name="audioMode" checked={audioMode === 'external'} onChange={() => setAudioMode('external')} />
            <span>{t('externalAudioMode', '外置音频模式')}</span>
          </label>
        </div>

        {/* Row 2: 音频处理 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('audioProcessing', '音频处理')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={audioProcessing} onChange={e => setAudioProcessing(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 3: 扩声 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('amplification', '扩声')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={amplification} onChange={e => setAmplification(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('tipAmplification', '提示: 开启后无线话筒、HDMI输入、line in输入的音频可通过line out/机身喇叭实时输出声音')}</span>
        </div>

        {/* Row 4: 反馈抑制 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('feedbackSuppression', '反馈抑制')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={feedback} onChange={e => setFeedback(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('tipFeedback', '提示: 扩声开启时才允许设置')}</span>
        </div>

        {/* Row 5: 噪声抑制等级 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('noiseSuppressionLevel', '噪声抑制等级')}</span>
          <div className="flex items-center gap-3 w-64">
            <input
              type="range"
              min="0"
              max="10"
              className="flex-1"
              value={noiseLevel}
              onChange={e => setNoiseLevel(Number(e.target.value))}
            />
            <input
              type="text"
              className="lcs-web-compact-input w-12 text-center text-xs"
              value={noiseLevel}
              onChange={e => setNoiseLevel(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Row 6: 输出音量设置 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('outputVolume', '输出音量设置')}</span>
          <div className="flex items-center gap-3 w-64">
            <input
              type="range"
              min="0"
              max="200"
              className="flex-1"
              value={outputVol}
              onChange={e => setOutputVol(Number(e.target.value))}
            />
            <input
              type="text"
              className="lcs-web-compact-input w-12 text-center text-xs"
              value={outputVol}
              onChange={e => setOutputVol(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Row 7: 全向麦静音 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('omniMicMute', '全向麦静音')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={omniMute} onChange={e => setOmniMute(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('tipOmniMute', '提示: 只支持便携录播')}</span>
        </div>

        {/* Row 8: 内置喇叭静音 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('speakerMute', '内置喇叭静音')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={speakerMute} onChange={e => setSpeakerMute(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 9: 输入音量设置 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold">{t('inputVolumeSetting', '输入音量设置')}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">{t('mute', '静音')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={inputMute} onChange={e => setInputMute(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>
        </div>

        {/* Row 10: MIC增益设置 */}
        <div className="flex items-start gap-8 py-2.5 flex-wrap">
          <span className="w-28 text-xs text-slate-700 font-semibold pt-1">{t('micGainSetting', 'MIC增益设置')}</span>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-32 text-xs text-slate-600">{t('micLeftVolume', 'MIC音量(L 全向麦)')}</span>
              <input
                type="range"
                min="-20"
                max="20"
                className="w-36"
                value={micLeft}
                onChange={e => setMicLeft(Number(e.target.value))}
              />
              <input
                type="text"
                className="lcs-web-compact-input w-12 text-center text-xs"
                value={micLeft}
                onChange={e => setMicLeft(Number(e.target.value) || 0)}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="w-32 text-xs text-slate-600">{t('micRightVolume', 'MIC音量(R 全向麦)')}</span>
              <input
                type="range"
                min="-20"
                max="20"
                className="w-36"
                value={micRight}
                onChange={e => setMicRight(Number(e.target.value))}
              />
              <input
                type="text"
                className="lcs-web-compact-input w-12 text-center text-xs"
                value={micRight}
                onChange={e => setMicRight(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button className="lcs-web-ok" type="button" onClick={() => showToast('音频设置已保存')}>
            {t('ok', '确定')}
          </button>
          <button className="lcs-web-ok" type="button" onClick={() => showToast('已恢复出厂设置')}>
            {t('restoreFactory', '恢复出厂设置')}
          </button>
          <button className="lcs-web-ok" type="button" onClick={() => showToast('已消音')}>
            {t('silence', '消音')}
          </button>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
