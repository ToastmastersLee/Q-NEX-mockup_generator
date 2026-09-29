import { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Download, 
  Search,
  Volume2
} from 'lucide-react';
import classroomFeed from '../../../assets/classroom_feed.png';

export function RemotePlaybackView({ onShowToast }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(3600 * 9 + 60 * 30); // 09:30:00

  const formatSeconds = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="cms-playback-page">
      {/* Left Sidebar: Device & Calendar */}
      <aside className="cms-sidebar cms-playback-sidebar">
        <div className="cms-sidebar-section">
          <div className="cms-sidebar-section-title">Device</div>
          <div className="cms-device-tree">
            <label className="cms-stream-menu-item">
              <input type="checkbox" defaultChecked />
              <span>192.167.32.65 (Teacher Cam)</span>
            </label>
            <label className="cms-stream-menu-item">
              <input type="checkbox" defaultChecked />
              <span>192.167.32.66 (Student Cam)</span>
            </label>
          </div>
        </div>

        <div className="cms-sidebar-section">
          <div className="cms-sidebar-section-title">Date & Search</div>
          <div className="cms-calendar-mock">
            <div className="cms-cal-header">
              <Calendar size={13} />
              <span>2026-09-29</span>
            </div>
            <div className="cms-cal-days">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="cms-cal-day-name">{d}</span>
              ))}
              {Array.from({ length: 30 }, (_, i) => (
                <span
                  key={i}
                  className={`cms-cal-cell ${i + 1 === 29 ? 'is-today' : ''} ${i % 3 === 0 ? 'has-record' : ''}`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="cms-btn cms-btn-primary"
            style={{ width: '100%', marginTop: '12px' }}
            onClick={() => onShowToast?.('Found 4 recording segments for 2026-09-29')}
          >
            <Search size={13} />
            <span>Search Records</span>
          </button>
        </div>
      </aside>

      {/* Main Playback Area */}
      <main className="cms-canvas-area cms-playback-viewport">
        <div className="cms-playback-screen">
          <img src={classroomFeed} alt="Playback" className="cms-viewport-bg" />
          <div className="cms-tile-osd">
            RECORDING: 192.167.32.65 [2026-09-29 {formatSeconds(playbackTime)}]
          </div>
        </div>

        {/* 24-Hour Timeline Bar */}
        <div className="cms-timeline-container">
          <div className="cms-timeline-scale">
            {Array.from({ length: 25 }, (_, i) => (
              <span key={i} className="cms-time-hour">{String(i).padStart(2, '0')}:00</span>
            ))}
          </div>

          {/* Timeline Track with Recorded Blocks */}
          <div className="cms-timeline-track">
            <div className="cms-rec-block" style={{ left: '33.3%', width: '12%' }} title="08:00 - 11:00 Class" />
            <div className="cms-rec-block" style={{ left: '58.3%', width: '15%' }} title="14:00 - 17:30 Lecture" />
            <div className="cms-timeline-pointer" style={{ left: `${(playbackTime / 86400) * 100}%` }} />
          </div>

          {/* Transport Controls */}
          <div className="cms-playback-ctrls">
            <div className="cms-time-display">{formatSeconds(playbackTime)}</div>
            <div className="cms-ctrl-btns">
              <button
                type="button"
                className="cms-btn cms-btn-tool"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                type="button"
                className="cms-btn cms-btn-tool"
                onClick={() => setPlaybackTime(3600 * 8)}
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                className="cms-btn cms-btn-tool"
                onClick={() => onShowToast?.('Exporting segment to MP4...')}
              >
                <Download size={14} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
