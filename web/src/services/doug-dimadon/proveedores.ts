import axios from '@/lib/axios'
import { IProveedor } from '@/types'
import { ProviderValidationSchema } from '@/validations/forms/addProvider.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { AxiosError } from 'axios'
import { z } from 'zod'

export const getAllProveedores = async () => {
  try {
    const { data } = await axios.get<IProveedor[]>(ENDPOINTS.GET.PROVEEDOR.READ_ALL)
    return data
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const saveProveedor = async (
  producto: z.infer<typeof ProviderValidationSchema>
) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.PROVEEDOR.CREATE, producto)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
    return null
  }
}
