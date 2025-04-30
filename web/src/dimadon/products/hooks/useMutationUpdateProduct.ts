import {
  updateProducto
} from '@/dimadon/products/services/updateProducto'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
    }
  })
}
