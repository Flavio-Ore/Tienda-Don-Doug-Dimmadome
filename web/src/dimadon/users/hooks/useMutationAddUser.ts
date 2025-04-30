import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { saveUser } from '@/dimadon/users/services/saveUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveUser,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
      })
    }
  })
}