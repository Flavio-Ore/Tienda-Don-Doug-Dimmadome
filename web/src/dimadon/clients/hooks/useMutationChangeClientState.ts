import { updateEstadoCliente } from '@/dimadon/clients/services/updateEstadoCliente'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
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