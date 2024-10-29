import axios from '@/lib/axios'
import { DetallEntradaSchema } from '@/validations/schemas/detalleEntrada.schema'
import { SalidaSchema } from '@/validations/schemas/salida.schema'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'

/**
 * response after saving a salida
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
} */

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

export const saveSalida = async (salida: z.infer<typeof SalidaSchema>) => {
  try {
    const { data } = await axios.post<ISalidaResponse>(ENDPOINTS.POST.ENTRADA.CREATE, salida)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const saveDetalleSalida = async (
  detalleEntrada: z.infer<typeof DetallEntradaSchema>
) => {
  try {
    const { data } = await axios.post<IDetalleSalidaResponse>(
      ENDPOINTS.POST.DETALLE_SALIDA.CREATE,
      detalleEntrada
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}
