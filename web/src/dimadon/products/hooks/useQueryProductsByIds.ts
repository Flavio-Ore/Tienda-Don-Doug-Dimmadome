import {
  getAllProducts
} from '@/dimadon/products/services/getAllProducts'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryProductsByIds({ ids }: { ids: string[] }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_IDS, ...ids],
    queryFn: async () =>
      getAllProducts().then(res =>
        res.data.filter(p => ids.includes(p.idProducto.toString()))
      ),
    enabled: ids.length > 0
  })
}
