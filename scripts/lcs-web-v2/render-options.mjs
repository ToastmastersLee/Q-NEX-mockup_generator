// Render bilingual V2 pages without browser or device access.
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { fileURLToPath } from 'node:url';

const server = await createServer({
  configFile: false,
  root: fileURLToPath(new URL('../..', import.meta.url)),
  plugins: [(await import('@vitejs/plugin-react')).default()],
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
});
try {
  const base = '/src/mockups/lcs-web-v2';
  const { LanguageProvider } = await server.ssrLoadModule(`${base}/i18n/index.js`);
  const { SETTINGS_PAGE_MAP } = await server.ssrLoadModule(`${base}/components/settings/index.js`);
  const { DisplaySettingsModal } = await server.ssrLoadModule(`${base}/components/settings/modals/DisplaySettingsModal.jsx`);
  const { AudioSettingsModal } = await server.ssrLoadModule(`${base}/components/settings/modals/AudioSettingsModal.jsx`);
  const pages = { ...SETTINGS_PAGE_MAP, OutputDisplay: DisplaySettingsModal, OutputAudio: AudioSettingsModal };
  const result = {};
  for (const language of ['en', 'zh']) {
    globalThis.window = {location: {search: `?lang=${language}`}};
    result[language] = {};
  for (const [name, Page] of Object.entries(pages)) {
    result[language][name] = renderToStaticMarkup(React.createElement(LanguageProvider, null,
      React.createElement(Page, { output: 'HDMI OUT1', onClose() {} })));
  }
  }
  delete globalThis.window;
  process.stdout.write(JSON.stringify(result));
} finally {
  await server.close();
}
