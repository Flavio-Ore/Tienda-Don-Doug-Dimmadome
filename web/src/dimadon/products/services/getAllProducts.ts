import axios from '@/dimadon/lib/axios'
import type { IProducto } from '@/types'

export const getAllProducts = async () => {
  return await axios.get<IProducto[]>('/producto/obtener')
}
