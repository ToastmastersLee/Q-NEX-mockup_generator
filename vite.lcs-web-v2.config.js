import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

// This entry imports only v2. The legacy multi-mockup entry is not in this graph.
export default defineConfig({
  root: fileURLToPath(new URL('./previews/lcs-web-v2', import.meta.url)),
  base: './',
  publicDir: false,
  plugins: [react(), tailwindcss(), {
    name: 'verify-lcs-web-v2-isolation',
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        const unexpected = Object.keys(chunk.modules).filter(name => {
          const normalized = name.replaceAll('\\', '/');
          return normalized.includes('/src/mockups/') && !normalized.includes('/src/mockups/lcs-web-v2/');
        });
        if (unexpected.length) this.error(`Unexpected mockup in customer bundle: ${unexpected.join(', ')}`);
      }
    },
  }],
  server: { host: '0.0.0.0', port: 5180, strictPort: true, fs: { allow: [projectRoot] } },
  preview: { host: '127.0.0.1', port: 4180, strictPort: true },
  build: {
    outDir: fileURLToPath(new URL('./dist/lcs-web-v2', import.meta.url)),
    emptyOutDir: true,
  },
})
