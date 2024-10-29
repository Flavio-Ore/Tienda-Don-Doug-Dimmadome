import { saveProducto } from '@/services/doug-dimadon/productos'
import { saveProveedor } from '@/services/doug-dimadon/proveedores'
import { loginUsuario } from '@/services/doug-dimadon/usuarios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../values/query-keys'

export function useSignin () {
  return useMutation({
    mutationFn: loginUsuario
  })
}

export function useAddProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProducto,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS]
      })
    }
  })
}

export function useAddProvider () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProveedor,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS]
      })
    }
  })
}
