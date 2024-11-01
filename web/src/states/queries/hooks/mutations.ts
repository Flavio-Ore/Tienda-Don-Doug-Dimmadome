import {
  saveClienteReniec,
  updateEstadoCliente
} from '@/services/doug-dimadon/clientes'
import {
  saveCompraProducto,
  saveProducto,
  saveVentaProducto,
  updateEstadoProducto
} from '@/services/doug-dimadon/productos'
import { saveProveedor } from '@/services/doug-dimadon/proveedores'
import {
  loginUsuario,
  saveUsuario,
  updateEstadoUsuario
} from '@/services/doug-dimadon/usuarios'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationSignin () {
  return useMutation({
    mutationFn: loginUsuario
  })
}

export function useMutationAddProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS]
      })
    }
  })
}

export function useMutationChangeProductState () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoProducto,
    onSuccess: () => {
      void queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS]
      })
    }
  })
}

export function useMutationBuyProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveCompraProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS]
      })
    }
  })
}

export function useMutationSellProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveVentaProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS]
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS]
      })
    }
  })
}

export function useMutationAddProvider () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProveedor,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS]
      })
    }
  })
}

export function useMutationAddClient () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveClienteReniec,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS]
      })
    }
  })
}

export function useMutationChangeClientState () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoCliente,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS]
      })
    }
  })
}

export function useMutationAddUser () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveUsuario,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS]
      })
    }
  })
}

export function useMutationChangeUserState () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateEstadoUsuario,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_USERS]
      })
    }
  })
}
