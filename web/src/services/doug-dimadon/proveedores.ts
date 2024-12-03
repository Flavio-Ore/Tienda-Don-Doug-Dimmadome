import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { IProveedor } from '@/types'
import { ProviderFormSchema } from '@/validations/forms/addProvider.schema'
import { z } from 'zod'

export const getAllProveedores = async () => {
  return await axios.get<IProveedor[]>(ENDPOINTS.GET.PROVEEDOR.READ_ALL)
}

export const saveProveedor = async (
  producto: z.infer<typeof ProviderFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PROVEEDOR.CREATE, producto)
}
