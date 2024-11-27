import axios from '@/lib/axios'
import { IUsuario } from '@/types'
import { UserFormSchema } from '@/validations/forms/addUser.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import Cookies from 'js-cookie'
import { z } from 'zod'
export const getAllUsuarios = async () => {
  return await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') ?? ''}`
    }
  })
}

export const saveUsuario = async (usuario: z.infer<typeof UserFormSchema>) => {
  return await axios.post<IUsuario>(ENDPOINTS.POST.USUARIO.CREATE, usuario)
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
