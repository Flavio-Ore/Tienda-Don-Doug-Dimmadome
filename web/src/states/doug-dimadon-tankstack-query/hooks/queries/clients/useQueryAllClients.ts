import { getAllClientes } from '@/services/doug-dimadon/clientes/getAllClientes'
import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllClients() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
    queryFn: getAllClientes,
    select: response => response.data
  })
}