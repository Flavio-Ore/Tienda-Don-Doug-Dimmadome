import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { getAllUsuarios } from '@doug-dimadon/usuarios/getAllUsuarios'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: getAllUsuarios,
    select: response => response.data
  })
}