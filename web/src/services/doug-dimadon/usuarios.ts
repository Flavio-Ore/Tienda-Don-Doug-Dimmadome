import axios from '@/lib/axios'
import { ILoginResponse, IUsuario } from '@/types'
import { UserSchema } from '@/validations/forms/addUser.schema'
import { SigninSchema } from '@/validations/forms/signIn.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'
export const getAllUsuarios = async () => {
  return await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL)
}

export const saveUsuario = async (usuario: z.infer<typeof UserSchema>) => {
  return await axios.post<IUsuario>(ENDPOINTS.POST.USUARIO.CREATE, usuario)
}

export const loginUsuario = async (usuario: z.infer<typeof SigninSchema>) => {
  return await axios.post<ILoginResponse>(ENDPOINTS.POST.USUARIO.LOGIN, usuario)
}

export const updateEstadoUsuario = async ({
  idUsuario,
  estado
}: {
  idUsuario: number
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.put<IUsuario>(`usuarios/${idUsuario}/estado`, {
    idUsuario,
    estado
  })
}
