import axios from '@/lib/axios'
import { DetallEntradaSchema } from '@/validations/schemas/detalleEntrada.schema'
import { EntradaSchema } from '@/validations/schemas/entrada.schema'
import { ENDPOINTS } from '@doug-dimadon/values/constants'
import { z } from 'zod'

/*
formulario entrada
{
  "usuario": {
    "idUsuario": 2
  },
  "proveedor": {
    "id": 5
  },
  "total": 6
}

response after saving a entrada
{
  "idEntrada": 2,
  "usuario": {
    "idUsuario": 2,
    "nombre": null,
    "email": null,
    "contrasena": null,
    "fechaCreacion": null,
    "estado": "activo",
    "tipoUsuario": null
  },
  "proveedor": {
    "id": 5,
    "nombre": null,
    "contacto": null,
    "direccion": null,
    "categoria": null
  },
  "fechaEntrada": null,
  "total": 6.0
}

formulario detalle Entrada 
{
  "entrada": {
    "idEntrada": 2
  },
  "producto": {
    "idProducto": 1
  },
  "nombreProducto": "Leche evaporada",
  "cantidad": 4,
  "costoUnitario": 6,
  "subtotal": 24
}

response after saving a detalle entrada

{
  "idDetalle": 1,
  "entrada": {
    "idEntrada": 2,
    "usuario": null,
    "proveedor": null,
    "fechaEntrada": null,
    "total": 0.0
  },
  "producto": {
    "idProducto": 1,
    "nombre": "Leche evaporada",
    "precioUnitario": 15.0,
    "stock": 28,
    "fechaVencimiento": "2024-10-24",
    "categoria": {
      "idCategoria": 2,
      "nombre": "Lacteos"
    },
    "estado": "activo"
  },
  "nombreProducto": "Leche evaporada",
  "cantidad": 4,
  "costoUnitario": 6.0,
  "subtotal": 24.0
}
*/

interface IEntradaResponse {
  idEntrada: number
  usuario: {
    idUsuario: number
    nombre: string | null
    email: string | null
    contrasena: string | null
    fechaCreacion: string | null
    estado: string
    tipoUsuario: string | null
  }
  proveedor: {
    id: number
    nombre: string | null
    contacto: string | null
    direccion: string | null
    categoria: string | null
  }
  fechaEntrada: string | null
  total: number
}

interface IDetalleEntradaResponse {
  idDetalle: number
  entrada: {
    idEntrada: number
    usuario: null
    proveedor: null
    fechaEntrada: null
    total: number
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
  nombreProducto: string
  cantidad: number
  costoUnitario: number
  subtotal: number
}

export const saveEntrada = async (entrada: z.infer<typeof EntradaSchema>) => {
  return await axios.post<IEntradaResponse>(
    ENDPOINTS.POST.ENTRADA.CREATE,
    entrada
  )
}

export const saveDetalleEntrada = async (
  detalleEntrada: z.infer<typeof DetallEntradaSchema>
) => {
  return await axios.post<IDetalleEntradaResponse>(
    ENDPOINTS.POST.DETALLE_ENTRADA.CREATE,
    detalleEntrada
  )
}
