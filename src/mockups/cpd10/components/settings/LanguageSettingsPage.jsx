import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCpd10 } from '../../context/Cpd10Context';

const PAGE_1_LANGUAGES = [
  { id: 'en', name: 'English' },
  { id: 'zh-cn', name: '中文(简体)' },
  { id: 'zh-tw', name: '中文(繁體)' },
  { id: 'fr', name: 'Français' },
  { id: 'es', name: 'Español' },
  { id: 'pt', name: 'Português' },
  { id: 'de', name: 'Deutsch' },
  { id: 'it', name: 'Italiano' },
  { id: 'ru', name: 'Русский язык' },
  { id: 'ar', name: 'اللغة العربية' },
  { id: 'th', name: 'ภาษาไทย' },
  { id: 'vi', name: 'Tiếng Việt' },
  { id: 'mn', name: 'Монгол хэл' },
  { id: 'id', name: 'Bahasa Indonesia' },
  { id: 'hu', name: 'Magyar' },
];

const PAGE_2_LANGUAGES = [
  { id: 'fa', name: 'Farsi' },
  { id: 'ja', name: 'にほんご' },
  { id: 'ko', name: '한국어' },
  { id: 'he', name: 'עברית' },
];

/**
 * LanguageSettingsPage
 * Recreates the Language Settings 2-page selector on CPD10 (media_1790420090376.jpg & media_1790420098034.jpg).
 * 3-column radio layout with page 1 (15 languages) and page 2 (4 languages).
 */
export function LanguageSettingsPage() {
  const { setScreen, currentLanguage, setCurrentLanguage } = useCpd10();
  const [page, setPage] = useState(1);

  const languages = page === 1 ? PAGE_1_LANGUAGES : PAGE_2_LANGUAGES;

  return (
    <div className="cpd10-page-content cpd10-language-page">
      {/* Top Bar with Back Button */}
      <div className="cpd10-lang-top-bar">
        <button
          type="button"
          className="cpd10-subpage-back-btn"
          onClick={() => setScreen('settings')}
          title="Back to Settings"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>
      </div>

      {/* 3-Column Language Options Grid */}
      <div className="cpd10-lang-grid">
        {languages.map((lang) => {
          const isSelected = currentLanguage === lang.name;
          return (
            <button
              key={lang.id}
              type="button"
              className={`cpd10-lang-item ${isSelected ? 'is-selected' : ''}`}
              onClick={() => setCurrentLanguage(lang.name)}
            >
              <div className={`cpd10-lang-radio ${isSelected ? 'is-selected' : ''}`}>
                {isSelected && <div className="cpd10-lang-radio-inner" />}
              </div>
              <span className="cpd10-lang-name">{lang.name}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Pagination: < 1/2 > or < 2/2 > */}
      <div className="cpd10-lang-pagination">
        <button
          type="button"
          className={`cpd10-page-arrow ${page === 1 ? 'is-disabled' : ''}`}
          disabled={page === 1}
          onClick={() => setPage(1)}
          title="Previous Page"
        >
          <ChevronLeft size={18} strokeWidth={2.4} />
        </button>
        <span className="cpd10-page-indicator">{page}/2</span>
        <button
          type="button"
          className={`cpd10-page-arrow ${page === 2 ? 'is-disabled' : ''}`}
          disabled={page === 2}
          onClick={() => setPage(2)}
          title="Next Page"
        >
          <ChevronRight size={18} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}
