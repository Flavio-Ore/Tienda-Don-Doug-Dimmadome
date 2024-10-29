import { getAllKardexs } from '@/services/doug-dimadon/kardex'
import { getAllProductos } from '@/services/doug-dimadon/productos'
import { getAllProveedores } from '@/services/doug-dimadon/proveedores'
import { QUERY_KEYS } from '@/states/queries/values/query-keys'
import { useQuery } from '@tanstack/react-query'

export function useQueryAllProducts () {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProductos
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
