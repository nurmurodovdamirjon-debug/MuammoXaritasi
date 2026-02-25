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
import { useLocation } from '@/hooks/useLocation'
import { CATEGORY_CONFIG, TOSHKENT_CENTER, TOSHKENT_ZOOM, UZBEKISTAN_BOUNDS } from '@/constants/problem'
import { MAP_PAGE } from '@/constants/map'
import type { Category } from '@/types/problem'
import { ROUTES } from '@/constants/routes'
import { formatCount } from '@/utils/date'
import { uiStore } from '@/stores/uiStore'

const CATEGORIES: Category[] = ['school', 'medical', 'road', 'lighting', 'water', 'other']

/** Joylashuvni O'zbekiston chegarasida ushlab qoladi */
function clampToUzbekistan(lat: number, lng: number): { lat: number; lng: number } {
  return {
    lat: Math.max(UZBEKISTAN_BOUNDS.south, Math.min(UZBEKISTAN_BOUNDS.north, lat)),
    lng: Math.max(UZBEKISTAN_BOUNDS.west, Math.min(UZBEKISTAN_BOUNDS.east, lng)),
  }
}

export function MapPage() {
  const [search, setSearch] = useState('')
  const { location: userLocation, loading: locationLoading } = useLocation()
  const filterCategory = uiStore((s) => s.filterCategory)
  const setFilterCategory = uiStore((s) => s.setFilterCategory)
  const { data: problems = [], isLoading } = useProblems(
    filterCategory ? { category: filterCategory } : undefined
  )
  const { haptic } = useTelegram()
  const navigate = useNavigate()

  const mapCenter = useMemo(() => {
    if (userLocation) return clampToUzbekistan(userLocation.lat, userLocation.lng)
    return TOSHKENT_CENTER
  }, [userLocation])

  const mapZoom = userLocation ? 14 : TOSHKENT_ZOOM

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
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        {/* Xarita bloki: TopBar xarita ustida ko'rinadi */}
        <div className="relative h-[320px] shrink-0 overflow-hidden bg-bg-surface">
          <div
            className="absolute inset-0 z-0 bg-[#111520]"
            style={{
              background: 'linear-gradient(180deg, transparent 60%, var(--bg-base) 100%), radial-gradient(ellipse at 30% 40%, rgba(79,142,247,0.06) 0%, transparent 60%), #111520',
            }}
          />
          <div
            className="absolute inset-0 z-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <MapView
            problems={filteredProblems}
            onProblemClick={(p) => navigate(ROUTES.PROBLEM_DETAIL.replace(':id', p.id))}
            center={mapCenter}
            zoom={mapZoom}
            userLocation={locationLoading ? null : userLocation}
            className="absolute inset-0 z-0 h-full w-full"
          />
          <div className="absolute left-0 right-0 top-0 z-20">
            <div className="absolute inset-0 bg-gradient-to-b from-bg-base/95 to-transparent" aria-hidden />
            <TopBar
              title={MAP_PAGE.TITLE}
              rightAction={
                <button
                  type="button"
                  onClick={() => { haptic.light(); navigate(ROUTES.NOTIFICATIONS) }}
                  aria-label={MAP_PAGE.NOTIFICATIONS_ARIA}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-bg-surface text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                >
                  🔔
                </button>
              }
            />
          </div>
          <div className="absolute left-3 right-3 top-14 z-10">
            <Input
              placeholder={MAP_PAGE.SEARCH_PLACEHOLDER}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<span>🔍</span>}
              className="border-[var(--border-2)] bg-bg-surface/95 backdrop-blur-xl"
            />
          </div>
          <div className="absolute bottom-[52px] right-3 z-10 flex flex-col gap-1.5 rounded-[10px] border border-[var(--border)] bg-bg-surface/90 px-2.5 py-2 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 shrink-0 rounded-full bg-status-critical" />
              {MAP_PAGE.LEGEND.CRITICAL}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 shrink-0 rounded-full bg-status-high" />
              {MAP_PAGE.LEGEND.HIGH}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 shrink-0 rounded-full bg-status-medium" />
              {MAP_PAGE.LEGEND.MEDIUM}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-secondary">
              <span className="h-2 w-2 shrink-0 rounded-full bg-status-resolved" />
              {MAP_PAGE.LEGEND.RESOLVED}
            </div>
          </div>
        </div>

        {/* Stats row — Screen 01: 14px 16px, 3 chips */}
        <div className="flex gap-2.5 border-b border-[var(--border)] bg-bg-base px-4 py-3.5">
          <div className="flex flex-1 flex-col gap-0.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent">
              {formatCount(stats.total)}
            </div>
            <div className="text-[11px] font-medium text-text-tertiary">{MAP_PAGE.STATS.TOTAL}</div>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold text-status-critical">{formatCount(stats.critical)}</div>
            <div className="text-[11px] font-medium text-text-tertiary">{MAP_PAGE.STATS.CRITICAL}</div>
          </div>
          <div className="flex flex-1 flex-col gap-0.5 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface p-3">
            <div className="text-[22px] font-extrabold text-status-resolved">{formatCount(stats.resolved)}</div>
            <div className="text-[11px] font-medium text-text-tertiary">{MAP_PAGE.STATS.RESOLVED}</div>
          </div>
        </div>

        {/* Filter chips — Screen 01: horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 pt-0 scrollbar-none">
          <button
            type="button"
            onClick={() => { haptic.selection(); setFilterCategory(null) }}
            aria-label={MAP_PAGE.FILTER_ALL}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
              !filterCategory ? 'border-accent bg-accent text-white shadow-[0_4px_12px_rgba(79,142,247,0.3)]' : 'border-[var(--border)] bg-bg-surface text-text-secondary'
            }`}
          >
            {MAP_PAGE.FILTER_ALL}
          </button>
          {CATEGORIES.map((c) => {
            const cfg = CATEGORY_CONFIG[c]
            const active = filterCategory === c
            return (
              <button
                key={c}
                type="button"
                onClick={() => { haptic.selection(); setFilterCategory(c) }}
                aria-label={cfg.label_uz}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${
                  active ? 'border-accent bg-accent text-white shadow-[0_4px_12px_rgba(79,142,247,0.3)]' : 'border-[var(--border)] bg-bg-surface text-text-secondary'
                }`}
              >
                {cfg.emoji} {cfg.label_uz}
              </button>
            )
          })}
        </div>

        {/* Section head + problem list — Screen 01 */}
        <div className="flex items-center justify-between px-4 pb-2.5 pt-1">
          <h2 className="text-[15px] font-bold">{MAP_PAGE.SECTION_TITLE}</h2>
          <button
            type="button"
            onClick={() => { haptic.selection(); navigate(ROUTES.PROBLEM_LIST) }}
            aria-label={MAP_PAGE.VIEW_ALL_ARIA}
            className="rounded text-xs font-semibold text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            {MAP_PAGE.SECTION_LINK}
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <div className="flex flex-col gap-2.5">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => <ProblemCardSkeleton key={i} />)
              : filteredProblems.length === 0
                ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-[15px] font-medium text-text-secondary">{MAP_PAGE.EMPTY_PROBLEMS}</p>
                      <p className="mt-1.5 text-[13px] text-text-tertiary">{MAP_PAGE.EMPTY_PROBLEMS_HINT}</p>
                    </div>
                  )
                : filteredProblems.slice(0, 10).map((p) => <ProblemCard key={p.id} problem={p} />)}
          </div>
        </div>
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
