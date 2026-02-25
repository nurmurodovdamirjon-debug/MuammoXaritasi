import { useState } from 'react'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { TopBar } from '@/components/layout/TopBar'
import { useProblems } from '@/hooks/useProblems'
import { ProblemCard } from '@/components/problem/ProblemCard'
import { Input } from '@/components/ui/Input'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const { data: problems = [] } = useProblems()
  const filtered = query.trim()
    ? problems.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <ScreenLayout>
      <TopBar title="Qidiruv" showBack />
      <div className="border-b border-[var(--border)] px-4 py-3">
        <Input
          placeholder="Muammo qidiring..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<span>🔍</span>}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="flex flex-col gap-2.5">
          {filtered.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>
    </ScreenLayout>
  )
}
