import { forwardRef, memo, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, error, leftIcon, className = '', ...props },
    ref
  ) {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={`
              w-full rounded-[var(--radius-sm)] border bg-bg-surface px-3 py-2.5 text-sm text-text-primary
              placeholder:text-text-tertiary
              focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
              disabled:opacity-50
              ${leftIcon ? 'pl-10' : ''}
              ${error ? 'border-status-critical' : 'border-[var(--border)]'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-status-critical">{error}</p>}
      </div>
    )
  })
)
