import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { FaRegHandshake } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import {
  useQueryAllClients,
  useQueryAllPaymentMethods
} from '@/states/queries/hooks/queries'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { PRIVATE_ROUTES } from '@/values'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useEffect } from 'react'
import { BsCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useQueryAllProducts } from '../../states/queries/hooks/queries'
import LoaderIcon from '../icons/LoaderIcon'

const SellProductForm = () => {
  const { data: clients } = useQueryAllClients()
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
  const { toast } = useToast()
  const navigate = useNavigate()

  const sellProductForm = useForm<z.infer<typeof SellProductFormSchema>>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      idCliente: 0,
      idTipoPago: undefined,
      cantidad: 1,
      idProducto: 0,
      costoTotal: 0,
      total: 0
    }
  })

  const handleSellProductSubmit = async (
    value: z.infer<typeof SellProductFormSchema>
  ) => {
    try {
      console.log(value)
      toast({
        title: 'Producto vendido',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })
      navigate(PRIVATE_ROUTES.SELL_PRODUCT)
    } catch (error) {
      console.error(error)
    }
  }

  const watchCantidad = sellProductForm.watch('cantidad')
  const watchIdProducto = sellProductForm.watch('idProducto')
  useEffect(() => {
    if (products == null) return
    const selectedProduct = products.find(
      product => product.idProducto === sellProductForm.getValues('idProducto')
    )
    if (selectedProduct != null) {
      sellProductForm.setValue(
        'costoTotal',
        selectedProduct.precioUnitario * watchCantidad
      )
      sellProductForm.setValue(
        'total',
        selectedProduct.precioUnitario * watchCantidad
      )
    }
  }, [watchCantidad, watchIdProducto])

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
                      <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {clients != null &&
                          clients.map(client => (
                            <CommandItem
                              value={client.idCliente.toString()}
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
                              {client.nombreCliente}
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
                      <CommandEmpty>Tipo de pago no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {isErrorPaymentMethods && (
                          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
                            Hubo un error al cargar los tipos de pago
                          </p>
                        )}
                        {isLoadingPaymentMethods && (
                          <div className='w-full'>
                            <LoaderIcon className='mx-auto' />
                          </div>
                        )}
                        {paymentMethods != null &&
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
                      <CommandEmpty>Producto no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {isErrorProducts && (
                          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
                            Hubo un error al cargar los productos
                          </p>
                        )}
                        {isLoadingProducts && (
                          <div className='w-full'>
                            <LoaderIcon className='mx-auto' />
                          </div>
                        )}
                        {products != null &&
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
            </FormItem>
          )}
        />
        <FormField
          control={sellProductForm.control}
          name='cantidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  disabled={sellProductForm.getValues('idProducto') <= 0}
                  placeholder='Cantidad de productos'
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={sellProductForm.control}
          name='total'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormLabel className='shad-form_label'>Total</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  readOnly
                  placeholder='Precio total de los productos a vender'
                  max={999_999}
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
          control={sellProductForm.control}
          name='costoTotal'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio total</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  readOnly
                  placeholder='Precio total de los productos a vender'
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
            className='group focus-visible:bg-dark-3 focus-visible:text-light-1 '
          >
            Vender
            <FaRegHandshake
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SellProductForm
