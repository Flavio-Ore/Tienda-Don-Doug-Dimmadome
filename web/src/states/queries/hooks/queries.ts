import { getAllCategorias } from '@/services/doug-dimadon/categoria'
import { getAllClientes } from '@/services/doug-dimadon/clientes'
import { getAllTipoDevoluciones } from '@/services/doug-dimadon/devoluciones'
import { getAllKardexs } from '@/services/doug-dimadon/kardexs'
import {
  getAllProductos,
  getAllUnidadesMedida,
  getALlVentas
} from '@/services/doug-dimadon/productos'
import { getAllProveedores } from '@/services/doug-dimadon/proveedores'
import { getAllTipoPagos } from '@/services/doug-dimadon/tipo-pagos'
import { getAllTipoUsuario } from '@/services/doug-dimadon/tipos-usuario'
import { getAllUsuarios, getUser } from '@/services/doug-dimadon/usuarios'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { useQuery } from '@tanstack/react-query'

const enabledId = (id: string | number) => {
  if (typeof id === 'number') {
    return id > 0
  }
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}

export function useQueryUser ({ id }: { id: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER, id],
    queryFn: async () => getUser(id),
    enabled: enabledId(id)
  })
}

export function useQueryAllSales () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_SALES],
    queryFn: getALlVentas,
    select: response => response.data
  })
}

export function useQueryAllProducts () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProductos,
    select: response => response.data
  })
}

export function useQueryProductsByIds ({ ids }: { ids: string[] }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCTS_BY_IDS, ...ids],
    queryFn: async () =>
      getAllProductos().then(res =>
        res.data.filter(p => ids.includes(p.idProducto.toString()))
      ),
    enabled: ids.length > 0
  })
}

export function useQueryProductById ({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, id],
    queryFn: async () =>
      getAllProductos().then(res => res.data.find(p => p.idProducto === id)),
    enabled: enabledId(id)
  })
}
export function useQueryAllProductsCategories () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategorias,
    select: response => response.data
  })
}

export function useQueryAllUnitMeasurements () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_UNIT_MEASUREMENTS],
    queryFn: getAllUnidadesMedida,
    select: response => response.data
  })
}

export function useQueryAllRefundTypes () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_RETURN_TYPES],
    queryFn: getAllTipoDevoluciones,
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

export function useQueryPaymentMethodById ({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PAYMENT_METHOD_BY_ID, id],
    queryFn: async () =>
      getAllTipoPagos().then(res => res.data.find(p => p.idTipoPago === id)),
    enabled: enabledId(id)
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

export function useQueryClientById ({ id }: { id: string | number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, id],
    queryFn: async () =>
      getAllClientes().then(res => res.data.find(c => c.idCliente === id)),
    enabled: enabledId(id)
  })
}

export function useQueryAllUsers () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: getAllUsuarios,
    select: response => response.data
  })
}
