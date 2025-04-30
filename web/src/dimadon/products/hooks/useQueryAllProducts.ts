import {
  getAllProducts
} from '@/dimadon/products/services/getAllProducts'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProducts,
    select: response => response.data
  })
}