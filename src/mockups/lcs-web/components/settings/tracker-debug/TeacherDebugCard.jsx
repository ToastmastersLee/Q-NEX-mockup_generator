import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Toggle, NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';
import ch3TeacherClose from '../../../../../assets/ch3_teacher_close.png';
import { DebugPtzControls } from './DebugPtzControls';

export function TeacherDebugCard({ onToast }) {
  const { t } = useTranslation('trackerDebug');

  const optSelect = { value: '', label: t('pleaseSelect', '请选择') };
  const optCustom = { value: 'custom', label: t('custom', '自定义') };
  const optDefault = { value: 'default', label: t('default', '默认') };

  const [teacherDetectArea, setTeacherDetectArea] = useState(1);
  const [teacherShieldArea, setTeacherShieldArea] = useState(1);
  const [teacherPresetView, setTeacherPresetView] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    cameraType: '',
    fullCameraType: 'C3000-20',
    cameraPort1: '/dev/ttyAMA3',
    cameraPort2: 'AMA',
    viscaAddress: '',
    cameraBaud: '',
    fullCameraHeight: '',
    cameraHeight: '',
    cameraDistance: '',
    sensitivity: '',
    fullCameraAngle: '',
    fullCameraCorrectParam: '',
    blackboardDelayTime: '',
    blackboardKeepTime: '',
  });

  const handleTeacherSave = () => {
    onToast(t('tchSaved', '教师跟踪调试参数已保存'));
  };

  return (
        <div className="lcs-web-card lcs-web-debug-card">
          <div className="lcs-web-debug-card-header">
            <span className="lcs-web-debug-card-title">{t('teacher', '教师')}</span>
            <HelpCircle size={18} className="lcs-web-debug-help-icon" />
          </div>

          {/* Row 1: Detect & Shielding Area */}
          <div className="lcs-web-debug-media-row">
            <div className="lcs-web-debug-video-container">
              <img src={ch3TeacherClose} alt="Teacher Detection" className="lcs-web-debug-video-img" />
            </div>
            <div className="lcs-web-debug-controls-col">
              <div className="lcs-web-debug-sub-section">
                <div className="lcs-web-debug-sub-title">{t('detectZone', '检测区')}</div>
                <div className="lcs-web-debug-btn-row">
                  <button
                    type="button"
                    className={`lcs-web-debug-sq-btn is-green ${teacherDetectArea === 1 ? 'is-active' : ''}`}
                    onClick={() => setTeacherDetectArea(1)}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="lcs-web-debug-pill-btn"
                    onClick={() => { setTeacherDetectArea(null); onToast(t('tchDetectCleared', '教师检测区已清除')); }}
                  >
                    {t('clear', '清除')}
                  </button>
                </div>
              </div>

              <div className="lcs-web-debug-sub-section">
                <div className="lcs-web-debug-sub-title">{t('shieldZone', '屏蔽区')}</div>
                <div className="lcs-web-debug-btn-row">
                  {[1, 2, 3, 4].map(id => (
                    <button
                      key={id}
                      type="button"
                      className={`lcs-web-debug-sq-btn is-blue ${teacherShieldArea === id ? 'is-active' : ''}`}
                      onClick={() => setTeacherShieldArea(id)}
                    >
                      {id}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="lcs-web-debug-pill-btn"
                    onClick={() => { setTeacherShieldArea(null); onToast(t('tchShieldCleared', '教师屏蔽区已清除')); }}
                  >
                    {t('clear', '清除')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: PTZ & Preset View */}
          <div className="lcs-web-debug-media-row mt-4">
            <div className="lcs-web-debug-video-container">
              <img src={ch3TeacherClose} alt="Teacher Wide" className="lcs-web-debug-video-img" />
            </div>
            <div className="lcs-web-debug-ptz-col">
              {/* D-Pad & Zoom Controls */}
              <DebugPtzControls onAction={onToast} />

              {/* Set Preset & Full View */}
              <div className="lcs-web-debug-preset-wrap">
                <div className="lcs-web-debug-preset-group">
                  <div className="lcs-web-debug-sub-title">{t('setCloseupPos', '设置特写位')}</div>
                  <div className="lcs-web-debug-action-inline">
                    <Toggle checked={teacherPresetView} onClick={() => setTeacherPresetView(!teacherPresetView)} />
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
                  value={teacherForm.cameraType}
                  options={[optSelect, 'Sony VISCA', 'Pelco-D', 'Pelco-P']}
                  onChange={v => setTeacherForm({ ...teacherForm, cameraType: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCameraModel', '全景摄像机型号')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={teacherForm.fullCameraType}
                  options={['C3000-20', optCustom, optDefault]}
                  onChange={v => setTeacherForm({ ...teacherForm, fullCameraType: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('cameraPort', '摄像机控制端口')}</span>
              <div className="lcs-web-debug-split-wrap">
                <NativeSelect
                  value={teacherForm.cameraPort1}
                  options={['/dev/ttyAMA3', '/dev/ttyAMA1', '/dev/ttyAMA2']}
                  onChange={v => setTeacherForm({ ...teacherForm, cameraPort1: v })}
                />
                <NativeSelect
                  value={teacherForm.cameraPort2}
                  options={['AMA', 'USB', 'COM']}
                  onChange={v => setTeacherForm({ ...teacherForm, cameraPort2: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('viscaAddr', 'VISCA地址')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={teacherForm.viscaAddress}
                  options={[optSelect, '1', '2', '3', '4', '5']}
                  onChange={v => setTeacherForm({ ...teacherForm, viscaAddress: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('baudRate', '波特率')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={teacherForm.cameraBaud}
                  options={[optSelect, '9600', '19200', '38400', '115200']}
                  onChange={v => setTeacherForm({ ...teacherForm, cameraBaud: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('tchVerticalDist', '全景摄像机到定位区竖直距离')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.fullCameraHeight}
                  onChange={e => setTeacherForm({ ...teacherForm, fullCameraHeight: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('tchCamHeight', '拍摄摄像机的高度')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.cameraHeight}
                  onChange={e => setTeacherForm({ ...teacherForm, cameraHeight: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('tchHorizDist', '拍摄摄像机和黑板间的水平距离')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.cameraDistance}
                  onChange={e => setTeacherForm({ ...teacherForm, cameraDistance: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('sensitivity', '灵敏度')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={teacherForm.sensitivity}
                  options={[optSelect, '1', '2', '3', '4', '5']}
                  onChange={v => setTeacherForm({ ...teacherForm, sensitivity: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCamFov', '全景摄像机视场角')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.fullCameraAngle}
                  onChange={e => setTeacherForm({ ...teacherForm, fullCameraAngle: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('fullCamCorrectParam', '全景摄像机修正参数')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.fullCameraCorrectParam}
                  onChange={e => setTeacherForm({ ...teacherForm, fullCameraCorrectParam: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('boardDelayTime', '板书延迟时间')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.blackboardDelayTime}
                  onChange={e => setTeacherForm({ ...teacherForm, blackboardDelayTime: e.target.value })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('boardHoldTime', '板书保留时间')}</span>
              <div className="lcs-web-debug-input-wrap">
                <input
                  type="text"
                  className="lcs-web-debug-text-input"
                  value={teacherForm.blackboardKeepTime}
                  onChange={e => setTeacherForm({ ...teacherForm, blackboardKeepTime: e.target.value })}
                />
              </div>
            </div>

            <button className="lcs-web-ok mt-4" type="button" onClick={handleTeacherSave}>
              {t('ok', '确定')}
            </button>
          </div>
        </div>
  );
}
