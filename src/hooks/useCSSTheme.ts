import { useEffect } from 'react';
import { useTelegram } from './useTelegram';

export const useCSSTheme = () => {
  const { themeParams, ready } = useTelegram();

  useEffect(() => {
    if (!ready || !themeParams) return;

    const root = document.documentElement;

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

    if (themeParams.accent_text_color) {
      root.style.setProperty('--tg-accent-text-color', themeParams.accent_text_color);
    }
    if (themeParams.bottom_bar_bg_color) {
      root.style.setProperty('--tg-bottom-bar-bg-color', themeParams.bottom_bar_bg_color);
    }
    if (themeParams.destructive_text_color) {
      root.style.setProperty('--tg-destructive-text-color', themeParams.destructive_text_color);
    }
    if (themeParams.header_bg_color) {
      root.style.setProperty('--tg-header-bg-color', themeParams.header_bg_color);
    }
    if (themeParams.section_bg_color) {
      root.style.setProperty('--tg-section-bg-color', themeParams.section_bg_color);
    }
    if (themeParams.section_header_text_color) {
      root.style.setProperty(
        '--tg-section-header-text-color',
        themeParams.section_header_text_color,
      );
    }
    if (themeParams.section_separator_color) {
      root.style.setProperty('--tg-section-separator-color', themeParams.section_separator_color);
    }
    if (themeParams.subtitle_text_color) {
      root.style.setProperty('--tg-subtitle-text-color', themeParams.subtitle_text_color);
    }
  }, [themeParams, ready]);

  return { themeParams, ready };
};
