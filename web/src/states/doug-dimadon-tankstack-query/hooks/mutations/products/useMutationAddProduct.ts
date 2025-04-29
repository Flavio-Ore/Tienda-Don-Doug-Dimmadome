import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import {
  saveProducto
} from '@doug-dimadon/productos/saveProducto'
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