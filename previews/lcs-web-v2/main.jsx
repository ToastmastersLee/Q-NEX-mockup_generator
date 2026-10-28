import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from '../../src/mockups/lcs-web-v2/App.jsx'

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
