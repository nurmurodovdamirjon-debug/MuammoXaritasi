import { useMemo } from 'react'

export function useTelegram() {
  const tg = window.Telegram?.WebApp
  const user = useMemo(() => tg?.initDataUnsafe?.user ?? null, [tg])

  return {
    tg,
    user,
    isReady: !!tg,
    haptic: {
      light: () => tg?.HapticFeedback?.impactOccurred('light'),
      medium: () => tg?.HapticFeedback?.impactOccurred('medium'),
      heavy: () => tg?.HapticFeedback?.impactOccurred('heavy'),
      success: () => tg?.HapticFeedback?.notificationOccurred('success'),
      error: () => tg?.HapticFeedback?.notificationOccurred('error'),
      selection: () => tg?.HapticFeedback?.selectionChanged(),
    },
    mainButton: {
      show: (text: string) => {
        tg?.MainButton?.setText(text)
        tg?.MainButton?.show()
      },
      hide: () => tg?.MainButton?.hide(),
      showProgress: () => tg?.MainButton?.showProgress(),
      hideProgress: () => tg?.MainButton?.hideProgress(),
      onClick: (fn: () => void) => tg?.MainButton?.onClick(fn),
      offClick: (fn: () => void) => tg?.MainButton?.offClick(fn),
    },
  }
}
