import axios from '@/lib/axios'
import type { IProducto } from '@/types'

export const getAllProductos = async () => {
  return await axios.get<IProducto[]>('/producto/obtener')
}
