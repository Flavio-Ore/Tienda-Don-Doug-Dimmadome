import axios from '@/dimadon/lib/axios'
import type { AddProductFormSchema } from '@/dimadon/products/product-registration/schemas/addProduct.schema'
import type { z } from 'zod'

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  return await axios.post('/producto/insertar', producto)
}