import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const mockup = import.meta.env.VITE_MOCKUP
const searchMockup = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('mockup') : null
const activeTarget = searchMockup || mockup

const { default: ActiveApp } = activeTarget === 'ndp600-cpl20-portrait'
  ? await import('./mockups/ndp600-cpl20-portrait/App.jsx')
  : activeTarget === 'lcs-landscape'
    ? await import('./mockups/lcs-landscape/App.jsx')
    : activeTarget === 'lcs-web'
      ? await import('./mockups/lcs-web/App.jsx')
      : activeTarget === 'cpd10'
        ? await import('./mockups/cpd10/App.jsx')
        : activeTarget === 'cv870'
          ? await import('./mockups/cv870-tracking/App.jsx')
          : activeTarget === 'sl100'
            ? await import('./mockups/sl100/App.jsx')
    : await import('./App.jsx')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ActiveApp />
  </StrictMode>,
)
