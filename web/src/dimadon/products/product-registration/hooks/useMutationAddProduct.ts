import {
  saveProducto
} from '@/dimadon/products/product-registration/services/saveProducto'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationAddProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
    }
  })
}