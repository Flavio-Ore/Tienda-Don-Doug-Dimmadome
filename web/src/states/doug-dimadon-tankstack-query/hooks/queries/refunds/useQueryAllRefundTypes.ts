import {
  getAllTipoDevoluciones
} from '@/services/doug-dimadon/productos/getAllTipoDevoluciones'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllRefundTypes() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_RETURN_TYPES],
    queryFn: getAllTipoDevoluciones,
    select: response => response.data
  })
}