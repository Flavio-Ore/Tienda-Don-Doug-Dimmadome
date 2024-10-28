import { z } from 'zod'

export const CategoriaSchema = z.object({
  id_categoria: z.number().int().positive(),
  nombre_categoria: z
    .string()
    .min(1, {
      message: 'El nombre de la categoría no puede estar vacío'
    })
    .max(50, {
      message: 'El nombre de la categoría no puede tener más de 50 caracteres'
    })
})
