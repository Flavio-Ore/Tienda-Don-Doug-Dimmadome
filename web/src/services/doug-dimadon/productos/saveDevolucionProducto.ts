import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import type { z } from 'zod'

export const saveDevolucionProducto = async (
  refund: z.infer<typeof ReturnProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.DEVOLUCION.CREATE, refund)
}
