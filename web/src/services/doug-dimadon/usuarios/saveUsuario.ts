import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { IUsuario } from '@/types'
import type { UserFormSchema } from '@/validations/forms/addUser.schema'
import type { z } from 'zod'

export const saveUsuario = async (usuario: z.infer<typeof UserFormSchema>) => {
  return await axios.post<IUsuario>(ENDPOINTS.POST.USUARIO.CREATE, usuario)
}
