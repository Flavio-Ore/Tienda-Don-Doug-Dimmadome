import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { saveUsuario } from '@doug-dimadon/usuarios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationAddUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveUsuario,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
      })
    }
  })
}