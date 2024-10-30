import { getAllCategorias } from '@/services/doug-dimadon/categoria'
import { getAllClientes } from '@/services/doug-dimadon/clientes'
import { getAllKardexs } from '@/services/doug-dimadon/kardexs'
import { getAllProductos } from '@/services/doug-dimadon/productos'
import { getAllProveedores } from '@/services/doug-dimadon/proveedores'
import { getAllTipoPagos } from '@/services/doug-dimadon/tipo-pagos'
import { getAllTipoUsuario } from '@/services/doug-dimadon/tipos-usuario'
import { getAllUsuarios } from '@/services/doug-dimadon/usuarios'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProducts () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProductos,
    select: response => response.data
  })
}

export function useQueryAllProductsCategories () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategorias,
    select: response => response.data
  })
}

export function useQueryAllUserTypes () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USER_TYPES],
    queryFn: getAllTipoUsuario,
    select: response => response.data
  })
}

export function useQueryAllPaymentMethods () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PAYMENT_METHODS],
    queryFn: getAllTipoPagos,
    select: response => response.data
  })
}

export function useQueryAllKardexs () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
    queryFn: getAllKardexs,
    select: response => response.data
  })
}

export function useQueryAllProviders () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProveedores,
    select: response => response.data
  })
}

export function useQueryAllClients () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
    queryFn: getAllClientes,
    select: response => response.data
  })
}

export function useQueryAllUsers () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: getAllUsuarios,
    select: response => response.data
  })
}
