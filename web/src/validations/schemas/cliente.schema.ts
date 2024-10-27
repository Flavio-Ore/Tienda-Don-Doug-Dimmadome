import { z } from 'zod'

export const ClienteSchema = z.object({
  id_cliente: z.number().int().positive(),
  numero_documento: z.string().length(9, {
    message: 'El DNI del cliente debe tener 9 caracteres'
  }),
  nombre_cliente: z
    .string()
    .min(1, {
      message: 'El nombre del cliente no puede estar vacío'
    })
    .max(200, {
      message: 'El nombre del cliente no puede tener más de 200 caracteres'
    }),
  direccion: z
    .string()
    .min(1, {
      message: 'La dirección del cliente no puede estar vacía'
    })
    .max(200, {
      message: 'La dirección del cliente no puede tener más de 200 caracteres'
    }),
  fecha_registro: z.date({
    required_error: 'La fecha de registro es obligatoria'
  }),
  estado: z
    .enum(['activo', 'inactivo'], {
      message: 'El estado del cliente no es válido'
    })
    .default('activo')
})
