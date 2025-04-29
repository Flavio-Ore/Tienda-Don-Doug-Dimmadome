import { getAllCategorias } from '@/services/doug-dimadon/categorias/getAllCategorias'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProductsCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategorias,
    select: response => response.data
  })
}