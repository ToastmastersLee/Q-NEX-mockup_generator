import { useState } from 'react';
import { Check } from 'lucide-react';
import { languages } from '../../constants/languages';

export function LanguageSubpage() {
  const [selectedLang, setSelectedLang] = useState('English');
  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-settings-list">
        {languages.map((lang) => (
          <div key={lang} className="ndp-settings-row is-clickable" onClick={() => setSelectedLang(lang)}>
            <span className="ndp-settings-label" style={{ flex: 1 }}>{lang}</span>
            {selectedLang === lang && <span style={{ color: '#00c8ff', display: 'flex' }}><Check size={20} strokeWidth={3} /></span>}
          </div>
        ))}
      </div>
    </div>
  );
}
