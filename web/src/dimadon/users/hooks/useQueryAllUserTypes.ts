import { QUERY_KEYS } from '@/dimadon/states/query-keys'
import { getAllUserTypes } from '@/dimadon/users/services/getAllUserTypes'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllUserTypes() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USER_TYPES],
    queryFn: getAllUserTypes,
    select: response => response.data
  })
}
