/*
SALIDA FORM:
{
  "cliente": {
    "idCliente": 1
  },
  "tipoPago": {
    "idTipoPago": 1
  },
  "costoTotal": 30.0
}
*/
import { z } from 'zod'

export const SalidaSchema = z.object({
  cliente: z.object({
    idCliente: z.number().nonnegative({
      message: 'El cliente es obligatorio'
    })
  }),
  tipoPago: z.object({
    idTipoPago: z.number().nonnegative({
      message: 'El tipo de pago es obligatorio'
    })
  }),
  costoTotal: z.number().positive({
    message: 'El costo total no puede ser negativo'
  })
})
