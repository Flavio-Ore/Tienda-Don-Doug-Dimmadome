import {
  getAllTipoDevoluciones
} from '@/dimadon/refunds/services/getAllTipoDevoluciones'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllRefundTypes() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_RETURN_TYPES],
    queryFn: getAllTipoDevoluciones,
    select: response => response.data
  })
}