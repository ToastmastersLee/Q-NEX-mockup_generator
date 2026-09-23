import { useState } from 'react';
import {
  Eye,
  EyeOff,
} from 'lucide-react';
import { CustomSelect } from '../common';
import { useTranslation } from '../../i18n';

export function UploadSettingPage() {
  const { t } = useTranslation('upload');
  const [fileUpload, setFileUpload] = useState(true);
  const [uploadPath, setUploadPath] = useState('ftp://192.168.10.168:2021/IQ-FTP/');
  const [uploadWay, setUploadWay] = useState('realtime');
  const [username, setUsername] = useState('10813');
  const [password, setPassword] = useState('Iqboard2022');
  const [showPassword, setShowPassword] = useState(false);
  const [uploadMode, setUploadMode] = useState('standardFtp');
  const [platformIp, setPlatformIp] = useState('');
  const [platformPort, setPlatformPort] = useState('');
  const [dwUsername, setDwUsername] = useState('');
  const [dwPassword, setDwPassword] = useState('');
  const [byUsername, setByUsername] = useState(false);
  const [filmOnly, setFilmOnly] = useState(true);
  const [toastMessage, setToastMessage] = useState('');


  const uploadWayOptions = [
    { value: 'leisure', label: t('leisure', 'leisure') },
    { value: 'realtime', label: t('realtime', 'real time') },
    { value: 'timing', label: t('timing', 'timing') },
  ];

  const uploadModeOptions = [
    { value: 'standardFtp', label: t('standardFtp', 'Standard FTP upload') },
    { value: 'centralizedControl', label: t('centralizedControl', 'Upload to centralized control platform') },
    { value: 'thirdPartyCentralizedControl', label: t('thirdPartyCentralizedControl', 'Upload to the third-party centralized control platform') },
    { value: 'dw', label: t('dw', 'DW') },
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
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('fileUpload', 'File Upload')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={fileUpload} onChange={e => setFileUpload(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 2: 上传路径 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('uploadPath', 'Upload Path')}</span>
          <input
            type="text"
            className="lcs-web-compact-input w-72 font-mono text-xs"
            value={uploadPath}
            onChange={e => setUploadPath(e.target.value)}
          />
          <span className="text-xs text-slate-400">{t('tipUploadPath', 'TIP: The upload path format is "address/path", such as"ftp://192.168.1.10/record"')}</span>
        </div>

        {/* Row 3: 上传方式 */}
        <div className="flex items-start gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold pt-1">{t('uploadWay', 'Upload Way')}</span>
          <div className="w-64">
            <CustomSelect
              value={uploadWay}
              options={uploadWayOptions}
              onChange={setUploadWay}
            />
          </div>
          <div className="text-xs text-slate-400 flex-1 min-w-[300px] leading-relaxed">
            {t('tipUploadWay', 'TIP: 1. leisure, upload when no other tasks are executed.2. real time, upload as long as any file is not synchronized. 3. timing, means that synchronize files within the specified time.')}
          </div>
        </div>

        {/* Row 4: 用户名 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('username', 'UserName')}</span>
          <input
            type="text"
            className="lcs-web-compact-input w-64 text-xs"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        {/* Row 5: 密码 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold">{t('password', 'Password')}</span>
          <div className="relative w-64">
            <input
              type={showPassword ? 'text' : 'password'}
              className="lcs-web-compact-input w-full text-xs pr-8"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 flex items-center justify-center bg-transparent border-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Row 6: 上传模式 */}
        <div className="flex items-center gap-6 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-32 text-xs text-slate-700 font-semibold flex-shrink-0">{t('uploadMode', 'Upload Mode')}</span>
          <div className="w-72 flex-shrink-0">
            <CustomSelect
              value={uploadMode}
              options={uploadModeOptions}
              onChange={setUploadMode}
            />
          </div>

          {(uploadMode === 'centralizedControl' || uploadMode === 'thirdPartyCentralizedControl') && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-700 font-medium">IP</span>
              <input
                type="text"
                className="lcs-web-compact-input w-36 text-xs"
                value={platformIp}
                onChange={e => setPlatformIp(e.target.value)}
              />
              <span className="text-xs text-slate-700 font-medium ml-2">Port</span>
              <input
                type="text"
                className="lcs-web-compact-input w-32 text-xs"
                value={platformPort}
                onChange={e => setPlatformPort(e.target.value)}
              />
            </div>
          )}

          {uploadMode === 'dw' && (
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-700 font-medium">IP</span>
              <input
                type="text"
                className="lcs-web-compact-input w-28 text-xs"
                value={platformIp}
                onChange={e => setPlatformIp(e.target.value)}
              />
              <span className="text-xs text-slate-700 font-medium ml-1">Port</span>
              <input
                type="text"
                className="lcs-web-compact-input w-24 text-xs"
                value={platformPort}
                onChange={e => setPlatformPort(e.target.value)}
              />
              <span className="text-xs text-slate-700 font-medium ml-1">{t('username', 'UserName')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-28 text-xs"
                value={dwUsername}
                onChange={e => setDwUsername(e.target.value)}
              />
              <span className="text-xs text-slate-700 font-medium ml-1">{t('password', 'Password')}</span>
              <input
                type="password"
                className="lcs-web-compact-input w-28 text-xs"
                value={dwPassword}
                onChange={e => setDwPassword(e.target.value)}
              />
            </div>
          )}
        </div>


        {/* Row 7: 根据用户名上传不同目录 */}
        <div className="flex items-center gap-8 py-2.5 border-b border-slate-100 flex-wrap">
          <span className="w-48 text-xs text-slate-700 font-semibold">{t('uploadByUsername', 'uploadByUserName')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={byUsername} onChange={e => setByUsername(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>

        {/* Row 8: 只上传电影模式的录像 */}
        <div className="flex items-center gap-8 py-2.5 flex-wrap">
          <span className="w-48 text-xs text-slate-700 font-semibold">{t('filmOnly', 'uploadFilmOnly')}</span>
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