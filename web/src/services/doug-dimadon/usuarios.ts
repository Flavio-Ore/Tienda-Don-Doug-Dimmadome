import axios from '@/lib/axios'
import { ILoginResponse, IUsuario } from '@/types'
import { UserSchema } from '@/validations/forms/addUser.schema'
import { SigninSchema } from '@/validations/forms/signIn.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { AxiosError } from 'axios'
import { z } from 'zod'
export const getAllUsuarios = async () => {
  const { data } = await axios.get(ENDPOINTS.GET.USUARIO.READ_ALL)
  return data
}

export const saveUsuario = async (usuario: z.infer<typeof UserSchema>) => {
  const { data } = await axios.post<IUsuario>(
    ENDPOINTS.POST.USUARIO.CREATE,
    usuario
  )
  return data
}

export const loginUsuario = async (usuario: z.infer<typeof SigninSchema>) => {
  try {
    const { data } = await axios.post<ILoginResponse>(
      ENDPOINTS.POST.USUARIO.LOGIN,
      usuario
    )
    return data
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
