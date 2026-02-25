import type { AppUser } from '@/types/user'
import { supabase } from '@/lib/supabase'

type TelegramUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
} | null

export const userService = {
  async getOrCreate(tgUser: TelegramUser): Promise<AppUser> {
    if (!tgUser) throw new Error('Telegram user yo\'q')
    const { data: existing } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', tgUser.id)
      .single()
    if (existing) return existing as AppUser
    const { data: created, error } = await supabase
      .from('users')
      .insert({
        telegram_id: tgUser.id,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        avatar_url: tgUser.photo_url,
        level: 1,
        xp: 0,
        xp_to_next: 100,
        problems_count: 0,
        resolved_count: 0,
        votes_given: 0,
        badges: [],
        is_anonymous: false,
      })
      .select()
      .single()
    if (error) throw new Error(error.message)
    return created as AppUser
  },
}
