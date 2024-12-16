import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import type { ITipoUsuario } from '@/types'
import type { UserTypeSchema } from '@/validations/forms/addUserType.schema'
import type { z } from 'zod'

export const saveTipoUsuario = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  return await axios.post(ENDPOINTS.POST.TIPO_USUARIO.CREATE, tipoPago)
}

export const getAllTipoUsuario = async () => {
  return await axios.get<ITipoUsuario[]>(ENDPOINTS.GET.TIPO_USUARIO.READ_ALL)
}
