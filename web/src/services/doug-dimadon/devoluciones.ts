import axios from '@/lib/axios'
import { formatSerialNumber } from '@/lib/utils'
import type {
  ICliente,
  IDevolucionV2,
  INotaDeCredito,
  IProveedor,
  ITipoDevolucion
} from '@/types'
import type { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import { ENDPOINTS } from '@doug-dimadon/values/endpoints'
import type { z } from 'zod'

export const getAllTipoDevoluciones = async () => {
  return await axios.get<ITipoDevolucion[]>(
    ENDPOINTS.GET.TIPO_DEVOLUCION.READ_ALL
  )
}

export const getAllDevoluciones = async () => {
  const devolucionesRes = await axios.get<IDevolucionV2[]>(
    ENDPOINTS.GET.DEVOLUCION.READ_ALL
  )
  const clientesRes = await axios.get<ICliente[]>(
    ENDPOINTS.GET.CLIENTE.READ_ALL
  )
  const proveedoresRes = await axios.get<IProveedor[]>(
    ENDPOINTS.GET.PROVEEDOR.READ_ALL
  )
  const devoluciones = devolucionesRes.data

  const notaCreditos: INotaDeCredito[] = devoluciones.map(d => ({
    ...d,
    cliente: clientesRes.data.find(c => c.nombreCliente === d.nombre) ?? null,
    proveedor: proveedoresRes.data.find(p => p.nombre === d.nombre) ?? null,
    numeroSerie: formatSerialNumber('NC001', d.idDevolucion),
    costoTotal: d.producto.precioUnitario * d.cantidad
  }))
  return {
    ...devolucionesRes,
    data: notaCreditos
  }
}

export const saveDevolucionProducto = async (
  refund: z.infer<typeof ReturnProductFormSchema>
) => {
  return await axios.post(ENDPOINTS.POST.DEVOLUCION.CREATE, refund)
}
