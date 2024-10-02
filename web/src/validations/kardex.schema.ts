import { EXISTENCES_TYPES, MEASUREMENT_UNIT_TYPES } from '@/values'
import { z } from 'zod'

export const KardexFormSchema = z.object({
  description: z.string().min(1, 'La descripción es obligatoria'),
  period: z.string().min(1, 'El periodo es obligatorio'),
  RUC: z
    .string()
    .min(1, 'El RUC es obligatorio')
    .regex(/^\d{11}$/, 'El RUC debe tener 11 dígitos'),
  socialReason: z.string().min(1, 'La razón social es obligatoria'),
  typeExistence: z.enum(EXISTENCES_TYPES, {
    message: 'El tipo de existencia es obligatorio'
  }),
  unitMeasure: z.enum(MEASUREMENT_UNIT_TYPES, {
    message: 'La unidad de medida es obligatoria'
  })
})
