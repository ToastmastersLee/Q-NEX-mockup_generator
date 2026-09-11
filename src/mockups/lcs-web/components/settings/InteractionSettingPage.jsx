import { useState } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function InteractionSettingPage() {
  const { t } = useTranslation('interaction');
  const { t: tCommon } = useTranslation('common');
  const [callerRes1, setCallerRes1] = useState('ultra');
  const [callerOut1, setCallerOut1] = useState('film');
  const [callerRes2, setCallerRes2] = useState('ultra');
  const [callerOut2, setCallerOut2] = useState('tch');

  const [receiverRes, setReceiverRes] = useState('ultra');
  const [receiverOut, setReceiverOut] = useState('stu');
  const [screenMode, setScreenMode] = useState('single');
  const [viewLayout, setViewLayout] = useState('v1');

  const [speakerFullscreen, setSpeakerFullscreen] = useState(false);
  const [showLocalVideo, setShowLocalVideo] = useState(false);
  const [maxSplit, setMaxSplit] = useState('9');
  const [micCount, setMicCount] = useState('0');

  const [sipRes, setSipRes] = useState('full');
  const [sipOut, setSipOut] = useState('film');
  const [sipDual, setSipDual] = useState(false);
  const [sipPip, setSipPip] = useState('pip4');

  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const resOptions = [
    { value: 'ultra', label: t('resUltra', '超高清') },
    { value: 'full', label: t('resFull', '全高清') },
    { value: 'standard', label: t('resStandard', '高清') },
  ];

  const callerOut1Options = [
    { value: 'film', label: tCommon('channels.film', '电影') },
    { value: 'tch', label: tCommon('channels.tch', '教师') },
    { value: 'stu', label: tCommon('channels.stu', '学生') },
    { value: 'pc1', label: tCommon('channels.pc1', '电脑') },
  ];

  const callerOut2Options = [
    { value: 'tch', label: tCommon('channels.tch', '教师') },
    { value: 'film', label: tCommon('channels.film', '电影') },
    { value: 'stu', label: tCommon('channels.stu', '学生') },
    { value: 'pc1', label: tCommon('channels.pc1', '电脑') },
  ];

  const receiverOutOptions = [
    { value: 'stu', label: tCommon('channels.stu', '学生') },
    { value: 'film', label: tCommon('channels.film', '电影') },
    { value: 'tch', label: tCommon('channels.tch', '教师') },
    { value: 'pc1', label: tCommon('channels.pc1', '电脑') },
  ];

  const splitOptions = [
    { value: '9', label: t('split9', '九分屏') },
    { value: '4', label: t('split4', '四分屏') },
    { value: '1', label: t('split1', '单分屏') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-interaction-page">
      <div className="lcs-web-section-title">{t('pageTitle', '互动设置')}</div>

      {/* Card 1: 互动设置 */}
      <div className="lcs-web-card mb-4">
        {/* Section 1: 视频发起方 */}
        <div className="lcs-web-inter-section-row">
          <div className="lcs-web-inter-section-label">{t('secCaller', '视频发起方')}</div>
          <div className="lcs-web-inter-section-content">
            <div className="lcs-web-inter-subrow">
              <span className="lcs-web-inter-subtitle">{t('defaultSend1', '默认发送画面一')}</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('resolution', '视频分辨率')}</span>
                  <NativeSelect value={callerRes1} options={resOptions} onChange={setCallerRes1} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('outputChannel', '输出通道')}</span>
                  <NativeSelect value={callerOut1} options={callerOut1Options} onChange={setCallerOut1} />
                </div>
              </div>
            </div>

            <div className="lcs-web-inter-subrow mt-3">
              <span className="lcs-web-inter-subtitle">{t('defaultSend2', '默认发送画面二')}</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('resolution', '视频分辨率')}</span>
                  <NativeSelect value={callerRes2} options={resOptions} onChange={setCallerRes2} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('outputChannel', '输出通道')}</span>
                  <NativeSelect value={callerOut2} options={callerOut2Options} onChange={setCallerOut2} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 视频接收方 */}
        <div className="lcs-web-inter-section-row mt-4 pt-4 border-t border-slate-100">
          <div className="lcs-web-inter-section-label">{t('secReceiver', '视频接收方')}</div>
          <div className="lcs-web-inter-section-content">
            <div className="lcs-web-inter-subrow">
              <span className="lcs-web-inter-subtitle">{t('defaultSend', '默认发送画面')}</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('resolution', '视频分辨率')}</span>
                  <NativeSelect value={receiverRes} options={resOptions} onChange={setReceiverRes} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">{t('outputChannel', '输出通道')}</span>
                  <NativeSelect value={receiverOut} options={receiverOutOptions} onChange={setReceiverOut} />
                </div>
              </div>
            </div>

            <div className="lcs-web-inter-subrow mt-3">
              <span className="lcs-web-inter-subtitle">{t('receiveSelect', '接收画面选择')}</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input type="radio" name="screenMode" checked={screenMode === 'dual'} onChange={() => setScreenMode('dual')} />
                  <span>{t('dualScreen', '双屏显示')}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                  <input type="radio" name="screenMode" checked={screenMode === 'single'} onChange={() => setScreenMode('single')} />
                  <span>{t('singleScreen', '单屏显示')}</span>
                </label>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    type="button"
                    className={`lcs-web-view-layout-btn ${viewLayout === 'v1' ? 'is-active' : ''}`}
                    onClick={() => setViewLayout('v1')}
                  >
                    V1
                  </button>
                  <button
                    type="button"
                    className={`lcs-web-view-layout-btn ${viewLayout === 'v2' ? 'is-active' : ''}`}
                    onClick={() => setViewLayout('v2')}
                  >
                    V2
                  </button>
                  <button
                    type="button"
                    className={`lcs-web-view-layout-btn flex items-center justify-center relative ${viewLayout === 'pip' ? 'is-active' : ''}`}
                    onClick={() => setViewLayout('pip')}
                  >
                    <span className="text-[10px]">V2</span>
                    <span className="text-[7px] absolute top-0.5 right-1">V1</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 其他设置 */}
        <div className="lcs-web-inter-section-row mt-4 pt-4 border-t border-slate-100">
          <div className="lcs-web-inter-section-label">{t('secOther', '其他设置')}</div>
          <div className="lcs-web-inter-section-content">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('speakerFullscreen', '发言方全屏')}</span>
                <label className="lcs-web-switch">
                  <input type="checkbox" checked={speakerFullscreen} onChange={e => setSpeakerFullscreen(e.target.checked)} />
                  <span className="slider" />
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('showLocalVideo', '显示本地视频')}</span>
                <label className="lcs-web-switch">
                  <input type="checkbox" checked={showLocalVideo} onChange={e => setShowLocalVideo(e.target.checked)} />
                  <span className="slider" />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('maxSplit', '最大分屏数量')}</span>
                <NativeSelect value={maxSplit} options={splitOptions} onChange={setMaxSplit} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600">{t('micOpenCount', '听讲麦克风开启数量')}</span>
                <NativeSelect value={micCount} options={['0', '1', '2', '4', '8']} onChange={setMicCount} />
              </div>
            </div>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('interSaved', '互动设置已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {/* Card 2: SIP设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleSip', 'SIP设置')}</h3>

        <div className="lcs-web-sip-section">
          {/* Row 1: 输出 */}
          <div className="flex items-center gap-8 py-2">
            <span className="w-16 text-xs text-slate-700 font-semibold">{t('sipOutput', '输出')}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('resolution', '视频分辨率')}</span>
              <NativeSelect value={sipRes} options={resOptions} onChange={setSipRes} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('outputChannel', '输出通道')}</span>
              <NativeSelect value={sipOut} options={callerOut1Options} onChange={setSipOut} />
            </div>
          </div>

          {/* Row 2: 双流 */}
          <div className="flex items-center gap-8 py-2">
            <span className="w-16 text-xs text-slate-700 font-semibold">{t('sipDualStream', '双流')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={sipDual} onChange={e => setSipDual(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          {/* Row 3: 画中画 */}
          <div className="flex items-center gap-8 py-2">
            <span className="w-16 text-xs text-slate-700 font-semibold">{t('sipPip', '画中画')}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`lcs-web-pip-btn ${sipPip === 'pip1' ? 'is-active' : ''}`}
                onClick={() => setSipPip('pip1')}
              >
                <div className="pip-box">
                  <span className="pip-main">V1</span>
                  <span className="pip-sub pip-br">V2</span>
                </div>
              </button>
              <button
                type="button"
                className={`lcs-web-pip-btn ${sipPip === 'pip2' ? 'is-active' : ''}`}
                onClick={() => setSipPip('pip2')}
              >
                <div className="pip-box">
                  <span className="pip-main">V2</span>
                  <span className="pip-sub pip-bl">V1</span>
                </div>
              </button>
              <button
                type="button"
                className={`lcs-web-pip-btn ${sipPip === 'pip3' ? 'is-active' : ''}`}
                onClick={() => setSipPip('pip3')}
              >
                <div className="pip-box">
                  <span className="pip-main">V2</span>
                  <span className="pip-sub pip-tr">V1</span>
                </div>
              </button>
              <button
                type="button"
                className={`lcs-web-pip-btn ${sipPip === 'pip4' ? 'is-active' : ''}`}
                onClick={() => setSipPip('pip4')}
              >
                <div className="pip-box">
                  <span className="pip-main">V2</span>
                  <span className="pip-sub pip-br">V1</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast(t('sipSaved', 'SIP设置已保存'))}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
