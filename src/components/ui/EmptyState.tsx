import { memo } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState = memo(function EmptyState({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-12 text-center">
      <div className="mb-4 text-5xl opacity-80">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-text-primary">{title}</h3>
      {description && <p className="mb-6 text-sm leading-relaxed text-text-secondary">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  )
})
