import { useEffect, useState, useCallback } from 'react';
import { init } from '@telegram-apps/sdk';

interface UseTelegramReturn {
  ready: boolean;
  themeParams: TelegramThemeParams | null;
}

const TELEGRAM_EVENTS = {
  THEME_CHANGED: 'themeChanged',
};

export function useTelegram(): UseTelegramReturn {
  const tg = window.Telegram?.WebApp as unknown as TelegramWebApp;

  const [ready, setReady] = useState(false);
  const [themeParams, setThemeParams] = useState<TelegramThemeParams | null>(null);

  // Функция для получения параметров темы
  const getThemeParams = useCallback((): TelegramThemeParams | null => {
    return tg?.themeParams ?? null;
  }, [tg]);

  // Функция для обработки изменения темы
  const handleThemeChange = useCallback(() => {
    const newThemeParams = getThemeParams();
    setThemeParams(newThemeParams ? { ...newThemeParams } : null);
  }, [getThemeParams]);

  useEffect(() => {
    let mounted = true;
    let cleanup: (() => void) | undefined;

    const initializeTelegram = async (): Promise<void> => {
      try {
        await init();

        if (!mounted) return;

        const themeParams = getThemeParams();
        setThemeParams(themeParams);
        setReady(true);

        // Подписка на события изменения темы
        if (tg?.onEvent) {
          tg.onEvent(TELEGRAM_EVENTS.THEME_CHANGED, handleThemeChange);

          cleanup = () => {
            if (tg.offEvent) {
              tg.offEvent(TELEGRAM_EVENTS.THEME_CHANGED, handleThemeChange);
            }
          };
        }
      } catch (error) {
        console.error('Failed to initialize Telegram WebApp:', error);
        if (mounted) {
          setReady(true);
        }
      }
    };

    initializeTelegram();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [getThemeParams, handleThemeChange, tg]);

  return { ready, themeParams };
}
