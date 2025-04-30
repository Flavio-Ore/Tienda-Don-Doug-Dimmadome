import {
  getAllDevoluciones
} from '@/dimadon/refunds/services/getAllDevoluciones'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllRefunds() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_REFUNDS],
    queryFn: getAllDevoluciones,
    select: response => response.data
  })
}
