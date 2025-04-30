import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { getAllUsers } from '@/dimadon/users/services/getAllUsers'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUsers() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: getAllUsers,
    select: response => response.data
  })
}