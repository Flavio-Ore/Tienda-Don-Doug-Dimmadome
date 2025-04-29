import { saveDevolucionProducto } from '@/services/doug-dimadon/devoluciones'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationRefundProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveDevolucionProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_REFUNDS],
        type: 'all'
      })
    }
  })
}