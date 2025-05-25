import React, { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import App from './App.jsx'
import Loading from './pages/Loading.jsx'
import { Provider } from 'react-redux';
import store from './redux/store';

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
  <Loading />
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Suspense fallback={loadingMarkup}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Suspense>
  </Provider>
)
