import { z } from "zod"

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

export const kardexInventarioValidationSchema = z.object({
  periodo_kardex: z.string().max(255, {
    message: 'El periodo debe tener menos de 255 caracteres'
  }),
  metodo_evaluacion: z.string().max(255),
  descripcion: z.string().max(255, {
    message: 'La descripción debe tener menos de 255 caracteres'
  })
})