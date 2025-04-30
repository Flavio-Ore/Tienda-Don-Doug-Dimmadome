import type { ClientFormSchema } from '@/dimadon/clients/schemas/addClient.schema'
import axios from '@/dimadon/lib/axios'
import type { z } from 'zod'

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post('/cliente/insertar', cliente)
}