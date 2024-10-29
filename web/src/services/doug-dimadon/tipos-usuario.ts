import axios from '@/lib/axios'
import { ITipoUsuario } from '@/types'
import { UserTypeSchema } from '@/validations/forms/addUserType.schema'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'

export const saveTipoUsuario = async (
  tipoPago: z.infer<typeof UserTypeSchema>
) => {
  try {
    const { data } = await axios.post(
      ENDPOINTS.POST.TIPO_USUARIO.CREATE,
      tipoPago
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const getAllTipoUsuario = async () => {
  try {
    const { data } = await axios.get<ITipoUsuario[]>(
      ENDPOINTS.GET.TIPO_USUARIO.READ_ALL
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
