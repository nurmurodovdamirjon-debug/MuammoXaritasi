import { memo } from 'react'
import type { AIAnalysis } from '@/types/problem'
import { AGENCY_CONFIG } from '@/constants/problem'

interface AIAnalysisCardProps {
  analysis: AIAnalysis
  loading?: boolean
}

export const AIAnalysisCard = memo(function AIAnalysisCard({
  analysis,
  loading,
}: AIAnalysisCardProps) {
  const agency = AGENCY_CONFIG[analysis.agency]
  if (loading) {
    return (
      <div className="rounded-[var(--radius-sm)] border border-accent/20 bg-gradient-to-br from-accent/10 to-accent-2/10 p-3">
        <div className="mb-1 flex items-center gap-2">
          <span className="rounded-md bg-gradient-to-br from-accent to-accent-2 px-2 py-0.5 text-[10px] font-bold">
            🤖 AI TAHLIL
          </span>
        </div>
        <p className="text-xs text-text-secondary">Matn tahlil qilinmoqda...</p>
      </div>
    )
  }
  return (
    <div className="rounded-[var(--radius-sm)] border border-accent/20 bg-gradient-to-br from-accent/10 to-accent-2/10 p-3">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="rounded-md bg-gradient-to-br from-accent to-accent-2 px-2 py-0.5 text-[10px] font-bold tracking-wide">
          🤖 AI TAHLIL
        </span>
      </div>
      <p className="text-xs leading-relaxed text-text-secondary">
        Mas'ul idora: <strong>{agency.name_uz}</strong>
        <br />
        Taxminiy hal etish vaqti: <strong>{analysis.estimated_days}–{analysis.estimated_days + 2} ish kuni</strong>
        <br />
        Shunga o'xshash muammolar: <strong>{analysis.similar_count} ta</strong>
      </p>
    </div>
  )
})
