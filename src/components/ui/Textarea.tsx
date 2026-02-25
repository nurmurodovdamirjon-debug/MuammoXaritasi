import { forwardRef, memo, type TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { label, error, className = '', ...props },
    ref
  ) {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full min-h-[90px] resize-none rounded-[var(--radius-sm)] border bg-bg-surface px-3 py-2.5
            text-sm leading-relaxed text-text-primary placeholder:text-text-tertiary
            focus:border-accent focus:outline-none
            ${error ? 'border-status-critical' : 'border-[var(--border)]'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-status-critical">{error}</p>}
      </div>
    )
  })
)
