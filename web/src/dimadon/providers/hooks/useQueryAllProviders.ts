import { getAllProveedores } from '@/dimadon/providers/services/getAllProveedores'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProviders() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProveedores,
    select: response => response.data
  })
}
