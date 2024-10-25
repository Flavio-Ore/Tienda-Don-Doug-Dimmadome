import { z } from 'zod'

export const ClientFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre del cliente debe tener al menos 2 carácteres'
    })
    .max(200, {
      message: 'El nombre del cliente no puede tener más de 200 carácteres'
    }),
  DNI: z.string().length(8, {
    message: 'El DNI del cliente debe tener 8 carácteres'
  }),
  address: z
    .string()
    .min(2, {
      message: 'La dirección del cliente debe tener al menos 2 carácteres'
    })
    .max(200, {
      message: 'La dirección del cliente no puede tener más de 200 carácteres'
    })
})
