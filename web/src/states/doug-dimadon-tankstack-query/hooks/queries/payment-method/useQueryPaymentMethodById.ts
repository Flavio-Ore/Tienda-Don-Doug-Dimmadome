import { getAllTipoPagos } from '@/services/doug-dimadon/tipo-pagos'
import { enabledId } from '@/states/doug-dimadon-tankstack-query/utils/enabledId'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryPaymentMethodById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PAYMENT_METHOD_BY_ID, id],
    queryFn: async () =>
      getAllTipoPagos().then(res => res.data.find(p => p.idTipoPago === id)),
    enabled: enabledId(id)
  })
}