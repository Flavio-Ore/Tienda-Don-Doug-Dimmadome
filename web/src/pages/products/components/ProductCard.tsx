import LoaderIcon from '@/components/icons/LoaderIcon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { cn, numberToCurrency } from '@/lib/utils'
import { useMutationChangeProductState } from '@/states/queries/hooks/mutations'
import { IProducto } from '@/types'
import { PRIVATE_ROUTES } from '@/values'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { FaCircle, FaPlusCircle, FaWrench } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const getStockColor = (stock: number) => {
  const red = Math.min(255, Math.max(0, 255 - stock * 2.55))
  const green = Math.min(255, Math.max(0, stock * 2.55))
  return `rgba(${red}, ${green}, 0, 0.2)`
}

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
    <Card
      className={cn({
        'opacity-100': product.estado.toLowerCase() === 'activo',
        'opacity-25': product.estado.toLowerCase() === 'inactivo'
      })}
    >
      <CardHeader className='flex-row flex-wrap items-center justify-between w-full'>
        <div className='inline-flex items-center justify-between flex-wrap w-full'>
          <CardTitle className='text-ellipsis'>{product.nombre} </CardTitle>
          <div className='inline-flex items-center gap-x-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='link'
                    className='p-0'
                    disabled={isPending}
                    onClick={() => {
                      handleClick({
                        productId: product.idProducto,
                        productState: product.estado
                      })
                    }}
                  >
                    <span className='sr-only'>
                      {product.estado === 'activo'
                        ? 'Desactivar producto'
                        : 'Activar producto'}
                    </span>
                    {isPending && <LoaderIcon className='size-5' />}
                    {!isPending && (
                      <FaCircle
                        size={20}
                        className={cn({
                          'fill-green-700 hover:fill-green-500':
                            product.estado === 'activo',
                          'fill-red-700 hover:fill-red-500':
                            product.estado === 'inactivo'
                        })}
                      />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <span className='text-light-3 text-xs'>
                    {product.estado === 'activo'
                      ? 'Desactivar producto'
                      : 'Activar producto'}
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* <CardDescription>
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
        </CardDescription> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={
                  product.estado.toLowerCase() === 'activo'
                    ? PRIVATE_ROUTES.ADD_PRODUCT
                    : '.'
                }
                className='p-0'
              >
                <span className='sr-only'>
                  Editar producto {product.nombre}
                </span>
                {!isPending && (
                  <FaWrench
                    size={20}
                    className='fill-violet-500 hover:fill-violet-500/80'
                  />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <span className='text-light-3 text-xs'>Editar producto</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col gap-y-2 justify-between'>
          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3'>Precio unitario: </span>
            <Badge variant='default' className='max-w-max text-yellow-500'>
              {numberToCurrency(product.precioUnitario)}
            </Badge>
          </li>
          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3'>F.V:</span>
            <Badge variant='default' className='max-w-max text-orange-500'>
              {format(new Date(product.fechaVencimiento), 'dd/MM/yyyy')}
            </Badge>
          </li>
          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3 max-w-max'>Stock:</span>
            <div className='inline-flex justify-between items-center gap-x-2 w-full'>
              <Badge
                variant='accept'
                className={cn('max-w-max', {
                  // 'text-red-500 bg-red-500/20': product.stock <= 0,
                  // 'text-green-500 bg-green-500/20': product.stock > 0
                })}
                style={{
                  backgroundColor: getStockColor(product.stock)
                }}
              >
                {product.stock} unidades
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={
                        product.estado.toLowerCase() === 'activo'
                          ? PRIVATE_ROUTES.BUY_PRODUCT
                          : '.'
                      }
                    >
                      <span className='sr-only'>Comprar Producto</span>
                      <FaPlusCircle
                        size={18}
                        className='fill-violet-500 hover:fill-violet-500/70'
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className='text-light-3 text-xs'>
                      Comprar producto
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </li>

          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3 max-w-max'>Categoría:</span>
            <Badge variant='default' className='max-w-max'>
              {product.categoria.nombre}
            </Badge>
          </li>
        </ul>
      </CardContent>
      {/* <CardFooter className='flex justify-center items-center'>
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
      </CardFooter> */}
    </Card>
  )
}

export default ProductCard
