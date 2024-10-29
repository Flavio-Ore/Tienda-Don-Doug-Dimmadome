import { z } from 'zod'
/**formulario cliente
{
  "dni":"74928466",
  "direccion":"Av. canto grande"  
} */
export const ClientFormSchema = z.object({
  dni: z
    .string()
    .min(8, {
      message: 'El DNI del cliente debe tener 8 carácteres'
    })
    .max(9, {
      message: 'Máximo 9 carácteres'
    }),
  direccion: z.string().min(0).max(200, {
    message: 'La dirección del cliente no puede tener más de 200 carácteres'
  })
})
