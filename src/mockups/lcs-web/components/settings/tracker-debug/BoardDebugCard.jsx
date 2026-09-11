import { useState } from 'react';
import { FileVideo } from 'lucide-react';
import { Toggle, NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';
import { DebugPtzControls } from './DebugPtzControls';

export function BoardDebugCard({ onToast }) {
  const { t } = useTranslation('trackerDebug');

  const optSelect = { value: '', label: t('pleaseSelect', '请选择') };

  const [boardDetectArea, setBoardDetectArea] = useState(1);
  const [boardVideoEnabled, setBoardVideoEnabled] = useState(false);
  const [boardVideoAddress, setBoardVideoAddress] = useState('rtsp://admin:R3c123456@192.168.3.100');
  const [boardPreset, setBoardPreset] = useState(1);
  const [boardForm, setBoardForm] = useState({
    cameraType: '',
    cameraPort1: '/dev/ttyAMA3',
    cameraPort2: 'AMA',
    viscaAddress: '',
    cameraBaud: '',
  });

  const handleBoardSave = () => {
    onToast(t('boardSaved', '板书跟踪调试参数已保存'));
  };

  return (
    <div className="lcs-web-card lcs-web-debug-card lcs-web-debug-board-card mt-4">
      <div className="lcs-web-debug-card-header">
        <span className="lcs-web-debug-card-title">{t('blackboard', '板书')}</span>
      </div>

      <div className="lcs-web-debug-board-content">
        <div className="lcs-web-debug-media-row">
            <div className="lcs-web-debug-video-container is-empty-preview">
              <div className="lcs-web-debug-empty-placeholder" />
            </div>
            <div className="lcs-web-debug-controls-col">
              <div className="lcs-web-debug-sub-section">
                <div className="lcs-web-debug-sub-title">{t('detectZone', '检测区')}</div>
                <div className="lcs-web-debug-btn-row">
                  <button
                    type="button"
                    className={`lcs-web-debug-sq-btn is-blue ${boardDetectArea === 1 ? 'is-active' : ''}`}
                    onClick={() => setBoardDetectArea(1)}
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="lcs-web-debug-pill-btn"
                    onClick={() => { setBoardDetectArea(null); onToast(t('boardDetectCleared', '板书检测区已清除')); }}
                  >
                    {t('clear', '清除')}
                  </button>
                </div>
              </div>

              <div className="lcs-web-debug-sub-section">
                <div className="lcs-web-debug-sub-title">{t('videoStreamAddr', '视频画面地址')}</div>
                <div className="lcs-web-debug-address-row">
                  <Toggle checked={boardVideoEnabled} onClick={() => setBoardVideoEnabled(!boardVideoEnabled)} />
                  <input
                    type="text"
                    className="lcs-web-debug-address-input"
                    value={boardVideoAddress}
                    onChange={e => setBoardVideoAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: PTZ & Preset View */}
          <div className="lcs-web-debug-media-row mt-4">
            <div className="lcs-web-debug-video-container is-grey-media">
              <FileVideo size={36} className="text-white opacity-80" />
            </div>
            <div className="lcs-web-debug-ptz-col">
              {/* D-Pad & Zoom Controls */}
              <DebugPtzControls onAction={onToast} />

              {/* Set Preset View (1, 2, 3) */}
              <div className="lcs-web-debug-preset-wrap">
                <div className="lcs-web-debug-preset-group">
                  <div className="lcs-web-debug-sub-title">{t('setCloseupPos', '设置特写位')}</div>
                  <div className="lcs-web-debug-btn-row">
                    {[1, 2, 3].map(p => (
                      <button
                        key={p}
                        type="button"
                        className={`lcs-web-debug-sq-btn is-blue ${boardPreset === p ? 'is-active' : ''}`}
                        onClick={() => { setBoardPreset(p); onToast(t('boardCloseupSelected', `板书特写位 ${p} 已选择`, { p })); }}
                      >
                        {p}
                      </button>
                    ))}
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
                  value={boardForm.cameraType}
                  options={[optSelect, 'Sony VISCA', 'Pelco-D', 'Pelco-P']}
                  onChange={v => setBoardForm({ ...boardForm, cameraType: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('cameraPort', '摄像机控制端口')}</span>
              <div className="lcs-web-debug-split-wrap">
                <NativeSelect
                  value={boardForm.cameraPort1}
                  options={['/dev/ttyAMA3', '/dev/ttyAMA1', '/dev/ttyAMA2']}
                  onChange={v => setBoardForm({ ...boardForm, cameraPort1: v })}
                />
                <NativeSelect
                  value={boardForm.cameraPort2}
                  options={['AMA', 'USB', 'COM']}
                  onChange={v => setBoardForm({ ...boardForm, cameraPort2: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('viscaAddr', 'VISCA地址')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={boardForm.viscaAddress}
                  options={[optSelect, '1', '2', '3', '4', '5']}
                  onChange={v => setBoardForm({ ...boardForm, viscaAddress: v })}
                />
              </div>
            </div>

            <div className="lcs-web-debug-form-row">
              <span className="lcs-web-debug-label">{t('baudRate', '波特率')}</span>
              <div className="lcs-web-debug-input-wrap">
                <NativeSelect
                  value={boardForm.cameraBaud}
                  options={[optSelect, '9600', '19200', '38400', '115200']}
                  onChange={v => setBoardForm({ ...boardForm, cameraBaud: v })}
                />
              </div>
            </div>

            <button className="lcs-web-ok mt-4" type="button" onClick={handleBoardSave}>
              {t('ok', '确定')}
            </button>
          </div>
        </div>
      </div>
  );
}
