import axios from '@/dimadon/lib/axios'
import type { UserTypeSchema } from '@/dimadon/users/schemas/addUserType.schema'
import type { z } from 'zod'

export const saveUserType = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  return await axios.post('/tipoUsuario', tipoPago)
}