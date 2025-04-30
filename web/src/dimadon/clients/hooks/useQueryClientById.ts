import { getAllClientes } from '@/dimadon/clients/services/getAllClientes'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { enabledId } from '@/dimadon/states/utils/enabledId'
import { useQuery } from '@tanstack/react-query'

export function useQueryClientById({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, id],
    queryFn: async () =>
      getAllClientes().then(res => res.data.find(c => c.idCliente === id)),
    enabled: enabledId(id)
  })
}