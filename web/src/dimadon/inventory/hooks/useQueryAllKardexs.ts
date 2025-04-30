import { getAllKardexs } from '@/dimadon/inventory/services/kardexs'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllKardexs() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
    queryFn: getAllKardexs,
    select: response => response.data
  })
}