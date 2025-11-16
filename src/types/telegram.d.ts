export {}

declare global {
  interface TelegramWebAppUser {
    id?: number
    is_bot?: boolean
    first_name?: string
    last_name?: string
    username?: string
    language_code?: string
    is_premium?: boolean
    added_to_attachment_menu?: boolean
    allows_write_to_pm?: boolean
    photo_url?: string
  }

  interface TelegramWebAppChat {
    id: number
    type: string
    title?: string
    username?: string
    photo_url?: string
  }

  interface TelegramMainButton {
    text?: string
    color?: string
    textColor?: string
    isVisible?: boolean
    isActive?: boolean
    show: () => void
    hide: () => void
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback?: () => void) => void
    _clickCallback?: () => void 
  }

  interface TelegramBackButton {
    isVisible?: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback?: () => void) => void
    _clickCallback?: () => void
  }

  interface TelegramThemeParams {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }

  interface TelegramWebApp {
    initData?: string
    initDataUnsafe?: {
      user?: TelegramWebAppUser
      chat?: TelegramWebAppChat
      auth_date?: number | string
      hash?: string
    }
    version?: string
    platform?: string
    colorScheme?: string
    isReady?: boolean
    themeParams?: TelegramThemeParams
    isExpanded?: boolean
    viewportHeight?: number
    viewportStableHeight?: number
    isClosingConfirmationEnabled?: boolean

    ready: () => void
    expand: () => void
    close: () => void
    sendData: (data: string) => void

    MainButton: TelegramMainButton
    BackButton: TelegramBackButton

    onEvent: (eventType: string, callback: (...args: unknown[]) => void) => void
    offEvent: (eventType: string, callback?: (...args: unknown[]) => void) => void
  }

  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp | undefined
    }
  }
}