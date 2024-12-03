import axios from '@/lib/axios'
import { IUsuario } from '@/types'
import { SigninFormSchema } from '@/validations/forms/signIn.schema'
import { isAxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/endpoints'

export const authLogin = async (usuario: z.infer<typeof SigninFormSchema>) => {
  try {
    const response = await axios.post<{
      token: string
      usuario: IUsuario
    }>(ENDPOINTS.POST.AUTH.LOGIN, usuario)
    return {
      data: response.data,
      message: 'Inicio de sesión exitoso',
      status: response.status
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        data: error.response?.data ?? null,
        message: error.message || 'Error al iniciar sesión',
        status: error.status
      }
    }

    return {
      data: null,
      message: 'Error al iniciar sesión',
      status: 400
    }
  }
}

export const authRegister = async (
  usuario: z.infer<typeof SigninFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.AUTH.REGISTRO, usuario)
}
