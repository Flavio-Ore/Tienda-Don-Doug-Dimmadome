import { getAllCategorias } from '@/services/doug-dimadon/categoria'
import { getAllClientes } from '@/services/doug-dimadon/clientes'
import { getAllKardexs } from '@/services/doug-dimadon/kardex'
import { getAllProductos } from '@/services/doug-dimadon/productos'
import { getAllProveedores } from '@/services/doug-dimadon/proveedores'
import { getAllTipoPagos } from '@/services/doug-dimadon/tipo-pagos'
import { getAllTipoUsuario } from '@/services/doug-dimadon/tipos-usuario'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProducts () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProductos
  })
}

export function useQueryAllProductsCategories () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategorias
  })
}

export function useQueryAllUserTypes () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USER_TYPES],
    queryFn: getAllTipoUsuario
  })
}

export function useQueryAllPaymentMethods () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PAYMENT_METHODS],
    queryFn: getAllTipoPagos
  })
}

export function useQueryAllKardexs () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_KARDEXS],
    queryFn: getAllKardexs
  })
}

export function useQueryAllProviders () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROVIDERS],
    queryFn: getAllProveedores
  })
}

export function useQueryAllClients () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CLIENTS],
    queryFn: getAllClientes
  })
}
