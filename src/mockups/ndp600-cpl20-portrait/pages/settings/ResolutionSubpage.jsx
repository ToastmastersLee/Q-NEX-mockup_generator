import { ChevronRight } from 'lucide-react';

export function ResolutionSubpage() {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out A</span>
          <span className="ndp-settings-value">
            1920 x 1080
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out B</span>
          <span className="ndp-settings-value">
            1920 x 1080
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable">
          <span className="ndp-settings-label">HDMI out C</span>
          <span className="ndp-settings-value">
            3840 x 2160
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
