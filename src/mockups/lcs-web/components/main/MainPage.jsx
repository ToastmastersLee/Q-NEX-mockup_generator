import { useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Pause,
  Play,
  Share2,
  Square,
  Video,
  VideoOff,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import ch3TeacherClose from '../../../../assets/ch3_teacher_close.png';
import ch4StudentClose from '../../../../assets/ch4_student_close.png';
import ch6StudentWide from '../../../../assets/ch4_student_panoprama.png';
import { NativeSelect, Toggle } from '../common';
import { useTranslation } from '../../i18n';

export function MainPage() {
  const { t } = useTranslation('main');
  const [selectedFeedIndex, setSelectedFeedIndex] = useState(3); // Default Student (index 3) matching screenshot
  const [directorMode, setDirectorMode] = useState('Manual'); // 'Auto', 'Semi-Auto', 'Manual'
  const [recording, setRecording] = useState('idle');
  const [live, setLive] = useState('idle');
  const [subtitle, setSubtitle] = useState(false);
  const [logo, setLogo] = useState(false);
  const [title, setTitle] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const [osd, setOsd] = useState(false);
  const [layout, setLayout] = useState('full');
  const [transitionDuration, setTransitionDuration] = useState('0.5');
  const [transitionEffect, setTransitionEffect] = useState('cut');
  const [speedVal, setSpeedVal] = useState(4);
  const [presetAction, setPresetAction] = useState('set'); // 'set' | 'apply'
  const [selectedPreset, setSelectedPreset] = useState(0);

  const isRecording = recording !== 'idle';
  const isLive = live !== 'idle';

  const localizedFeeds = [
    { key: 'content1', name: t('feeds.content1', 'Computer'), hasPtz: true, image: null },
    { key: 'content2', name: t('feeds.content2', 'Computer2'), hasPtz: true, image: null },
    { key: 'teacherClose', name: t('feeds.teacherClose', 'Teacher'), hasPtz: true, image: ch3TeacherClose },
    { key: 'studentClose', name: t('feeds.studentClose', 'Student'), hasPtz: true, image: ch4StudentClose },
    { key: 'teacherWide', name: t('feeds.teacherWide', 'Teacher Wide'), hasPtz: true, image: ch3TeacherClose },
    { key: 'studentWide', name: t('feeds.studentWide', 'Student Wide'), hasPtz: true, image: ch6StudentWide },
    { key: 'interactive', name: t('feeds.interactive', 'Interactive'), hasPtz: false, image: null },
  ];

  const selectedFeed = localizedFeeds[selectedFeedIndex] || localizedFeeds[0];

  const overlayItems = [
    { label: t('overlays.subtitle', 'Subtitle'), checked: subtitle, setter: setSubtitle },
    { label: t('overlays.logo', 'Logo'), checked: logo, setter: setLogo },
    { label: t('overlays.title', 'Title'), checked: title, setter: setTitle },
    { label: t('overlays.trailer', 'Trailer'), checked: trailer, setter: setTrailer },
    { label: t('overlays.osd', 'OSD'), checked: osd, setter: setOsd, isOsd: true },
  ];

  const layoutIcons = [
    { id: 'full', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="21" height="15" rx="1" />
      </svg>
    )},
    { id: 'pip', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="21" height="15" rx="1" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
        <rect x="13" y="2" width="7" height="5" rx="0.5" />
      </svg>
    )},
    { id: 'split', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="9.5" height="15" rx="1" />
        <rect x="12" y="0.5" width="9.5" height="15" rx="1" />
      </svg>
    )},
    { id: 'staggered', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="13" height="10" rx="1" fillOpacity="0.4" />
        <rect x="8.5" y="5.5" width="13" height="10" rx="1" />
      </svg>
    )},
    { id: 'left-tall', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="11" height="15" rx="1" />
        <rect x="13" y="0.5" width="8.5" height="6.5" rx="0.5" />
        <rect x="13" y="9" width="8.5" height="6.5" rx="0.5" />
      </svg>
    )},
    { id: 'top-wide', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="21" height="6.5" rx="0.5" />
        <rect x="0.5" y="9" width="9.5" height="6.5" rx="0.5" />
        <rect x="12" y="9" width="9.5" height="6.5" rx="0.5" />
      </svg>
    )},
    { id: 'grid-4', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="9.5" height="6.5" rx="0.5" />
        <rect x="12" y="0.5" width="9.5" height="6.5" rx="0.5" />
        <rect x="0.5" y="9" width="9.5" height="6.5" rx="0.5" />
        <rect x="12" y="9" width="9.5" height="6.5" rx="0.5" />
      </svg>
    )},
    { id: 'left-3', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="12" height="15" rx="1" />
        <rect x="14" y="0.5" width="7.5" height="4" rx="0.5" />
        <rect x="14" y="6" width="7.5" height="4" rx="0.5" />
        <rect x="14" y="11.5" width="7.5" height="4" rx="0.5" />
      </svg>
    )},
    { id: 'cols-3', icon: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
        <rect x="0.5" y="0.5" width="5.5" height="15" rx="0.5" />
        <rect x="8.2" y="0.5" width="5.5" height="15" rx="0.5" />
        <rect x="16" y="0.5" width="5.5" height="15" rx="0.5" />
      </svg>
    )},
  ];

  return (
    <section className="lcs-web-main-page">
      <div className="lcs-web-main-grid">
        <aside className="lcs-web-status-panel">
          <h2>{t('status.title', 'Status')}</h2>
          <dl>
            <div><dt>{t('status.topic', 'Topic')}</dt><dd className="flex items-center justify-between"><span>Null</span><span className="cursor-pointer text-gray-400">📝</span></dd></div>
            <div><dt>{t('status.speaker', 'Speaker')}</dt><dd className="flex items-center justify-between"><span>Null</span><span className="cursor-pointer text-gray-400">📝</span></dd></div>
            <div><dt>{t('status.recording', 'Recording')}</dt><dd>3840*2160@30fps, 4096Kbps</dd></div>
            <div><dt>{t('status.live', 'Live')}</dt><dd>1920*1080@25fps, 2048Kbps</dd></div>
            <div><dt>{t('status.diskSpace', 'Disk Space')}</dt><dd>833.76GB/930.39GB</dd></div>
            <div><dt>{t('status.network', 'Network')}</dt><dd>{t('status.networkVal', 'Wired · Connected (WAN)')}</dd></div>
            <div><dt>{t('status.storage', 'Storage')}</dt><dd>{t('status.storageVal', 'Not Connected')}</dd></div>
            <div><dt>{t('status.systemTime', 'System Time')}</dt><dd>26-08-2026 11:36:28</dd></div>
          </dl>
        </aside>

        <section className="lcs-web-program-preview">
          <div className="lcs-web-program-heading"><span>{t('programOutput', 'Program Output (PGM)')}</span><span className="is-live">{selectedFeed.name}</span></div>
          {selectedFeed.image ? <img src={selectedFeed.image} alt={`${selectedFeed.name} preview`} /> : <div className="lcs-web-no-signal"><VideoOff size={36} /><span>{t('noSignal', 'No Signal')}</span></div>}
        </section>

        <aside className="lcs-web-main-control-panel">
          <div className="lcs-web-session-card is-recording">
            <strong>{t('rec', 'REC')}</strong><span>{recording === 'paused' ? 'PAUSED' : '00:00:00'}</span>
            <div>
              <button type="button" onClick={() => setRecording('recording')}><Play size={22} />{t('start', 'Start')}</button>
              <button type="button" onClick={() => setRecording(value => value === 'recording' ? 'paused' : 'recording')} disabled={!isRecording}><Pause size={18} />{t('pause', 'Pause')}</button>
              <button type="button" onClick={() => setRecording('idle')}><Square size={16} />{t('stop', 'Stop')}</button>
            </div>
          </div>
          <div className="lcs-web-session-card is-live">
            <strong>{t('liveCard', 'LIVE')}</strong><span>00:00:00</span>
            <div>
              <button type="button" onClick={() => setLive('live')}><Play size={22} />{t('start', 'Start')}</button>
              <button type="button" onClick={() => setLive(value => value === 'live' ? 'paused' : 'live')} disabled={!isLive}><Share2 size={18} />{t('share', 'Share')}</button>
              <button type="button" onClick={() => setLive('idle')}><Square size={16} />{t('stop', 'Stop')}</button>
            </div>
          </div>
          <div className="lcs-web-overlays">
            {overlayItems.map(({ label, checked, setter, isOsd }) => (
              <label key={label}>
                <span>{label}</span>
                <Toggle checked={checked} onClick={() => setter(value => !value)} />
                <NativeSelect
                  value={isOsd ? t('overlays.closing', 'Closing') : 'Preset1'}
                  options={isOsd ? [t('overlays.closing', 'Closing'), t('overlays.opening', 'Opening')] : ['Preset1', 'Preset2']}
                  onChange={() => {}}
                />
              </label>
            ))}
          </div>
        </aside>
      </div>

      <div className="lcs-web-director-strip">
        {/* Section 1: Director Mode */}
        <section className="lcs-web-director-mode">
          <h3>{t('directorMode.title', 'Director Mode')}</h3>
          <div className="lcs-web-mode-cluster">
            <button
              type="button"
              className={`lcs-web-mode-circle ${directorMode === 'Auto' ? 'is-active' : ''}`}
              onClick={() => setDirectorMode('Auto')}
            >
              {t('directorMode.auto', 'Auto')}
            </button>
            <div className="lcs-web-mode-pill-row">
              <button
                type="button"
                className={`lcs-web-mode-pill ${directorMode === 'Semi-Auto' ? 'is-active' : ''}`}
                onClick={() => setDirectorMode('Semi-Auto')}
              >
                {t('directorMode.semiAuto', 'Semi-Auto')}
              </button>
              <button
                type="button"
                className={`lcs-web-mode-pill ${directorMode === 'Manual' ? 'is-active' : ''}`}
                onClick={() => setDirectorMode('Manual')}
              >
                {t('directorMode.manual', 'Manual')}
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: PTZ, Speed, Zoom, Presets */}
        <section className="lcs-web-ptz-section">
          <div className="lcs-web-ptz-dpad-col">
            <h3>{t('ptz.title', 'PTZ')}</h3>
            <div className="lcs-web-dpad">
              <button type="button" className="dpad-btn up"><ChevronUp size={16} /></button>
              <button type="button" className="dpad-btn left"><ChevronLeft size={16} /></button>
              <button type="button" className="dpad-btn center" />
              <button type="button" className="dpad-btn right"><ChevronRight size={16} /></button>
              <button type="button" className="dpad-btn down"><ChevronDown size={16} /></button>
            </div>
          </div>

          <div className="lcs-web-speed-zoom-col">
            <div className="lcs-web-speed-box">
              <div className="lcs-web-sub-title">{t('ptz.speed', 'Speed')}</div>
              <div className="lcs-web-speed-control-row">
                <span className="lcs-web-speed-bound">{t('ptz.slow', 'Slow')}</span>
                <div className="lcs-web-slider-wrap">
                  <input
                    type="range"
                    min="1"
                    max="7"
                    value={speedVal}
                    onChange={e => setSpeedVal(Number(e.target.value))}
                    className="lcs-web-slider"
                  />
                  <div className="lcs-web-slider-numbers">
                    {[1, 2, 3, 4, 5, 6, 7].map(n => (
                      <span key={n} className={speedVal === n ? 'is-active' : ''}>{n}</span>
                    ))}
                  </div>
                </div>
                <span className="lcs-web-speed-bound">{t('ptz.quick', 'Quick')}</span>
              </div>
            </div>
            <div className="lcs-web-zoom-box">
              <span className="lcs-web-sub-title">{t('ptz.zoom', 'Zoom')}</span>
              <div className="lcs-web-zoom-btns">
                <button type="button" className="lcs-web-zoom-btn"><ZoomIn size={15} /></button>
                <button type="button" className="lcs-web-zoom-btn"><ZoomOut size={15} /></button>
              </div>
            </div>
          </div>

          <div className="lcs-web-presets-col">
            <div className="lcs-web-presets-header">
              <span className="lcs-web-sub-title">{t('ptz.presets', 'Presets')}</span>
              <div className="lcs-web-preset-actions">
                <button
                  type="button"
                  className={`lcs-web-preset-action-btn ${presetAction === 'set' ? 'is-active' : ''}`}
                  onClick={() => setPresetAction('set')}
                >
                  {t('ptz.set', 'Set')}
                </button>
                <button
                  type="button"
                  className={`lcs-web-preset-action-btn ${presetAction === 'apply' ? 'is-active' : ''}`}
                  onClick={() => setPresetAction('apply')}
                >
                  {t('ptz.apply', 'Call')}
                </button>
              </div>
            </div>
            <div className="lcs-web-preset-grid">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  type="button"
                  className={`lcs-web-preset-num-btn ${selectedPreset === num ? 'is-active' : ''}`}
                  onClick={() => setSelectedPreset(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Layout */}
        <section className="lcs-web-layout-section">
          <h3>{t('layout.title', 'Layout')}</h3>
          <div className="lcs-web-layout-grid">
            {layoutIcons.map(item => (
              <button
                key={item.id}
                type="button"
                className={`lcs-web-layout-btn ${layout === item.id ? 'is-active' : ''}`}
                onClick={() => setLayout(item.id)}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </section>

        {/* Section 4: Transition */}
        <section className="lcs-web-transition-section">
          <div className="lcs-web-transition-header">
            <h3>{t('transition.title', 'Transition')}</h3>
            <div className="lcs-web-transition-durations">
              {[
                { id: '0.5', label: t('transition.dur05', '0.5s') },
                { id: '1.0', label: t('transition.dur10', '1.0s') },
                { id: '1.5', label: t('transition.dur15', '1.5s') },
                { id: '2.0', label: t('transition.dur20', '2.0s') },
              ].map(d => (
                <button
                  key={d.id}
                  type="button"
                  className={`lcs-web-duration-btn ${transitionDuration === d.id ? 'is-active' : ''}`}
                  onClick={() => setTransitionDuration(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lcs-web-transition-grid">
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'right' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('right')}>➜</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'left' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('left')}>⬅</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'up' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('up')}>⬆</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'down' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('down')}>⬇</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'fade' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('fade')}>▨</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'blinds' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('blinds')}>☰</button>
            
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'diag-tr' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('diag-tr')}>↗</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'diag-br' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('diag-br')}>↘</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'diag-tl' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('diag-tl')}>↖</button>
            <button type="button" className={`lcs-web-trans-btn ${transitionEffect === 'diag-bl' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('diag-bl')}>↙</button>
            <button type="button" className={`lcs-web-trans-btn-cut ${transitionEffect === 'cut' ? 'is-active' : ''}`} onClick={() => setTransitionEffect('cut')}>
              {t('transition.cut', 'Cut')}
            </button>
          </div>
        </section>
      </div>

      {/* Section 5: Bottom Feeds Strip */}
      <section className="lcs-web-feed-strip">
        {localizedFeeds.map((feed, idx) => {
          const isSelected = selectedFeedIndex === idx;
          return (
            <div key={feed.key} className={`lcs-web-feed-tile ${isSelected ? 'is-active' : ''}`} onClick={() => setSelectedFeedIndex(idx)}>
              <div className="lcs-web-feed-tile-header">
                <span className="lcs-web-feed-name">{feed.name}</span>
                {feed.hasPtz && <span className="lcs-web-feed-ptz-link">{t('feeds.ptz', 'PTZ')}</span>}
              </div>
              <div className="lcs-web-feed-thumb">
                {feed.image ? (
                  <img src={feed.image} alt={feed.name} />
                ) : (
                  <div className="lcs-web-feed-placeholder">
                    <Video size={24} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}