import axios from '@/lib/axios'
import { formatSerialNumber } from '@/lib/utils'
import { ENDPOINTS } from '@/services/doug-dimadon/routes/endpoints'
import type {
  ICliente,
  IDevolucionV2,
  INotaDeCredito,
  IProveedor
} from '@/types'

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
