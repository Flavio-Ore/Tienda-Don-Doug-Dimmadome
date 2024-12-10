import axios from '@/lib/axios'
import { formatSerialNumber } from '@/lib/utils'
import { ENDPOINTS } from '@/services/doug-dimadon/values/endpoints'
import { IBoletaVenta, IProducto, IUnidadMedida } from '@/types'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { EditProductFormSchema } from '@/validations/forms/editProduct.schema'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { saveDetalleEntrada, saveEntrada } from '@doug-dimadon/entradas'
import {
  getAllDetalleSalidas,
  getAllSalidas,
  saveDetalleSalida,
  saveSalida
} from '@doug-dimadon/salidas'
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

export const getALlVentas = async () => {
  const salidaRes = await getAllSalidas()
  const detalleSalidasRes = await getAllDetalleSalidas()

  const salidas = salidaRes.data
  const detalleSalidas = detalleSalidasRes.data

  const ventas: IBoletaVenta[] = salidas
    .filter(s => detalleSalidas.some(ds => ds.salida.idSalida === s.idSalida))
    .map(s => ({
      numeroSerie: formatSerialNumber('B001', s.idSalida),
      cliente: s.cliente,
      items: detalleSalidas
        .filter(d => d.salida.idSalida === s.idSalida)
        .map(d => ({
          id: d.idDetalle,
          cantidad: d.cantidad,
          costoUnitario: d.costoUnitario,
          producto: d.producto,
          descripcion: d.descripcion
        })),
      tipoPago: s.tipoPago,
      fechaVenta: s.fechaSalida,
      costoTotal: s.costoTotal
    }))

  console.log({
    ventas
  })

  return {
    data: ventas
  }
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
  estado: 'activo' | 'inactivo'
}) => {
  return await axios.patch(ENDPOINTS.PATCH.PRODUCTO.UPDATE(idProducto), {
    estado
  })
}
