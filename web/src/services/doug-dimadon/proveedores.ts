import axios from '@/lib/axios'
import { IProveedor } from '@/types'
import { ProviderFormSchema } from '@/validations/forms/addProvider.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'

export const getAllProveedores = async () => {
  return await axios.get<IProveedor[]>(ENDPOINTS.GET.PROVEEDOR.READ_ALL)
}

export const saveProveedor = async (
  producto: z.infer<typeof ProviderFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PROVEEDOR.CREATE, producto)
}
