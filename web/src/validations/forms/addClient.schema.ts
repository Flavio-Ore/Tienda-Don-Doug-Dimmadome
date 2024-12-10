import { z } from 'zod'
/**formulario cliente
{
  "dni":"74928466",
  "direccion":"Av. canto grande"  
} */
export const ClientFormSchema = z.object({
  dni: z.string().regex(/^\d{8,9}$/, {
    message: 'El DNI del cliente debe ser números y tener entre 8 y 9 números'
  }),
  direccion: z.string().min(0).max(200, {
    message: 'La dirección del cliente no puede tener más de 200 carácteres'
  })
})
