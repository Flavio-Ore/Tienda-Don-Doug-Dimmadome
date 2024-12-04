import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { UserFormSchema } from '@/validations/forms/addUser.schema'
import { z } from 'zod'

export interface InventarioDimadon {
  tipo_comprobante: TipoComprobante[]
  unidad_medida: UnidadMedida[]
  tipo_existencia_sunat: TipoExistenciaSunat[]
  tipo_operacion: TipoOperacion[]
  tipo_usuario: TipoUsuario[]
  usuario: Usuario[]
  producto: IProducto[]
  kardex: Kardex[]
  movimiento_inventario: MovimientoInventario[]
  detalle_movimiento_inventario: DetalleMovimientoInventario[]
  tipo_devolucion: TipoDevolucion[]
  tipo_pedido: TipoPedido[]
  pedido_producto: IPedidoProducto[]
  devolucion_producto: DevolucionProducto[]
}
export interface IInventoryContext {
  products: IProducto[]
  productsCategory: ICategoriaProducto[]
  activateProduct: ({ productId }: { productId: number }) => void
  inactivateProduct: ({ productId }: { productId: number }) => void
  setProductStock: ({
    productId,
    stock
  }: {
    productId: number
    stock: number
  }) => void
  clients: ICliente[]
  providers: IProveedor[]
  searchProviders: ({ searchTerm = '' }: { searchTerm: string }) => IProveedor[]
  users: IUsuario[]
  addUser: (user: z.infer<typeof UserFormSchema>) => void
  searchUsers: ({ searchTerm = '' }: { searchTerm: string }) => IUsuario[]
  userTypes: ITipoUsuario[]
  kardexs: IKardex[]
  getKardexsByProducts: ({ productId }: { productId: number }) => IKardex[]
  login: {
    email: string
    password: string
    isLogged: boolean
  }
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
  searchKardex: ({ searchTerm = '' }: { searchTerm: string }) => IKardex[]
  getProduct: ({ id }: { id: number }) => IProducto | null | undefined
  searchProducts: ({ searchTerm = '' }: { searchTerm: string }) => IProducto[]
  searchClients: ({ searchTerm = '' }: { searchTerm: string }) => ICliente[]
  addProduct: (product: z.infer<typeof AddProductFormSchema>) => void
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
  getKardexById: ({ id }: { id: number }) => IKardex[]
}

export interface IPedidoProducto {
  id_pedido_producto: number
  id_tipo_pedido: number
  fecha_factura: Date
  subtotal: number
  igv: number
  total: number
}

export interface IAuthContext {
  user: IUsuario | undefined
  isError: boolean
  isLoading: boolean
  isAdmin: boolean
  isAuthenticated: boolean
  checkAuth: () => Promise<boolean>
  login: (login: { email: string; contrasena: string }) => Promise<boolean>
  logout: () => void
}

export interface ICategoriaProducto {
  idCategoria: number
  nombre: string
}

export interface IProducto {
  idProducto: number
  nombre: string
  precioUnitario: number
  stock: number
  fechaVencimiento: Date | string
  categoria: ICategoriaProducto
  unidadMedida: IUnidadMedida
  estado: string
}

export interface IUnidadMedida {
  idUnidadMedida: number
  nombre: string
}
export interface ITipoDevolucion {
  idTipoDevolucion: number
  nombre: string
}
export interface ITipoPago {
  idTipoPago: number
  nombre: string
}

export interface ICliente {
  idCliente: number
  numeroDocumento: string
  nombreCliente: string
  direccion: string | null
  fechaRegistro: Date | string
  estado: string
}

export interface IProveedor {
  id: number
  nombre: string
  contacto: string
  direccion: string
  categoria: ICategoriaProducto
}

export interface IKardex {
  idKardex: number
  producto: IProducto
  nombreProducto: string
  fecha: string
  tipoOperacion: string
  descripcion: string
  cantidadEntrada: number
  costoUnitarioEntrada: number
  costoTotalEntrada: number
  cantidadSalida: number
  costoUnitarioSalida: number
  costoTotalSalida: number
  cantidadSaldo: number
  costoUnitarioSaldo: number
  costoTotalSaldo: number
}

export interface ISalida {
  idSalida: number
  cliente: ICliente
  tipoPago: ITipoPago
  fechaSalida: string
  costoTotal: number
}

export interface IDetalleSalida {
  idDetalle: number
  salida: ISalida
  producto: IProducto
  cantidad: number
  costoUnitario: number
  total: number
  descripcion: string
}

export interface IEntrada {
  idEntrada: number
  usuario: IUsuario
  proveedor: IProveedor
  fechaEntrada: string | Date
  total: number
}

export interface IDetalleEntrada {
  idDetalle: number
  entrada: IEntrada
  producto: IProducto
  cantidad: number
  costoUnitario: number
  subtotal: number
  descripcion: string
}

export interface Usuario {
  idUsuario: number
  nombre: string
  email: string
  contrasena: string
  fechaCreacion: Date
  estado: string
  tipoUsuario: TipoUsuario
}

export interface TipoUsuario {
  idTipoUsuario: number
  nombre: 'Administrador' | 'Vendedor' | 'Almacenero'
}

export interface Producto {
  idProducto: number
  nombre: string
  precioUnitario: number
  stock: number
  fechaVencimiento: Date
  categoria: Categoria
  estado: string
}

export interface ITipoUsuario {
  idTipoUsuario: number
  nombre: string
}

export interface IUsuario {
  idUsuario: number
  nombre: string
  email: string
  contrasena: string
  tipoUsuario: ITipoUsuario
  fechaCreacion: string
  estado: string
}

export interface ILoginResponse {
  success: boolean
  message: string
  tipoUsuarioId?: number
}
export interface Producto {
  idProducto: number
  nombre: string
  precioUnitario: number
  stock: number
  fechaVencimiento: Date
  categoria: Categoria
  estado: string
}

export interface Categoria {
  idCategoria: number
  nombre: string
}

export interface TipoComprobante {
  id_tipo_comprobante: number
  documento: string
}

export interface TipoDevolucion {
  id_tipo_devolucion: number
  tipo_devolucion: string
}

export interface TipoExistenciaSunat {
  id_tipo_existencia_sunat: number
  tipo_existencia: string
}

export interface TipoOperacion {
  id_tipo_operacion: number
  operacion: string
}

export interface TipoPedido {
  id_tipo_pedido: number
  tipo_pedido: string
}

export interface TipoUsuario {
  id_tipo_usuario: number
  nombre: string
}

export interface UnidadMedida {
  id_unidad_medida: number
  unidad: string
}

export type AllowedDocuments =
  | 'Factura'
  | 'Recibo por honorarios'
  | 'Boleta de venta'
  | 'Liquidación de compra'
  | 'Boleto de compañía de aviación comercial'
  | 'Carta de porte aéreo'
  | 'Nota de crédito'
  | 'Nota de débito'
  | 'Guía de remisión'
  | 'Recibo por arrendamiento'
  | 'Póliza emitida por las Bolsas de Valores'
  | 'Ticket o cinta emitido por máquina registradora'
  | 'Documento emitido por bancos'
  | 'Recibo por servicios públicos'
  | 'Boleto emitido por empresas de transporte público urbano'
  | 'Boleto de viaje emitido por empresas de transporte interprovincial'
  | 'Documento emitido por la Iglesia Católica'
  | 'Documento emitido por Administradoras Privadas de Fondos de Pensiones'
  | 'Boleto o entrada por atracciones y espectáculos públicos'
  | 'Comprobante de Retención'
  | 'Conocimiento de embarque'
  | 'Comprobante por Operaciones No Habituales'
  | 'Pólizas de Adjudicación'
  | 'Certificado de pago de regalías'
  | 'Documento de Atribución'
  | 'Recibo por el Pago de la Tarifa por Uso de Agua Superficial'
  | 'Seguro Complementario de Trabajo de Riesgo'
  | 'Tarifa Unificada de Uso de Aeropuerto'
  | 'Documentos emitidos por COFOPRI'
  | 'Documentos emitidos por empresas adquirentes de tarjetas de crédito y débito'
  | 'Guía de Remisión - Transportista'
  | 'Documentos emitidos por Garantía de Red Principal'
  | 'Documento del Operador'
  | 'Documento del Partícipe'
  | 'Recibo de Distribución de Gas Natural'
  | 'Documentos emitidos por concesionarios de revisiones técnicas vehiculares'
  | 'Declaración Única de Aduanas'
  | 'Despacho Simplificado'
  | 'Declaración de Mensajería o Courier'
  | 'Liquidación de Cobranza'
  | 'Nota de Crédito Especial'
  | 'Nota de Débito Especial'
  | 'Comprobante de No Domiciliado'
  | 'Exceso de crédito fiscal'

export type AllowedOperations =
  | 'Venta'
  | 'Compra'
  | 'Consignación recibida'
  | 'Consignación entregada'
  | 'Devolución recibida'
  | 'Devolución entregada'
  | 'Promoción'
  | 'Premio'
  | 'Donación'
  | 'Salida a producción'
  | 'Transferencia entre almacenes'
  | 'Retiro'
  | 'Merma'
  | 'Desmedro'
  | 'Destrucción'
  | 'Saldo inicial'

export type AllowedSunatExistences =
  | 'Mercadería'
  | 'Producto terminado'
  | 'Materias primas y auxiliares - Materiales'
  | 'Envases y embalajes'
  | 'Suministros diversos'

export type AllowedMeasurementUnits =
  | 'Kilogramos'
  | 'Libras'
  | 'Toneladas largas'
  | 'Toneladas Métricas'
  | 'Toneladas cortas'
  | 'Gramos'
  | 'Unidades'
  | 'Litros'
  | 'Galones'
  | 'Barriles'
  | 'Latas'
  | 'Cajas'
  | 'Millares'
  | 'Metros cúbicos'
  | 'Metros'
