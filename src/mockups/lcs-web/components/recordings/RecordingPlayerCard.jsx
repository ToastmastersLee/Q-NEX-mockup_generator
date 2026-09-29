import React from 'react';
import { Play, Pause, Volume2, MoreVertical } from 'lucide-react';
import { useTranslation } from '../../i18n';

export function RecordingPlayerCard({ selectedVideo, isPlaying, setIsPlaying }) {
  const { t } = useTranslation('recordings');

  return (
    <div className="lcs-web-recordings-left">
      {/* Video Player Container */}
      <div className="lcs-web-player-container">
        <div className="lcs-web-player-screen">
          <div className="lcs-web-player-empty-preview" />
          <div className="lcs-web-player-controls-overlay">
            <button 
              className="lcs-web-player-play-btn" 
              type="button" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
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
  );
}
