import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { updateUserState } from '@/dimadon/users/services/updateUserState'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationChangeUserState() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserState,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
      })
    }
  })
}
