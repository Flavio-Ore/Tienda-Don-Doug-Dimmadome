import LoaderIcon from '@/components/icons/LoaderIcon'
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
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useMutationChangeProductState } from '@/states/queries/hooks/mutations'
import { IProducto } from '@/types'
import { format } from 'date-fns'
import { useEffect } from 'react'

const ProductCard = ({ product }: { product: IProducto }) => {
  const {
    mutateAsync: activateProduct,
    isPending,
    isError
  } = useMutationChangeProductState()
  const { toast } = useToast()
  const handleClick = async ({
    productId,
    productState
  }: {
    productId: number
    productState: string
  }) => {
    try {
      if (productState.toLowerCase() === 'activo') {
        await activateProduct({
          idProducto: productId,
          estado: 'inactivo'
        })
      } else {
        await activateProduct({
          idProducto: productId,
          estado: 'activo'
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error al cambiar el estado del producto',
        variant: 'action'
      })
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error al cambiar el estado del producto',
        variant: 'destructive'
      })
    }
  }, [isError])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.nombre}</CardTitle>
        <CardDescription>
          <span
            className={cn(
              'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-700 text-light-1 shadow hover:bg-red-700/80',
              {
                'border-transparent bg-green-700 text-light-1 shadow hover:bg-green-700/80':
                  product.estado.toLowerCase() === 'activo'
              }
            )}
          >
            {product.estado}
          </span>
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
            onClick={() =>
              handleClick({
                productId: product.idProducto,
                productState: product.estado
              })
            }
          >
            {isPending ? <LoaderIcon /> : 'Desactivar Producto'}
          </Button>
        ) : (
          <Button
            variant='outline'
            className='bg-green-900/10 hover:bg-green-900 hover:text-light-1'
            onClick={() =>
              handleClick({
                productId: product.idProducto,
                productState: product.estado
              })
            }
          >
            {isPending ? <LoaderIcon /> : 'Activar Producto'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard
