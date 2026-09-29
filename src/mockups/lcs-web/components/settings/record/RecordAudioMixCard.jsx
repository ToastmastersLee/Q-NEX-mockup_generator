import React from 'react';
import { useTranslation } from '../../../i18n';

export function RecordAudioMixCard({
  rtspMix,
  setRtspMix,
  digitalMix,
  setDigitalMix,
  onSaveRtsp,
  onSaveDigital
}) {
  const { t } = useTranslation('record');
  const { t: tCommon } = useTranslation('common');

  return (
    <>
      {/* Card 3: RTSP音频输入设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleRtspAudio', 'RTSP音频输入设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th className="w-32">{t('colRecChannel', '录制通道')}</th>
                <th>{t('colMixChannel', '混音通道')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tCommon('channels.film', '电影')}</td>
                <td>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.pc1} onChange={e => setRtspMix(c => ({ ...c, pc1: e.target.checked }))} />
                      <span>{tCommon('channels.pc1', '电脑')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.pc2} onChange={e => setRtspMix(c => ({ ...c, pc2: e.target.checked }))} />
                      <span>{tCommon('channels.pc2', '电脑2')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.tch} onChange={e => setRtspMix(c => ({ ...c, tch: e.target.checked }))} />
                      <span>{tCommon('channels.tch', '教师')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.stu} onChange={e => setRtspMix(c => ({ ...c, stu: e.target.checked }))} />
                      <span>{tCommon('channels.stu', '学生')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.tch_p} onChange={e => setRtspMix(c => ({ ...c, tch_p: e.target.checked }))} />
                      <span>{tCommon('channels.tch_p', '教师全景')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={rtspMix.stu_p} onChange={e => setRtspMix(c => ({ ...c, stu_p: e.target.checked }))} />
                      <span>{tCommon('channels.stu_p', '学生全景')}</span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">{t('tipRtspAudio', '提示: 混音通道中的按钮为禁用状态表示未开启该通道的RTSP音频输入。')}</p>
        <button className="lcs-web-ok mt-4" type="button" onClick={onSaveRtsp}>
          {t('ok', '确定')}
        </button>
      </div>

      {/* Card 4: 数字音频输入设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleDigitalAudio', '数字音频输入设置')}</h3>
        <div className="lcs-web-table-card">
          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th className="w-32">{t('colRecChannel', '录制通道')}</th>
                <th>{t('colMixChannel', '混音通道')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tCommon('channels.film', '电影')}</td>
                <td>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.pc1} onChange={e => setDigitalMix(c => ({ ...c, pc1: e.target.checked }))} />
                      <span>{tCommon('channels.pc1', '电脑')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.pc2} onChange={e => setDigitalMix(c => ({ ...c, pc2: e.target.checked }))} />
                      <span>{tCommon('channels.pc2', '电脑2')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.tch} onChange={e => setDigitalMix(c => ({ ...c, tch: e.target.checked }))} />
                      <span>{tCommon('channels.tch', '教师')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.stu} onChange={e => setDigitalMix(c => ({ ...c, stu: e.target.checked }))} />
                      <span>{tCommon('channels.stu', '学生')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.tch_p} onChange={e => setDigitalMix(c => ({ ...c, tch_p: e.target.checked }))} />
                      <span>{tCommon('channels.tch_p', '教师全景')}</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={digitalMix.stu_p} onChange={e => setDigitalMix(c => ({ ...c, stu_p: e.target.checked }))} />
                      <span>{tCommon('channels.stu_p', '学生全景')}</span>
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">{t('tipDigitalAudio', '提示: 混音通道中的按钮为禁用状态表示未开启该通道的数字音频输入。')}</p>
        <button className="lcs-web-ok mt-4" type="button" onClick={onSaveDigital}>
          {t('ok', '确定')}
        </button>
      </div>
    </>
  );
}
