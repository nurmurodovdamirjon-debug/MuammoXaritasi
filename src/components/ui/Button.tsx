import { type ButtonHTMLAttributes, forwardRef, memo } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-accent to-accent-2 text-white border-0 shadow-[0_8px_24px_rgba(79,142,247,0.35)] hover:opacity-95 active:scale-[0.97]',
  secondary:
    'bg-bg-surface border border-[var(--border)] text-text-primary hover:bg-bg-surface2 active:scale-[0.98]',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-surface active:scale-[0.98]',
  danger:
    'bg-[rgba(255,77,106,0.12)] border border-[rgba(255,77,106,0.18)] text-status-critical hover:opacity-90 active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-3 text-sm rounded-[var(--radius-sm)]',
  md: 'py-3 px-4 text-sm font-semibold rounded-[var(--radius-sm)]',
  lg: 'py-4 px-5 text-base font-bold rounded-[var(--radius-sm)]',
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = 'primary', size = 'md', fullWidth, loading, className = '', children, disabled, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2 transition-all duration-150
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          disabled:opacity-50 disabled:pointer-events-none
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </button>
    )
  })
)
