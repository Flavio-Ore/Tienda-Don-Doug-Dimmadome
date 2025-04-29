import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import type { z } from 'zod'

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PRODUCTO.CREATE, producto)
}