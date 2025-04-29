import { QUERY_KEYS } from '@/states/doug-dimadon-tankstack-query/values/query-keys'
import { updateEstadoUsuario } from '@doug-dimadon/usuarios/updateEstadoUsuario'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationChangeUserState() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoUsuario,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
      })
    }
  })
}
