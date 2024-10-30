import axios from '@/lib/axios'
import { ICategoriaProducto } from '@/types'
import { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'

export const getAllCategorias = async () => {
  return await axios.get<ICategoriaProducto[]>(ENDPOINTS.GET.CATEGORIA.READ_ALL)
}
export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CATEGORIA.CREATE, tipoPago)
}
