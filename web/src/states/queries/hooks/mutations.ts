import { saveToLocalStorage } from '@/lib/local-storage'
import { authLogin } from '@/services/doug-dimadon/auth'
import { saveDevolucionProducto } from '@/services/doug-dimadon/devoluciones'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { IUsuario } from '@/types'
import { saveClienteReniec, updateEstadoCliente } from '@doug-dimadon/clientes'
import {
  saveCompraProducto,
  saveProducto,
  saveVentaProducto,
  updateEstadoProducto,
  updateProducto
} from '@doug-dimadon/productos'
import { saveProveedor } from '@doug-dimadon/proveedores'
import { saveUsuario, updateEstadoUsuario } from '@doug-dimadon/usuarios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useMutationSignin () {
  return useMutation({
    mutationFn: authLogin,
    onSuccess: res => {
      console.log({ res })
      if (res?.data?.usuario?.idUsuario != null) {
        saveToLocalStorage<IUsuario>('CURRENT_USER', res.data.usuario)
      }
    }
  })
}

export function useMutationAddProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
    }
  })
}

export function useMutationUpdateProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
        type: 'all'
      })
    }
  })
}

export function useMutationRefundProduct () {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: saveDevolucionProducto,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
        type: 'all'
      })
      void queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
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
        queryKey: [QUERY_KEYS.GET_ALL_USERS],
        type: 'all'
      })
    }
  })
}
