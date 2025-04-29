import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { updateEstadoCliente } from '@doug-dimadon/clientes/updateEstadoCliente'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationChangeClientState() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
        type: 'all'
      })
    }
  })
}