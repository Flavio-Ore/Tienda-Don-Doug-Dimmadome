import axios from '@/lib/axios'
import type { SigninFormSchema } from '@/validations/forms/signIn.schema'
import type { z } from 'zod'

export const authRegister = async (
  usuario: z.infer<typeof SigninFormSchema>
) => {
  return await axios.post('/auth/registro', usuario)
}
