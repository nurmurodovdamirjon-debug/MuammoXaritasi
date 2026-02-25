import { useParams } from 'react-router-dom'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProblemDetail } from '@/components/problem/ProblemDetail'
import { useProblemDetail } from '@/hooks/useProblemDetail'
import { ErrorState } from '@/components/ui/ErrorState'
import { useTelegram } from '@/hooks/useTelegram'

export function ProblemDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: problem, isLoading, error, refetch } = useProblemDetail(id)
  const { haptic } = useTelegram()

  if (error) {
    return (
      <ScreenLayout>
        <TopBar title="Muammo" showBack />
        <ErrorState onRetry={() => refetch()} />
      </ScreenLayout>
    )
  }

  if (isLoading || !problem) {
    return (
      <ScreenLayout>
        <TopBar title="Muammo" showBack />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        </div>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout>
      <TopBar title={`Muammo #${problem.id.slice(0, 6)}`} showBack />
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <ProblemDetail
          problem={problem}
          onVote={() => haptic.success()}
          onShare={() => haptic.light()}
        />
      </div>
      <BottomNav />
    </ScreenLayout>
  )
}
