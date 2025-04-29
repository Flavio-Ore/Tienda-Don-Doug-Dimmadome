import axios from '@/lib/axios'
import type { ProviderFormSchema } from '@/validations/forms/addProvider.schema'
import type { z } from 'zod'

export const saveProveedor = async (
  producto: z.infer<typeof ProviderFormSchema>
) => {
  return await axios.post('/proveedor/insertar', producto)
}
