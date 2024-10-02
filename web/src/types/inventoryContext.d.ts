import { DOCUMENT_TYPES, OPERATIONS_VALUES } from '@/values'
import {
  AllowedMeasurementUnits,
  AllowedSunatExistences,
  Kardex,
  Producto
} from '.'

export interface InventoryContext {
  products: Producto[]
  login: {
    email: string
    password: string
    isLogged: boolean
  },
  signOut: () => void
  setLogin: (login: {
    email: string
    password: string
    isLogged: boolean
  }) => void
  checkAuth: ({
    email,
    password
  }: {
    email: string
    password: string
  }) => boolean
  getKardex: ({ id }: { id: number }) => Kardex[]
  searchKardex: ({ searchTerm = '' }: { searchTerm: string }) => Kardex[]
  getMovements: ({ id }: { id: number }) => MovimientoInventario[]
  getProduct: ({ id }: { id: number }) => Producto | null | undefined
  searchProducts: ({ searchTerm = '' }: { searchTerm: string }) => Producto[]
  getAllKardexs: () => Array<
    Kardex & {
      producto: Producto
      tipo_existencia_sunat: string
      unidad_medida: string
    }
  >
  addProduct: (product: {
    nombreProducto: string
    precioVentaProducto: number
  }) => void
  removeProduct: ({ productId }: { productId: number }) => void
  setProductStock: ({
    productId,
    stock
  }: {
    productId: number
    stock: number
  }) => void
  setProductStatus: ({
    productId,
    status
  }: {
    productId: number
    status: boolean
  }) => void
  addKardex: (kardex: {
    productId: number
    sunatExistenceType: AllowedSunatExistences
    measurementUnit: AllowedMeasurementUnits
    ruc: string
    socialReason: string
    kardexPeriod: string
    description: string
  }) => void
  addMovement: (movement: {
    idKardex: number
    tipoComprobante: keyof typeof DOCUMENT_TYPES
    tipoOperacion: keyof typeof OPERATIONS_VALUES
    cantidadProductos: number
    costoUnitario: number
    entrada: boolean
    orden: number
  }) => void
  removeMovement: ({ idMovimiento }: { idMovimiento: number }) => void
}
