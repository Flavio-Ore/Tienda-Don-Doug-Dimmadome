import { saveClienteReniec } from '@/dimadon/clients/services/saveClienteReniec'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationAddClient() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveClienteReniec,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
        type: 'all'
      })
    }
  })
}