import axios from '@/lib/axios'
import type { IUsuario } from '@/types'
import type { UserFormSchema } from '@/validations/forms/addUser.schema'
import type { z } from 'zod'

export const saveUsuario = async (usuario: z.infer<typeof UserFormSchema>) => {
  return await axios.post<IUsuario>('/usuarios/insertar', usuario)
}
