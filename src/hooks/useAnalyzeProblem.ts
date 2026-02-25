import { useState, useCallback, useRef } from 'react'
import { claudeService } from '@/services/claudeService'
import type { AIAnalysis } from '@/types/problem'

const DEBOUNCE_MS = 1500

export function useAnalyzeProblem() {
  const [result, setResult] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const analyze = useCallback((description: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!description || description.trim().length < 20) {
      setResult(null)
      return
    }
    timerRef.current = setTimeout(async () => {
      setLoading(true)
      setResult(null)
      try {
        const analysis = await claudeService.analyzeProblem(description)
        setResult(analysis)
      } catch {
        setResult(null)
      } finally {
        setLoading(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setResult(null)
    setLoading(false)
  }, [])

  return { result, loading, analyze, reset }
}
