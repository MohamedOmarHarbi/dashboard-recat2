import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    load: 'languageOnly',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      convertDetectedLanguage: (lng) => {
        if (!lng) return 'en';
        const code = lng.split('-')[0].toLowerCase();
        return code === 'ar' ? 'ar' : 'en';
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

// Handle direction
const updateDirection = (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

i18n.on('languageChanged', (lng) => {
  updateDirection(lng);
});

// Initial direction
updateDirection(i18n.language);

export default i18n;
