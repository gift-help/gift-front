import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импорт переводов
import enCommon from '../src/locales/en/common.json';
import enButtons from '../src/locales/en/buttons.json';
import enTags from '../src/locales/en/tags.json';

import ruCommon from '../src/locales/ru/common.json';
import ruButtons from '../src/locales/ru/buttons.json';
import ruTags from '../src/locales/ru/tags.json';

const resources = {
    en: {
        common: enCommon,
        buttons: enButtons,
        tags: enTags
    },
    ru: {
        common: ruCommon,
        buttons: ruButtons,
        tags: ruTags
    },
};

// Функция для определения языка Telegram
const getTelegramLanguage = () => {
    const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;

    // Поддерживаемые языки
    const supportedLanguages = ['en', 'ru', 'es', 'de', 'fr', 'it'];

    if (tgLang && supportedLanguages.includes(tgLang)) {
        return tgLang;
    }

    // Если язык не поддерживается, используем английский
    return 'en';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getTelegramLanguage(), // Устанавливаем язык сразу
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

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