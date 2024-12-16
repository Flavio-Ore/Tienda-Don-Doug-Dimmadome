import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import type { ICategoriaProducto } from '@/types'
import type { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import type { z } from 'zod'

export const getAllCategorias = async () => {
  return await axios.get<ICategoriaProducto[]>(ENDPOINTS.GET.CATEGORIA.READ_ALL)
}
export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CATEGORIA.CREATE, tipoPago)
}
