// import clientData from '@/mocks/clients.mock.json'
import { z } from 'zod'

// const clientNames = clientData.map(client => client.data.nombre_completo)

const ProductsToSell = z.object({
  id_producto: z.number().int().positive(),
  cantidad: z.number().nonnegative().min(1, {
    message: 'La cantidad debe ser mayor o igual a 1'
  })
})

export const SellProductFormSchema = z.object({
  dni_cliente: z.number().int().positive().max(99999999, {
    message: 'El DNI no puede tener más de 8 dígitos'
  }),
  tipo_pago: z.enum(['Efectivo', 'Yape', 'Plin'], {
    message: 'El tipo de pago no es válido'
  }),
  // tipo_comprobante: z.enum(
  //   TYPE_RECEIPT_VALUES.filter(
  //     typeReceipt =>
  //       typeReceipt !== 'Nota de Crédito' && typeReceipt !== 'Nota de Débito'
  //   ) as ['Boleta', 'Factura'],
  //   {
  //     message: 'El tipo de comprobante no es válido'
  //   }
  // ),
  productos: z.array(ProductsToSell, {
    message: 'Los productos no son válidos'
  }),
  cantidad_total: z.number().nonnegative()
})
