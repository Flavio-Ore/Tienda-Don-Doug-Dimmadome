import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type { EditProductFormSchema } from '@/validations/forms/editProduct.schema'
import type { z } from 'zod'

export const updateProducto = async ({
  idProducto,
  producto
}: {
  idProducto: number
  producto: z.infer<typeof EditProductFormSchema>
}) => {
  return await axios.put(ENDPOINTS.PUT.PRODUCTO.UPDATE(idProducto), producto)
}