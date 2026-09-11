import { useState } from 'react';
import {
  Eye,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function StorageSettingPage() {
  const { t } = useTranslation('storage');
  const [priority, setPriority] = useState('deleteFirst');
  const [pathSelect, setPathSelect] = useState('localPath');
  const [netPath, setNetPath] = useState('//192.168.3.212/LCS_record_test');
  const [netUser, setNetUser] = useState('Administrator');
  const [netPass, setNetPass] = useState('password123');
  const [localPath, setLocalPath] = useState('/disk/desk0_1/kt2000_data/record');
  const [toastMessage, setToastMessage] = useState('');

  const pathSelectOptions = [
    { value: 'localPath', label: t('localPath', '本机路径') },
    { value: 'networkPath', label: t('networkPath', '网络路径') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-storage-page">
      <div className="lcs-web-section-title">{t('pageTitle', '存储设置')}</div>

      <div className="lcs-web-card">
        {/* Top Radio & Tips */}
        <div className="flex items-start gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input type="radio" name="priority" checked={priority === 'deleteFirst'} onChange={() => setPriority('deleteFirst')} />
              <span>{t('deleteFirst', '删除文件优先')}</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
              <input type="radio" name="priority" checked={priority === 'stopFirst'} onChange={() => setPriority('stopFirst')} />
              <span>{t('stopFirst', '停止录制优先')}</span>
            </label>
          </div>
          <div className="text-xs text-slate-400 flex-1 leading-relaxed">
            {t('tipStorage', '操作提示: 1、选择"删除文件优先"当磁盘空间不足时, 会删除录像时间最早的录像文件。2、选择"停止录制优先"当磁盘空间不足时, 会停止当前录制。')}
          </div>
        </div>

        {/* Sub-card 1: 存储路径 */}
        <div className="lcs-web-subcard-box my-4 p-4 bg-slate-50 border border-slate-200 rounded flex flex-col gap-3">
          <div className="flex items-center gap-6">
            <span className="w-20 text-xs text-slate-700 font-semibold">{t('subcardPath', '存储路径')}</span>
            <span className="text-xs text-slate-600">{t('pathSelect', '路径选择')}</span>
            <div className="w-36">
              <NativeSelect
                value={pathSelect}
                options={pathSelectOptions}
                onChange={setPathSelect}
              />
            </div>
          </div>

          {/* Network Path */}
          <div className="flex items-center gap-6 pt-2 border-t border-slate-200 flex-wrap">
            <div className="flex items-center gap-2 w-20">
              <span className="text-xs text-slate-600">{t('network', '网络')}</span>
              <span className="text-[11px] text-slate-400">({t('unopened', '未开启')})</span>
            </div>
            <span className="text-xs text-slate-400">{t('tipNetworkPath', '操作提示: 网络路径格式为"//地址/路径", 如"//192.168.1.10/record"')}</span>
          </div>

          <div className="flex items-center gap-6 pl-24 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('networkPath', '网络路径')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-56 font-mono text-xs"
                value={netPath}
                onChange={e => setNetPath(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('username', '用户名')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-36 text-xs"
                value={netUser}
                onChange={e => setNetUser(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('password', '密码')}</span>
              <div className="relative w-36">
                <input
                  type="password"
                  className="lcs-web-compact-input w-full text-xs pr-8"
                  value={netPass}
                  onChange={e => setNetPass(e.target.value)}
                />
                <Eye size={13} className="absolute right-2 top-2 text-slate-400 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Local Path */}
          <div className="flex items-center gap-6 pt-2 border-t border-slate-200 flex-wrap">
            <div className="flex items-center gap-2 w-20">
              <span className="text-xs text-slate-600">{t('local', '本机')}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">({t('opened', '已开启')})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{t('storagePath', '存储路径')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-80 font-mono text-xs"
                value={localPath}
                onChange={e => setLocalPath(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Sub-card 2: 存储类型 */}
        <div className="lcs-web-subcard-box my-4 p-4 bg-slate-50 border border-slate-200 rounded">
          <div className="flex items-center gap-6 mb-3">
            <span className="w-20 text-xs text-slate-700 font-semibold">{t('subcardType', '存储类型')}</span>
          </div>

          <table className="lcs-web-data-table">
            <thead>
              <tr>
                <th>{t('colStorageName', '存储名称')}</th>
                <th>{t('colTotalCap', '总容量')}</th>
                <th>{t('colUsedCap', '已用容量')}</th>
                <th>{t('colAvailCap', '可用容量')}</th>
                <th>{t('colStatus', '状态')}</th>
                <th>{t('colAction', '操作')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('localStorage', '本机存储')}</td>
                <td>930.39GB</td>
                <td>96.73GB</td>
                <td>833.66GB</td>
                <td><span className="text-emerald-600 font-semibold">{t('normal', '读取正常')}</span></td>
                <td>
                  <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('格式化请求已提交')}>
                    {t('format', '格式化')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('存储设置已保存')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
