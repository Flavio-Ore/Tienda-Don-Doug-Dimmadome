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
import { loadFromLocalStorage } from '@/lib/local-storage'
import { useMutationRefundProduct } from '@/states/doug-dimadon-tankstack-query/hooks/mutations/movements/useMutationRefundProduct'
import {
  useQueryAllClients,
  useQueryAllProducts,
  useQueryAllProviders,
  useQueryAllRefundTypes
} from '@/states/doug-dimadon-tankstack-query/hooks/queries'
import type { IUsuario } from '@/types'
import { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import { ROUTES } from '@/values/routes'
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
import { useMemo } from 'react'
import { BsCheck } from 'react-icons/bs'
import { FaHandHoldingDollar } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import type { z } from 'zod'

const ReturnProductForm = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isError: isErrorClients
  } = useQueryAllClients()
  const {
    data: providers,
    isLoading: isLoadingProviders,
    isError: isErrorProviders
  } = useQueryAllProviders()
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
  const sessionUser = useMemo(
    () => loadFromLocalStorage<IUsuario>('CURRENT_USER'),
    []
  )
  const refundProductForm = useForm<z.infer<typeof ReturnProductFormSchema>>({
    resolver: zodResolver(ReturnProductFormSchema),
    defaultValues: {
      nombre: '',
      producto: {
        idProducto: 0
      },
      cantidad: 0,
      tipoDevolucion: {
        idTipoDevolucion: sessionUser?.tipoUsuario.idTipoUsuario === 2 ? 2 : 0
      },
      descripcion: ''
    }
  })

  const typeOfRefund = refundProductForm.watch(
    'tipoDevolucion.idTipoDevolucion'
  )

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
        } al ${typeOfRefund === 2 ? 'cliente' : 'proveedor'} ${
          typeOfRefund === 2
            ? clients?.find(client => client.nombreCliente === value.nombre)
                ?.nombreCliente
            : providers?.find(provider => provider.nombre === value.nombre)
                ?.nombre
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
          defaultValue={sessionUser?.tipoUsuario.idTipoUsuario === 2 ? 2 : 0}
          control={refundProductForm.control}
          name='tipoDevolucion.idTipoDevolucion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Tipo de Devolución{' '}
                <span className='text-amber-600/50 text-xs'>
                  {' '}
                  {sessionUser?.tipoUsuario.idTipoUsuario === 2
                    ? 'Solo puedes atender devoluciones a clientes'
                    : 'Selecciona el tipo de devolución'}
                </span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      disabled={sessionUser?.tipoUsuario.idTipoUsuario === 2}
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
                              Devolución {refundType.nombre}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
              <FormDescription>
                Recuerda la <strong>devolución recibida</strong> es de productos
                que el cliente devuelve y la{' '}
                <strong>devolución entregada</strong> es de productos que la
                empresa devuelve al proveedor.
              </FormDescription>
            </FormItem>
          )}
        />
        {typeOfRefund === 1 && (
          <FormField
            control={refundProductForm.control}
            disabled={typeOfRefund !== 1}
            name='nombre'
            render={({ field }) => (
              <FormItem
                className={cn({
                  hidden: typeOfRefund !== 1
                })}
              >
                <FormLabel className='shad-form_label'>Proveedor</FormLabel>
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
                          ? (providers?.find(
                              provider => provider.nombre === field.value
                            )?.categoria.nombre ?? 'Elige un proveedor') +
                            (providers?.find(
                              provider => provider.nombre === field.value
                            ) != null
                              ? ' - '
                              : '') +
                            (providers?.find(
                              client => client.nombre === field.value
                            )?.nombre ?? '')
                          : 'Elige un proveedor'}
                        <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                      <CommandInput placeholder='Busca un proveedor...' />
                      <CommandList>
                        {!isLoadingProviders &&
                          !isErrorProviders &&
                          providers?.length === 0 && (
                            <CommandEmpty>
                              Registra un proveedor para vender
                            </CommandEmpty>
                          )}
                        {providers != null &&
                          !isLoadingProviders &&
                          !isErrorProviders &&
                          providers?.length > 0 && (
                            <CommandEmpty>
                              Proveedor no encontrado.
                            </CommandEmpty>
                          )}
                        <CommandGroup>
                          {isErrorProviders && (
                            <CommandEmpty className='text-red-700 text-center w-full animate-pulse'>
                              Hubo un error al cargar los proveedores
                            </CommandEmpty>
                          )}
                          {isLoadingProviders && (
                            <CommandEmpty>
                              <LoaderIcon className='mx-auto' />
                            </CommandEmpty>
                          )}
                          {providers != null &&
                            !isLoadingProviders &&
                            !isErrorProviders &&
                            providers.map(provider => (
                              <CommandItem
                                value={`${provider.nombre} - ${provider.categoria.nombre}`}
                                key={provider.id}
                                onSelect={() => {
                                  refundProductForm.setValue(
                                    'nombre',
                                    provider.nombre
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    provider.nombre === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {provider.categoria.nombre} - {provider.nombre}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage className='shad-form_message' />
                <FormDescription>
                  Si no encuentras al proovedor,{' '}
                  <Link
                    to={ROUTES.PRIVATE.USER.PROVIDERS}
                    className='text-sky-500/70 underline-offset-4 hover:underline'
                  >
                    regístralo aquí
                  </Link>
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        {typeOfRefund === 2 && (
          <FormField
            control={refundProductForm.control}
            name='nombre'
            disabled={typeOfRefund !== 2}
            render={({ field }) => (
              <FormItem
                className={cn({
                  hidden: typeOfRefund !== 2
                })}
              >
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
                        {isLoadingClients && <LoaderIcon className='mx-auto' />}
                        {field.value
                          ? (clients?.find(
                              client => client.nombreCliente === field.value
                            )?.numeroDocumento ?? 'Elige un cliente') +
                            (clients?.find(
                              client => client.nombreCliente === field.value
                            ) != null
                              ? ' - '
                              : '') +
                            (clients?.find(
                              client => client.nombreCliente === field.value
                            )?.nombreCliente ?? '')
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
                                    'nombre',
                                    client.nombreCliente
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    client.nombreCliente === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {client.numeroDocumento} -{' '}
                                {client.nombreCliente}
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
        )}
        <FormField
          control={refundProductForm.control}
          name='producto.idProducto'
          disabled={typeOfRefund === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Producto{' '}
                {typeOfRefund === 0 && (
                  <span className='text-amber-600/50 text-xs'>
                    {' '}
                    Primero debe seleccionar el tipo de devolución
                  </span>
                )}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      disabled={typeOfRefund === 0}
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        {
                          'text-light-3': !field.value,
                          'opacity-50': typeOfRefund === 0,
                          'cursor-not-allowed': typeOfRefund === 0
                        }
                      )}
                    >
                      {products?.find(
                        product => product.idProducto === field.value
                      )?.nombre ?? 'Elige un producto'}
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
          disabled={typeOfRefund === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Cantidad
                {typeOfRefund === 0 && (
                  <span className='text-amber-600/50 text-xs'>
                    {' '}
                    Primero debe seleccionar el tipo de devolución
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Cantidad de productos a devolver'
                  min={0}
                  disabled={typeOfRefund === 0}
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
          name='descripcion'
          disabled={typeOfRefund === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Descripción
                {typeOfRefund === 0 && (
                  <span className='text-amber-600/50 text-xs'>
                    {' '}
                    Primero debe seleccionar el tipo de devolución
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={typeOfRefund === 0}
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
              <FaHandHoldingDollar
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
