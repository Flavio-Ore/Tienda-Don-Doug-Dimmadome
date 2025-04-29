import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { SigninFormSchema } from '@/validations/forms/signIn.schema'
import type { z } from 'zod'

export const authRegister = async (
  usuario: z.infer<typeof SigninFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.AUTH.REGISTRO, usuario)
}
