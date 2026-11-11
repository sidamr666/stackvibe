import '@fontsource-variable/inter'
import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PrivacyPage from './pages/PrivacyPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
)