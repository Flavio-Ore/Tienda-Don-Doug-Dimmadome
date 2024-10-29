import axios from '@/lib/axios'
import { DetallEntradaSchema } from '@/validations/schemas/detalleEntrada.schema'
import { EntradaSchema } from '@/validations/schemas/entrada.schema'
import { AxiosError } from 'axios'
import { z } from 'zod'
import { ENDPOINTS } from './values/constants'

/*
formulario entrada
{
  "usuario":
  {
    "idUsuario": 1
  },
  "proveedor":{
    "idProveedor": 1
  },
  "total": 200
}

formulario detalle Entrada 
{
  "entrada": {
    "idEntrada":1
  },
  "producto":{
    "idProducto":1
  },
  "nombreProducto":"Lentejas",
  "cantidad": 4,
  "costoUnitario": 6,
  "subtotal":24
}
*/

// interface IEntrada = {
//   id: number
//   fecha: string
//   proveedor: string
//   total: number
// }

export const saveEntrada = async (entrada: z.infer<typeof EntradaSchema>) => {
  try {
    const { data } = await axios.post(ENDPOINTS.POST.ENTRADA.CREATE, entrada)
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      return null
    }
    return null
  }
}

export const saveDetalleEntrada = async (
  detalleEntrada: z.infer<typeof DetallEntradaSchema>
) => {
  try {
    const { data } = await axios.post(
      ENDPOINTS.POST.DETALLE_ENTRADA.CREATE,
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
