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
