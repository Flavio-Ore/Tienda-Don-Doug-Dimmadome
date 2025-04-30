import { getAllClientes } from '@/dimadon/clients/services/getAllClientes'
import axios from '@/dimadon/lib/axios'
import { getAllProveedores } from '@/dimadon/providers/services/getAllProveedores'
import { formatSerialNumber } from '@/dimadon/utils/formatSerialNumber'
import type {
  IDevolucionV2,
  INotaDeCredito
} from '@/types'

export const getAllDevoluciones = async () => {
  const devolucionesRes = await axios.get<IDevolucionV2[]>('/devolucion/obtener')
  const clientesRes = await getAllClientes()
  const proveedoresRes = await getAllProveedores()
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
