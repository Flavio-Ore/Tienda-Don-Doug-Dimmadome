import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { ICategoriaProducto } from '@/types'
import { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import Cookies from 'js-cookie'
import { z } from 'zod'

export const getAllCategorias = async () => {
  return await axios.get<ICategoriaProducto[]>(ENDPOINTS.GET.CATEGORIA.READ_ALL)
}
export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CATEGORIA.CREATE, tipoPago, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') ?? ''}`
    }
  })
}
