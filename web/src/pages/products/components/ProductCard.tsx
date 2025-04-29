import LoaderIcon from '@/components/icons/LoaderIcon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { addOneDay, cn, numberToCurrency } from '@/lib/utils'
import { useMutationChangeProductState } from '@/states/doug-dimadon-tankstack-query/hooks/mutations/products/useMutationChangeProductState'
import { useMutationUpdateProduct } from '@/states/doug-dimadon-tankstack-query/hooks/mutations/products/useMutationUpdateProduct'
import { useQueryAllProducts } from '@/states/doug-dimadon-tankstack-query/hooks/queries'
import type { IProducto } from '@/types'
import { EditProductFormSchema } from '@/validations/forms/editProduct.schema'
import { ROUTES } from '@/values/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaCalendarAlt,
  FaCheck,
  FaCircle,
  FaEdit,
  FaPlusCircle
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import type { z } from 'zod'

const getStockColor = (stock: number) => {
  const red = Math.min(255, Math.max(0, 255 - stock * 2.55))
  const green = Math.min(255, Math.max(0, stock * 2.55))
  return `rgba(${red}, ${green}, 0, 0.2)`
}

const ProductCard = ({
  product,
  enableEdit = false
}: {
  product: IProducto
  enableEdit: boolean
}) => {
  const { isRefetching } = useQueryAllProducts()
  const {
    mutateAsync: activateProduct,
    isPending,
    isError
  } = useMutationChangeProductState()
  const {
    mutateAsync: updateProduct,
    isPending: isUpdatingProduct,
    isError: isUpdateProductError
  } = useMutationUpdateProduct()

  const { toast } = useToast()

  const editProductForm = useForm<z.infer<typeof EditProductFormSchema>>({
    resolver: zodResolver(EditProductFormSchema),
    defaultValues: {
      nombre: product.nombre,
      precioUnitario: product.precioUnitario,
      fechaVencimiento: format(product.fechaVencimiento, 'yyyy-MM-dd')
    }
  })

  const onSubmitEditedProduct = async (
    data: z.infer<typeof EditProductFormSchema>
  ) => {
    try {
      const areEqual =
        data.precioUnitario === product.precioUnitario &&
        data.nombre === product.nombre &&
        data.fechaVencimiento === format(product.fechaVencimiento, 'yyyy-MM-dd')
      if (areEqual) {
        toast({
          title: 'No se han realizado cambios',
          variant: 'action'
        })
        return
      }

      await updateProduct({
        idProducto: product.idProducto,
        producto: data
      })

      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }
  const handleClick = async ({
    productId,
    productState
  }: {
    productId: number
    productState: string
  }) => {
    try {
      if (!enableEdit) return
      await activateProduct({
        idProducto: productId,
        estado: productState.toLowerCase() === 'activo' ? 'inactivo' : 'activo'
      })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  useEffect(() => {
    if (isUpdateProductError) {
      toast({
        title: 'Error al editar el producto',
        variant: 'destructive'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateProductError])

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
            {enableEdit && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='link' className='p-0'>
                    <span className='sr-only'>Editar producto</span>
                    <FaEdit
                      size={20}
                      className='fill-violet-500 hover:fill-violet-700'
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <DialogHeader>
                    <DialogTitle className='inline-flex items-center'>
                      <FaEdit size={20} className='mr-2 fill-violet-500' />
                      {product.nombre}
                    </DialogTitle>
                    <DialogDescription className='text-light-3 text-base font-semibold'>
                      Valor original del producto
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...editProductForm}>
                    <form
                      onSubmit={editProductForm.handleSubmit(
                        onSubmitEditedProduct
                      )}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          editProductForm.handleSubmit(onSubmitEditedProduct)(e)
                        }
                      }}
                    >
                      <FormField
                        control={editProductForm.control}
                        name='nombre'
                        render={({ field }) => (
                          <FormItem className='mb-4'>
                            <FormLabel className='shad-form_label'>
                              Nuevo nombre
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={product.nombre}
                                type='text'
                                className={cn({
                                  'text-light-3': field.value === ''
                                })}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Nombre original: {product.nombre}
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={editProductForm.control}
                        name='precioUnitario'
                        defaultValue={product.precioUnitario}
                        render={({ field }) => (
                          <FormItem className='mb-4'>
                            <FormLabel className='shad-form_label'>
                              Nuevo precio de venta
                            </FormLabel>
                            <div className='inline-flex w-full items-center gap-x-0.5'>
                              <span className='p-2 bg-dark-1 rounded-md border border-light-3 text-light-2 text-sm'>
                                S/.
                              </span>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='Precio del producto'
                                  min={0}
                                  step={0.01}
                                  className={cn({
                                    'text-light-3':
                                      field.value === product.precioUnitario
                                  })}
                                  {...field}
                                  onChange={e => {
                                    field.onChange(Number(e.target.value))
                                  }}
                                />
                              </FormControl>
                            </div>
                            <FormDescription>
                              Precio original:{' '}
                              {numberToCurrency(product.precioUnitario)}
                            </FormDescription>
                            <FormMessage className='shad-form_message' />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={editProductForm.control}
                        defaultValue={format(
                          product.fechaVencimiento,
                          'yyyy-MM-dd'
                        )}
                        name='fechaVencimiento'
                        render={({ field }) => (
                          <FormItem className='mb-4'>
                            <FormLabel className='shad-form_label'>
                              Nueva F.V
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant='ghost'
                                    className={cn(
                                      'w-full pl-3 outline bg-dark-1 outline-1 outline-light-3',
                                      {
                                        'text-light-3':
                                          field.value == null ||
                                          field.value ===
                                            format(
                                              product.fechaVencimiento,
                                              'yyyy-MM-dd'
                                            )
                                      }
                                    )}
                                  >
                                    {field.value != null &&
                                      field.value != product.fechaVencimiento &&
                                      format(addOneDay(field.value), 'PPP', {
                                        locale: es
                                      })}
                                    {field.value != null &&
                                      field.value == product.fechaVencimiento &&
                                      format(product.fechaVencimiento, 'PPP', {
                                        locale: es
                                      })}
                                    <FaCalendarAlt
                                      strokeWidth={1.25}
                                      className='ml-auto h-4 w-4 fill-light-1'
                                    />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className='w-auto p-0'
                                align='start'
                              >
                                <Calendar
                                  mode='single'
                                  selected={
                                    field.value == undefined ||
                                    field.value === product.fechaVencimiento
                                      ? new Date(product.fechaVencimiento)
                                      : addOneDay(field.value)
                                  }
                                  onSelect={date => {
                                    if (date == null) {
                                      field.onChange(
                                        format(
                                          product.fechaVencimiento,
                                          'yyyy-MM-dd'
                                        )
                                      )
                                      return
                                    }
                                    field.onChange(format(date, 'yyyy-MM-dd'))
                                  }}
                                  disabled={date =>
                                    date < new Date(product.fechaVencimiento)
                                  }
                                  defaultMonth={
                                    new Date(product.fechaVencimiento)
                                  }
                                  locale={es}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              F.V original:{' '}
                              {format(product.fechaVencimiento, 'PPP', {
                                locale: es
                              })}
                            </FormDescription>
                            <FormMessage className='shad-form_message' />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className='mt-4'>
                        <DialogClose
                          type='button'
                          onClick={() => {
                            editProductForm.reset()
                          }}
                        >
                          Cancelar
                        </DialogClose>
                        <Button
                          disabled={isUpdatingProduct}
                          type='submit'
                          variant='default'
                          className='hover:bg-dark-4'
                        >
                          <div className='flex-center'>
                            <FaCheck
                              size={12}
                              className='fill-violet-500 group-hover:fill-violet-500/80'
                            />
                            <span className='sr-only'>
                              Subir cambios del producto
                            </span>
                          </div>
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
            {!enableEdit && (
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
            {enableEdit && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='link'
                      className='p-0'
                      disabled={isPending || isRefetching}
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
                      {(isPending || isRefetching) && (
                        <LoaderIcon className='size-5' />
                      )}
                      {!isPending && !isRefetching && (
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
            )}
          </div>
        </div>
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
              {enableEdit && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={
                          product.estado.toLowerCase() === 'activo'
                            ? ROUTES.PRIVATE.MOVEMENTS.BUY
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
              )}
            </div>
          </li>

          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3 max-w-max'>Categoría:</span>
            <Badge variant='default' className='max-w-max'>
              {product.categoria.nombre}
            </Badge>
          </li>
          <li className='grid grid-cols-2 items-start'>
            <span className='text-sm text-light-3 max-w-max'>
              Unidad Medida:
            </span>
            <Badge variant='default' className='max-w-max'>
              {product.unidadMedida.nombre}
            </Badge>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

export default ProductCard
