import axios from '@/dimadon/lib/axios'
import type { UserFormSchema } from '@/dimadon/users/schemas/addUser.schema'
import type { IUsuario } from '@/types'
import type { z } from 'zod'

export const saveUser = async (usuario: z.infer<typeof UserFormSchema>) => {
  return await axios.post<IUsuario>('/usuarios/insertar', usuario)
}
