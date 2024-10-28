export const RECEIPTS_VALUES = [
  'Factura',
  'Boleta',
  'Nota de Crédito',
  'Nota de Débito'
] as const

export const OPERATIONS_VALUES = [
  'Compra',
  'Venta',
  'Devolución recibida',
  'Devolución entregada'
] as const

export const SUNAT_EXISTENCES_VALUES = [
  'Mercadería',
  'Producto terminado',
  'Materias primas y auxiliares - Materiales',
  'Envases y embalajes',
  'Suministros diversos'
] as const

export const MEASUREMENT_UNIT_VALUES = [
  'Kilogramos',
  'Libras',
  'Toneladas largas',
  'Toneladas Métricas',
  'Toneladas cortas',
  'Gramos',
  'Unidades',
  'Litros',
  'Galones',
  'Barriles',
  'Latas',
  'Cajas',
  'Millares',
  'Metros cúbicos',
  'Metros'
] as const

export const DOCUMENT_TYPES = {
  Factura: 'Factura',
  ReciboPorHonorarios: 'Recibo por Honorarios',
  BoletaDeVenta: 'Boleta de Venta',
  LiquidacionDeCompra: 'Liquidación de compra',
  BoletoDeCompaniaDeAviacionComercial:
    'Boleto de compañía de aviación comercial',
  CartaDePorteAereo: 'Carta de porte aéreo',
  NotaDeCredito: 'Nota de crédito',
  NotaDeDebito: 'Nota de débito',
  GuiaDeRemision: 'Guía de remisión',
  ReciboPorArrendamiento: 'Recibo por Arrendamiento',
  PolizaEmitidaPorLasBolsasDeValores:
    'Póliza emitida por las Bolsas de Valores',
  TicketOCintaEmitidoPorMaquinaRegistradora:
    'Ticket o cinta emitido por máquina registradora',
  DocumentoEmitidoPorBancos: 'Documento emitido por bancos',
  ReciboPorServiciosPublicos: 'Recibo por servicios públicos',
  BoletoEmitidoPorEmpresasDeTransportePublicoUrbano:
    'Boleto emitido por empresas de transporte público urbano',
  BoletoDeViajeEmitidoPorEmpresasDeTransporteInterprovincial:
    'Boleto de viaje emitido por empresas de transporte interprovincial',
  DocumentoEmitidoPorLaIglesiaCatolica:
    'Documento emitido por la Iglesia Católica',
  DocumentoEmitidoPorAdministradorasPrivadasDeFondosDePensiones:
    'Documento emitido por Administradoras Privadas de Fondos de Pensiones',
  BoletoOEntradaPorAtraccionesYEspectaculosPublicos:
    'Boleto o entrada por atracciones y espectáculos públicos',
  ComprobanteDeRetencion: 'Comprobante de Retención',
  ConocimientoDeEmbarque: 'Conocimiento de embarque',
  ComprobantePorOperacionesNoHabituales:
    'Comprobante por Operaciones No Habituales',
  PolizasDeAdjudicacion: 'Pólizas de Adjudicación',
  CertificadoDePagoDeRegalias: 'Certificado de pago de regalías',
  DocumentoDeAtribucion: 'Documento de Atribución',
  ReciboPorElPagoDeLaTarifaPorUsoDeAguaSuperficial:
    'Recibo por el Pago de la Tarifa por Uso de Agua Superficial',
  SeguroComplementarioDeTrabajoDeRiesgo:
    'Seguro Complementario de Trabajo de Riesgo',
  TarifaUnificadaDeUsoDeAeropuerto: 'Tarifa Unificada de Uso de Aeropuerto',
  DocumentosEmitidosPorCOFOPRI: 'Documentos emitidos por COFOPRI',
  DocumentosEmitidosPorEmpresasAdquirentesDeTarjetasDeCreditoYDebito:
    'Documentos emitidos por empresas adquirentes de tarjetas de crédito y débito',
  GuiaDeRemisionTransportista: 'Guía de Remisión - Transportista',
  DocumentosEmitidosPorGarantiaDeRedPrincipal:
    'Documentos emitidos por Garantía de Red Principal',
  DocumentoDelOperador: 'Documento del Operador',
  DocumentoDelParticipante: 'Documento del Partícipe',
  ReciboDeDistribucionDeGasNatural: 'Recibo de Distribución de Gas Natural',
  DocumentosEmitidosPorConcesionariosDeRevisionesTecnicasVehiculares:
    'Documentos emitidos por concesionarios de revisiones técnicas vehiculares',
  DeclaracionUnicaDeAduanas: 'Declaración Única de Aduanas',
  DespachoSimplificado: 'Despacho Simplificado',
  DeclaracionDeMensajeriaOCourier: 'Declaración de Mensajería o Courier',
  LiquidacionDeCobranza: 'Liquidación de Cobranza',
  NotaDeCreditoEspecial: 'Nota de Crédito Especial',
  NotaDeDebitoEspecial: 'Nota de Débito Especial',
  ComprobanteDeNoDomiciliado: 'Comprobante de No Domiciliado',
  ExcesoDeCreditoFiscal: 'Exceso de crédito fiscal',
  NotaDeCreditoNoDomiciliado: 'Nota de Crédito - No Domiciliado',
  NotaDeDebitoNoDomiciliado: 'Nota de Débito - No Domiciliado'
} as const

export const OPERATIONS_TYPES = {
  Venta: 'Venta',
  Compra: 'Compra',
  ConsignacionRecibida: 'Consignación recibida',
  ConsignacionEntregada: 'Consignación entregada',
  DevolucionRecibida: 'Devolución recibida',
  DevolucionEntregada: 'Devolución entregada',
  Promocion: 'Promoción',
  Premio: 'Premio',
  Donacion: 'Donación',
  SalidaAProduccion: 'Salida a producción',
  TransferenciaEntreAlmacenes: 'Transferencia entre almacenes',
  Retiro: 'Retiro',
  Merma: 'Merma',
  Desmedro: 'Desmedro',
  Destruccion: 'Destrucción',
  SaldoInicial: 'Saldo inicial'
} as const

export const SUNAT_EXISTENCES_TYPES = {
  Mercaderia: 'Mercadería',
  ProductoTerminado: 'Producto terminado',
  MateriasPrimasYAuxiliaresMateriales:
    'Materias primas y auxiliares - Materiales',
  EnvasesYEmbalajes: 'Envases y embalajes',
  SuministrosDiversos: 'Suministros diversos'
} as const

export const MEASUREMENT_UNITS_TYPES = {
  Kilogramos: 'Kilogramos',
  Libras: 'Libras',
  ToneladasLargas: 'Toneladas largas',
  ToneladasMetricas: 'Toneladas Métricas',
  ToneladasCortas: 'Toneladas cortas',
  Gramos: 'Gramos',
  Unidades: 'Unidades',
  Litros: 'Litros',
  Galones: 'Galones',
  Barriles: 'Barriles',
  Latas: 'Latas',
  Cajas: 'Cajas',
  Millares: 'Millares',
  MetrosCubicos: 'Metros cúbicos',
  Metros: 'Metros'
} as const

export const PUBLIC_ROUTES = {
  LOGIN: '/'
} as const

export const PRIVATE_ROUTES = {
  INVENTORY: '/inventario',
  CREATE_KARDEX: '/inventario/crear-kardex',
  PRODUCTS: '/inventario/productos-registrados',
  ADD_PRODUCT: '/inventario/registrar-nuevo-producto',
  PROVIDERS: '/inventario/proveedores',
  BUY_PRODUCT: '/inventario/comprar-producto',
  SELL_PRODUCT: '/inventario/vender-producto',
  RETURN_PRODUCT: '/inventario/devolucion',
  CLIENTS: '/inventario/clientes',
  USERS: '/inventario/usuarios'
}

type TProductCategoryNames =
  | 'Menestras'
  | 'Lacteos'
  | 'Carnes'
  | 'Verduras'
  | 'Frutas'
  | 'Bebidas'
  | 'Abarrotes'
  | 'Limpieza'
  | 'Cuidado Personal'
  | 'Otros'

export const PRODUCT_CATEGORIES_VALUES: {
  idCategoria: number
  nombre: TProductCategoryNames
}[] = [
  {
    idCategoria: 1,
    nombre: 'Menestras'
  },
  {
    idCategoria: 2,
    nombre: 'Lacteos'
  },
  {
    idCategoria: 3,
    nombre: 'Carnes'
  },
  {
    idCategoria: 4,
    nombre: 'Verduras'
  },
  {
    idCategoria: 5,
    nombre: 'Frutas'
  },
  {
    idCategoria: 6,
    nombre: 'Bebidas'
  },
  {
    idCategoria: 7,
    nombre: 'Abarrotes'
  },
  {
    idCategoria: 8,
    nombre: 'Limpieza'
  },
  {
    idCategoria: 9,
    nombre: 'Cuidado Personal'
  },
  {
    idCategoria: 10,
    nombre: 'Otros'
  }
]
export const PRODUCT_CATEGORIES = {
  MENESTRAS: 'Menestras',
  LACTEOS: 'Lacteos',
  CARNES: 'Carnes',
  VERDURAS: 'Verduras',
  FRUTAS: 'Frutas',
  BEBIDAS: 'Bebidas',
  ABARROTES: 'Abarrotes',
  LIMPIEZA: 'Limpieza',
  CUIDADO_PERSONAL: 'Cuidado Personal',
  OTROS: 'Otros'
} as const

export const TYPE_RECEIPT_VALUES = [
  'Factura',
  'Boleta',
  'Nota de Crédito',
  'Nota de Débito'
] as const

export const TYPE_RECEIPT = {
  FACTURA: 'Factura',
  BOLETA: 'Boleta',
  NOTA_CREDITO: 'Nota de Crédito',
  NOTA_DEBITO: 'Nota de Débito'
} as const

export const TYPE_RETURNS_VALUES = [
  'Devolución a proveedor',
  'Devolución de cliente'
] as const

export const TYPE_USERS_VALUES = [
  'Administrador',
  'Vendedor',
  'Almacenero'
] as const

export const TYPE_PAYMENT_VALUES = ['Efectivo', 'Yape', 'Plin'] as const

export const TYPE_USERS = {
  ADMINISTRATOR: 'Administrador',
  SELLER: 'Vendedor',
  WAREHOUSEMAN: 'Almacenero'
} as const
