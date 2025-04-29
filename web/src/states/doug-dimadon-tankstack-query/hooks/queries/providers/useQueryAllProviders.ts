import { getAllProveedores } from '@/services/doug-dimadon/proveedores/getAllProveedores'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProviders() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProveedores,
    select: response => response.data
  })
}
