import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { useProblems } from '@/hooks/useProblems'
import { formatCount } from '@/utils/date'

export function StatisticsPage() {
  const { data: problems = [] } = useProblems()
  const total = problems.length
  const resolved = problems.filter((p) => p.status === 'resolved').length
  const critical = problems.filter((p) => p.priority === 'critical').length

  return (
    <ScreenLayout>
      <TopBar title="Statistika" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <h2 className="mb-1 text-[22px] font-black">Shahar hisoboti</h2>
        <p className="mb-4 text-sm text-text-tertiary">So'nggi ma'lumotlar</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-[var(--border)] bg-bg-surface p-3 text-center">
            <div className="text-[28px] font-black text-accent">{formatCount(total)}</div>
            <div className="text-[10px] font-semibold text-text-tertiary">JAMI</div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-bg-surface p-3 text-center">
            <div className="text-[28px] font-black text-status-resolved">{formatCount(resolved)}</div>
            <div className="text-[10px] font-semibold text-text-tertiary">HAL QILINDI</div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-bg-surface p-3 text-center">
            <div className="text-[28px] font-black text-status-critical">{formatCount(critical)}</div>
            <div className="text-[10px] font-semibold text-text-tertiary">FAVQULODDA</div>
          </div>
        </div>
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
