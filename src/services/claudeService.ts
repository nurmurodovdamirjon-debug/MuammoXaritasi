import type { AIAnalysis } from '@/types/problem'

const EDGE_URL = import.meta.env.VITE_SUPABASE_URL?.replace('.supabase.co', '.supabase.co/functions/v1') ?? ''
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const claudeService = {
  async analyzeProblem(description: string): Promise<AIAnalysis> {
    const res = await fetch(`${EDGE_URL}/analyze-problem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ description }),
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Tahlil xatosi')
    }
    const data = await res.json()
    return data as AIAnalysis
  },
}
