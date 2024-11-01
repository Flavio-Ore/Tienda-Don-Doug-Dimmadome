import axios from '@/lib/axios'
import { IProducto } from '@/types'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { saveDetalleEntrada, saveEntrada } from '@doug-dimadon/entradas'
import { saveDetalleSalida, saveSalida } from '@doug-dimadon/salidas'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'

export const getAllProductos = async () => {
  return await axios.get<IProducto[]>(ENDPOINTS.GET.PRODUCTO.READ_ALL)
}

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PRODUCTO.CREATE, producto)
}

export const saveCompraProducto = async (
  compra: z.infer<typeof BuyProductSchema>
) => {
  const { data } = await saveEntrada({
    usuario: {
      idUsuario: compra.idUsuario
    },
    proveedor: {
      id: compra.idProveedor
    },
    total: compra.total
  })
  console.log({
    entrada: data
  })
  if (data.idEntrada != null) {
    await saveDetalleEntrada({
      entrada: {
        idEntrada: data.idEntrada
      },
      producto: {
        idProducto: compra.producto.idProducto
      },
      nombreProducto: compra.producto.nombreProducto,
      cantidad: compra.cantidad,
      costoUnitario: compra.costoUnitario,
      subtotal: compra.total
    })
  }
}

export const saveVentaProducto = async (
  venta: z.infer<typeof SellProductFormSchema>
) => {
  const { data } = await saveSalida({
    cliente: {
      idCliente: venta.idCliente
    },
    tipoPago: {
      idTipoPago: venta.idTipoPago
    },
    costoTotal: venta.total
  })

  if (data.idSalida != null) {
    await saveDetalleSalida({
      salida: {
        idSalida: data.idSalida
      },
      producto: {
        idProducto: venta.idProducto
      },
      cantidad: venta.cantidad,
      costoUnitario: venta.precioUnitario,
      total: venta.total
    })
  }
}

export const updateEstadoProducto = async ({
  idProducto,
  estado
}: {
  idProducto: number
  estado: string
}) => {
  return await axios.put(`/producto/${idProducto}/estado`, {
    estado
  })
}
