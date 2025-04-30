import {
  saveCompraProducto
} from '@/dimadon/purchases/buy-product/services/saveCompraProducto'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
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