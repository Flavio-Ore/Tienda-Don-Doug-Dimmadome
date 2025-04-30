import { saveDevolucionProducto } from '@/dimadon/refunds/services/saveDevolucionProducto'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
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