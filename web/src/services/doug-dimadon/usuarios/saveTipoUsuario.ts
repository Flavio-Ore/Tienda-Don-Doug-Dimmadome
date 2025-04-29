import axios from '@/lib/axios'
import type { UserTypeSchema } from '@/validations/forms/addUserType.schema'
import type { z } from 'zod'

export const saveTipoUsuario = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  return await axios.post('/tipoUsuario', tipoPago)
}