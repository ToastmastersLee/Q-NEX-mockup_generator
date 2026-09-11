import { Home } from 'lucide-react';
import { navItems, menuConfigItems } from '../../constants/nav';

export function ChooseWidgetSubpage({ homepageWidgets, setHomepageWidgets }) {
  return (
    <div className="ndp-page ndp-scroll-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div className="ndp-widget-section-title">Selected</div>
      
      {/* Selected Preview Box */}
      <div className="ndp-widget-preview-area">
        {homepageWidgets.length === 0 ? (
          <span style={{ color: '#a0aab8', fontSize: '14px' }}>No Widgets Selected</span>
        ) : (
          homepageWidgets.map((widgetId) => {
            const item = menuConfigItems.find(n => n.id === widgetId);
            if (!item) return null;
            const origItem = navItems.find(n => n.id === widgetId);
            const Icon = origItem ? origItem.icon : Home;

            return (
              <div key={widgetId} className="ndp-widget-card-selected">
                <Icon size={18} />
                <span style={{ fontSize: '14px', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
                <button 
                  type="button" 
                  className="ndp-widget-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setHomepageWidgets(homepageWidgets.filter(w => w !== widgetId));
                  }}
                >
                  –
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="ndp-widget-section-title">Optional</div>
      
      {/* Grid of options */}
      <div className="ndp-widget-grid">
        {menuConfigItems.map((item) => {
          const isSelected = homepageWidgets.includes(item.id);
          const origItem = navItems.find(n => n.id === item.id);
          const Icon = origItem ? origItem.icon : Home;

          return (
            <div 
              key={item.id} 
              className={`ndp-widget-card-optional ${isSelected ? 'is-selected' : ''}`}
              onClick={() => {
                if (isSelected) {
                  setHomepageWidgets(homepageWidgets.filter(w => w !== item.id));
                } else {
                  setHomepageWidgets([...homepageWidgets, item.id]);
                }
              }}
            >
              <Icon size={18} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {item.label}
              </span>
              {!isSelected && (
                <button type="button" className="ndp-widget-add-btn">
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
