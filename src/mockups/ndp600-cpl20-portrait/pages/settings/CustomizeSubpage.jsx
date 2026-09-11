import { ChevronRight } from 'lucide-react';

export function CustomizeSubpage({ onSubpageSelect }) {
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        <div className="ndp-settings-row is-clickable" onClick={() => onSubpageSelect('customize-nav')}>
          <span className="ndp-settings-label">Navigation bar</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
        <div className="ndp-settings-row is-clickable" onClick={() => onSubpageSelect('customize-template')}>
          <span className="ndp-settings-label">Homepage Template</span>
          <span className="ndp-settings-value">
            <ChevronRight size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
