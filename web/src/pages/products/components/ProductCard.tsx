import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import useInventory from '@/states/inventory/hooks/useInventory'
import { IProducto } from '@/types'
import { format } from 'date-fns'

const ProductCard = ({ product }: { product: IProducto }) => {
  const { activateProduct, inactivateProduct } = useInventory()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.nombre}</CardTitle>
        <CardDescription>
          <Badge variant={product.estado.toLowerCase() === 'activo' ? 'on' : 'off'}>
            {product.estado}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 items-center'>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Precio unitario: </span>
            <Badge variant='important'>S/.{product.precioUnitario}</Badge>
          </li>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>F.V:</span>
            <Badge variant='important'>
              {format(new Date(product.fechaVencimiento), 'dd/MM/yyyy')}
            </Badge>
          </li>
          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Stock:</span>
            <Badge variant='accept'>{product.stock} unidades</Badge>
          </li>

          <li className='w-full inline-flex justify-between items-center'>
            <span className='text-sm text-light-3'>Categoría:</span>
            <Badge variant='default'>{product.categoria.nombre}</Badge>
          </li>
        </ul>
      </CardContent>
      <CardFooter className='flex justify-center items-center'>
        {product.estado === 'activo' ? (
          <Button
            variant='outline'
            className='bg-red-900/10 hover:bg-red-900 hover:text-light-1'
            onClick={() => inactivateProduct({ productId: product.idProducto })}
          >
            Desactivar Producto
          </Button>
        ) : (
          <Button
            variant='outline'
            className='bg-green-900/10 hover:bg-green-900 hover:text-light-1'
            onClick={() => activateProduct({ productId: product.idProducto })}
          >
            Activar Producto
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
