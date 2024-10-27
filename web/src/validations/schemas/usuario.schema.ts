import { z } from 'zod'
import { TipoUsuarioSchema } from './tipo-usuario.schema'

export const UsuarioSchema = z.object({
  id_usuario: z.number().int().positive(),
  nombre: z
    .string()
    .min(1, {
      message: 'El nombre del usuario no puede estar vacío'
    })
    .max(200, {
      message: 'El nombre del usuario no puede tener más de 100 caracteres'
    }),
  email: z.string().email({
    message: 'El email no es válido'
  }),
  password: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
    .max(255, {
      message: 'La contraseña no puede tener más de 255 caracteres'
    }),
  tipo_usuario: z.array(TipoUsuarioSchema),
  fecha_creacion: z.date({
    required_error: 'La fecha de creación es obligatoria'
  }),
  estado: z
    .enum(['activo', 'inactivo'], {
      message: 'El estado del usuario no es válido'
    })
    .default('activo')
})
