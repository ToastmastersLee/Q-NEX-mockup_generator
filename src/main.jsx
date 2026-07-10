import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const mockup = import.meta.env.VITE_MOCKUP
const { default: ActiveApp } = mockup === 'ndp600-cpl20-portrait'
  ? await import('./mockups/ndp600-cpl20-portrait/App.jsx')
  : mockup === 'lcs-landscape'
    ? await import('./mockups/lcs-landscape/App.jsx')
    : await import('./App.jsx')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActiveApp />
  </StrictMode>,
)
