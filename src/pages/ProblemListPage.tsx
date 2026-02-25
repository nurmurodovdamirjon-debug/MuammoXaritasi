import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProblemCard } from '@/components/problem/ProblemCard'
import { ProblemCardSkeleton } from '@/components/problem/ProblemCardSkeleton'
import { useProblems } from '@/hooks/useProblems'
import { MAP_PAGE } from '@/constants/map'

export function ProblemListPage() {
  const { data: problems = [], isLoading } = useProblems()

  return (
    <ScreenLayout>
      <TopBar title="Muammolar" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-2.5">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <ProblemCardSkeleton key={i} />)
            : problems.length === 0
              ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-[15px] font-medium text-text-secondary">{MAP_PAGE.EMPTY_PROBLEMS}</p>
                    <p className="mt-1.5 text-[13px] text-text-tertiary">{MAP_PAGE.EMPTY_PROBLEMS_HINT}</p>
                  </div>
                )
              : problems.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </div>
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
