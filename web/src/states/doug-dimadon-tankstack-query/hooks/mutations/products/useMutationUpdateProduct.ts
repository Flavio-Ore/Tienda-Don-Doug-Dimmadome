import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import {
  updateProducto
} from '@doug-dimadon/productos/updateProducto'
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
