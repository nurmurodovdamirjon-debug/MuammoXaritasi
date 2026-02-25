import { memo } from 'react'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export const ProblemCardSkeleton = memo(function ProblemCardSkeleton() {
  return (
    <Card padding="md" className="overflow-hidden">
      <div className="mb-2 flex justify-between">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="h-4 w-10" />
      </div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-1 h-4 w-3/4" />
      <div className="flex gap-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>
    </Card>
  )
})
