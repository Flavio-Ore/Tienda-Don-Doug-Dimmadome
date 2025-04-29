import { getAllClientes } from '@/services/doug-dimadon/clientes/getAllClientes'
import { enabledId } from '@/states/doug-dimadon-tankstack-query/utils/enabledId'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryClientById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, id],
    queryFn: async () =>
      getAllClientes().then(res => res.data.find(c => c.idCliente === id)),
    enabled: enabledId(id)
  })
}