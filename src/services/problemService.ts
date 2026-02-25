import type { Problem } from '@/types/problem'
import { supabase } from '@/lib/supabase'
import type { ProblemFormValues } from '@/components/problem/ProblemForm'

export const problemService = {
  async getList(filters?: { category?: string; status?: string }): Promise<Problem[]> {
    let q = supabase.from('problems').select('*').order('created_at', { ascending: false }).limit(50)
    if (filters?.category) q = q.eq('category', filters.category)
    if (filters?.status) q = q.eq('status', filters.status)
    const { data, error } = await q
    if (error) throw new Error(error.message)
    return (data ?? []) as Problem[]
  },

  async getById(id: string): Promise<Problem> {
    const { data, error } = await supabase.from('problems').select('*').eq('id', id).single()
    if (error) throw new Error(error.message)
    return data as Problem
  },

  async create(values: ProblemFormValues): Promise<Problem> {
    const { data, error } = await supabase
      .from('problems')
      .insert({
        title: values.description.slice(0, 100),
        description: values.description,
        category: values.category,
        priority: values.priority,
        district: values.district,
        address: values.address,
        location: values.location,
        status: 'pending',
        votes_count: 0,
        images: values.images ?? [],
      })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return data as Problem
  },
}
