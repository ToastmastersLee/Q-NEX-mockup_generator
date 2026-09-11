import { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  MoreVertical,
  Pause,
  Play,
  Search,
  Trash2,
  Volume2,
} from 'lucide-react';
import { useTranslation } from '../../i18n';

const initialRecordingRows = [
  { id: '1-1', session: 1, isHeader: true, expanded: true, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '713.57MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-2', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Lecture.mp4', size: '137.38MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-3', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Lecture2.mp4', size: '374.34MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-4', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'PGM.mp4', size: '1.12GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-5', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Student_C.mp4', size: '2.58GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-6', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Student_P.mp4', size: '2.58GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-7', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Teacher_C.mp4', size: '1.96GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-8', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Teacher_P.mp4', size: '2.45GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '2-1', session: 2, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '758.32KB', startTime: '2026-08-21 09:42:11', duration: '00:00:27' },
  { id: '3-1', session: 3, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '384.44KB', startTime: '2026-08-20 11:17:09', duration: '00:00:14' },
  { id: '4-1', session: 4, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '112.56KB', startTime: '2026-08-17 12:23:14', duration: '00:00:04' },
  { id: '5-1', session: 5, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '390.73MB', startTime: '2026-08-14 14:28:51', duration: '04:00:05' },
  { id: '6-1', session: 6, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '256.42KB', startTime: '2026-08-14 09:42:02', duration: '00:00:10' },
  { id: '7-1', session: 7, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '102.93MB', startTime: '2026-08-13 10:38:27', duration: '01:03:14' },
  { id: '8-1', session: 8, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '56.44KB', startTime: '2026-08-13 10:18:19', duration: '00:00:02' },
];

export function RecordingsPage() {
  const { t } = useTranslation('recordings');
  const [selectedIds, setSelectedIds] = useState(['1-4']); // PGM.mp4 selected by default
  const [activePlayId, setActivePlayId] = useState('1-4'); // Track currently playing video
  const [expandedSessions, setExpandedSessions] = useState({ 1: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPageInput, setGoToPageInput] = useState('1');
  const [isSelectAll, setIsSelectAll] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState({
    name: 'PGM.mp4',
    creationTime: '2026-08-21 09:42:53',
    duration: '01:24:23.99',
    bitrate: '1901 kb/s',
    audioSampling: '48000 Hz',
    videoCode: 'hevc (Main)',
    audioCode: 'aac',
    frameRate: '29.96 fps',
    audioChannel: 'stereo',
    resolution: '3840x2160',
  });

  const handlePlay = (row) => {
    setActivePlayId(row.id);
    setIsPlaying(true);
    if (!selectedIds.includes(row.id)) {
      setSelectedIds([row.id]);
    }
    setSelectedVideo({
      name: row.name,
      creationTime: row.startTime,
      duration: row.duration + '.99',
      bitrate: row.name.includes('PGM') ? '1901 kb/s' : '2048 kb/s',
      audioSampling: '48000 Hz',
      videoCode: 'hevc (Main)',
      audioCode: 'aac',
      frameRate: '29.96 fps',
      audioChannel: 'stereo',
      resolution: row.name.includes('PGM') ? '3840x2160' : '1920x1080',
    });
  };

  const toggleSelectAll = () => {
    if (isSelectAll || selectedIds.length > 0) {
      setSelectedIds([]);
      setIsSelectAll(false);
    } else {
      setSelectedIds(initialRecordingRows.map(r => r.id));
      setIsSelectAll(true);
    }
  };

  const toggleRowSelect = (id) => {
    setSelectedIds(curr => {
      const next = curr.includes(id) ? curr.filter(i => i !== id) : [...curr, id];
      setIsSelectAll(next.length === initialRecordingRows.length);
      return next;
    });
  };

  const toggleSessionExpand = (session) => {
    setExpandedSessions(curr => ({ ...curr, [session]: !curr[session] }));
  };

  const filteredRows = initialRecordingRows.filter(row => {
    if (!searchKeyword) return true;
    return (
      row.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      row.speaker.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      row.topic.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div className="lcs-web-recordings-page">
      {/* Left Column: Player & Details */}
      <div className="lcs-web-recordings-left">
        {/* Video Player Container */}
        <div className="lcs-web-player-container">
          <div className="lcs-web-player-screen">
            <div className="lcs-web-player-empty-preview" />
            <div className="lcs-web-player-controls-overlay">
              <button className="lcs-web-player-play-btn" type="button" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} fill="currentColor" />}
              </button>
              <span className="lcs-web-player-time">0:09 / 1:24:23</span>
              <div className="lcs-web-player-scrubber-track">
                <div className="lcs-web-player-scrubber-fill" style={{ width: '1.2%' }} />
                <div className="lcs-web-player-scrubber-handle" style={{ left: '1.2%' }} />
              </div>
              <button className="lcs-web-player-icon-btn" type="button">
                <Volume2 size={16} />
              </button>
              <button className="lcs-web-player-icon-btn" type="button">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="lcs-web-details-card">
          <div className="lcs-web-details-header">
            <h3>{t('detailsTitle', 'File Details')}</h3>
          </div>
          <div className="lcs-web-details-grid">
            <div className="lcs-web-details-row full">
              <span className="lcs-web-details-key">{t('creationTime', 'CreationTime')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.creationTime}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('fileDuration', 'Duration')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.duration}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('fileBitrate', 'Bitrate')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.bitrate}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('audioSampling', 'AudioSampling')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.audioSampling}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('videoEncoding', 'VideoCode')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.videoCode}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('audioEncoding', 'AudioCode')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.audioCode}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('videoFramerate', 'FrameRate')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.frameRate}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('audioChannel', 'AudioChannel')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.audioChannel}</span>
            </div>
            <div className="lcs-web-details-row">
              <span className="lcs-web-details-key">{t('videoResolution', 'Resolution')}:</span>
              <span className="lcs-web-details-val">{selectedVideo.resolution}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Search & Table */}
      <div className="lcs-web-recordings-right">
        {/* Search & Actions Toolbar */}
        <div className="lcs-web-recordings-toolbar">
          <div className="lcs-web-search-box-wrap">
            <input
              type="text"
              placeholder={t('searchPlaceholder', 'Enter keyword search')}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="lcs-web-search-input"
            />
            <span className="lcs-web-search-counter">0/6</span>
          </div>

          <div className="lcs-web-date-range-box">
            <Calendar size={14} className="lcs-web-calendar-icon" />
            <input type="text" placeholder={t('startDate', 'Start Date')} className="lcs-web-date-input" />
            <span className="lcs-web-date-sep">-</span>
            <input type="text" placeholder={t('endDate', 'End Date')} className="lcs-web-date-input" />
          </div>

          <button className="lcs-web-btn-search" type="button">
            <Search size={14} />
            <span>{t('search', 'Search')}</span>
          </button>

          <button className="lcs-web-btn-download" type="button">
            <Download size={14} />
            <span>{t('download', 'Download')}</span>
          </button>

          <button className="lcs-web-btn-delete" type="button">
            <Trash2 size={14} />
            <span>{t('delete', 'Delete')}</span>
          </button>
        </div>

        {/* Video Table Container */}
        <div className="lcs-web-table-card">
          <table className="lcs-web-recordings-table">
            <thead>
              <tr>
                <th className="th-checkbox">
                  <input
                    type="checkbox"
                    checked={isSelectAll || (selectedIds.length > 0 && selectedIds.length === initialRecordingRows.length)}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>{t('speaker', 'Speaker')}</th>
                <th>{t('topic', 'Topic')}</th>
                <th>{t('fileName', 'Name')}</th>
                <th>{t('fileSize', 'Size')}</th>
                <th>{t('startTime', 'StartTime')}</th>
                <th>{t('recDuration', 'Duration')}</th>
                <th>{t('operation', 'Operation')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                const isPlayingRow = activePlayId === row.id;
                const isSessionExpanded = expandedSessions[row.session];

                if (!row.isHeader && !isSessionExpanded) {
                  return null;
                }

                return (
                  <tr
                    key={row.id}
                    className={`${row.isHeader ? 'session-header-row' : 'sub-row'} ${isSelected ? 'row-selected' : ''}`}
                  >
                    <td className="td-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRowSelect(row.id)}
                      />
                    </td>
                    <td>{row.speaker}</td>
                    <td>{row.topic}</td>
                    <td className="td-name">
                      <span title={row.name}>{row.name}</span>
                    </td>
                    <td>{row.size}</td>
                    <td>{row.startTime}</td>
                    <td>{row.duration}</td>
                    <td className="td-action">
                      <div className="action-wrap">
                        <button
                          type="button"
                          className={`btn-play-link ${isPlayingRow ? 'is-playing' : ''}`}
                          onClick={() => handlePlay(row)}
                        >
                          {t('play', 'Play')}
                        </button>
                        {row.isHeader && (
                          <button
                            type="button"
                            className="btn-expand-arrow"
                            onClick={() => toggleSessionExpand(row.session)}
                          >
                            {isSessionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="lcs-web-table-footer">
          <div className="lcs-web-footer-left">
            <label className="lcs-web-select-all-label">
              <input
                type="checkbox"
                checked={isSelectAll || (selectedIds.length > 0 && selectedIds.length === initialRecordingRows.length)}
                onChange={toggleSelectAll}
              />
              <span>{t('selectAll', 'Select All')}</span>
            </label>
            <span className="lcs-web-total-count">{t('total', 'Total 99')}</span>
          </div>

          <div className="lcs-web-pagination">
            <button
              type="button"
              className="lcs-web-page-nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              &lt;
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map(num => (
              <button
                key={num}
                type="button"
                className={`lcs-web-page-num ${currentPage === num ? 'is-active' : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              className="lcs-web-page-nav"
              onClick={() => setCurrentPage(prev => Math.min(7, prev + 1))}
            >
              &gt;
            </button>
          </div>

          <div className="lcs-web-goto-wrap">
            <span>{t('goTo', 'Go to')}</span>
            <input
              type="text"
              value={goToPageInput}
              onChange={e => setGoToPageInput(e.target.value)}
              className="lcs-web-goto-input"
            />
            <span>{t('pageUnit', 'Page')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}