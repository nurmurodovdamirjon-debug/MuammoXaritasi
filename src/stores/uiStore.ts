import { create } from 'zustand'

interface UIStore {
  filterCategory: string | null
  setFilterCategory: (c: string | null) => void
}

export const uiStore = create<UIStore>((set) => ({
  filterCategory: null,
  setFilterCategory: (filterCategory) => set({ filterCategory }),
}))
