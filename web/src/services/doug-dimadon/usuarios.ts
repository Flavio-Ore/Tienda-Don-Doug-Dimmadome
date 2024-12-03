import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { IUsuario } from '@/types'
import { UserFormSchema } from '@/validations/forms/addUser.schema'
import { z } from 'zod'

export const getUser = async (idUsuario: number) => {
  const res = await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL)
  const usuario = res.data.find(usuario => usuario.idUsuario === idUsuario)
  return usuario
}

export const getAllUsuarios = async () => {
  return await axios.get<IUsuario[]>(ENDPOINTS.GET.USUARIO.READ_ALL)
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
  return await axios.patch<IUsuario>(
    ENDPOINTS.PATCH.USUARIO.UPDATE(idUsuario),
    {
      estado
    }
  )
}
