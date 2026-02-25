import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProblemCard } from '@/components/problem/ProblemCard'
import { ProblemCardSkeleton } from '@/components/problem/ProblemCardSkeleton'
import { useProblems } from '@/hooks/useProblems'

export function ProblemListPage() {
  const { data: problems = [], isLoading } = useProblems()

  return (
    <ScreenLayout>
      <TopBar title="Muammolar" />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-2.5">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <ProblemCardSkeleton key={i} />)
            : problems.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </div>
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
