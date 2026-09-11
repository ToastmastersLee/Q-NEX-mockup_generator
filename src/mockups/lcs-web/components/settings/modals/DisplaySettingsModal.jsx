import { useState } from 'react';
import { NativeSelect, ModalShell } from '../../common';
import { useTranslation } from '../../../i18n';

export function DisplaySettingsModal({ output, onClose }) {
  const { t } = useTranslation('output');
  const [modalTab, setModalTab] = useState('film');
  const [profile, setProfile] = useState('Extended BRT');
  const [matrix, setMatrix] = useState('BT601FULL_T');
  const [levels, setLevels] = useState({
    Brightness: modalTab === 'film' ? 45 : 50,
    ContrastRatio: modalTab === 'film' ? 55 : 50,
    Hue: modalTab === 'film' ? 55 : 50,
    Saturation: modalTab === 'film' ? 55 : 50,
  });

  return (
    <ModalShell title={`${t('modalDisplayTitle', '显示设置')}(${output})`} onClose={onClose} className="is-display">
      <div className="lcs-web-modal-body">
        <div className="lcs-web-modal-tabs">
          <button
            type="button"
            className={modalTab === 'film' ? 'is-active' : ''}
            onClick={() => {
              setModalTab('film');
              setProfile('Extended BRT');
              setLevels({ Brightness: 45, ContrastRatio: 55, Hue: 55, Saturation: 55 });
            }}
          >
            {t('modalTabFilm', '电影视频')}
          </button>
          <button
            type="button"
            className={modalTab === 'hdmi' ? 'is-active' : ''}
            onClick={() => {
              setModalTab('hdmi');
              setProfile('Default BRT');
              setLevels({ Brightness: 50, ContrastRatio: 50, Hue: 50, Saturation: 50 });
            }}
          >
            {t('modalTabHdmi', 'HDMI输出')}
          </button>
        </div>

        <div className="lcs-web-profile-options flex items-center gap-6 my-4">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" checked={profile === 'Default BRT'} onChange={() => setProfile('Default BRT')} />
            <span>{t('defaultBrightness', '默认亮度')}</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
            <input type="radio" checked={profile === 'Extended BRT'} onChange={() => setProfile('Extended BRT')} />
            <span>{t('extendedBrightness', '扩展亮度')}</span>
          </label>
        </div>

        <div className="lcs-web-display-matrix flex items-center gap-6 my-3">
          <span className="w-20 text-xs text-slate-600">{t('colorMatrix', '色彩矩阵')}</span>
          <div className="w-48">
            <NativeSelect value={matrix} options={['BT601FULL_T', 'BT709FULL_T', 'BT601LIMIT_T', 'BT709LIMIT_T']} onChange={setMatrix} />
          </div>
        </div>

        <div className="lcs-web-display-levels flex flex-col gap-3 mt-4">
          {[
            { key: 'Brightness', label: t('brightness', '亮度') },
            { key: 'ContrastRatio', label: t('contrast', '对比度') },
            { key: 'Hue', label: t('hue', '色调') },
            { key: 'Saturation', label: t('saturation', '饱和度') },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-16 text-xs text-slate-600">{label}</span>
              <input
                type="range"
                min="0"
                max="100"
                className="flex-1"
                value={levels[key]}
                onChange={e => setLevels(curr => ({ ...curr, [key]: Number(e.target.value) }))}
              />
              <input
                type="text"
                className="lcs-web-compact-input w-12 text-center text-xs"
                value={levels[key]}
                onChange={e => setLevels(curr => ({ ...curr, [key]: Number(e.target.value) || 0 }))}
              />
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}
