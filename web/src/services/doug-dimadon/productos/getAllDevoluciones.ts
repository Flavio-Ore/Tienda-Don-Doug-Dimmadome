import axios from '@/lib/axios'
import { formatSerialNumber } from '@/lib/utils'
import type {
  IDevolucionV2,
  INotaDeCredito
} from '@/types'
import { getAllClientes } from '@doug-dimadon/clientes/getAllClientes'
import { getAllProveedores } from '@doug-dimadon/proveedores/getAllProveedores'

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
