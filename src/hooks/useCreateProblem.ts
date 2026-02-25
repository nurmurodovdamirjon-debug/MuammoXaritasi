import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/constants/queryKeys'
import { problemService } from '@/services/problemService'
import type { ProblemFormValues } from '@/components/problem/ProblemForm'

export function useCreateProblem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: ProblemFormValues) => problemService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.problems })
    },
  })
}
