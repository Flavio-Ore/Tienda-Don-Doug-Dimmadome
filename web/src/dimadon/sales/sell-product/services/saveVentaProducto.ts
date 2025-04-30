import type { SellProductFormSchema } from '@/dimadon/sales/sell-product/schemas/sellProduct.schema'
import {
  saveDetalleSalida,
  saveSalida
} from '@/dimadon/services/movimientos/salidas'
import type { z } from 'zod'

export const saveVentaProducto = async (
  venta: z.infer<typeof SellProductFormSchema>
) => {
  console.log({ venta })
  const { data } = await saveSalida({
    cliente: {
      idCliente: venta.cliente.idCliente
    },
    tipoPago: {
      idTipoPago: venta.tipoPago.idTipoPago
    },
    costoTotal: venta.costoTotal
  })
  console.log({ data })
  if (data.idSalida != null) {
    await saveDetalleSalida({
      detallesSalida: venta.productos.map(p => ({
        cantidad: p.cantidad,
        costoUnitario: p.costoUnitario,
        producto: {
          idProducto: p.idProducto
        }
      })),
      salida: {
        idSalida: data.idSalida
      },
      descripcion: venta.descripcion
    })
  } else {
    throw new Error('No se pudo guardar la salida')
  }
}
