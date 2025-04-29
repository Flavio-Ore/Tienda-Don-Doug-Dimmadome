import {
  getAllVentas
} from '@/services/doug-dimadon/productos/getAllVentas'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllSales() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_SALES],
    queryFn: getAllVentas,
    select: response => response.data
  })
}