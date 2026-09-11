import { useState } from 'react';
import {
  Clock,
} from 'lucide-react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function SystemSettingPage() {
  const { t, language, changeLanguage } = useTranslation('system');
  const [timeZone, setTimeZone] = useState('(GMT+08:00) Beijing, Chongqing, Hon');
  const [dateFormat, setDateFormat] = useState('DD-MM-YYYY');
  const [timeFormat, setTimeFormat] = useState('format24h');
  const [dateTime, setDateTime] = useState('26 08 2026 11:39:08');
  const [ntpAuto, setNtpAuto] = useState(true);
  const [ntpAddress, setNtpAddress] = useState('');

  const [saveDirectorLayout, setSaveDirectorLayout] = useState(true);
  const [countdownAlert, setCountdownAlert] = useState(false);
  const [screenOffTime, setScreenOffTime] = useState('alwaysOn');
  const [secondScreenFilm, setSecondScreenFilm] = useState(false);
  const [autoReboot, setAutoReboot] = useState(false);
  const [bgFile, setBgFile] = useState('');
  const [bgSwitch, setBgSwitch] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  void setToastMessage;

  const timeFormatOptions = [
    { value: 'format24h', label: t('format24h', '24小时制') },
    { value: 'format12h', label: t('format12h', '12小时制') },
  ];

  const screenOffOptions = [
    { value: 'alwaysOn', label: t('alwaysOn', '常亮') },
    { value: 'time5m', label: t('time5m', '5分钟') },
    { value: 'time10m', label: t('time10m', '10分钟') },
    { value: 'time30m', label: t('time30m', '30分钟') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <section className="lcs-web-page lcs-web-system-page">
      {/* Card 1: 时间设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleTime', '时间设置')}</h3>

        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('timeZone', '时区设置')}</span>
          <div className="w-64">
            <NativeSelect
              value={timeZone}
              options={['(GMT+08:00) Beijing, Chongqing, Hon', '(GMT+00:00) UTC', '(GMT-05:00) Eastern Time']}
              onChange={setTimeZone}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('dateFormat', '日期格式')}</span>
          <div className="w-64">
            <NativeSelect
              value={dateFormat}
              options={['DD-MM-YYYY', 'YYYY-MM-DD', 'MM-DD-YYYY']}
              onChange={setDateFormat}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('timeFormat', '时间格式')}</span>
          <div className="w-64">
            <NativeSelect
              value={timeFormat}
              options={timeFormatOptions}
              onChange={setTimeFormat}
            />
          </div>
        </div>

        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('dateTime', '日期时间')}</span>
          <div className="lcs-web-time-input-box w-64">
            <Clock size={13} className="text-slate-400" />
            <input
              type="text"
              className="flex-1"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
            />
          </div>
          <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('时间已保存')}>
            {t('ok', '确定')}
          </button>
          <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('已同步本地时间')}>
            {t('sync', '同步')}
          </button>
        </div>

        {/* Sub-card: NTP设置 */}
        <div className="lcs-web-ntp-subcard mt-3">
          <div className="lcs-web-ntp-title">{t('cardTitleNtp', 'NTP设置')}</div>
          <div className="flex-1">
            <div className="flex items-center gap-4 py-1">
              <span className="text-xs text-slate-600">{t('ntpAuto', '开机自动同步')}</span>
              <label className="lcs-web-switch">
                <input type="checkbox" checked={ntpAuto} onChange={e => setNtpAuto(e.target.checked)} />
                <span className="slider" />
              </label>
            </div>
            <div className="flex items-center gap-3 py-1">
              <span className="text-xs text-slate-600">{t('ntpAddress', 'NTP地址')}</span>
              <input
                type="text"
                className="lcs-web-compact-input w-48"
                value={ntpAddress}
                onChange={e => setNtpAddress(e.target.value)}
              />
              <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('NTP设置已保存')}>
                {t('ok', '确定')}
              </button>
              <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => showToast('NTP已同步')}>
                {t('sync', '同步')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: 其他设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleOther', '其他设置')}</h3>

        {/* Row 1 */}
        <div className="flex items-center gap-8 py-2 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('saveDirectorLayout', '保存导播布局')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={saveDirectorLayout} onChange={e => setSaveDirectorLayout(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{t('countdownAlert', '开始录制/开始直播倒计时提醒')}</span>
            <label className="lcs-web-switch">
              <input type="checkbox" checked={countdownAlert} onChange={e => setCountdownAlert(e.target.checked)} />
              <span className="slider" />
            </label>
          </div>

          <span className="text-xs text-slate-400">{t('tipCountdown', '操作提示: 倒计时提醒只在本地界面显示')}</span>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-6 py-2 flex-wrap">
          <span className="w-24 text-xs text-slate-600">{t('screenOffTime', '熄屏时间')}</span>
          <div className="w-48">
            <NativeSelect
              value={screenOffTime}
              options={screenOffOptions}
              onChange={setScreenOffTime}
            />
          </div>
          <span className="text-xs text-slate-400">{t('tipScreenOff', '操作提示: 熄屏时间只对带屏幕设备有效')}</span>
        </div>

        {/* Row 3 */}
        <div className="flex items-center gap-6 py-2 flex-wrap">
          <div className="w-24 text-xs text-slate-600 leading-tight">{t('secondScreenFilm', '第二屏显示电影画面')}</div>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={secondScreenFilm} onChange={e => setSecondScreenFilm(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('tipSecondScreen', '操作提示: 开启时第二屏只会显示电影画面, 未开启时第二屏按照系统自身逻辑显示画面')}</span>
        </div>

        {/* Row 4 */}
        <div className="flex items-center gap-6 py-2 flex-wrap">
          <span className="w-24 text-xs text-slate-600">{t('autoReboot', '定时自动重启')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={autoReboot} onChange={e => setAutoReboot(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('tipAutoReboot', '操作提示: 开启后, 设备将在每天凌晨02:00-03:00之间自动重启, 以清理缓存保持系统流畅')}</span>
        </div>

        {/* Row 5 */}
        <div className="flex items-center gap-4 py-2 flex-wrap">
          <span className="w-24 text-xs text-slate-600">{t('layoutBg', '布局背景')}</span>
          <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={() => setBgFile('bg_custom.png')}>{t('chooseFile', '选择文件')}</button>
          <span className="text-xs text-slate-500">{bgFile || t('noFileSelected', '未选择任何文件')}</span>
          <label className="lcs-web-switch">
            <input type="checkbox" checked={bgSwitch} onChange={e => setBgSwitch(e.target.checked)} />
            <span className="slider" />
          </label>
          <span className="text-xs text-slate-400">{t('noImage', '无图片')}</span>
          <span className="text-xs text-slate-400 ml-4">{t('tipBgNote', '注意事项: 只支持24bit和32bit png格式, 分辨率等于1920*1080图片。')}</span>
        </div>
      </div>

      {/* Card 3: 语言设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleLang', '语言设置')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('systemLang', '系统语言')}</span>
          <div className="w-48">
            <NativeSelect
              value={language === 'en' ? 'English' : '中文(简体)'}
              options={['中文(简体)', 'English']}
              onChange={val => changeLanguage(val === 'English' ? 'en' : 'zh')}
            />
          </div>
        </div>
      </div>

      {/* Card 4: 账户设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleAccount', '账户设置')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('oldPassword', '原密码')}</span>
          <input
            type="password"
            className="lcs-web-compact-input w-64"
            placeholder={t('phOldPassword', '请输入旧密码')}
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('newPassword', '修改密码')}</span>
          <input
            type="password"
            className="lcs-web-compact-input w-64"
            placeholder={t('phNewPassword', '请输入新密码')}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('confirmPassword', '确认密码')}</span>
          <input
            type="password"
            className="lcs-web-compact-input w-64"
            placeholder={t('phConfirmPassword', '请再次输入密码')}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="lcs-web-ok mt-4" type="button" onClick={() => showToast('密码已修改')}>
          {t('ok', '确定')}
        </button>
      </div>

      {/* Card 5: 系统升级 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleUpgrade', '系统升级')}</h3>
        {['firmwareUpgrade', 'systemUpgrade', 'aecUpgrade', 'licenseUpgrade'].map(key => {
          const names = {
            firmwareUpgrade: t('firmwareUpgrade', '固件升级'),
            systemUpgrade: t('systemUpgrade', '系统升级'),
            aecUpgrade: t('aecUpgrade', 'AEC升级'),
            licenseUpgrade: t('licenseUpgrade', 'License升级'),
          };
          return (
            <div key={key} className="flex items-center gap-4 py-2">
              <span className="w-24 text-xs text-slate-600">{names[key]}</span>
              <button type="button" className="lcs-web-btn-blue-outline-sm">{t('chooseFile', '选择文件')}</button>
              <button type="button" className="lcs-web-btn-yellow-disabled-sm">{t('upgrade', '升级')}</button>
              <span className="text-xs text-slate-400">{t('noFileSelected', '未选择任何文件')}</span>
            </div>
          );
        })}
        <div className="text-xs text-slate-400 mt-3">{t('tipUpgradeSteps', '升级步骤: (1) 上传升级文件; (2) 上传完成后点击升级按钮; (3) 弹出升级完毕后完成升级。')}</div>
      </div>

      {/* Card 6: 性能检测 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitlePerf', '性能检测')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="text-xs text-slate-600">{t('perfFeature', '性能监测功能')}</span>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('性能监测已打开')}>
            {t('open', '打开')}
          </button>
        </div>
      </div>

      {/* Card 7: 日志管理 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleLog', '日志管理')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600 font-mono">Server.log</span>
          <button type="button" className="lcs-web-btn-blue-sm" onClick={() => showToast('正在下载日志...')}>
            {t('download', '下载')}
          </button>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
