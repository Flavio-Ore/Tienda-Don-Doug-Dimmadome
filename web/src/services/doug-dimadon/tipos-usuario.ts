import axios from '@/lib/axios'
import { ITipoUsuario } from '@/types'
import { UserTypeSchema } from '@/validations/forms/addUserType.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'

export const saveTipoUsuario = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  return await axios.post(ENDPOINTS.POST.TIPO_USUARIO.CREATE, tipoPago)
}

export const getAllTipoUsuario = async () => {
  return await axios.get<ITipoUsuario[]>(ENDPOINTS.GET.TIPO_USUARIO.READ_ALL)
}
