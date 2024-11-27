import { cn, numberToCurrency } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { FaRegHandshake } from 'react-icons/fa6'
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

import { useToast } from '@/hooks/use-toast'
import { useMutationSellProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllClients,
  useQueryAllPaymentMethods,
  useQueryAllProducts
} from '@/states/queries/hooks/queries'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { PRIVATE_ROUTES } from '@/values'
import LoaderIcon from '@components/icons/LoaderIcon'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useEffect, useMemo } from 'react'
import { BsCheck } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SellProductForm = () => {
  const {
    data: clients,
    isLoading: isLoadingClients,
    isError: isErrorClients
  } = useQueryAllClients()
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethods,
    isError: isErrorPaymentMethods
  } = useQueryAllPaymentMethods()
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts
  } = useQueryAllProducts()
  const {
    mutateAsync: sellProduct,
    isPending,
    isError
  } = useMutationSellProduct()
  const { toast } = useToast()
  const navigate = useNavigate()

  const sellProductForm = useForm<z.infer<typeof SellProductFormSchema>>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      idCliente: 0,
      precioUnitario: 0,
      idTipoPago: undefined,
      cantidad: 1,
      idProducto: 0,
      total: 0
    }
  })
  const watchCantidad = sellProductForm.watch('cantidad')
  const watchCostoTotal = sellProductForm.watch('total')
  const watchIdProducto = sellProductForm.watch('idProducto')
  const watchCostoUnitario = sellProductForm.watch('precioUnitario')
  const selectedProduct = useMemo(
    () => products?.find(product => product.idProducto === watchIdProducto),
    [products, watchIdProducto]
  )

  const handleSellProductSubmit = async (
    value: z.infer<typeof SellProductFormSchema>
  ) => {
    try {
      console.log(value)
      if (selectedProduct == null) return
      if (selectedProduct.stock < value.cantidad) {
        toast({
          title: 'No hay suficiente stock para vender',
          description: (
            <span>
              {`El stock actual es de ${selectedProduct.stock} unidades, no se puede vender ${value.cantidad} unidades`}
            </span>
          ),
          variant: 'action'
        })
        return
      }
      await sellProduct(value)
      toast({
        title: 'Producto vendido',
        description: (
          <p>
            Se ha vendido el producto{' '}
            {products?.find(product => product.idProducto === value.idProducto)
              ?.nombre ?? 'Producto'}{' '}
            al cliente{' '}
            {clients?.find(client => client.idCliente === value.idCliente)
              ?.nombreCliente ?? 'Cliente'}
          </p>
        )
      })
      navigate(PRIVATE_ROUTES.SELL_PRODUCT)
    } catch (error) {
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al vender producto',
          variant: 'destructive'
        })
        return
      }
      toast({
        title: 'Error al vender producto',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (products == null) return
    if (selectedProduct != null) {
      sellProductForm.setValue(
        'total',
        selectedProduct.precioUnitario * watchCantidad
      )

      if (selectedProduct.stock < watchCantidad) {
        sellProductForm.setError('cantidad', {
          type: 'manual',
          message: 'No hay suficiente stock para vender'
        })
      } else {
        sellProductForm.clearErrors('cantidad')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCantidad, watchIdProducto])

  useEffect(() => {
    if (products == null) return
    const selectedProduct = products.find(
      product => product.idProducto === watchIdProducto
    )
    if (selectedProduct != null) {
      sellProductForm.setValue('precioUnitario', selectedProduct.precioUnitario)
    }
  }, [watchIdProducto])

  return (
    <Form {...sellProductForm}>
      <form
        onSubmit={sellProductForm.handleSubmit(handleSellProductSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={sellProductForm.control}
          name='idCliente'
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
                                sellProductForm.setValue(
                                  'idCliente',
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
                  to={PRIVATE_ROUTES.CLIENTS}
                  className='text-sky-500/70 underline-offset-4 hover:underline'
                >
                  regístralo aquí
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={sellProductForm.control}
          name='idTipoPago'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Tipo de pago</FormLabel>
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
                      {paymentMethods != null && field.value
                        ? paymentMethods?.find(
                            category => category.idTipoPago === field.value
                          )?.nombre ?? 'Elige un tipo de pago'
                        : 'Elige un tipo de pago'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de comprobante...' />
                    <CommandList>
                      {!isErrorPaymentMethods && !isLoadingPaymentMethods && (
                        <CommandEmpty>Tipo de pago no encontrado</CommandEmpty>
                      )}
                      {isErrorPaymentMethods && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse'>
                          Hubo un error al cargar los tipos de pago
                        </CommandEmpty>
                      )}
                      {isLoadingPaymentMethods && (
                        <div className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </div>
                      )}
                      <CommandGroup>
                        {paymentMethods != null &&
                          !isLoadingPaymentMethods &&
                          !isErrorPaymentMethods &&
                          paymentMethods.map(paymentMethod => (
                            <CommandItem
                              value={paymentMethod.nombre}
                              key={paymentMethod.idTipoPago}
                              onSelect={() => {
                                sellProductForm.setValue(
                                  'idTipoPago',
                                  paymentMethod.idTipoPago
                                )
                              }}
                            >
                              <BsCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  paymentMethod.idTipoPago === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {paymentMethod.nombre}
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
        {/* <FormField
          control={sellProductForm.control}
          name='tipo_comprobante'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Tipo de Comprobante
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
                        ? TYPE_RECEIPT_VALUES.find(
                            category => category === field.value
                          ) ?? 'Elige un tipo de comprobante'
                        : 'Elige un tipo de comprobante'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de comprobante...' />
                    <CommandList>
                      <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                      <CommandGroup>
                        {TYPE_RECEIPT_VALUES.map(
                          receiptType =>
                            (receiptType === TYPE_RECEIPT.BOLETA ||
                              receiptType === TYPE_RECEIPT.FACTURA) && (
                              <CommandItem
                                value={receiptType}
                                key={receiptType}
                                onSelect={() => {
                                  sellProductForm.setValue(
                                    'tipo_comprobante',
                                    receiptType
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    receiptType === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {receiptType}
                              </CommandItem>
                            )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        /> */}
        <FormField
          control={sellProductForm.control}
          name='idProducto'
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
                      {products?.find(
                        product => product.idProducto === field.value
                      )?.nombre ?? 'Elige un producto'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un cliente...' />
                    <CommandList>
                      {!isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length === 0 && (
                          <CommandEmpty>
                            Registra un producto para vender
                          </CommandEmpty>
                        )}
                      {products != null &&
                        !isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length > 0 && (
                          <CommandEmpty>Producto no encontrado.</CommandEmpty>
                        )}
                      {isErrorProducts && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse'>
                          Hubo un error al cargar los productos
                        </CommandEmpty>
                      )}
                      {isLoadingProducts && (
                        <div className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </div>
                      )}
                      <CommandGroup>
                        {products != null &&
                          !isLoadingProducts &&
                          !isErrorProducts &&
                          products.map(product => {
                            return (
                              <CommandItem
                                value={product.nombre}
                                key={product.idProducto}
                                onSelect={() => {
                                  sellProductForm.setValue(
                                    'idProducto',
                                    Number(product.idProducto)
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    product.idProducto === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {product.nombre}
                              </CommandItem>
                            )
                          })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
              <FormDescription>
                Seleccione primero un producto para poder venderlo
              </FormDescription>
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-between w-full'>
          <FormField
            control={sellProductForm.control}
            name='precioUnitario'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='shad-form_label'>
                  Precio Unitario{' '}
                  <span className='text-amber-600/50 text-xs'>
                    {' '}
                    No se puede modificar
                  </span>
                </FormLabel>{' '}
                <p
                  className={cn(
                    'flex h-10 max-h-auto w-full rounded-md border border-light-3 bg-dark-1 px-3 py-2 small-regular ring-offset-light-1 file:border-0 file:bg-transparent file:small-regular placeholder:text-light-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-1 disabled:cursor-not-allowed disabled:opacity-50',
                    {
                      'text-light-3':
                        sellProductForm.getValues('precioUnitario') <= 0
                    }
                  )}
                >
                  {numberToCurrency(watchCostoUnitario)}
                </p>
                <FormControl>
                  <Input
                    readOnly
                    type='number'
                    className='hidden'
                    min={0}
                    step={0.01}
                    disabled={sellProductForm.getValues('precioUnitario') <= 0}
                    placeholder='Precio unitario del producto'
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
                <FormDescription>
                  Precio unitario del producto seleccionado
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={sellProductForm.control}
            name='cantidad'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='shad-form_label'>
                  Cantidad{' '}
                  <span
                    className='
                    text-lime-600/50 text-xs
                  '
                  >
                    Elija primero un producto
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    disabled={sellProductForm.getValues('idProducto') <= 0}
                    placeholder='Cantidad de productos'
                    min={0}
                    step={1}
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
                <FormDescription>
                  Cantidad de productos a vender
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={sellProductForm.control}
          name='total'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Total{' '}
                <span className='text-amber-600/50 text-xs'>
                  {' '}
                  No se puede modificar
                </span>
              </FormLabel>
              <p
                className={cn(
                  'flex h-10 max-h-auto w-full rounded-md border border-light-3 bg-dark-1 px-3 py-2 small-regular ring-offset-light-1 file:border-0 file:bg-transparent file:small-regular placeholder:text-light-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-1 disabled:cursor-not-allowed disabled:opacity-50',
                  {
                    'text-light-3':
                      sellProductForm.getValues('precioUnitario') <= 0
                  }
                )}
              >
                {watchCantidad} <span className='text-light-3 mx-2'>x</span>
                {numberToCurrency(watchCostoUnitario)}
                <span className='text-light-3 mx-2'>=</span>
                {numberToCurrency(watchCostoTotal)}
              </p>
              <FormControl>
                <Input
                  type='number'
                  className='hidden'
                  readOnly
                  min={0}
                  step={0.01}
                  placeholder='Precio total de los productos a vender'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
              <FormDescription>Precio unitario x Cantidad</FormDescription>
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
            {!isPending && 'Vender Producto'}
            {!isPending && (
              <FaRegHandshake
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

export default SellProductForm
