import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ICategoriaProducto } from '@/types'

export const getAllCategorias = async () => {
  return await axios.get<ICategoriaProducto[]>(ENDPOINTS.GET.CATEGORIA.READ_ALL)
}