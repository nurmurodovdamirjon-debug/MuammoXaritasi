import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { MapView } from '@/components/map/MapView'
import { Input } from '@/components/ui/Input'
import { ProblemCard } from '@/components/problem/ProblemCard'
import { ProblemCardSkeleton } from '@/components/problem/ProblemCardSkeleton'
import { useProblems } from '@/hooks/useProblems'
import { useTelegram } from '@/hooks/useTelegram'
import { CATEGORY_CONFIG } from '@/constants/problem'
import type { Category } from '@/types/problem'
import { ROUTES } from '@/constants/routes'
import { formatCount } from '@/utils/date'
import { uiStore } from '@/stores/uiStore'

const CATEGORIES: Category[] = ['school', 'medical', 'road', 'lighting', 'water', 'other']

export function MapPage() {
  const [search, setSearch] = useState('')
  const filterCategory = uiStore((s) => s.filterCategory)
  const setFilterCategory = uiStore((s) => s.setFilterCategory)
  const { data: problems = [], isLoading } = useProblems(
    filterCategory ? { category: filterCategory } : undefined
  )
  const { haptic } = useTelegram()
  const navigate = useNavigate()

  const filteredProblems = useMemo(() => {
    if (!search.trim()) return problems
    const q = search.toLowerCase()
    return problems.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    )
  }, [problems, search])

  const stats = useMemo(() => {
    const total = problems.length
    const critical = problems.filter((p) => p.priority === 'critical').length
    const resolved = problems.filter((p) => p.status === 'resolved').length
    return { total, critical, resolved }
  }, [problems])

  return (
    <ScreenLayout>
      <TopBar title="Muammo Xaritasi" rightAction={<span className="text-xl">🔔</span>} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative h-[320px] shrink-0">
          <MapView
            problems={filteredProblems}
            onProblemClick={(p) => navigate(ROUTES.PROBLEM_DETAIL.replace(':id', p.id))}
            className="h-full w-full"
          />
          <div className="absolute left-3 right-3 top-3 z-10">
            <Input
              placeholder="Tuman, ko'cha qidiring..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<span>🔍</span>}
              className="bg-bg-surface/95 backdrop-blur-xl border-[var(--border-2)]"
            />
          </div>
          <div className="absolute bottom-14 right-3 z-10 rounded-xl border border-[var(--border)] bg-bg-surface/90 px-2.5 py-2 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-status-critical" /> Favqulodda
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-status-high" /> Muhim
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-status-medium" /> O'rta
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 rounded-full bg-status-resolved" /> Hal qilindi
            </div>
          </div>
        </div>
        <div className="flex gap-2.5 border-b border-[var(--border)] bg-bg-base px-4 py-3">
          <div className="flex-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent">
              {formatCount(stats.total)}
            </div>
            <div className="text-[11px] font-medium text-text-tertiary">Jami muammo</div>
          </div>
          <div className="flex-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold text-status-critical">{formatCount(stats.critical)}</div>
            <div className="text-[11px] font-medium text-text-tertiary">Favqulodda</div>
          </div>
          <div className="flex-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold text-status-resolved">{formatCount(stats.resolved)}</div>
            <div className="text-[11px] font-medium text-text-tertiary">Hal qilindi</div>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
          <button
            type="button"
            onClick={() => { haptic.selection(); setFilterCategory(null) }}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              !filterCategory ? 'border-accent bg-accent text-white shadow-[0_4px_12px_rgba(79,142,247,0.3)]' : 'border-[var(--border)] bg-bg-surface text-text-secondary'
            }`}
          >
            Hammasi
          </button>
          {CATEGORIES.map((c) => {
            const cfg = CATEGORY_CONFIG[c]
            const active = filterCategory === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => { haptic.selection(); setFilterCategory(c) }}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active ? 'border-accent bg-accent text-white' : 'border-[var(--border)] bg-bg-surface text-text-secondary'
                }`}
              >
                {cfg.emoji} {cfg.label_uz}
              </button>
            )
          })}
        </div>
        <div className="flex items-center justify-between px-4 pb-2 pt-1">
          <h2 className="text-[15px] font-bold">So'nggi muammolar</h2>
          <button
            type="button"
            onClick={() => navigate(ROUTES.PROBLEM_LIST)}
            className="text-xs font-semibold text-accent"
          >
            Barchasi →
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex flex-col gap-2.5">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <ProblemCardSkeleton key={i} />)
              : filteredProblems.slice(0, 10).map((p) => <ProblemCard key={p.id} problem={p} />)}
          </div>
        </div>
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
