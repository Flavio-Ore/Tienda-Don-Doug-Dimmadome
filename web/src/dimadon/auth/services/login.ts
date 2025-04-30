import axios from '@/dimadon/lib/axios'
import type { SigninFormSchema } from '@/dimadon/schemas/signIn.schema'
import type { IUsuario } from '@/types'
import { isAxiosError } from 'axios'
import type { z } from 'zod'

export const login = async (usuario: z.infer<typeof SigninFormSchema>) => {
  try {
    const response = await axios.post<{
      token: string
      usuario: IUsuario
    }>('/auth/login', usuario)

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