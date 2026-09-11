import { useState } from 'react';
import {
  Volume2,
} from 'lucide-react';
import { ModalShell } from '../../common';
import { useTranslation } from '../../../i18n';

export function AudioSettingsModal({ output, onClose }) {
  const { t } = useTranslation('audio');
  const { t: tCommon } = useTranslation('common');
  const [audioOutput, setAudioOutput] = useState(true);
  const [rtspMix, setRtspMix] = useState({ pc1: false, pc2: false, tch: true, stu: false, tch_p: false, stu_p: false });
  const [digitalMix, setDigitalMix] = useState({ pc1: false, pc2: false, tch: true, stu: false, tch_p: false, stu_p: false });

  return (
    <ModalShell title={`${t('modalAudioTitle', '音频设置')}(${output})`} onClose={onClose} className="is-audio-modal">
      <div className="lcs-web-modal-body text-xs">
        {/* Row 1: 音频输出 */}
        <div className="flex items-center gap-6 py-2.5">
          <span className="w-20 text-slate-600 font-semibold flex-shrink-0">{t('audioOutput', '音频输出')}</span>
          <div className="flex items-center gap-3">
            <label className="lcs-web-switch">
              <input type="checkbox" checked={audioOutput} onChange={e => setAudioOutput(e.target.checked)} />
              <span className="slider" />
            </label>
            <Volume2 size={16} className="text-slate-600" />
          </div>
        </div>

        {/* Row 2: RTSP音频 */}
        <div className="flex items-center gap-6 py-2.5">
          <span className="w-20 text-slate-600 font-semibold flex-shrink-0">{t('rtspAudio', 'RTSP音频')}</span>
          <div className="flex items-center gap-5 flex-nowrap whitespace-nowrap">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.pc1} onChange={e => setRtspMix(c => ({ ...c, pc1: e.target.checked }))} />
              <span>{tCommon('channels.pc1', '电脑')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.pc2} onChange={e => setRtspMix(c => ({ ...c, pc2: e.target.checked }))} />
              <span>{tCommon('channels.pc2', '电脑2')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-blue-600 font-semibold whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.tch} onChange={e => setRtspMix(c => ({ ...c, tch: e.target.checked }))} />
              <span>{tCommon('channels.tch', '教师')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.stu} onChange={e => setRtspMix(c => ({ ...c, stu: e.target.checked }))} />
              <span>{tCommon('channels.stu', '学生')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.tch_p} onChange={e => setRtspMix(c => ({ ...c, tch_p: e.target.checked }))} />
              <span>{tCommon('channels.tch_p', '教师全景')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={rtspMix.stu_p} onChange={e => setRtspMix(c => ({ ...c, stu_p: e.target.checked }))} />
              <span>{tCommon('channels.stu_p', '学生全景')}</span>
            </label>
          </div>
        </div>

        {/* Row 3: 数字音频 */}
        <div className="flex items-center gap-6 py-2.5">
          <span className="w-20 text-slate-600 font-semibold flex-shrink-0">{t('digitalAudio', '数字音频')}</span>
          <div className="flex items-center gap-5 flex-nowrap whitespace-nowrap">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.pc1} onChange={e => setDigitalMix(c => ({ ...c, pc1: e.target.checked }))} />
              <span>{tCommon('channels.pc1', '电脑')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.pc2} onChange={e => setDigitalMix(c => ({ ...c, pc2: e.target.checked }))} />
              <span>{tCommon('channels.pc2', '电脑2')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-blue-600 font-semibold whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.tch} onChange={e => setDigitalMix(c => ({ ...c, tch: e.target.checked }))} />
              <span>{tCommon('channels.tch', '教师')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.stu} onChange={e => setDigitalMix(c => ({ ...c, stu: e.target.checked }))} />
              <span>{tCommon('channels.stu', '学生')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.tch_p} onChange={e => setDigitalMix(c => ({ ...c, tch_p: e.target.checked }))} />
              <span>{tCommon('channels.tch_p', '教师全景')}</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-400 whitespace-nowrap flex-shrink-0">
              <input type="checkbox" checked={digitalMix.stu_p} onChange={e => setDigitalMix(c => ({ ...c, stu_p: e.target.checked }))} />
              <span>{tCommon('channels.stu_p', '学生全景')}</span>
            </label>
          </div>
        </div>

        {/* Row 4: 外部音频 */}
        <div className="flex items-center gap-6 py-2.5">
          <span className="w-20 text-slate-600 font-semibold flex-shrink-0">{t('externalAudio', '外部音频')}</span>
          <button type="button" className="lcs-web-btn-blue-sm">REC</button>
        </div>

        <p className="text-slate-400 text-[11px] mt-4">{t('tipAudioModal', '提示: 若通道按钮为禁用状态表示未开启该通道的RTSP音频输入或数字音频输入。')}</p>
      </div>
    </ModalShell>
  );
}
