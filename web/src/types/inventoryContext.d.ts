import { DOCUMENTOS, OPERACIONES } from '@/values'

export interface InventoryContext {
  products: Producto[]
  kardexs: Kardex[]
  login: {
    email: string
    password: string
    isLogged: boolean
  }
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
  getMovements: ({ id }: { id: number }) => MovimientoInventario[]
  getProduct: ({ id }: { id: number }) => Producto | null | undefined
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
    idProducto: number
    idTipoExistenciaSunat: number
    idUnidadMedida: number
    ruc: string
    razonSocial: string
    periodoKardex: string
    descripcion: string
  }) => void
  addMovement: (movement: {
    idKardex: number
    tipoComprobante: keyof typeof DOCUMENTOS
    tipoOperacion: keyof typeof OPERACIONES
    cantidadProductos: number
    costoUnitario: number
    entrada: boolean
    orden: number
  }) => void
  removeMovement: ({ idMovimiento }: { idMovimiento: number }) => void
}
