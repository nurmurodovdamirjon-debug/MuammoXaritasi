const STORAGE_KEYS = {
  ONBOARDING_DONE: 'onboarding_done',
  RECENT_SEARCHES: 'recent_searches',
} as const

export const storageService = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  },
  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore
    }
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  },
  keys: STORAGE_KEYS,
}
