import { useEffect, useState, useCallback } from 'react';
import { init } from '@telegram-apps/sdk';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        themeParams?: Record<string, string>;
        onEvent?: (event: string, callback: () => void) => void;
      };
    };
  }
}

interface UseTelegramReturn {
  ready: boolean;
  themeParams: Record<string, string> | null;
}

const TELEGRAM_EVENTS = {
  THEME_CHANGED: 'themeChanged',
};

export function useTelegram(): UseTelegramReturn {
  const [ready, setReady] = useState(false);
  const [themeParams, setThemeParams] = useState<Record<string, string> | null>(null);

  // Функция для получения параметров темы
  const getThemeParams = useCallback((): Record<string, string> | null => {
    console.log(window.Telegram?.WebApp?.themeParams);
    return window.Telegram?.WebApp?.themeParams ?? null;
  }, []);

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
        const webApp = window.Telegram?.WebApp;
        if (webApp?.onEvent) {
          webApp.onEvent(TELEGRAM_EVENTS.THEME_CHANGED, handleThemeChange);

          cleanup = () => {};
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
  }, [getThemeParams, handleThemeChange]);

  return { ready, themeParams };
}