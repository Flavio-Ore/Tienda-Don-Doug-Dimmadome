import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IProducto } from '@/types'

const ProductCard = ({ product }: { product: IProducto }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.nombre}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Precio unitario: </span>
            <span
              className={cn('bg-dark-1 px-2 py-1 text-sm', {
                'text-yellow-400': product.precioUnitario > 0
              })}
            >
              S/{product.precioUnitario}
            </span>
          </li>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Stock:</span>
            <span
              className={cn('bg-dark-1 px-2 py-1 text-sm', {
                'text-blue-400': product.stock > 0,
                'text-red-700': product.stock <= 0
              })}
            >
              {product.stock} unidades
            </span>
          </li>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Estado:</span>
            <span
              className={cn('bg-dark-1 px-2 py-1 rounded-md text-sm', {
                'text-green-400': product.estado === 'activo',
                'text-red-400': product.estado === 'inactivo'
              })}
            >
              {product.estado}
            </span>
          </li>

          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Categoría:</span>
            <span className='bg-dark-1 px-2 py-1 rounded-md text-sm'>
              {product.categoria.nombre}
            </span>
          </li>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Fecha de vencimiento:</span>
            <span className='bg-dark-1 px-2 py-1 rounded-md text-sm'>
              {product.fechaVencimiento.toLocaleString().split('T')[0]}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        <Button variant='default'>Eliminar Producto</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
