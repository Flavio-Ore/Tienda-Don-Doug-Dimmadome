import axios from '@/lib/axios'
import type { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import type { z } from 'zod'

export const saveDevolucionProducto = async (
  refund: z.infer<typeof ReturnProductFormSchema>
) => {
  return await axios.post('/devolucion/insertar', refund)
}
