import {
  getAllUnidadesMedida
} from '@/services/doug-dimadon/productos/getAllUnidadesMedida'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUnitMeasurements() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_UNIT_MEASUREMENTS],
    queryFn: getAllUnidadesMedida,
    select: response => response.data
  })
}