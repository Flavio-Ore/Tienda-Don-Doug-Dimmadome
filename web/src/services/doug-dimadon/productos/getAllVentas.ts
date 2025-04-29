import { formatSerialNumber } from '@/lib/utils'
import {
  getAllDetalleSalidas,
  getAllSalidas
} from '@/services/doug-dimadon/movimientos/salidas'
import type { IBoletaVenta } from '@/types'

export const getAllVentas = async () => {
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