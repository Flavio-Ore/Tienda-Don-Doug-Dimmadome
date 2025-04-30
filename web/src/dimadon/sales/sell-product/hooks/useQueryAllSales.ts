import {
  getAllVentas
} from '@/dimadon/sales/sell-product/services/getAllVentas'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllSales() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_SALES],
    queryFn: getAllVentas,
    select: response => response.data
  })
}