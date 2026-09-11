import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Toggle, NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';
import ch4StudentClose from '../../../../../assets/ch4_student_close.png';
import ch6StudentWide from '../../../../../assets/ch4_student_panoprama.png';
import { DebugPtzControls } from './DebugPtzControls';

export function StudentDebugCard({ onToast }) {
  const { t } = useTranslation('trackerDebug');

  const optSelect = { value: '', label: t('pleaseSelect', '请选择') };
  const optCustom = { value: 'custom', label: t('custom', '自定义') };
  const optDefault = { value: 'default', label: t('default', '默认') };

  const [studentShieldArea, setStudentShieldArea] = useState(1);
  const [studentPresetView, setStudentPresetView] = useState(false);
  const [studentForm, setStudentForm] = useState({
    cameraType: '',
    fullCameraType: 'custom',
    cameraPort1: '/dev/ttyAMA3',
    cameraPort2: 'AMA',
    viscaAddress: '',
    cameraBaud: '',
    fullCameraX: '',
    fullCameraY: '',
    fullCameraHeight: '',
    fullCameraXCenter: '',
    fullCameraYCenter: '',
    fullCameraHeightCenter: '',
    sensitivity: '',
    fullCameraAngle: '',
    fullCameraCorrectParam: '',
  });

  const handleStudentSave = () => {
    onToast(t('stuSaved', '学生跟踪调试参数已保存'));
  };

  return (
        <div className="lcs-web-card lcs-web-debug-card">
          <div className="lcs-web-debug-card-header">
            <span className="lcs-web-debug-card-title">{t('student', '学生')}</span>
            <HelpCircle size={18} className="lcs-web-debug-help-icon" />
          </div>

          {/* Row 1: Shielding Area */}
          <div className="lcs-web-debug-media-row">
            <div className="lcs-web-debug-video-container relative">
              <img src={ch6StudentWide} alt="Student Wide" className="lcs-web-debug-video-img" />
              <span className="absolute top-1 left-2 text-green-500 font-bold text-xs">1</span>
              <span className="absolute top-1 right-2 text-green-500 font-bold text-xs">3</span>
              <span className="absolute bottom-1 left-2 text-green-500 font-bold text-xs">1</span>
              <span className="absolute bottom-1 right-2 text-green-500 font-bold text-xs">2</span>
            </div>
            <div className="lcs-web-debug-controls-col">
              <div className="lcs-web-debug-sub-section">
                <div className="lcs-web-debug-sub-title">{t('shieldZone', '屏蔽区')}</div>
                <div className="lcs-web-debug-btn-row">
                  {[1, 2, 3, 4].map(id => (
                    <button
                      key={id}
                      type="button"
                      className={`lcs-web-debug-sq-btn is-blue ${studentShieldArea === id ? 'is-active' : ''}`}
                      onClick={() => setStudentShieldArea(id)}
                    >
                      {id}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="lcs-web-debug-pill-btn"
                    onClick={() => { setStudentShieldArea(null); onToast(t('stuShieldClosed', '学生屏蔽区已关闭')); }}
                  >
                    {t('close', '关闭')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: PTZ & Preset View */}
          <div className="lcs-web-debug-media-row mt-4">
            <div className="lcs-web-debug-video-container">
              <img src={ch4StudentClose} alt="Student Close" className="lcs-web-debug-video-img" />
            </div>
            <div className="lcs-web-debug-ptz-col">
              {/* D-Pad & Zoom Controls */}
              <DebugPtzControls onAction={onToast} />

              {/* Set Preset & Full View */}
              <div className="lcs-web-debug-preset-wrap">
                <div className="lcs-web-debug-preset-group">
                  <div className="lcs-web-debug-sub-title">{t('setCloseupPos', '设置特写位')}</div>
                  <div className="lcs-web-debug-action-inline">
                    <Toggle checked={studentPresetView} onClick={() => setStudentPresetView(!studentPresetView)} />
                    <button type="button" className="lcs-web-debug-light-btn" onClick={() => onToast(t('presetSaved', '特写位已保存'))}>{t('save', '保存')}</button>
                  </div>
                </div>
                <div className="lcs-web-debug-preset-group">
                  <div className="lcs-web-debug-sub-title">{t('setFullPos', '设置全景位')}</div>
                  <div className="lcs-web-debug-action-inline">
                    <button type="button" className="lcs-web-debug-light-btn" onClick={() => onToast(t('fullSet', '全景位已设置'))}>{t('set', '设置')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="lcs-web-debug-form mt-4">
            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('cameraModel', '拍摄摄像机型号')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={studentForm.cameraType}
                  options={[optSelect, 'Sony VISCA', 'Pelco-D', 'Pelco-P']}
                  onChange={v => setStudentForm({ ...studentForm, cameraType: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCameraModel', '全景摄像机型号')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={studentForm.fullCameraType}
                  options={[optCustom, 'C3000-20', optDefault]}
                  onChange={v => setStudentForm({ ...studentForm, fullCameraType: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('cameraPort', '摄像机控制端口')}</span>
              <div className="lcs-web-debug-split-wrap">
                <NativeSelect
                  value={studentForm.cameraPort1}
                  options={['/dev/ttyAMA3', '/dev/ttyAMA1', '/dev/ttyAMA2']}
                  onChange={v => setStudentForm({ ...studentForm, cameraPort1: v })}
                />
                <NativeSelect
                  value={studentForm.cameraPort2}
                  options={['AMA', 'USB', 'COM']}
                  onChange={v => setStudentForm({ ...studentForm, cameraPort2: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('viscaAddr', 'VISCA地址')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={studentForm.viscaAddress}
                  options={[optSelect, '1', '2', '3', '4', '5']}
                  onChange={v => setStudentForm({ ...studentForm, viscaAddress: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('baudRate', '波特率')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={studentForm.cameraBaud}
                  options={[optSelect, '9600', '19200', '38400', '115200']}
                  onChange={v => setStudentForm({ ...studentForm, cameraBaud: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCamX', '全景摄像机X坐标')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraX}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraX: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCamY', '全景摄像机Y坐标')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraY}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraY: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCamHeight', '全景摄像机的高度')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraHeight}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraHeight: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCenterPointX', '全景摄像机画面中心点X坐标')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraXCenter}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraXCenter: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCenterPointY', '全景摄像机画面中心点Y坐标')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraYCenter}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraYCenter: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('stuCenterPointHeight', '全景摄像机画面中心点高度')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraHeightCenter}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraHeightCenter: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('sensitivity', '灵敏度')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={studentForm.sensitivity}
                  options={[optSelect, '1', '2', '3', '4', '5']}
                  onChange={v => setStudentForm({ ...studentForm, sensitivity: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCamFov', '全景摄像机视场角')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraAngle}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraAngle: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCamCorrectParam', '全景摄像机修正参数')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={studentForm.fullCameraCorrectParam}
                  onChange={e => setStudentForm({ ...studentForm, fullCameraCorrectParam: e.target.value })}
                />
              </div>
            </div>

            <button className="lcs-web-ok mt-4" type="button" onClick={handleStudentSave}>
              {t('ok', '确定')}
            </button>
          </div>
        </div>
  );
}
