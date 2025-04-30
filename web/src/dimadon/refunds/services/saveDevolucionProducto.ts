import axios from '@/dimadon/lib/axios'
import type { ReturnProductFormSchema } from '@/dimadon/refunds/schemas/returnProduct.schema'
import type { z } from 'zod'

export const saveDevolucionProducto = async (
  refund: z.infer<typeof ReturnProductFormSchema>
) => {
  return await axios.post('/devolucion/insertar', refund)
}
