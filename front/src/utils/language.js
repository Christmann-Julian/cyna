import cookies from 'js-cookie';

const languages = [
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
];

export default languages;

export const getCurrentLanguageCode = () => {
  return cookies.get('i18next') || 'en';
};

export const getCurrentLanguage = () => {
  const currentLanguageCode = getCurrentLanguageCode();
  return languages.find((l) => l.code === currentLanguageCode);
};

export const getCurrentLocale = () => {
  const currentLanguage = getCurrentLanguage();
  return `${currentLanguage.code}-${currentLanguage.country_code.toUpperCase()}`;
};
