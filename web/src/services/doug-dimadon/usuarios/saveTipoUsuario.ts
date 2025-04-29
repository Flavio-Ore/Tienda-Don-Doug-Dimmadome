import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { UserTypeSchema } from '@/validations/forms/addUserType.schema'
import type { z } from 'zod'

export const saveTipoUsuario = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  return await axios.post(ENDPOINTS.POST.TIPO_USUARIO.CREATE, tipoPago)
}