import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import enCommon from '../src/locales/en/common.json';
import enButtons from '../src/locales/en/buttons.json';
import enTags from '../src/locales/en/tags.json';
import enQuestions from '../src/locales/en/questions.json';
import enBaseInfo from '../src/locales/en/baseInfo.json';
import enDescription from '../src/locales/en/description.json';
import enFilters from '../src/locales/en/filters.json';
import enHome from '../src/locales/en/home.json';
import enProcessing from '../src/locales/en/processing.json';

import ruCommon from '../src/locales/ru/common.json';
import ruButtons from '../src/locales/ru/buttons.json';
import ruTags from '../src/locales/ru/tags.json';
import ruQuestions from '../src/locales/ru/questions.json';
import ruBaseInfo from '../src/locales/ru/baseInfo.json';
import ruDescription from '../src/locales/ru/description.json';
import ruFilters from '../src/locales/ru/filters.json';
import ruHome from '../src/locales/ru/home.json';
import ruProcessing from '../src/locales/ru/processing.json';

const resources = {
  en: {
    common: enCommon,
    buttons: enButtons,
    tags: enTags,
    questions: enQuestions,
    baseInfo: enBaseInfo,
    description: enDescription,
    filters: enFilters,
    home: enHome,
    processing: enProcessing,
  },
  ru: {
    common: ruCommon,
    buttons: ruButtons,
    tags: ruTags,
    questions: ruQuestions,
    baseInfo: ruBaseInfo,
    description: ruDescription,
    filters: ruFilters,
    home: ruHome,
    processing: ruProcessing,
  },
};

// Функция для определения языка Telegram
const getTelegramLanguage = () => {
  const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;

  // Поддерживаемые языки
  const supportedLanguages = ['en', 'ru', 'es', 'de', 'fr', 'it', 'ar'];

  if (tgLang && supportedLanguages.includes(tgLang)) {
    return tgLang;
  }

  // Если язык не поддерживается, используем английский
  return 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getTelegramLanguage(), // Устанавливаем язык сразу
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },

  defaultNS: 'common',
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed to load language ${lng} namespace ${ns}:`, msg);
});

export default i18n;
