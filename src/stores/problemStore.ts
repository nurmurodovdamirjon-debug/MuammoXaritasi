import { create } from 'zustand'

interface ProblemStore {
  selectedProblemId: string | null
  setSelectedProblemId: (id: string | null) => void
}

export const problemStore = create<ProblemStore>((set) => ({
  selectedProblemId: null,
  setSelectedProblemId: (id) => set({ selectedProblemId: id }),
}))
