import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IProducto } from '@/types'

export const getAllProductos = async () => {
  return await axios.get<IProducto[]>(ENDPOINTS.GET.PRODUCTO.READ_ALL)
}
