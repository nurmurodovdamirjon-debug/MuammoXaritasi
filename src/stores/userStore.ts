import { create } from 'zustand'
import type { AppUser } from '@/types/user'

interface UserStore {
  user: AppUser | null
  setUser: (u: AppUser | null) => void
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
