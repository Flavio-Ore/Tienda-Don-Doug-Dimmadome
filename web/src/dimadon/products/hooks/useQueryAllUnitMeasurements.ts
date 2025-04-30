import {
  getAllUnidadesMedida
} from '@/dimadon/products/services/getAllUnidadesMedida'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUnitMeasurements() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_UNIT_MEASUREMENTS],
    queryFn: getAllUnidadesMedida,
    select: response => response.data
  })
}