import axios from '@/lib/axios'
import { IProducto } from '@/types'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { AxiosError } from 'axios'
import { z } from 'zod'

export const getAllProductos = async () => {
  try {
    const { data } = await axios.get<IProducto[]>(ENDPOINTS.GET.PRODUCTO.READ_ALL)
    return data
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.PRODUCTO.CREATE, producto)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
