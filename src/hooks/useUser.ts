import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/constants/queryKeys'
import { userService } from '@/services/userService'
import { useTelegram } from './useTelegram'

export function useUser() {
  const { user: tgUser } = useTelegram()
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => userService.getOrCreate(tgUser),
    enabled: !!tgUser?.id,
  })
}
