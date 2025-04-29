import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import {
  saveCompraProducto
} from '@doug-dimadon/productos/saveCompraProducto'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationBuyProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveCompraProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
        type: 'all'
      })
    }
  })
}