import {
  updateEstadoProducto
} from '@/dimadon/products/services/updateEstadoProducto'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
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
