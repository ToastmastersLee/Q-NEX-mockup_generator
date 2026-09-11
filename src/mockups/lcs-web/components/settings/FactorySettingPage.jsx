import { useState, useRef } from 'react';
import { NativeSelect } from '../common';
import { useTranslation } from '../../i18n';

export function FactorySettingPage() {
  const { t } = useTranslation('factory');
  const [styleMode, setStyleMode] = useState('styleDefault');
  const [selectedFile, setSelectedFile] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef(null);

  const styleOptions = [
    { value: 'styleDefault', label: t('styleDefault', '默认风格') },
    { value: 'styleClassic', label: t('styleClassic', '经典风格') },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRecovery = () => {
    showToast(t('tipRestore', '正在恢复默认参数... 设备将自动重启'));
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      showToast(`File selected: ${file.name}`);
    }
  };

  const handleExport = () => {
    showToast('Exporting conf.tar.gz ...');
  };

  return (
    <section className="lcs-web-page lcs-web-factory-page">
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('pageTitle', '出厂设置')}</h3>

        {/* Row 1: 恢复默认参数 */}
        <div className="flex items-center gap-6 py-3 border-b border-slate-100 flex-wrap">
          <span className="w-24 text-xs text-slate-700 font-semibold">{t('restoreDefaults', '恢复默认参数')}</span>
          <button type="button" className="lcs-web-btn-blue-outline-sm" onClick={handleRecovery}>
            {t('oneClickRestore', '一键恢复')}
          </button>
          <span className="text-xs text-slate-400">{t('tipRestore', '操作提示: 恢复成功之后设备会自动重启。')}</span>
        </div>

        {/* Row 2: 配置文件 */}
        <div className="flex items-start gap-6 py-4 bg-slate-50 rounded p-4 my-2 flex-wrap">
          <span className="w-24 text-xs text-slate-700 font-semibold pt-1">{t('configFile', '配置文件')}</span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".tar.gz,.gz,.tar"
                onChange={handleFileChange}
              />
              <button type="button" className="lcs-web-btn-green-sm" onClick={handleImportClick}>
                {t('import', '导入')}
              </button>
              <button type="button" className="lcs-web-btn-yellow-sm" onClick={handleExport}>
                {t('export', '导出')}
              </button>
            </div>
            <span className="text-xs text-slate-400">{selectedFile || t('noFileSelected', '未选择任何文件')}</span>
          </div>
          <div className="text-xs text-slate-400 ml-8 leading-relaxed whitespace-pre-line flex-1">
            {t('tipConfigFile', '操作提示:\n1 上传文件名字必须为conf.tar.gz;\n2 导入成功后需要重启。')}
          </div>
        </div>
      </div>

      {/* Card 2: 界面设置 */}
      <div className="lcs-web-card mb-4">
        <h3 className="lcs-web-card-inner-title">{t('cardTitleUi', '界面设置')}</h3>
        <div className="flex items-center gap-6 py-2">
          <span className="w-24 text-xs text-slate-600">{t('uiStyle', '界面风格')}</span>
          <div className="w-48">
            <NativeSelect
              value={styleMode}
              options={styleOptions}
              onChange={setStyleMode}
            />
          </div>
        </div>
      </div>

      {toastMessage && <div className="lcs-web-toast">{toastMessage}</div>}
    </section>
  );
}
