import { useState } from 'react';
import {
  Video,
} from 'lucide-react';
import { ModalShell } from '../common';
import { useTranslation } from '../../i18n';

export function InputSettingPage() {
  const { t } = useTranslation('input');
  const { t: tCommon } = useTranslation('common');
  const [ipcSearch, setIpcSearch] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [inputChannels, setInputChannels] = useState([
    { id: 'pc1', mode: 'HDMI', customMode: '', rtspUrl: '', ipc: '', usb: '', res: '0*0@0', rtspAudio: false, digitalAudioTxt: '', digitalAudioIn: false },
    { id: 'pc2', mode: 'HDMI', customMode: '', rtspUrl: '', ipc: '', usb: '', res: '0*0@0', rtspAudio: false, digitalAudioTxt: '', digitalAudioIn: false },
    { id: 'tch', mode: 'RTSP', customMode: '', rtspUrl: 'rtsp://admin:2021042', ipc: '', usb: '', res: '1920*1080@25', rtspAudio: true, digitalAudioTxt: '', digitalAudioIn: true },
    { id: 'stu', mode: 'RTSP', customMode: '', rtspUrl: 'rtsp://admin:2021042', ipc: '', usb: '', res: '1920*1080@25', rtspAudio: false, digitalAudioTxt: '', digitalAudioIn: false },
    { id: 'tch_p', mode: 'RTSP', customMode: '', rtspUrl: 'rtsp://admin:2021042', ipc: '', usb: '', res: '1920*1080@25', rtspAudio: false, digitalAudioTxt: '', digitalAudioIn: false },
    { id: 'stu_p', mode: 'RTSP', customMode: '', rtspUrl: 'rtsp://admin:2021042', ipc: '', usb: '', res: '1920*1080@25', rtspAudio: false, digitalAudioTxt: '', digitalAudioIn: false },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-input-page">
      <div className="lcs-web-section-title">{t('pageTitle', '输入设置')}</div>

      {/* IPC Search Modal */}
      {ipcSearch && (
        <ModalShell title={t('ipcSearch', 'IPC搜索')} onClose={() => setIpcSearch(false)} className="is-ipc">
          <div className="lcs-web-modal-body">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs text-slate-500">{t('ipcSearch', 'IPC搜索')}</span>
              <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('IPC列表已刷新')}>
                {t('refresh', '刷新')}
              </button>
            </div>
            <table className="lcs-web-data-table text-center text-xs">
              <thead>
                <tr>
                  <th>{t('colSeq', '序号')}</th>
                  <th>{t('colIp', 'IP')}</th>
                  <th>{t('colName', '名称')}</th>
                  <th>{t('colPassword', '密码')}</th>
                  <th>{t('colAuth', '认证')}</th>
                  <th>{t('colStatus', '状态')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="text-slate-400 py-6">{t('noData', '暂无数据')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </ModalShell>
      )}

      <div className="lcs-web-card">
        <div className="overflow-x-auto">
          <table className="lcs-web-input-channels-table">
          <thead>
            <tr>
              <th className="w-16 text-center">{t('colChannelName', '通道名称')}</th>
              <th className="text-left pl-3">{t('colSignalSource', '信号源接入方式')}</th>
              <th className="w-28 text-center">{t('colResolution', '信号分辨率')}</th>
              <th className="w-28 text-center">{t('colRtspAudio', 'RTSP音频输入')}</th>
              <th className="w-24 text-center">{t('colDigitalAudio', '数字音频')}</th>
              <th className="w-28 text-center">{t('colDigitalAudioInput', '数字音频输入')}</th>
            </tr>
          </thead>
          <tbody>
            {inputChannels.map((row, idx) => (
              <tr key={row.id}>
                <td className="text-center font-medium text-slate-700 text-xs">{tCommon(`channels.${row.id}`, row.id)}</td>
                <td className="pl-3">
                  <div className="flex items-center gap-4 text-xs whitespace-nowrap">
                    {/* Option 1: HDMI or 3G-SDI */}
                    {idx < 2 ? (
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`mode-${row.id}`}
                          checked={row.mode === 'HDMI'}
                          onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: 'HDMI' } : r))}
                        />
                        <span className="text-slate-700">HDMI</span>
                      </label>
                    ) : (
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`mode-${row.id}`}
                          checked={row.mode === '3G-SDI'}
                          onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: '3G-SDI' } : r))}
                        />
                        <span className="text-slate-700">3G-SDI</span>
                      </label>
                    )}

                    {/* Option 2: HDMIIN3 */}
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name={`mode-${row.id}`}
                        checked={row.mode === 'HDMIIN3'}
                        onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: 'HDMIIN3' } : r))}
                      />
                      <span className="text-slate-700">HDMIIN3</span>
                    </label>

                    {/* Option 3: RTSP */}
                    <div className="inline-flex items-center gap-1.5">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`mode-${row.id}`}
                          checked={row.mode === 'RTSP'}
                          onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: 'RTSP' } : r))}
                        />
                        <span className="text-slate-700 font-medium">RTSP</span>
                      </label>
                      {row.rtspUrl ? (
                        <div className="inline-flex items-center gap-1">
                          <input
                            type="text"
                            className="lcs-web-input-compact-box w-36 font-mono text-[11px]"
                            value={row.rtspUrl}
                            onChange={e => {
                              const val = e.target.value;
                              setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, rtspUrl: val } : r));
                            }}
                          />
                          <Video size={14} className="text-blue-500 flex-shrink-0" />
                        </div>
                      ) : (
                        <select
                          className="lcs-web-input-compact-select w-28 text-xs"
                          value={row.customMode || t('selectOrInput', '请选择或输入')}
                          onChange={e => {
                            const val = e.target.value;
                            setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, customMode: val } : r));
                          }}
                        >
                          <option value={t('selectOrInput', '请选择或输入')}>{t('selectOrInput', '请选择或输入')}</option>
                          <option value="rtsp://192.168.3.50/stream1">rtsp://192.168.3.50/stream1</option>
                        </select>
                      )}
                    </div>

                    {/* Option 4: IPC */}
                    <div className="inline-flex items-center gap-1.5">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`mode-${row.id}`}
                          checked={row.mode === 'IPC'}
                          onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: 'IPC' } : r))}
                        />
                        <span className="text-slate-700">IPC</span>
                      </label>
                      <select
                        className="lcs-web-input-compact-select w-20 text-xs"
                        value={row.ipc || t('select', '请选择')}
                        onChange={e => {
                          const val = e.target.value;
                          setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, ipc: val } : r));
                        }}
                      >
                        <option value={t('select', '请选择')}>{t('select', '请选择')}</option>
                      </select>
                    </div>

                    {/* Option 5: USB Camera */}
                    <div className="inline-flex items-center gap-1.5">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name={`mode-${row.id}`}
                          checked={row.mode === 'USB'}
                          onChange={() => setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, mode: 'USB' } : r))}
                        />
                        <span className="text-slate-700">{t('usbCam', 'USB摄像机')}</span>
                      </label>
                      <select
                        className="lcs-web-input-compact-select w-20 text-xs"
                        value={row.usb || t('select', '请选择')}
                        onChange={e => {
                          const val = e.target.value;
                          setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, usb: val } : r));
                        }}
                      >
                        <option value={t('select', '请选择')}>{t('select', '请选择')}</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    className="lcs-web-input-compact-box is-readonly w-24 font-mono text-xs"
                    value={row.res}
                    readOnly
                  />
                </td>
                <td className="text-center">
                  <div className="flex justify-center items-center">
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={row.rtspAudio}
                        onChange={e => {
                          const checked = e.target.checked;
                          setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, rtspAudio: checked } : r));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </td>
                <td className="text-center">
                  <input
                    type="text"
                    className="lcs-web-input-compact-box w-20 text-center"
                    value={row.digitalAudioTxt}
                    onChange={e => {
                      const val = e.target.value;
                      setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, digitalAudioTxt: val } : r));
                    }}
                  />
                </td>
                <td className="text-center">
                  <div className="flex justify-center items-center">
                    <label className="lcs-web-switch">
                      <input
                        type="checkbox"
                        checked={row.digitalAudioIn}
                        onChange={e => {
                          const checked = e.target.checked;
                          setInputChannels(curr => curr.map((r, i) => i === idx ? { ...r, digitalAudioIn: checked } : r));
                        }}
                      />
                      <span className="slider" />
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Card 2: IPC搜索 1:1 Firmware Layout */}
      <div className="lcs-web-card mb-4">
        <div className="flex items-start gap-8">
          {/* Left Column: IPC搜索 Label + Switch */}
          <div className="w-24 pt-6 flex flex-col items-center gap-2.5">
            <span className="text-xs text-slate-700 font-bold">{t('ipcSearch', 'IPC搜索')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={ipcSearch} onChange={e => setIpcSearch(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          {/* Right Column: Table + Refresh */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-end pb-2">
              <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('已刷新IPC设备')}>
                {t('refresh', '刷新')}
              </button>
            </div>
            <table className="lcs-web-ipc-table text-center w-full">
              <thead>
                <tr>
                  <th className="w-16">{t('colSeq', '序号')}</th>
                  <th>IP</th>
                  <th>{t('colName', '名称')}</th>
                  <th>{t('colPassword', '密码')}</th>
                  <th>{t('colAuth', '认证')}</th>
                  <th>{t('colStatus', '状态')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-16 text-slate-400 text-xs">
                    {t('noData', '暂无数据')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button className="lcs-web-ok mt-2" type="button" onClick={() => showToast('输入设置已保存')}>
        {t('ok', '确定')}
      </button>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
