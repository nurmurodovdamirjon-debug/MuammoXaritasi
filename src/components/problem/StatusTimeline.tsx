import { memo } from 'react'
import type { ProblemStatus } from '@/types/problem'
import { STATUS_CONFIG } from '@/constants/problem'
import { formatDate } from '@/utils/date'

interface StatusTimelineProps {
  status: ProblemStatus
  updatedAt: string
}

const steps: ProblemStatus[] = ['accepted', 'in_progress', 'resolved']

export const StatusTimeline = memo(function StatusTimeline({
  status,
  updatedAt,
}: StatusTimelineProps) {
  const config = STATUS_CONFIG[status]
  const currentStep = config.step

  return (
    <div>
      <h3 className="mb-3 text-sm font-bold">📋 Jarayon holati</h3>
      <div className="space-y-2">
        {steps.map((s, i) => {
          const stepConfig = STATUS_CONFIG[s]
          const isDone = stepConfig.step >= 0 && stepConfig.step < currentStep
          const isActive = stepConfig.step === currentStep
          return (
            <div key={s} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px]
                    ${isDone ? 'bg-status-resolved text-black' : ''}
                    ${isActive ? 'bg-accent text-white shadow-[0_0_0_4px_rgba(79,142,247,0.2)]' : ''}
                    ${!isDone && !isActive ? 'bg-bg-surface3' : ''}
                  `}
                >
                  {isDone ? '✓' : isActive ? '●' : ''}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`my-0.5 h-4 min-h-4 w-0.5 flex-1 ${isDone ? 'bg-status-resolved' : 'bg-[var(--border)]'}`}
                  />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className={`text-[13px] font-semibold ${isActive ? 'text-accent' : 'text-text-tertiary'}`}>
                  {stepConfig.label_uz}
                </div>
                <div className="text-[11px] text-text-tertiary">
                  {isDone || isActive ? formatDate(updatedAt) : 'Kutilmoqda...'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
