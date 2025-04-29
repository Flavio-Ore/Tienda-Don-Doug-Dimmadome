import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ClientFormSchema } from '@/validations/forms/addClient.schema'
import type { z } from 'zod'

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CLIENTE.CREATE, cliente)
}