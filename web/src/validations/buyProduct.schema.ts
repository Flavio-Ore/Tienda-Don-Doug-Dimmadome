import productsData from '@/mocks/product.mock.json'
import providersData from '@/mocks/providers.mock.json'
import usersData from '@/mocks/user.mock.json'
import { z } from 'zod'

export const BuyProductSchema = z.object({
  id_usuario: z.enum(usersData.map(user => user.nombre) as [string, ...string[]], {
    message: 'El usuario no es válido'
  }),
  is_producto: z.enum(
    productsData.map(product => product.nombre) as [string, ...string[]],
    {
      message: 'El producto no es válido'
    }
  ),
  id_proveedor: z.enum(
    providersData.map(provider => provider.nombre) as [string, ...string[]],
    {
      message: 'El proveedor no es válido'
    }
  ),
  cantidad: z.number().min(1, {
    message: 'La cantidad debe ser mayor a 0'
  }),
  costo_unitario: z.number().min(1, {
    message: 'El precio unitario debe ser mayor a 0'
  }),
  total: z.number().nonnegative({
    message: 'El precio total no puede ser negativo'
  })
})
