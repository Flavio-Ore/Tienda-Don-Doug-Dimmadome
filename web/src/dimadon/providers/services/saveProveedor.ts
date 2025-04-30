import axios from '@/dimadon/lib/axios'
import type { ProviderFormSchema } from '@/dimadon/providers/schemas/addProvider.schema'
import type { z } from 'zod'

export const saveProveedor = async (
  producto: z.infer<typeof ProviderFormSchema>
) => {
  return await axios.post('/proveedor/insertar', producto)
}
