import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './portfolio.css'

// Prerendered HTML serves discovery; mount a fresh client tree because React 19
// resource-hint hoisting makes this standalone static output unsafe to hydrate.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
