import { useState } from 'react';
import {
  Eye,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function UploadSettingPage() {
  const { t } = useTranslation('upload');
  const [fileUpload, setFileUpload] = useState(true);
  const [uploadPath, setUploadPath] = useState('ftp://192.168.10.168:2021/IQ-FTP/');
  const [uploadMode, setUploadMode] = useState('realtime');
  const [username, setUsername] = useState('10813');
  const [password, setPassword] = useState('password123');
  const [uploadType, setUploadType] = useState('standardFtp');
  const [byUsername, setByUsername] = useState(false);
  const [filmOnly, setFilmOnly] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  const uploadModeOptions = [
    { value: 'realtime', label: t('realtime', '实时上传') },
    { value: 'idle', label: t('idle', '闲时上传') },
    { value: 'scheduled', label: t('scheduled', '定时上传') },
  ];

  const uploadTypeOptions = [
    { value: 'standardFtp', label: t('standardFtp', '标准ftp上传') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-upload-page">
      <div className="lcs-web-section-title">{t('pageTitle', '上传设置')}</div>

      <div className="lcs-web-card">
        {/* Row 1: 文件上传 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('fileUpload', '文件上传')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={fileUpload} onChange={e => setFileUpload(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 2: 上传路径 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('uploadPath', '上传路径')}</span>
          <input
            type="text"
            className="lcs-web-compact-input w-72 font-mono text-xs"
            value={uploadPath}
            onChange={e => setUploadPath(e.target.value)}
          />
          <span className="text-xs text-slate-400">{t('tipUploadPath', '操作提示: 上传路径格式为"地址/路径", 如"ftp://192.168.1.10/record"')}</span>
        </div>

        {/* Row 3: 上传方式 */}
        <div className="flex items-start gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold pt-1">{t('uploadMode', '上传方式')}</span>
          <div className="w-64">
            <NativeSelect
              value={uploadMode}
              options={uploadModeOptions}
              onChange={setUploadMode}
            />
          </div>
          <div className="text-xs text-slate-400 flex-1 min-w-[300px] leading-relaxed">
            {t('tipUploadMode', '操作提示: 1、闲时上传, 是指录播主机在无其他任务执行时, 进行录像文件同步。2、实时上传, 是指只要有文件未同步完成, 就会进行文件同步。3、定时上传, 是指在指定时间内进行文件同步。')}
          </div>
        </div>

        {/* Row 4: 用户名 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('username', '用户名')}</span>
          <input
            type="text"
            className="lcs-web-compact-input w-64 text-xs"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        {/* Row 5: 密码 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('password', '密码')}</span>
          <div className="relative w-64">
            <input
              type="password"
              className="lcs-web-compact-input w-full text-xs pr-8"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Eye size={14} className="absolute right-2.5 top-2 text-slate-400 cursor-pointer" />
          </div>
        </div>

        {/* Row 6: 上传模式 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('uploadType', '上传模式')}</span>
          <div className="w-64">
            <NativeSelect
              value={uploadType}
              options={uploadTypeOptions}
              onChange={setUploadType}
            />
          </div>
        </div>

        {/* Row 7: 根据用户名上传不同目录 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-48 text-xs text-slate-700 font-semibold">{t('uploadByUsername', '根据用户名上传不同目录')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={byUsername} onChange={e => setByUsername(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 8: 只上传电影模式的录像 */}
        <div className="flex items-center gap-8 py-2.5 flex-wrap">
          <span className="w-48 text-xs text-slate-700 font-semibold">{t('filmOnly', '只上传电影模式的录像')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={filmOnly} onChange={e => setFilmOnly(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('OK')}>
          {t('ok', '确定')}
        </button>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
