import { memo } from 'react'
import type { Problem } from '@/types/problem'
import { CATEGORY_CONFIG } from '@/constants/problem'

interface MapPinProps {
  problem: Problem
  showPulse?: boolean
}

const priorityToPinClass: Record<string, string> = {
  critical: 'bg-status-critical shadow-[0_4px_16px_rgba(255,77,106,0.4)]',
  high: 'bg-status-high shadow-[0_4px_16px_rgba(255,140,66,0.4)]',
  medium: 'bg-status-medium shadow-[0_4px_16px_rgba(255,209,102,0.3)]',
  low: 'bg-accent shadow-[0_4px_16px_rgba(79,142,247,0.3)]',
}

export const MapPin = memo(function MapPin({ problem, showPulse }: MapPinProps) {
  const config = CATEGORY_CONFIG[problem.category]
  const pinClass = priorityToPinClass[problem.priority] ?? priorityToPinClass.low

  return (
    <div className="flex flex-col items-center">
      {showPulse && (
        <span
          className="absolute h-[52px] w-[52px] animate-ping rounded-full border-2 border-status-critical opacity-80"
          style={{ animationDuration: '2s' }}
        />
      )}
      <div
        className={`
          flex h-9 w-9 rotate-[-45deg] items-center justify-center rounded-[50%_50%_50%_0] shadow-lg
          ${pinClass}
        `}
      >
        <span className="rotate-45 text-[15px]">{config.emoji}</span>
      </div>
      <div className="h-1 w-3 rounded-full bg-black/30" />
    </div>
  )
})
