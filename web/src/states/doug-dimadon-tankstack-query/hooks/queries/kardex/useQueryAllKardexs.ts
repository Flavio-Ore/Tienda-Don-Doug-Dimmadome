import { getAllKardexs } from '@/services/doug-dimadon/kardexs'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllKardexs() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
    queryFn: getAllKardexs,
    select: response => response.data
  })
}