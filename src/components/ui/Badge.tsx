import { memo } from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'critical' | 'warning' | 'info' | 'success'
  className?: string
}

const variantClasses: Record<string, string> = {
  default: 'bg-bg-surface2 border border-[var(--border)] text-text-secondary',
  critical: 'bg-[rgba(255,77,106,0.15)] text-status-critical',
  warning: 'bg-[rgba(255,140,66,0.15)] text-status-high',
  info: 'bg-[rgba(255,209,102,0.15)] text-status-medium',
  success: 'bg-[rgba(6,214,160,0.15)] text-status-resolved',
}

export const Badge = memo(function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
})
