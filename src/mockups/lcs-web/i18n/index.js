import React, { createContext, useContext, useState } from 'react';
import common from './common.json';
import main from './pages/main.json';
import recordings from './pages/recordings.json';
import input from './pages/input.json';
import system from './pages/system.json';
import userManagement from './pages/userManagement.json';
import factory from './pages/factory.json';
import powerSupply from './pages/powerSupply.json';
import tracker from './pages/tracker.json';
import trackerDebug from './pages/trackerDebug.json';
import subtitle from './pages/subtitle.json';
import logo from './pages/logo.json';
import titleTrailer from './pages/titleTrailer.json';
import osd from './pages/osd.json';
import interaction from './pages/interaction.json';
import broadcast from './pages/broadcast.json';
import ptz from './pages/ptz.json';
import upload from './pages/upload.json';
import storage from './pages/storage.json';
import platform from './pages/platform.json';
import peripheral from './pages/peripheral.json';
import record from './pages/record.json';
import live from './pages/live.json';
import ip from './pages/ip.json';
import version from './pages/version.json';
import output from './pages/output.json';
import audio from './pages/audio.json';
import guidingStrategy from './pages/guidingStrategy.json';
import videoMatting from './pages/videoMatting.json';

const dictionaries = {
  common,
  main,
  recordings,
  input,
  system,
  userManagement,
  factory,
  powerSupply,
  tracker,
  trackerDebug,
  subtitle,
  logo,
  titleTrailer,
  osd,
  interaction,
  broadcast,
  ptz,
  upload,
  storage,
  platform,
  peripheral,
  record,
  live,
  ip,
  version,
  output,
  audio,
  guidingStrategy,
  videoMatting,
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  dictionaries,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      if (urlLang === 'zh' || urlLang === 'en') return urlLang;
      const stored = localStorage.getItem('lcs_web_lang');
      if (stored === 'zh' || stored === 'en') return stored;
    }
    return 'en';
  });

  const setLanguage = (lang) => {
    const nextLang = (lang === 'Chinese' || lang === 'zh' || lang === '中文(简体)' || lang === '中文') ? 'zh' : 'en';
    setLanguageState(nextLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lcs_web_lang', nextLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, changeLanguage: setLanguage, dictionaries } },
    children
  );
}

export function useTranslation(namespace = 'common') {
  const { language, setLanguage, changeLanguage } = useContext(LanguageContext);

  const t = (path, fallback = '', params = null) => {
    const keys = path.split('.');
    const dict = dictionaries[namespace]?.[language] || {};
    const commonDict = dictionaries.common?.[language] || {};

    let val = dict;
    for (const k of keys) {
      if (val && typeof val === 'object' && k in val) {
        val = val[k];
      } else {
        val = undefined;
        break;
      }
    }

    let result = (val !== undefined && typeof val === 'string') ? val : undefined;

    if (result === undefined) {
      // Check common dictionary fallback
      let commonVal = commonDict;
      for (const k of keys) {
        if (commonVal && typeof commonVal === 'object' && k in commonVal) {
          commonVal = commonVal[k];
        } else {
          commonVal = undefined;
          break;
        }
      }

      if (commonVal !== undefined && typeof commonVal === 'string') {
        result = commonVal;
      } else {
        result = fallback || keys[keys.length - 1] || path;
      }
    }

    if (params && typeof params === 'object') {
      Object.keys(params).forEach(pKey => {
        result = result.replace(new RegExp(`\\{${pKey}\\}`, 'g'), params[pKey]);
      });
    }

    return result;
  };

  return { t, language, setLanguage, changeLanguage: changeLanguage || setLanguage, isZh: language === 'zh' };
}
