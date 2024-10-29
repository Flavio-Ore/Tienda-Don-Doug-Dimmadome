import axios from '@/lib/axios'
import { ICategoriaProducto } from '@/types'
import { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'

export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.CATEGORIA.CREATE, tipoPago)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const getAllCategorias = async () => {
  try {
    const { data } = await axios.get<ICategoriaProducto[]>(
      ENDPOINTS.GET.CATEGORIA.READ_ALL
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
