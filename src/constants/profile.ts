/**
 * Profile sahifa uchun konstantalar va mock ma'lumotlar.
 */

export const PROFILE_TITLE = 'Mening sahifam'

export const PROFILE_SINCE_PREFIX = "A'zo bo'lgan"

/** Daraja nomlari (1–5) */
export const LEVEL_NAMES: Record<number, string> = {
  1: 'Boshlovchi',
  2: 'Faol',
  3: 'Faol Fuqaro',
  4: 'Shahar Qahramoni',
  5: 'Top Fuqaro',
}

export const LEVEL_NEXT_PREFIX = 'Keyingi:'
export const XP_LEFT_SUFFIX = 'XP qoldi'

export const STAT_SENT = 'Yuborilgan'
export const STAT_RESOLVED = 'Hal qilindi'
export const STAT_VOTES = 'Ovozlar'

export const BADGES_SECTION_TITLE = 'Yutuqlar'
export const MY_PROBLEMS_TITLE = "Mening muammolarim"

/** Telegram user yo'q yoki API xatoligida ko'rsatiladigan xabar */
export const PROFILE_EMPTY_TITLE = "Ma'lumot topilmadi"
export const PROFILE_EMPTY_DESCRIPTION = "Telegram orqali kirish kerak yoki qayta urinib ko'ring"

/** Telegram user yo'q bo'lganda ko'rsatiladigan mock profil */
export const MOCK_USER = {
  first_name: 'Jasur',
  level: 3,
  xp: 680,
  xp_to_next: 1000,
  problems_count: 12,
  resolved_count: 8,
  votes_given: 94,
} as const

export const MOCK_SINCE = 'Mart 2025'
export const MOCK_USERNAME = 'demo_user'

/** Yutuqlar ro'yxati (badges) — ekranda ko'rsatish uchun */
export interface ProfileBadgeItem {
  id: string
  icon: string
  name_uz: string
  earned: boolean
}

export const PROFILE_BADGES: ProfileBadgeItem[] = [
  { id: 'first', icon: '🔍', name_uz: 'Birinchi Xabar', earned: true },
  { id: '5problems', icon: '🔥', name_uz: '5 Muammo', earned: true },
  { id: '10votes', icon: '⭐', name_uz: '10 Ovoz', earned: true },
  { id: '20problems', icon: '🏆', name_uz: '20 Muammo', earned: false },
  { id: 'top', icon: '👑', name_uz: 'Top Fuqaro', earned: false },
]
