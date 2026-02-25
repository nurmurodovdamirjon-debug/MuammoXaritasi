import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/constants/queryKeys'
import { problemService } from '@/services/problemService'

export function useProblems(filters?: { category?: string; status?: string }) {
  return useQuery({
    queryKey: queryKeys.problemList(filters),
    queryFn: () => problemService.getList(filters),
  })
}
