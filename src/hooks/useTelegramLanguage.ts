import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useTelegramLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const checkTelegramLanguage = () => {
      const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
      const supportedLanguages = ['en', 'ru', 'es', 'de', 'fr', 'it'];

      if (tgLang && supportedLanguages.includes(tgLang) && i18n.language !== tgLang) {
        i18n.changeLanguage(tgLang);
      }
    };

    checkTelegramLanguage();
    if (window.Telegram?.WebApp) {
      const interval = setInterval(checkTelegramLanguage, 1000);

      return () => clearInterval(interval);
    }
  }, [i18n]);

  return i18n.language;
};
