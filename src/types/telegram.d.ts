interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      photo_url?: string
    }
  }
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  MainButton: {
    text: string
    isVisible: boolean
    setText(text: string): void
    onClick(cb: () => void): void
    offClick(cb: () => void): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    showProgress(leaveActive?: boolean): void
    hideProgress(): void
  }
  BackButton: {
    isVisible: boolean
    onClick(cb: () => void): void
    offClick(cb: () => void): void
    show(): void
    hide(): void
  }
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
    notificationOccurred(type: 'error' | 'success' | 'warning'): void
    selectionChanged(): void
  }
  CloudStorage: {
    setItem(key: string, value: string, cb?: (err: Error | null, stored: boolean) => void): void
    getItem(key: string, cb: (err: Error | null, value: string | null) => void): void
  }
  ready(): void
  expand(): void
  disableVerticalSwipes(): void
  enableVerticalSwipes(): void
  enableClosingConfirmation(): void
  disableClosingConfirmation(): void
  close(): void
  showAlert(msg: string, cb?: () => void): void
  showConfirm(msg: string, cb?: (confirmed: boolean) => void): void
  setHeaderColor(color: string): void
  setBackgroundColor(color: string): void
}

declare global {
  interface Window {
    Telegram?: { WebApp: TelegramWebApp }
  }
}

export {}
