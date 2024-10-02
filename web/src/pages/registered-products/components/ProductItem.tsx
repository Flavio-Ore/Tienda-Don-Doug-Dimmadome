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
import useInventory from '@/states/inventory/hooks/useInventory'
import { Producto } from '@/types'

const ProductItem = ({ product }: { product: Producto }) => {
  const { removeProduct } = useInventory()
  const handleClickRemoveProduct = ({ productId }: { productId: number }) => {
    try {
      removeProduct({ productId })
    } catch (error) {
      console.error({ error })
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.nombre_producto}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between'>
            <span>Precio de Venta:</span>
            <span
              className={cn('bg-dark-1 px-2 py-1', {
                'text-yellow-400': product.precio_venta_producto > 0
              })}
            >
              {product.precio_venta_producto}
            </span>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span>Stock:</span>
            <span className={cn('bg-dark-1 px-2 py-1', {
              'text-blue-400': product.stock_actual_producto > 0,
              'text-red-700': product.stock_actual_producto <= 0
            })}>
              {product.stock_actual_producto}
            </span>
          </li>
          <li className='w-full inline-flex justify-between'>
            <span>Estado:</span>
            <span
              className={cn(
                'bg-dark-1 px-2 py-1 rounded-md',
                product.estado_producto ? 'text-green-400' : 'text-red-400'
              )}
            >
              {product.estado_producto ? 'En circulación' : 'No disponible'}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        <Button
          variant='default'
          onClick={() =>
            handleClickRemoveProduct({
              productId: product.id_producto
            })
          }
        >
          Eliminar Producto
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductItem
