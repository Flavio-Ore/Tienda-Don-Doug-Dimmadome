import { MEASUREMENT_UNIT_VALUES, SUNAT_EXISTENCES_VALUES } from '@/values'
import { z } from 'zod'

/**
 *     {
      "id_kardex": 1,
      "id_producto": 1,
      "id_tipo_existencia_sunat": 1,
      "id_unidad_medida": 1,
      "ruc": "20400000101",
      "razon_social": "Tienda de Ropa Online",
      "periodo_kardex": "2024-01",
      "descripcion": "Camisas blancas"
    },
 */

export const KardexFormSchema = z.object({
  productId: z.number().nonnegative({
    message: 'El producto es obligatorio'
  }),
  description: z.string().min(1, 'La descripción es obligatoria'),
  period: z.string().min(1, 'El periodo es obligatorio'),
  ruc: z
    .string()
    .min(1, 'El RUC es obligatorio')
    .regex(/^\d{11}$/, 'El RUC debe tener 11 dígitos'),
  socialReason: z.string().min(1, 'La razón social es obligatoria'),
  sunatExistenceType: z.enum(SUNAT_EXISTENCES_VALUES, {
    message: 'El tipo de existencia es obligatorio'
  }),
  unitMeasure: z.enum(MEASUREMENT_UNIT_VALUES, {
    message: 'La unidad de medida es obligatoria'
  })
})
