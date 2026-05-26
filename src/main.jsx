import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/LoadingContext'
import { ToastProvider } from './contexts/ToastContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <LanguageProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </LanguageProvider>
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>,
)
