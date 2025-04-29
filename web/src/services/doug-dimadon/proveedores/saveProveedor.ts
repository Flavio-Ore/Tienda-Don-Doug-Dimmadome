import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ProviderFormSchema } from '@/validations/forms/addProvider.schema'
import type { z } from 'zod'

export const saveProveedor = async (
  producto: z.infer<typeof ProviderFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PROVEEDOR.CREATE, producto)
}
