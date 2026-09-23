import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'
import './portfolio.css'

hydrateRoot(document.getElementById('root'),
  <StrictMode>
    <App />
  </StrictMode>,
)
