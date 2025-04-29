import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import type { CategoryFormSchema } from '@/validations/forms/addCategory.schema'
import type { z } from 'zod'

export const saveCategoria = async (
  tipoPago: z.infer<typeof CategoryFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.CATEGORIA.CREATE, tipoPago)
}
