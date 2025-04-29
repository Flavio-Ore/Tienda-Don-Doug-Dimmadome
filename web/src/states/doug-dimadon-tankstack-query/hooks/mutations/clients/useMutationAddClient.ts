import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { saveClienteReniec } from '@doug-dimadon/clientes/saveClienteReniec'
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