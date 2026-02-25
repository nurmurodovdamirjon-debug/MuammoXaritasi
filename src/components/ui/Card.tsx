import { memo, type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md'
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
}

export const Card = memo(function Card({
  children,
  padding = 'md',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        rounded-[var(--radius-md)] border border-[var(--border)] bg-bg-surface
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
})
