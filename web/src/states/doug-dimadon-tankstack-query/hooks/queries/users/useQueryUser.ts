import { getUsuario } from '@/services/doug-dimadon/usuarios/getUsuario'
import { enabledId } from '@/states/doug-dimadon-tankstack-query/utils/enabledId'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryUser({ id }: { id: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER, id],
    queryFn: async () => getUsuario(id),
    enabled: enabledId(id)
  })
}