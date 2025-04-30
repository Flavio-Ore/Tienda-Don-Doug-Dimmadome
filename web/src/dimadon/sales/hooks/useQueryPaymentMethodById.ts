import { getAllTipoPagos } from '@/dimadon/sales/services/tipo-pagos'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { enabledId } from '@/dimadon/states/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export function useQueryPaymentMethodById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PAYMENT_METHOD_BY_ID, id],
    queryFn: async () =>
      getAllTipoPagos().then(res => res.data.find(p => p.idTipoPago === id)),
    enabled: enabledId(id)
  })
}