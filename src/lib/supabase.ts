import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const hasEnv = supabaseUrl && supabaseKey && !supabaseUrl.includes('xxxxx')

function createSupabaseClient(): SupabaseClient {
  const url = supabaseUrl || 'https://placeholder.supabase.co'
  const key = supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
  return createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  })
}

export const supabase = createSupabaseClient()
export const isSupabaseConfigured = hasEnv
