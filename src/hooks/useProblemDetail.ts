import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/constants/queryKeys'
import { problemService } from '@/services/problemService'

export function useProblemDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.problemDetail(id ?? ''),
    queryFn: () => problemService.getById(id!),
    enabled: !!id,
  })
}
