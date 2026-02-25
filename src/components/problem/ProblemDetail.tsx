import { memo } from 'react'
import type { Problem } from '@/types/problem'
import { formatDate } from '@/utils/date'
import { AIAnalysisCard } from './AIAnalysisCard'
import { StatusTimeline } from './StatusTimeline'

interface ProblemDetailProps {
  problem: Problem
  onVote?: () => void
  onShare?: () => void
}

export const ProblemDetail = memo(function ProblemDetail({
  problem,
  onVote,
  onShare,
}: ProblemDetailProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-extrabold leading-tight">{problem.title}</h1>
      <div className="flex flex-wrap gap-4 text-xs text-text-tertiary">
        <span>📍 {problem.address}</span>
        <span>📅 {formatDate(problem.created_at)}</span>
        <span>👤 Anonim foydalanuvchi</span>
      </div>
      {problem.ai_analysis && <AIAnalysisCard analysis={problem.ai_analysis} />}
      <StatusTimeline status={problem.status} updatedAt={problem.updated_at} />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onVote}
          className="flex-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-bg-surface py-3 text-sm font-semibold active:scale-[0.98]"
        >
          👍 Tasdiqlash ({problem.votes_count})
        </button>
        <button
          type="button"
          onClick={onShare}
          className="flex-1 rounded-[var(--radius-sm)] bg-gradient-to-br from-accent to-accent-2 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(79,142,247,0.3)] active:scale-[0.98]"
        >
          📤 Ulashish
        </button>
      </div>
    </div>
  )
})
