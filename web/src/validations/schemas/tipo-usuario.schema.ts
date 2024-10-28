import { z } from 'zod'

export const TipoUsuarioSchema = z.object({
  id_tipo_usuario: z.number().int().positive(),
  nombre_tipo: z
    .string()
    .min(1, {
      message: 'El nombre del tipo de usuario no puede estar vacío'
    })
    .max(50, {
      message:
        'El nombre del tipo de usuario no puede tener más de 100 caracteres'
    })
})
