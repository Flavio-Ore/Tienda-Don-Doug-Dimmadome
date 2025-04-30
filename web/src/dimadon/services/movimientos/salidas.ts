import axios from '@/dimadon/lib/axios'
import type { DetalleSalidaSchema } from '@/dimadon/schemas/detalleSalida.schema'
import type { SalidaSchema } from '@/dimadon/schemas/salida.schema'
import type { IDetalleSalida, ISalida } from '@/types'
import type { z } from 'zod'

/**
SALIDA FORM:
{
  "cliente": {
    "idCliente": 1
  },
  "tipoPago": {
    "idTipoPago": 1
  },
  "costoTotal": 30.0
}

DETALLE SALIDA FORM:
{
  "salida": {
    "idSalida": 4
  },
  "producto": {
    "idProducto": 1
  },
  "cantidad": 2,
  "costoUnitario":15.0,
  "total": 30.0
}
response after saving a salida
 {
  "idSalida": 1,
  "cliente": {
    "idCliente": 1,
    "numeroDocumento": null,
    "nombreCliente": null,
    "direccion": null,
    "fechaRegistro": null,
    "estado": "activo"
  },
  "tipoPago": {
    "idTipoPago": 1,
    "nombre": null
  },
  "fechaSalida": null,
  "costoTotal": 2.0
} 
  
*/

/**
 * response after saving a detalle salida
 * {
  "idDetalle": 1,
  "salida": {
    "idSalida": 1,
    "cliente": null,
    "tipoPago": null,
    "fechaSalida": null,
    "costoTotal": 0.0
  },
  "producto": {
    "idProducto": 1,
    "nombre": "Leche evaporada",
    "precioUnitario": 15.0,
    "stock": 22,
    "fechaVencimiento": "2024-10-24",
    "categoria": {
      "idCategoria": 2,
      "nombre": "Lacteos"
    },
    "estado": "activo"
  },
  "cantidad": 2,
  "costoUnitario": 25.0,
  "total": 50.0
}
 */
interface ISalidaResponse {
  idSalida: number
  cliente: {
    idCliente: number
    numeroDocumento: string | null
    nombreCliente: string | null
    direccion: string | null
    fechaRegistro: string | null
    estado: string
  }
  tipoPago: {
    idTipoPago: number
    nombre: string | null
  }
  fechaSalida: string | null
  costoTotal: number
}

interface IDetalleSalidaResponse {
  idDetalle: number
  salida: {
    idSalida: number
    cliente: null
    tipoPago: null
    fechaSalida: null
    costoTotal: number
  }
  producto: {
    idProducto: number
    nombre: string
    precioUnitario: number
    stock: number
    fechaVencimiento: string
    categoria: {
      idCategoria: number
      nombre: string
    }
    estado: string
  }
  cantidad: number
  costoUnitario: number
  total: number
}

export const getAllSalidas = async () => {
  return await axios.get<ISalida[]>('/salida/obtener')
}

export const getAllDetalleSalidas = async () => {
  return await axios.get<IDetalleSalida[]>('/detalleSalida/obtener')
}

export const saveSalida = async (salida: z.infer<typeof SalidaSchema>) => {
  return await axios.post<ISalidaResponse>('/salida/insertar', salida)
}

export const saveDetalleSalida = async (
  detalleEntrada: z.infer<typeof DetalleSalidaSchema>
) => {
  return await axios.post<IDetalleSalidaResponse>('/detalleSalida/insertar', detalleEntrada)
}
