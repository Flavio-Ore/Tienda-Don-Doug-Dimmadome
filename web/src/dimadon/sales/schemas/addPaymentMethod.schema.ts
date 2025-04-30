/**formulario tipoPago
{
"nombre": "yape"
}
 */

import { z } from 'zod'

export const PaymentMethodValidationSchema = z.object({
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre del tipo de pago debe tener al menos 2 caracteres'
    })
    .max(100, {
      message: 'El nombre del tipo de pago no puede tener más de 100 caracteres'
    })
})
