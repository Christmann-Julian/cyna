import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import App from './App.jsx'

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/translation/{{lng}}/translation.json',
    },
})

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

createRoot(document.getElementById('root')).render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
)
