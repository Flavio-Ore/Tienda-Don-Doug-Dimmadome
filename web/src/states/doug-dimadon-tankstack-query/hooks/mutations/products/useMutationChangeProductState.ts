import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import {
  updateEstadoProducto
} from '@doug-dimadon/productos'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationChangeProductState() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoProducto,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
    }
  })
}
