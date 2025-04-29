import { getAllTipoUsuario } from '@/services/doug-dimadon/usuarios/getAllTipoUsuario'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUserTypes() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USER_TYPES],
    queryFn: getAllTipoUsuario,
    select: response => response.data
  })
}
