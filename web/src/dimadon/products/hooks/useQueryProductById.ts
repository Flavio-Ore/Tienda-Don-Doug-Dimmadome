import {
  getAllProducts
} from '@/dimadon/products/services/getAllProducts'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { enabledId } from '@/dimadon/states/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export function useQueryProductById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, id],
    queryFn: async () =>
      getAllProducts().then(res => res.data.find(p => p.idProducto === id)),
    enabled: enabledId(id)
  })
}