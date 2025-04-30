/**formulario tipo usuario
{
  "nombre": "Administrador"
} */

import { z } from 'zod'

export const UserTypeSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre del tipo de usuario debe tener al menos 2 caracteres'
    })
    .max(50, {
      message:
        'El nombre del tipo de usuario no puede tener más de 50 caracteres'
    })
})
