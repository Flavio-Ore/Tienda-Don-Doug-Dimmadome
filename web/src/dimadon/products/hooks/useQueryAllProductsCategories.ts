import { getAllCategorias } from '@/dimadon/products/services/getAllCategorias'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProductsCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategorias,
    select: response => response.data
  })
}