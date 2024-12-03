import axios from '@/lib/axios'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { IProducto, IUnidadMedida } from '@/types'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { EditProductFormSchema } from '@/validations/forms/editProduct.schema'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { saveDetalleEntrada, saveEntrada } from '@doug-dimadon/entradas'
import { saveDetalleSalida, saveSalida } from '@doug-dimadon/salidas'
import { z } from 'zod'

export const getAllProductos = async () => {
  return await axios.get<IProducto[]>(ENDPOINTS.GET.PRODUCTO.READ_ALL)
}

export const getAllUnidadesMedida = async () => {
  return await axios.get<IUnidadMedida[]>(ENDPOINTS.GET.UNIDAD_MEDIDA.READ_ALL)
}

export const saveProducto = async (
  producto: z.infer<typeof AddProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.PRODUCTO.CREATE, producto)
}

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

export const updateProducto = async ({
  idProducto,
  producto
}: {
  idProducto: number
  producto: z.infer<typeof EditProductFormSchema>
}) => {
  return await axios.put(ENDPOINTS.PUT.PRODUCTO.UPDATE(idProducto), producto)
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
