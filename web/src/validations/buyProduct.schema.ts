import { z } from 'zod'

export const BuyProductSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
