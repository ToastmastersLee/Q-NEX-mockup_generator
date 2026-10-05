import { ChevronLeft } from 'lucide-react';
import { useSl100 } from '../../context/useSl100';

const LANGUAGES = [
  { id: 'en', label: 'English' },
  { id: 'zh-cn', label: '中文（简体）' },
];

export function LanguageSettingsPage() {
  const { setScreen, language, setLanguage } = useSl100();

  return (
    <div className="sl100-page-content sl100-language-page">
      <div className="sl100-subpage-layout-wrap sl100-language-layout">
        <button
          type="button"
          className="sl100-subpage-square-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <div className="sl100-language-main-area">
          <div className="sl100-language-options-grid">
            {LANGUAGES.map((item) => {
              const isSelected = language === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sl100-lang-radio-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setLanguage(item.id)}
                >
                  <span className={`sl100-lang-radio-circle ${isSelected ? 'is-selected' : ''}`}>
                    {isSelected && <span className="sl100-lang-radio-dot" />}
                  </span>
                  <span className="sl100-lang-radio-text">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
