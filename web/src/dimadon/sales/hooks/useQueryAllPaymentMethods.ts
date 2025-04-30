import { getAllTipoPagos } from '@/dimadon/sales/services/tipo-pagos'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllPaymentMethods() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PAYMENT_METHODS],
    queryFn: getAllTipoPagos,
    select: response => response.data
  })
}
