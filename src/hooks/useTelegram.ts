import { useEffect, useState } from 'react';
import { init } from '@telegram-apps/sdk';

declare global {
  interface Window { Telegram?: any; }
}

export function useTelegram() {
  const [ready, setReady] = useState(false);
  const [themeParams, setThemeParams] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    let mounted = true;

    async function start() {
      try {
        await init();
        const params = window.Telegram?.WebApp?.themeParams ?? null;
        if (mounted) setThemeParams(params);
        setReady(true);

        const web = window.Telegram?.WebApp;
        if (web?.onEvent) {
          web.onEvent('themeChanged', () => {
            const newTheme = window.Telegram?.WebApp?.themeParams ?? null;
            setThemeParams({ ...newTheme });
          });
        }
      } catch (err) {
        setReady(true);
      }
    }

    start();
    return () => { mounted = false; };
  }, []);

  return { ready, themeParams };
}