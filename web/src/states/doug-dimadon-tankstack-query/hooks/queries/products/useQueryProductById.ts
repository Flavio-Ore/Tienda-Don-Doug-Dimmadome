import {
  getAllProductos
} from '@/services/doug-dimadon/productos/getAllProductos'
import { enabledId } from '@/states/doug-dimadon-tankstack-query/utils/enabledId'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryProductById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, id],
    queryFn: async () =>
      getAllProductos().then(res => res.data.find(p => p.idProducto === id)),
    enabled: enabledId(id)
  })
}