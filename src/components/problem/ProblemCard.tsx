import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Problem } from '@/types/problem'
import { CATEGORY_CONFIG, PRIORITY_CONFIG } from '@/constants/problem'
import { formatDate, formatCount } from '@/utils/date'
import { ROUTES } from '@/constants/routes'
import { useTelegram } from '@/hooks/useTelegram'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ProblemCardProps {
  problem: Problem
}

const priorityVariant: Record<string, 'critical' | 'warning' | 'info' | 'success'> = {
  critical: 'critical',
  high: 'warning',
  medium: 'info',
  low: 'info',
  resolved: 'success',
}

export const ProblemCard = memo(function ProblemCard({ problem }: ProblemCardProps) {
  const navigate = useNavigate()
  const { haptic } = useTelegram()
  const categoryConfig = CATEGORY_CONFIG[problem.category]
  const priorityConfig = PRIORITY_CONFIG[problem.priority]
  const variant = problem.status === 'resolved' ? 'success' : (priorityVariant[problem.priority] ?? 'info')

  const handleClick = () => {
    haptic.light()
    navigate(ROUTES.PROBLEM_DETAIL.replace(':id', problem.id))
  }

  return (
    <Card
      padding="md"
      className="relative cursor-pointer overflow-hidden border-l-4 transition-transform active:scale-[0.98]"
      style={{ borderLeftColor: priorityConfig.color }}
      onClick={handleClick}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <Badge variant={variant}>
          {categoryConfig.emoji} {priorityConfig.label_uz}
        </Badge>
        <span className="flex items-center gap-1 text-xs font-semibold text-text-secondary">
          👍 {formatCount(problem.votes_count)}
        </span>
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug">{problem.title}</h3>
      <div className="flex flex-wrap gap-3 text-xs text-text-tertiary">
        <span>📍 {categoryConfig.label_uz}</span>
        <span>🕐 {formatDate(problem.created_at)}</span>
      </div>
    </Card>
  )
})
