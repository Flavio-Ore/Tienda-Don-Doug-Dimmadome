import { getAllClientes } from '@/dimadon/clients/services/getAllClientes'
import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllClients() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
    queryFn: getAllClientes,
    select: response => response.data
  })
}