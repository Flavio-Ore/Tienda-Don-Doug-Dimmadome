import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import {
  saveVentaProducto
} from '@doug-dimadon/productos/saveVentaProducto'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationSellProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveVentaProducto,
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
        queryKey: [QUERY_KEYS.GET_ALL_SALES],
        type: 'all'
      })
    }
  })
}