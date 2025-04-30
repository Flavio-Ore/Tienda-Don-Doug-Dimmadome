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
  cliente: z.object(
    {
      idCliente: z
        .number({
          required_error: 'El cliente es obligatorio'
        })
        .int()
        .positive({
          message: 'El cliente es obligatorio'
        })
    },
    {
      message: 'El cliente es obligatorio',
      required_error: 'El cliente es obligatorio'
    }
  ),
  tipoPago: z.object(
    {
      idTipoPago: z
        .number({
          required_error: 'El tipo de pago es obligatorio'
        })
        .int()
        .positive({
          message: 'El tipo de pago es obligatorio'
        })
    },
    {
      message: 'El tipo de pago es obligatorio',
      required_error: 'El tipo de pago es obligatorio'
    }
  ),
  costoTotal: z
    .number({
      required_error: 'El costo total no puede ser 0'
    })
    .positive({
      message: 'El costo total no puede ser 0'
    })
})
