import axios from '@/lib/axios'
import type { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import type { z } from 'zod'

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  return await axios.post('/producto/insertar', producto)
}