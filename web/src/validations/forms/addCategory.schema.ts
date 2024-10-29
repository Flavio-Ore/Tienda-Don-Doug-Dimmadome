import { z } from 'zod'
/**
 * formulario categoria
{
  "nombre":"Lacteos"
}
 */
export const CategoryFormSchema = z.object({
  nombre: z
    .string()
    .min(3, {
      message: 'El nombre de la categoria debe tener al menos 3 carácteres'
    })
    .max(50, {
      message: 'Máximo 50 carácteres'
    })
})
