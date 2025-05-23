import { saveProveedor } from '@/dimadon/providers/services/saveProveedor'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationAddProvider() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProveedor,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
        type: 'all'
      })
    }
  })
}