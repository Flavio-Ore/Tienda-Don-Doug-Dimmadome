import {
  getAllDevoluciones
} from '@/services/doug-dimadon/productos/getAllDevoluciones'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllRefunds() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_REFUNDS],
    queryFn: getAllDevoluciones,
    select: response => response.data
  })
}
