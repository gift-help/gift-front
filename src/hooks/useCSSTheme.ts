import { useEffect } from 'react';
import { useTelegram } from './useTelegram';

export const useCSSTheme = () => {
    const { themeParams, ready } = useTelegram();

    useEffect(() => {
        if (!ready || !themeParams) return;

        const root = document.documentElement;

        // Обновляем CSS переменные на основе themeParams
        if (themeParams.bg_color) {
            root.style.setProperty('--tg-bg-color', themeParams.bg_color);
        }
        if (themeParams.text_color) {
            root.style.setProperty('--tg-text-color', themeParams.text_color);
        }
        if (themeParams.hint_color) {
            root.style.setProperty('--tg-hint-color', themeParams.hint_color);
        }
        if (themeParams.link_color) {
            root.style.setProperty('--tg-link-color', themeParams.link_color);
        }
        if (themeParams.button_color) {
            root.style.setProperty('--tg-button-color', themeParams.button_color);
        }
        if (themeParams.button_text_color) {
            root.style.setProperty('--tg-button-text-color', themeParams.button_text_color);
        }
        if (themeParams.secondary_bg_color) {
            root.style.setProperty('--tg-secondary-bg-color', themeParams.secondary_bg_color);
        }

    }, [themeParams, ready]);

    return { themeParams, ready };
};