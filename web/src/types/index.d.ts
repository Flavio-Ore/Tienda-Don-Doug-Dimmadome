export interface InventarioDimadon {
  tipo_comprobante: TipoComprobante[]
  unidad_medida: UnidadMedida[]
  tipo_existencia_sunat: TipoExistenciaSunat[]
  tipo_operacion: TipoOperacion[]
  tipo_usuario: TipoUsuario[]
  usuario: Usuario[]
  producto: Producto[]
  kardex: Kardex[]
  movimiento_inventario: MovimientoInventario[]
  detalle_movimiento_inventario: DetalleMovimientoInventario[]
  tipo_devolucion: TipoDevolucion[]
  tipo_pedido: TipoPedido[]
  pedido_producto: PedidoProducto[]
  devolucion_producto: DevolucionProducto[]
}

export interface DetalleMovimientoInventario {
  id_detalle_movimiento_inventario: number
  id_movimiento_inventario: number
  id_producto: number
}

export interface DevolucionProducto {
  id_devolucion_producto: number
  id_tipo_devolucion: number
  fecha_factura: Date
  subtotal: number
  igv: number
  total: number
}

export interface Kardex {
  id_kardex: number
  id_producto: number
  id_tipo_existencia_sunat: number
  id_unidad_medida: number
  ruc: string
  razon_social: string
  periodo_kardex: string
  descripcion: string
}

export interface MovimientoInventario {
  id_movimiento_inventario: number
  id_kardex: number
  id_tipo_comprobante: number
  id_tipo_operacion: number
  cantidad_productos: number
  costo_unitario: number
  entrada: boolean
  orden: number
}

export interface PedidoProducto {
  id_pedido_producto: number
  id_tipo_pedido: number
  fecha_factura: Date
  subtotal: number
  igv: number
  total: number
}

export interface Producto {
  id_producto: number
  nombre_producto: string
  precio_venta_producto: number
  stock_actual_producto: number
  estado_producto: boolean
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

export interface Usuario {
  id_usuario: number
  id_tipo_usuario: number
  nombre: string
  apellidos: string
  email: string
  contrasena: string
}
