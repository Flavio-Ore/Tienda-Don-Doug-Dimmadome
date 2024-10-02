import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({
    message: 'El email no es válido'
  }),
  password: z
    .string()
    .min(8, {
      message: 'Tu contraseña debe tener al menos 8 caracteres'
    })
    .max(100)
})

export const kardexValidationSchema = z.object({
  id_kardex: z.number().int().nonnegative(),
  id_producto: z.number().int().nonnegative(),
  id_tipo_existencia_sunat: z.number().int().nonnegative(),
  id_unidad_medida: z.number().int().nonnegative(),
  ruc: z.string().length(11, {
    message: 'El RUC debe tener 11 caracteres'
  }),
  razon_social: z.string().max(255, {
    message: 'La razón social debe tener menos de 255 caracteres'
  }),
  periodo_kardex: z.string().max(255, {
    message: 'El periodo debe tener menos de 255 caracteres'
  }),
  metodo_evaluacion: z.string().max(255),
  descripcion: z.string().max(255, {
    message: 'La descripción debe tener menos de 255 caracteres'
  })
})

export const productoValidationSchema = z.object({
  id_producto: z.number().int().nonnegative(),
  nombre_producto: z
    .string()
    .min(2, {
      message: 'El nombre del producto debe tener al menos 2 caracteres'
    })
    .max(255),
  precio_venta_producto: z.number().nonnegative(),
  stock_actual_producto: z.number().int().nonnegative()
})

export const movimientoInventarioValidationSchema = z.object({
  id_movimiento_inventario: z.number().int().nonnegative(),
  id_kardex: z.number().int().nonnegative(),
  id_tipo_comprobante: z.number().int().nonnegative(),
  id_tipo_operacion: z.number().int().nonnegative(),
  cantidad_productos: z.number().nonnegative(),
  costo_unitario: z.number().nonnegative(),
  fecha_movimiento: z.date(),
  serie: z.string().max(255),
  numero: z.number().nonnegative(),
  entrada: z.boolean(),
  orden: z.number().int().nonnegative()
})

export const providerValidationSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre del proveedor debe tener al menos 2 caracteres'
    })
    .max(100),
  phone: z
    .string()
    .min(7, {
      message: 'El número de teléfono debe tener al menos 7 caracteres'
    })
    .max(20),
  email: z.string().email(),
  address: z
    .string()
    .min(2, {
      message: 'La dirección del proveedor debe tener al menos 2 caracteres'
    })
    .max(255)
})

export const movementValidationSchema = z.object({
  date: z.date(),
  typeReceipt: z.enum(['Factura', 'Boleta de venta', 'Recibo por honorarios']),
  operationType: z.enum([
    'Compra',
    'Venta',
    'Devolución recibida',
    'Devolución entregada'
  ]),
  quantity: z.number().int(),
  unitCost: z.number().int().nonnegative(),
  serial: z.string().max(255),
  number: z.string().max(255)
})

export const comprobanteValidationSchema = z.object({
  documento: z.enum([
    'Factura',
    'Recibo por Honorarios',
    'Boleta de Venta',
    'Liquidación de compra',
    'Boleto de compañía de aviación comercial',
    'Carta de porte aéreo',
    'Nota de crédito',
    'Nota de débito',
    'Guía de remisión',
    'Recibo por Arrendamiento',
    'Póliza emitida por las Bolsas de Valores',
    'Ticket o cinta emitido por máquina registradora',
    'Documento emitido por bancos',
    'Recibo por servicios públicos',
    'Boleto emitido por empresas de transporte público urbano',
    'Boleto de viaje emitido por empresas de transporte interprovincial',
    'Documento emitido por la Iglesia Católica',
    'Documento emitido por Administradoras Privadas de Fondos de Pensiones',
    'Boleto o entrada por atracciones y espectáculos públicos',
    'Comprobante de Retención',
    'Conocimiento de embarque',
    'Comprobante por Operaciones No Habituales',
    'Pólizas de Adjudicación',
    'Certificado de pago de regalías',
    'Documento de Atribución',
    'Recibo por el Pago de la Tarifa por Uso de Agua Superficial',
    'Seguro Complementario de Trabajo de Riesgo',
    'Tarifa Unificada de Uso de Aeropuerto',
    'Documentos emitidos por COFOPRI',
    'Documentos emitidos por empresas adquirentes de tarjetas de crédito y débito',
    'Guía de Remisión - Transportista',
    'Documentos emitidos por Garantía de Red Principal',
    'Documento del Operador',
    'Documento del Partícipe',
    'Recibo de Distribución de Gas Natural',
    'Documentos emitidos por concesionarios de revisiones técnicas vehiculares',
    'Declaración Única de Aduanas',
    'Despacho Simplificado',
    'Declaración de Mensajería o Courier',
    'Liquidación de Cobranza',
    'Nota de Crédito Especial',
    'Nota de Débito Especial',
    'Comprobante de No Domiciliado',
    'Exceso de crédito fiscal',
    'Nota de Crédito - No Domiciliado',
    'Nota de Débito - No Domiciliado'
  ])
})

export const usuarioValidationSchema = z.object({
  id_usuario: z.number().int().nonnegative(),
  id_tipo_usuario: z.number().int().nonnegative(),
  nombre: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres'
    })
    .max(255),
  apellidos: z
    .string()
    .min(2, {
      message: 'El apellido debe tener al menos 2 caracteres'
    })
    .max(255),
  email: z.string().email({
    message: 'El email no es válido'
  }),
  contrasena: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
    .max(255),
  fecha_creacion: z.date()
})

export const tipoOperacionValidationSchema = z.object({
  id_tipo_operacion: z.number().int().nonnegative(),
  operacion: z.enum([
    'Venta',
    'Compra',
    'Consignación recibida',
    'Consignación entregada',
    'Devolución recibida',
    'Devolución entregada',
    'Promoción',
    'Premio',
    'Donación',
    'Salida a producción',
    'Transferencia entre almacenes',
    'Retiro',
    'Merma',
    'Desmedro',
    'Destrucción',
    'Saldo inicial'
  ])
})
