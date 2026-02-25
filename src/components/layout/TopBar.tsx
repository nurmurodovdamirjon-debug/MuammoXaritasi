import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '@/hooks/useTelegram'

interface TopBarProps {
  title: string
  showBack?: boolean
  rightAction?: React.ReactNode
  logoEmoji?: string
}

export const TopBar = memo(function TopBar({
  title,
  showBack,
  rightAction,
  logoEmoji = '📍',
}: TopBarProps) {
  const navigate = useNavigate()
  const { haptic } = useTelegram()

  const handleBack = () => {
    haptic.light()
    navigate(-1)
  }

  return (
    <header className="flex h-[var(--topbar-h)] shrink-0 items-center justify-between border-b border-[var(--border)] bg-bg-base px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-bg-surface text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
            aria-label="Orqaga"
          >
            ←
          </button>
        ) : (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-[20px]">
            {logoEmoji}
          </div>
        )}
        <h1 className="truncate text-[17px] font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center justify-end gap-1">
        {rightAction ?? <div className="h-9 w-9" />}
      </div>
    </header>
  )
})
