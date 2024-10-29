/**formulario usuario
{
  "nombre": "Flavio Ore",
  "email": "flavioore@gmail.com",
  "contrasena": "flavioore",
  "tipoUsuario": {
    "idTipoUsuario": 1
  }
} */
import { z } from 'zod'

export const UserSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre del tipo de usuario debe tener al menos 2 caracteres'
    })
    .max(200, {
      message:
        'El nombre del tipo de usuario no puede tener más de 200 caracteres'
    }),
  email: z
    .string()
    .email({
      message: 'El email no es válido'
    })
    .max(100, {
      message: 'El email no puede tener más de 100 caracteres'
    }),
  contrasena: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
    .max(255, {
      message: 'La contraseña no puede tener más de 255 caracteres'
    }),
  tipoUsuario: z.object(
    {
      idTipoUsuario: z.number().nonnegative({
        message: 'El tipo de usuario es obligatorio'
      }),
      nombre: z.string({
        message: 'El tipo de usuario es obligatorio'
      })
    },
    {
      message: 'El tipo de usuario es obligatorio'
    }
  )
})
