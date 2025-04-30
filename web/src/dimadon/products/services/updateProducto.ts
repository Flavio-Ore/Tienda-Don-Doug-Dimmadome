import axios from '@/dimadon/lib/axios'
import type { EditProductFormSchema } from '@/dimadon/products/schemas/editProduct.schema'
import type { z } from 'zod'

export const updateProducto = async ({
  idProducto,
  producto
}: {
  idProducto: number
  producto: z.infer<typeof EditProductFormSchema>
}) => {
  return await axios.put(`/producto/${idProducto}`, producto)
}