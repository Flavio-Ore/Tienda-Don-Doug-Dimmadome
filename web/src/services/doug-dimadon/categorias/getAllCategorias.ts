import axios from '@/lib/axios'
import type { ICategoriaProducto } from '@/types'

export const getAllCategorias = async () => {
  return await axios.get<ICategoriaProducto[]>('/categoria/obtener')
}