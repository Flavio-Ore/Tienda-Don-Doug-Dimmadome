import {
  getAllProductos
} from '@/services/doug-dimadon/productos/getAllProductos'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryProductsByIds({ ids }: { ids: string[] }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_IDS, ...ids],
    queryFn: async () =>
      getAllProductos().then(res =>
        res.data.filter(p => ids.includes(p.idProducto.toString()))
      ),
    enabled: ids.length > 0
  })
}
