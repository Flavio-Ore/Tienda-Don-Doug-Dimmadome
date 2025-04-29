import axios from '@/lib/axios'
import type { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import type { z } from 'zod'

export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  return await axios.post('/categoria/insertar', tipoPago)
}
