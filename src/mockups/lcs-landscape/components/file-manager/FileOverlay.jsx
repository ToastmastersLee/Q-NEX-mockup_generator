import { useLcs } from '../../context/LcsContext';
import ch3TeacherClose from '../../../../assets/ch3_teacher_close.png';

export function FileOverlay() {
  const {
    activeMenuSection,
    setActiveMenuSection,
    isFileFullscreen,
    setIsFileFullscreen,
    playingFileName,
    setPlayingFileName,
    playingFileStart,
    setPlayingFileStart,
    filePlayerState,
    setFilePlayerState,
    filePlaybackTime,
    setFilePlaybackTime,
    formatPlaybackTime,
    fileStorageTab,
    setFileStorageTab,
    files,
    setFiles,
    fileActivePage,
    setFileActivePage,
    sublabelColor
  } = useLcs();

  if (activeMenuSection !== 'file') {
    return null;
  }

  return (
    <div className={`lcs-full-file-overlay ${isFileFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Left side: Video Player Column */}
      <div className="lcs-file-player-col">
        <div className="lcs-file-player-header">
          {playingFileName} Recording start:{playingFileStart}
        </div>
        
        <div className="lcs-file-player-viewport">
          {(filePlayerState === 'playing' || filePlayerState === 'paused') ? (
            <img src={ch3TeacherClose} alt="Playback view" className="lcs-file-player-img" />
          ) : null}
          
          {filePlayerState === 'loading' && (
            <div className="lcs-file-player-loading">
              <div className="lcs-spinner-ring" />
              <span>Loading</span>
            </div>
          )}
          
          <button 
            type="button" 
            className="lcs-file-player-expand-btn"
            onClick={() => setIsFileFullscreen(!isFileFullscreen)}
          >
            ↖↗ ↙↘
          </button>
        </div>

        {/* Scrubber progress bar */}
        <div className="lcs-file-player-scrubber-bar">
          <div 
            className="lcs-file-player-scrubber-line-container"
            onMouseDown={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const updateTime = (clientX) => {
                const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
                const clickPercent = clickX / rect.width;
                const targetTime = Math.max(0, Math.min(14397, Math.floor(clickPercent * 14397)));
                setFilePlaybackTime(targetTime);
              };
              updateTime(e.clientX);

              const handleMouseMove = (moveEvent) => {
                updateTime(moveEvent.clientX);
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div 
              className="lcs-file-player-scrubber-line-fill" 
              style={{ width: `${Math.min(100, (filePlaybackTime / 14397) * 100)}%` }} 
            />
            <div 
              className="lcs-file-player-scrubber-handle" 
              style={{ left: `${Math.min(100, (filePlaybackTime / 14397) * 100)}%` }} 
            />
          </div>
          <div className="lcs-file-player-time-display">
            {formatPlaybackTime(filePlaybackTime)}/3:59:57
          </div>
        </div>

        {/* Control buttons footer */}
        <div className="lcs-file-player-footer">
          <button 
            type="button" 
            className="lcs-file-exit-btn"
            onClick={() => {
              setActiveMenuSection(null);
              setIsFileFullscreen(false);
            }}
          >
            Exit
          </button>

          <div className="lcs-file-controls-capsule">
            {filePlayerState === 'playing' ? (
              <button 
                type="button" 
                className="lcs-file-playpause-btn"
                onClick={() => setFilePlayerState('paused')}
              >
                ⏸
              </button>
            ) : (
              <button 
                type="button" 
                className="lcs-file-playpause-btn"
                onClick={() => setFilePlayerState('playing')}
              >
                ▶
              </button>
            )}
            
            <button 
              type="button" 
              className="lcs-file-stop-btn"
              onClick={() => {
                setFilePlayerState('paused');
                setFilePlaybackTime(0);
              }}
            >
              ⏹
            </button>
          </div>
          
          <div style={{ width: '50px' }} />
        </div>
      </div>

      {/* Right side: File List Column */}
      <div className="lcs-file-list-col">
        {/* Top Storage Tabs */}
        <div className="lcs-file-list-tabs">
          <button 
            type="button" 
            className={`lcs-subnav-btn ${fileStorageTab === 'local' ? 'is-active' : ''}`}
            onClick={() => setFileStorageTab('local')}
          >
            Local Storage
          </button>
          <button 
            type="button" 
            className={`lcs-subnav-btn ${fileStorageTab === 'mobile' ? 'is-active' : ''}`}
            onClick={() => setFileStorageTab('mobile')}
          >
            Mobile Storage
          </button>
        </div>

        {/* Operations bar */}
        <div className="lcs-file-actions-bar">
          <div className="lcs-file-action-btn-group">
            <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px', fontSize: '10px' }}>
              ↓ Download
            </button>
          </div>
          <button type="button" className="lcs-subnav-btn" style={{ height: '24px', padding: '0 12px', fontSize: '10px' }}>
            🗑 Delete
          </button>
        </div>

        {/* Scrollable File List Container */}
        <div className="lcs-file-list-container">
          {fileStorageTab === 'local' ? (
            files.map((item) => {
              if (item.isActive) {
                return (
                  <div key={item.id} className="lcs-file-detail-row">
                    <div className="lcs-file-detail-icon">🎞</div>
                    <div className="lcs-file-detail-content">
                      <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.name}</span>
                        <span style={{ color: '#00e676' }}>{item.size}</span>
                      </div>
                      <div>Recording start:{item.start}</div>
                      <div>Class time:{item.classTime}</div>
                      <div>Lectuer:{item.lecturer}</div>
                      <div>Theme:{item.theme}</div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.id} className="lcs-file-table-row">
                  <div 
                    className={`lcs-checkbox-box ${item.checked ? 'is-checked' : ''}`}
                    style={{ cursor: 'pointer', transform: 'scale(0.85)' }}
                    onClick={() => {
                      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, checked: !f.checked } : f));
                    }}
                  >
                    {item.checked && <span className="lcs-checkmark">✓</span>}
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                  <span style={{ color: '#a0aec0' }}>{item.size}</span>
                  <button 
                    type="button" 
                    className="lcs-file-play-icon-btn"
                    onClick={() => {
                      setPlayingFileName(item.name);
                      setPlayingFileStart(item.isActive ? item.start : '2026-07-11 10:00:00');
                      setFilePlayerState('loading');
                      setFilePlaybackTime(0);
                      setFiles(prev => prev.map(f => {
                        if (f.id === item.id) {
                          return { 
                            ...f, 
                            isActive: true, 
                            start: '2026-07-11 10:00:00', 
                            duration: '3:59:57', 
                            classTime: '4:00:00', 
                            lecturer: '', 
                            theme: '' 
                          };
                        }
                        return { ...f, isActive: false };
                      }));
                      setTimeout(() => {
                        setFilePlayerState('playing');
                      }, 1500);
                    }}
                  >
                    ▶
                  </button>
                </div>
              );
            })
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: sublabelColor, fontSize: '11px', opacity: 0.6 }}>
              No mobile storage device connected.
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="lcs-file-pagination">
          <button 
            type="button" 
            className="lcs-pagination-btn"
            onClick={() => setFileActivePage(Math.max(1, fileActivePage - 1))}
          >
            &lt;&lt;
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button 
              key={page}
              type="button" 
              className={`lcs-pagination-btn ${fileActivePage === page ? 'is-active' : ''}`}
              onClick={() => setFileActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button 
            type="button" 
            className="lcs-pagination-btn"
            onClick={() => setFileActivePage(Math.min(5, fileActivePage + 1))}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
