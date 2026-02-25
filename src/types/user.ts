export interface AppUser {
  id: string
  telegram_id: number
  username?: string
  first_name: string
  last_name?: string
  avatar_url?: string
  level: number
  xp: number
  xp_to_next: number
  problems_count: number
  resolved_count: number
  votes_given: number
  badges: Badge[]
  is_anonymous: boolean
  created_at: string
}

export interface Badge {
  id: string
  name_uz: string
  description_uz: string
  icon: string
  earned_at?: string
  requirement: number
}
