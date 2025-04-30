import type { BuyProductSchema } from '@/dimadon/purchases/buy-product/schemas/buyProduct.schema'
import { saveDetalleEntrada, saveEntrada } from '@/dimadon/services/movimientos/entradas'
import type { z } from 'zod'

export const saveCompraProducto = async (
  compra: z.infer<typeof BuyProductSchema>
) => {
  console.log({
    compra
  })
  const { data } = await saveEntrada({
    usuario: {
      idUsuario: compra.usuario.idUsuario
    },
    proveedor: {
      id: compra.proveedor.id
    },
    total: compra.total
  })
  console.log({
    entrada: data
  })
  if (data.idEntrada != null) {
    await saveDetalleEntrada({
      detallesEntrada: compra.productos.map(p => ({
        cantidad: p.cantidad,
        costoUnitario: p.costoUnitario,
        producto: {
          idProducto: p.idProducto
        }
      })),
      entrada: {
        idEntrada: data.idEntrada
      },
      descripcion: compra.descripcion
    })
  }
}
