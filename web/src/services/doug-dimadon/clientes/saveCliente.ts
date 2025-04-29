import axios from '@/lib/axios'
import type { ClientFormSchema } from '@/validations/forms/addClient.schema'
import type { z } from 'zod'

export const saveCliente = async (
  cliente: z.infer<typeof ClientFormSchema>
) => {
  return await axios.post('/cliente/insertar', cliente)
}