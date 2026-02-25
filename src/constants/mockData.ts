import type { Problem } from '@/types/problem'

/** Supabase bo'sh bo'lganda ko'rsatiladigan demo muammolar */
export const MOCK_PROBLEMS: Problem[] = [
  {
    id: '1',
    user_id: 'mock-user',
    title: "34-maktab tomidan suv oqmoqda",
    description: '',
    category: 'school',
    priority: 'critical',
    status: 'in_progress',
    address: 'Yunusobod tumani',
    district: 'yunusobod',
    votes_count: 47,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 7200000).toISOString(),
    images: [],
    location: { lat: 41.3401, lng: 69.305 },
  },
  {
    id: '2',
    user_id: 'mock-user',
    title: "Amir Temur ko'chasida chuqur bor",
    description: '',
    category: 'road',
    priority: 'high',
    status: 'accepted',
    address: 'Shayxontohur tumani',
    district: 'shayxontohur',
    votes_count: 23,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    images: [],
    location: { lat: 41.3268, lng: 69.2457 },
  },
  {
    id: '3',
    user_id: 'mock-user',
    title: "Ko'cha chirog'i ishlamayapti",
    description: '',
    category: 'lighting',
    priority: 'medium',
    status: 'pending',
    address: 'Chilonzor tumani',
    district: 'chilonzor',
    votes_count: 15,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    images: [],
    location: { lat: 41.293, lng: 69.204 },
  },
]

/** Mock stats: jami 3, favqulodda 1, hal qilindi 0 */
export const MOCK_STATS = {
  total: 3,
  critical: 1,
  resolved: 0,
} as const
