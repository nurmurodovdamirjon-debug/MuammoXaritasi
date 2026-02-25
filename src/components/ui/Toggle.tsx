import { memo } from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  label?: string
}

export const Toggle = memo(function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: ToggleProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            if (!disabled) onChange(!checked)
          }
        }}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative h-6 w-11 shrink-0 rounded-full transition-colors
          ${checked ? 'bg-accent' : 'bg-bg-surface3'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition-all
            ${checked ? 'left-[22px]' : 'left-[3px]'}
          `}
        />
      </span>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
    </label>
  )
})
