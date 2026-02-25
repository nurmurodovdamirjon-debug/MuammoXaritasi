import { memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useTelegram } from '@/hooks/useTelegram'

const navItems: { path: string; icon: string; label: string }[] = [
  { path: ROUTES.MAP, icon: '🗺️', label: 'Xarita' },
  { path: ROUTES.PROBLEM_LIST, icon: '📋', label: 'Muammolar' },
  { path: ROUTES.ADD_PROBLEM, icon: '➕', label: '' },
  { path: ROUTES.PROFILE, icon: '👤', label: 'Mening' },
  { path: ROUTES.STATISTICS, icon: '📊', label: 'Statistika' },
]

export const BottomNav = memo(function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { haptic } = useTelegram()

  const handleNav = (path: string) => {
    haptic.selection()
    navigate(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex min-h-[var(--nav-h)] items-center justify-center gap-0 border-t border-[var(--border)] bg-bg-surface pl-[max(8px,var(--safe-area-inset-left))] pr-[max(8px,var(--safe-area-inset-right))] pt-2 pb-[max(12px,var(--safe-area-inset-bottom))] backdrop-blur-xl">
      {navItems.map((item) => {
        const isAdd = item.path === ROUTES.ADD_PROBLEM
        const isActive = location.pathname === item.path
        const ariaLabel = isAdd ? "Muammo qo'shish" : item.label
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => handleNav(item.path)}
            aria-label={ariaLabel}
            aria-current={isActive ? 'page' : undefined}
            className={`
              flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 py-1.5
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset
              ${isAdd ? 'flex-none' : ''}
              ${isActive && !isAdd ? 'text-accent' : isAdd ? '' : 'text-text-tertiary'}
            `}
          >
            {isAdd ? (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-2xl shadow-[0_4px_20px_rgba(79,142,247,0.4)] active:scale-95 sm:h-[52px] sm:w-[52px] sm:text-[26px]">
                ➕
              </div>
            ) : (
              <>
                <span className={`shrink-0 text-xl transition-transform sm:text-[22px] ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className="truncate px-0.5 text-[9px] font-semibold leading-tight tracking-wide sm:text-[10px]">
                  {item.label}
                </span>
              </>
            )}
          </button>
        )
      })}
    </nav>
  )
})
