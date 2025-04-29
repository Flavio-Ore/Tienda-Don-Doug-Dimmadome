import {
  getAllProductos
} from '@/services/doug-dimadon/productos/getAllProductos'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProductos,
    select: response => response.data
  })
}