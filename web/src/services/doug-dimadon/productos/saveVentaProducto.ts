import {
  saveDetalleSalida,
  saveSalida
} from '@/services/doug-dimadon/movimientos/salidas'
import type { SellProductFormSchema } from '@/validations/sellProduct.schema'
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
