// import clientData from '@/mocks/clients.mock.json'
import { z } from 'zod'

export const SellProductFormSchema = z.object({
  idCliente: z.number().int().positive({
    message: 'El cliente no es válido'
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
  // productos: z.array(ProductsToSell, {
  //   message: 'Los productos no son válidos'
  // }),
  cantidad: z.number().nonnegative().min(1, {
    message: 'La cantidad debe ser mayor o igual a 1'
  }),
  // costo_unitario: z.number().nonnegative({
  //   message: 'El costo unitario no es válido'
  // }),
  idProducto: z.number().int().positive(),
  costo_total: z.number().nonnegative(),
  total: z.number().nonnegative()
})
