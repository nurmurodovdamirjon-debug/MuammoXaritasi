/**
 * Joy nomi bo'yicha geocoding — OpenStreetMap Nominatim (bepul).
 * O'zbekiston hududida qidirish uchun bounded.
 */

import { UZBEKISTAN_BOUNDS } from '@/constants/problem'
import { logger } from '@/utils/logger'

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
const UA = 'MuammoXaritasi/1.0 (Telegram Mini App)'

export interface GeocodeResult {
  lat: number
  lng: number
  displayName: string
}

export async function geocode(query: string): Promise<GeocodeResult | null> {
  const q = query.trim()
  if (!q) return null
  try {
    const params = new URLSearchParams({
      q,
      format: 'json',
      limit: '1',
      countrycodes: 'uz',
      bounded: '1',
      viewbox: `${UZBEKISTAN_BOUNDS.west},${UZBEKISTAN_BOUNDS.south},${UZBEKISTAN_BOUNDS.east},${UZBEKISTAN_BOUNDS.north}`,
    })
    const res = await fetch(`${NOMINATIM_URL}?${params}`, {
      headers: { 'User-Agent': UA },
    })
    if (!res.ok) return null
    const data = (await res.json()) as Array<{ lat: string; lon: string; display_name?: string }>
    const first = data[0]
    if (!first) return null
    const lat = parseFloat(first.lat)
    const lng = parseFloat(first.lon)
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null
    return {
      lat,
      lng,
      displayName: first.display_name ?? query,
    }
  } catch (e) {
    logger.error('Geocoding error', e)
    return null
  }
}
