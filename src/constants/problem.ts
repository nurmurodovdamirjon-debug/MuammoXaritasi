import type { Category, Priority, ProblemStatus, Agency, District } from '@/types/problem'

export const CATEGORY_CONFIG: Record<Category, {
  emoji: string
  label_uz: string
  agency: Agency
  color: string
}> = {
  school: { emoji: '🏫', label_uz: 'Maktab', agency: 'education', color: '#4F8EF7' },
  medical: { emoji: '🏥', label_uz: 'Tibbiyot', agency: 'health', color: '#06D6A0' },
  road: { emoji: '🛣️', label_uz: "Yo'l", agency: 'transport', color: '#FFD166' },
  lighting: { emoji: '💡', label_uz: "Yorug'lik", agency: 'utilities', color: '#FF8C42' },
  water: { emoji: '🌊', label_uz: 'Suv', agency: 'utilities', color: '#4ECDC4' },
  other: { emoji: '🌳', label_uz: 'Boshqa', agency: 'municipality', color: '#8892A4' },
}

export const PRIORITY_CONFIG: Record<Priority, {
  label_uz: string
  color: string
  bgColor: string
}> = {
  critical: { label_uz: 'FAVQ', color: '#FF4D6A', bgColor: 'rgba(255,77,106,0.15)' },
  high: { label_uz: 'MUHIM', color: '#FF8C42', bgColor: 'rgba(255,140,66,0.15)' },
  medium: { label_uz: "O'RTA", color: '#FFD166', bgColor: 'rgba(255,209,102,0.15)' },
  low: { label_uz: 'PAST', color: '#4F8EF7', bgColor: 'rgba(79,142,247,0.15)' },
}

export const STATUS_CONFIG: Record<ProblemStatus, {
  label_uz: string
  color: string
  icon: string
  step: number
}> = {
  pending: { label_uz: 'Kutilmoqda', color: '#8892A4', icon: '⏳', step: 0 },
  accepted: { label_uz: 'Qabul qilindi', color: '#4F8EF7', icon: '📥', step: 1 },
  in_progress: { label_uz: "Ko'rib chiqilmoqda", color: '#FFD166', icon: '🔄', step: 2 },
  resolved: { label_uz: 'Hal qilindi', color: '#06D6A0', icon: '✅', step: 3 },
  rejected: { label_uz: 'Rad etildi', color: '#FF4D6A', icon: '❌', step: -1 },
}

export const AGENCY_CONFIG: Record<Agency, { name_uz: string; icon: string }> = {
  education: { name_uz: "Ta'lim vazirligi", icon: '🎓' },
  health: { name_uz: "Sog'liqni saqlash vazirligi", icon: '🏥' },
  transport: { name_uz: 'Transport vazirligi', icon: '🚌' },
  utilities: { name_uz: 'Kommunal xizmatlar', icon: '⚡' },
  construction: { name_uz: 'Qurilish vazirligi', icon: '🏗️' },
  municipality: { name_uz: 'Shahar hokimligi', icon: '🏛️' },
}

export const DISTRICT_CONFIG: Record<District, {
  name_uz: string
  center: { lat: number; lng: number }
}> = {
  yunusobod: { name_uz: 'Yunusobod', center: { lat: 41.3401, lng: 69.305 } },
  chilonzor: { name_uz: 'Chilonzor', center: { lat: 41.293, lng: 69.204 } },
  mirzo_ulugbek: { name_uz: "Mirzo Ulug'bek", center: { lat: 41.3219, lng: 69.3514 } },
  shayxontohur: { name_uz: 'Shayxontohur', center: { lat: 41.3268, lng: 69.2457 } },
  uchtepa: { name_uz: 'Uchtepa', center: { lat: 41.2762, lng: 69.225 } },
  yakkasaroy: { name_uz: 'Yakkasaroy', center: { lat: 41.29, lng: 69.27 } },
  olmazar: { name_uz: 'Olmazar', center: { lat: 41.355, lng: 69.28 } },
  bektemir: { name_uz: 'Bektemir', center: { lat: 41.265, lng: 69.33 } },
}

export const XP_REWARDS = {
  create_problem: 50,
  problem_resolved: 100,
  vote_given: 5,
  first_problem: 100,
} as const

export const TOSHKENT_CENTER = { lat: 41.2995, lng: 69.2401 }
export const TOSHKENT_ZOOM = 11

/** O'zbekiston hududi (xarita chegarasi) — janubiy-g'arb va shimoliy-sharq burchaklar */
export const UZBEKISTAN_BOUNDS = {
  south: 36.67,
  north: 45.58,
  west: 56.0,
  east: 73.15,
} as const

/** Leaflet maxBounds: [[south, west], [north, east]] */
export const UZBEKISTAN_LEAFLET_BOUNDS: [[number, number], [number, number]] = [
  [UZBEKISTAN_BOUNDS.south, UZBEKISTAN_BOUNDS.west],
  [UZBEKISTAN_BOUNDS.north, UZBEKISTAN_BOUNDS.east],
]

/** O'zbekiston markazi (xarita default view) */
export const UZBEKISTAN_CENTER = { lat: 41.3, lng: 64.9 }
export const UZBEKISTAN_ZOOM = 5
