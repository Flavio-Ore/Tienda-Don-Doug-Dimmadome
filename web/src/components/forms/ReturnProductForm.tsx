import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { LuChevronsUpDown } from 'react-icons/lu'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { useForm } from 'react-hook-form'

import LoaderIcon from '@/components/icons/LoaderIcon'
import { useToast } from '@/hooks/use-toast'
import { useMutationRefundProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllClients,
  useQueryAllProducts,
  useQueryAllRefundTypes
} from '@/states/queries/hooks/queries'
import { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import { ROUTES } from '@/values'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { Textarea } from '@shadcn/textarea'
import { BsCheck } from 'react-icons/bs'
import { GoPackageDependents } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ReturnProductForm = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isError: isErrorClients
  } = useQueryAllClients()
  // const {
  //   data: paymentMethods,
  //   isLoading: isLoadingPaymentMethods,
  //   isError: isErrorPaymentMethods
  // } = useQueryAllPaymentMethods()
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts
  } = useQueryAllProducts()
  const {
    data: refundTypes,
    isLoading: isLoadingRefundTypes,
    isError: isErrorRefundTypes
  } = useQueryAllRefundTypes()
  const {
    mutateAsync: refundProduct,
    isPending,
    isError
  } = useMutationRefundProduct()
  const { toast } = useToast()
  const navigate = useNavigate()
  const refundProductForm = useForm<z.infer<typeof ReturnProductFormSchema>>({
    resolver: zodResolver(ReturnProductFormSchema),
    defaultValues: {
      cliente: {
        idCliente: 0
      },
      producto: {
        idProducto: 0
      },
      cantidad: 0,
      tipoDevolucion: {
        idTipoDevolucion: 0
      },
      descripcion: ''
    }
  })

  const handleRefundProductOnSubmit = async (
    value: z.infer<typeof ReturnProductFormSchema>
  ) => {
    try {
      console.log(value)
      await refundProduct(value)
      toast({
        title: 'Devolución de Producto exitoso',
        description: `Se ha devuelto ${value.cantidad} unidades del producto ${
          products?.find(
            product => product.idProducto === value.producto.idProducto
          )?.nombre
        } al cliente ${
          clients?.find(client => client.idCliente === value.cliente.idCliente)
            ?.nombreCliente
        }`
      })
    } catch (error) {
      console.error(error)
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al realizar la devolución',
          description: 'Contacta al administrador del sistema',
          variant: 'destructive'
        })
        return
      }
      toast({
        title: 'Error al devolver el producto',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...refundProductForm}>
      <form
        onSubmit={refundProductForm.handleSubmit(handleRefundProductOnSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={refundProductForm.control}
          name='cliente.idCliente'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cliente</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value
                        ? clients?.find(
                            client => client.idCliente === field.value
                          )?.numeroDocumento ?? 'Elige un cliente'
                        : 'Elige un cliente'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un cliente...' />
                    <CommandList>
                      {!isErrorClients &&
                        !isLoadingClients &&
                        clients?.length === 0 && (
                          <CommandEmpty>
                            Registra un cliente para vender
                          </CommandEmpty>
                        )}
                      {clients != null &&
                        !isErrorClients &&
                        !isLoadingClients &&
                        clients?.length > 0 && (
                          <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                        )}
                      <CommandGroup>
                        {isErrorClients && (
                          <CommandEmpty className='text-red-700 text-center w-full animate-pulse'>
                            Hubo un error al cargar los clientes
                          </CommandEmpty>
                        )}
                        {isLoadingClients && (
                          <CommandEmpty>
                            <LoaderIcon className='mx-auto' />
                          </CommandEmpty>
                        )}
                        {clients != null &&
                          !isLoadingClients &&
                          !isErrorClients &&
                          clients.map(client => (
                            <CommandItem
                              value={`${client.nombreCliente} - ${client.numeroDocumento}`}
                              key={client.idCliente}
                              onSelect={() => {
                                refundProductForm.setValue(
                                  'cliente.idCliente',
                                  client.idCliente
                                )
                              }}
                            >
                              <BsCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  client.idCliente === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {client.numeroDocumento} - {client.nombreCliente}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
              <FormDescription>
                Si no encuentras al cliente,{' '}
                <Link
                  to={ROUTES.PRIVATE.USER.CLIENTS}
                  className='text-sky-500/70 underline-offset-4 hover:underline'
                >
                  regístralo aquí
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={refundProductForm.control}
          name='producto.idProducto'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Producto</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {(isLoadingProducts != null &&
                        isErrorProducts != null &&
                        products != null &&
                        products.find(
                          product => product.idProducto === field.value
                        )?.nombre) ??
                        'Elige un producto'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un producto...' />
                    <CommandList>
                      {!isLoadingProducts &&
                        !isErrorProducts &&
                        products != null &&
                        products.length > 0 && (
                          <CommandEmpty>
                            No se encontraron productos
                          </CommandEmpty>
                        )}
                      {!isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length === 0 && (
                          <CommandEmpty>Registra un producto</CommandEmpty>
                        )}
                      {products != null &&
                        !isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length > 0 && (
                          <CommandEmpty>Producto no encontrado</CommandEmpty>
                        )}
                      {isErrorProducts && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse my-4'>
                          Hubo un error al cargar los productos
                        </CommandEmpty>
                      )}
                      {isLoadingProducts && (
                        <div className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </div>
                      )}
                      <CommandGroup>
                        {isLoadingProducts != null &&
                          isErrorProducts != null &&
                          products != null &&
                          products.map(product => (
                            <CommandItem
                              value={product.nombre}
                              key={product.idProducto}
                              onSelect={() => {
                                refundProductForm.setValue(
                                  'producto.idProducto',
                                  product.idProducto
                                )
                              }}
                            >
                              <BsCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  Number(product.idProducto) === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {product.nombre}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={refundProductForm.control}
          name='cantidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Cantidad de productos a devolver'
                  min={0}
                  {...field}
                  onChange={e => {
                    field.onChange(Number(e.target.value))
                  }}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={refundProductForm.control}
          name='tipoDevolucion.idTipoDevolucion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Tipo de Devolución
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value
                        ? refundTypes?.find(
                            refundType =>
                              refundType.idTipoDevolucion === field.value
                          )?.nombre ?? 'Elige un tipo de devolución'
                        : 'Elige un tipo de devolución'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de devolución...' />
                    <CommandList>
                      {!isLoadingRefundTypes &&
                        !isErrorRefundTypes &&
                        refundTypes != null &&
                        refundTypes.length > 0 && (
                          <CommandEmpty>
                            No se encontraron los tipos de devolución
                          </CommandEmpty>
                        )}
                      {!isErrorRefundTypes &&
                        !isLoadingRefundTypes &&
                        refundTypes?.length === 0 && (
                          <CommandEmpty>
                            No hay tipos de devolución registrados
                          </CommandEmpty>
                        )}
                      {refundTypes != null &&
                        !isErrorRefundTypes &&
                        !isLoadingRefundTypes &&
                        refundTypes?.length > 0 && (
                          <CommandEmpty>
                            Tipo de devolución no encontrado
                          </CommandEmpty>
                        )}
                      {isErrorRefundTypes && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse my-4'>
                          Hubo un error al cargar los los tipos de devolución
                        </CommandEmpty>
                      )}
                      {isLoadingRefundTypes && (
                        <div className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </div>
                      )}
                      <CommandGroup>
                        {!isLoadingRefundTypes &&
                          !isErrorRefundTypes &&
                          refundTypes != null &&
                          refundTypes.map(refundType => (
                            <CommandItem
                              value={refundType.nombre}
                              key={refundType.idTipoDevolucion}
                              onSelect={() => {
                                refundProductForm.setValue(
                                  'tipoDevolucion.idTipoDevolucion',
                                  refundType.idTipoDevolucion
                                )
                              }}
                            >
                              <BsCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  refundType.idTipoDevolucion === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {refundType.nombre}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={refundProductForm.control}
          name='descripcion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción de la devolución'
                  {...field}
                  className='w-full h-40 resize-none bg-dark-1 text-light-1 p-3 rounded-md outline-none'
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            variant='outline'
            className='shad-button_dark_4'
            onClick={() => {
              navigate(-1)
            }}
          >
            Cancelar
          </Button>
          <Button
            variant='default'
            type='submit'
            disabled={isPending}
            className='group focus-visible:bg-dark-3 focus-visible:text-light-1 '
          >
            {!isPending && 'Realizar Devolución'}
            {!isPending && (
              <GoPackageDependents
                size={20}
                className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
              />
            )}
            {isPending && <LoaderIcon />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ReturnProductForm
