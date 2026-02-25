import { useNavigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/components/ui/Button'
import { useTelegram } from '@/hooks/useTelegram'

export function SuccessPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { haptic } = useTelegram()
  const problemId = (location.state as { problemId?: string })?.problemId

  const goMap = () => {
    haptic.light()
    navigate(ROUTES.MAP, { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-6">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="flex h-[100px] w-[100px] items-center justify-center rounded-[32px] bg-gradient-to-br from-status-resolved to-[#4ECDC4] text-5xl shadow-[0_0_50px_rgba(6,214,160,0.3)]">
          ✓
        </div>
      </div>
      <h1 className="mb-2 text-center text-[32px] font-black leading-tight">
        Muammo <span className="bg-gradient-to-r from-status-resolved to-[#4ECDC4] bg-clip-text text-transparent">qabul qilindi!</span>
      </h1>
      <p className="mb-6 text-center text-[15px] leading-relaxed text-text-secondary">
        Xabaringiz yuborildi va mas'ul idora xabardor qilindi. Holat o'zgarganda sizga bildirishnoma keladi.
      </p>
      {problemId && (
        <div className="mb-4 w-full rounded-xl border border-[var(--border)] bg-bg-surface p-4">
          <div className="flex justify-between py-2">
            <span className="text-sm text-text-tertiary">Muammo raqami</span>
            <span className="font-semibold text-accent">#{problemId.slice(0, 8)}</span>
          </div>
        </div>
      )}
      <div className="flex w-full max-w-[280px] flex-col gap-2">
        <Button onClick={goMap} fullWidth size="lg" variant="primary">
          🗺️ Xaritaga qaytish
        </Button>
      </div>
    </div>
  )
}
