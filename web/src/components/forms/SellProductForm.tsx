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
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { useMutationSellProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllClients,
  useQueryAllPaymentMethods,
  useQueryAllProducts
} from '@/states/queries/hooks/queries'
import { IProducto } from '@/types'
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
import { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface IProductsToBeSold extends IProducto {
  cantidad: number
}

const SellProductForm = () => {
  const [selectedProducts, setSelectedProducts] = useState<IProductsToBeSold[]>(
    []
  )
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
      cliente: {
        idCliente: 0
      },
      costoTotal: 0,
      tipoPago: {
        idTipoPago: 0
      },
      productos: []
    }
  })
  const watchCostoTotal = sellProductForm.watch('costoTotal')
  const watchProductos = sellProductForm.watch('productos')

  const handleAddProduct = (productId: number) => {
    const selectedProduct = selectedProducts.find(
      p => p.idProducto === productId
    )

    if (selectedProduct != null) {
      if (selectedProduct.stock < selectedProduct.cantidad) {
        toast({
          title: 'No hay suficiente stock',
          description: `No hay suficiente stock para vender ${selectedProduct.nombre}`,
          variant: 'action'
        })
        return
      }
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.idProducto === productId ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      )
      sellProductForm.setValue(
        'productos',
        selectedProducts.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          costoUnitario: p.precioUnitario,
          total: p.precioUnitario * p.cantidad
        }))
      )
      toast({
        title: 'Producto agregado',
        description: `Se ha agregado una unidad de ${selectedProduct.nombre} a la venta`,
        variant: 'confirmation'
      })
      return
    }

    const product = products?.find(p => p.idProducto === productId) ?? null
    if (selectedProduct == null && product != null) {
      setSelectedProducts(prevProducts => [
        ...prevProducts,
        {
          ...product,
          cantidad: 1
        }
      ])
      sellProductForm.setValue(
        'productos',
        selectedProducts.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          costoUnitario: p.precioUnitario,
          total: p.precioUnitario * p.cantidad
        }))
      )
      toast({
        title: 'Producto agregado',
        description: `Se ha agregado ${product.nombre} a la venta`,
        variant: 'accepted'
      })
      return
    }
  }
  const handleRemoveProduct = (productId: number) => {
    const wasProductSelected = selectedProducts.find(
      p => p.idProducto === productId
    )
    if (wasProductSelected == null) {
      return
    }

    if (wasProductSelected.cantidad > 1) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.idProducto === productId ? { ...p, cantidad: p.cantidad - 1 } : p
        )
      )
      sellProductForm.setValue(
        'productos',
        selectedProducts.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          costoUnitario: p.precioUnitario,
          total: p.precioUnitario * p.cantidad
        }))
      )
      toast({
        title: 'Producto eliminado',
        description: `Se ha eliminado una unidad de ${wasProductSelected.nombre} de la compra`,
        variant: 'action'
      })
    } else {
      setSelectedProducts(prevState =>
        prevState.filter(p => p.idProducto !== productId)
      )
      sellProductForm.setValue(
        'productos',
        selectedProducts.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
          costoUnitario: p.precioUnitario,
          total: p.precioUnitario * p.cantidad
        }))
      )
      toast({
        title: 'Producto eliminado',
        description: `No hay más unidades de ${wasProductSelected.nombre} en la compra`,
        variant: 'destructive'
      })
    }
  }

  const handleSellProductsOnSubmit = async (
    value: z.infer<typeof SellProductFormSchema>
  ) => {
    try {
      console.log(value)
      if (selectedProducts == null || selectedProducts.length <= 0) {
        toast({
          title: 'No puede vender sin productos',
          description: 'Debe seleccionar al menos un producto',
          variant: 'destructive'
        })
        return
      }

      if (selectedProducts.some(p => p.stock < p.cantidad)) {
        toast({
          title: 'No hay suficiente stock',
          description:
            'No hay suficiente stock para vender los productos seleccionados',
          variant: 'action'
        })
        return
      }
      await sellProduct(value)
      toast({
        title: 'Producto vendido',
        description: (
          <p>
            Se vendieron los siguientes productos:{' '}
            {selectedProducts.map(product => product.nombre).join(', ')} a un
            costo total de {numberToCurrency(value.costoTotal)} al cliente{' '}
            {clients?.find(
              client => client.idCliente === value.cliente.idCliente
            )?.nombreCliente ?? 'Cliente'}
          </p>
        )
      })
      setSelectedProducts([])
      sellProductForm.reset()
      navigate(PRIVATE_ROUTES.SELL_PRODUCT)
    } catch (error) {
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al realizar la venta',
          description: 'Contacta al administrador del sistema',
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

  console.log({ watchProductos })

  useEffect(() => {
    if (watchProductos != null && watchProductos.length > 0) {
      const costoTotal = watchProductos.reduce(
        (acc, product) => acc + product.costoUnitario * product.cantidad,
        0
      )
      sellProductForm.setValue('costoTotal', costoTotal)
    }
    if (watchProductos.length <= 0) {
      sellProductForm.setValue('costoTotal', 0)
    }
  }, [watchProductos])

  return (
    <Form {...sellProductForm}>
      <form
        onSubmit={sellProductForm.handleSubmit(handleSellProductsOnSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={sellProductForm.control}
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
                                sellProductForm.setValue(
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
          name='tipoPago.idTipoPago'
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
                          paymentMethods.map(paymentMethod => {
                            if (paymentMethod.nombre == null) return null
                            return (
                              <CommandItem
                                value={paymentMethod.nombre}
                                key={paymentMethod.idTipoPago}
                                onSelect={() => {
                                  sellProductForm.setValue(
                                    'tipoPago.idTipoPago',
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
          name='productos'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Productos</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        { 'text-light-3': !field.value }
                      )}
                    >
                      Elige un producto
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[500px]' align='start'>
                  <Command className='w-full max-w-3xl'>
                    <CommandInput placeholder='Busca un producto...' />
                    <CommandList>
                      {!isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length === 0 && (
                          <CommandEmpty>
                            Registra productos para vender
                          </CommandEmpty>
                        )}
                      {products != null &&
                        !isErrorProducts &&
                        !isLoadingProducts &&
                        products?.length > 0 && (
                          <CommandEmpty>Producto no encontrado.</CommandEmpty>
                        )}
                      <CommandGroup>
                        {isErrorProducts && (
                          <CommandEmpty className='text-red-700 text-center w-full animate-pulse'>
                            Hubo un error al cargar los productos
                          </CommandEmpty>
                        )}
                        {isLoadingProducts && (
                          <CommandEmpty>
                            <LoaderIcon className='mx-auto' />
                          </CommandEmpty>
                        )}
                        {!isLoadingProducts &&
                          !isErrorProducts &&
                          products != null &&
                          products.map(product => (
                            <CommandItem
                              className='w-full'
                              value={product.nombre}
                              key={product.idProducto}
                            >
                              <Card>
                                <CardHeader>
                                  <CardTitle>{product.nombre}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <ul className='flex gap-x-2 gap-y-2 items-center'>
                                    <li className='w-full inline-flex justify-between items-center'>
                                      <span className='text-sm text-light-3'>
                                        Precio de venta:
                                      </span>
                                      <span
                                        className={cn(
                                          'bg-dark-1 px-2 py-1 text-sm',
                                          {
                                            'text-yellow-400':
                                              product.precioUnitario > 0
                                          }
                                        )}
                                      >
                                        {numberToCurrency(
                                          product.precioUnitario
                                        )}
                                      </span>
                                    </li>
                                    <li className='w-full inline-flex justify-between items-center'>
                                      <span className='text-sm text-light-3'>
                                        Stock:
                                      </span>
                                      <span
                                        className={cn(
                                          'bg-dark-1 px-2 py-1 text-sm',
                                          {
                                            'text-blue-400': product.stock > 0,
                                            'text-red-700': product.stock <= 0
                                          }
                                        )}
                                      >
                                        {product.stock} unidades
                                      </span>
                                    </li>
                                  </ul>
                                </CardContent>
                                <CardFooter className='flex w-full justify-between items-center'>
                                  {selectedProducts.find(
                                    p => p.idProducto === product.idProducto
                                  ) == null &&
                                    product.stock > 0 && (
                                      <Button
                                        variant='secondary'
                                        size='sm'
                                        type='button'
                                        onClick={() =>
                                          handleAddProduct(product.idProducto)
                                        }
                                      >
                                        Agregar a la venta
                                      </Button>
                                    )}
                                  {product.stock <= 0 && (
                                    <p>No hay stock suficiente :(</p>
                                  )}
                                  {selectedProducts.find(
                                    p => p.idProducto === product.idProducto
                                  ) != null && (
                                    <Button
                                      variant='destructive'
                                      size='sm'
                                      type='button'
                                      onClick={() =>
                                        handleRemoveProduct(product.idProducto)
                                      }
                                    >
                                      Quitar de la venta
                                    </Button>
                                  )}
                                </CardFooter>
                              </Card>
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
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
          {selectedProducts.map(product => {
            const selectedProduct =
              products?.find(
                selectedData => selectedData.idProducto === product.idProducto
              ) ?? null
            if (selectedProduct != null) {
              return (
                <Card key={selectedProduct.idProducto}>
                  <CardHeader>
                    <CardTitle className='inline-flex justify-between align-center font-normal'>
                      <span className='text-lg'>{selectedProduct.nombre}</span>
                      <span className='text-lg'>{product.cantidad}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className='flex flex-col gap-y-2 items-center'>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>
                          Precio de venta:
                        </span>
                        <span
                          className={cn('bg-dark-1 px-2 py-1 text-sm', {
                            'text-yellow-400':
                              selectedProduct.precioUnitario > 0
                          })}
                        >
                          {numberToCurrency(selectedProduct.precioUnitario)}
                        </span>
                      </li>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>Stock:</span>
                        <span
                          className={cn('bg-dark-1 px-2 py-1 text-sm', {
                            'text-blue-400': selectedProduct.stock > 0,
                            'text-red-700': selectedProduct.stock <= 0
                          })}
                        >
                          {selectedProduct.stock} unidades
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className='flex w-full justify-around items-center'>
                    {selectedProduct.stock > 0 ? (
                      <>
                        <Button
                          variant='secondary'
                          size='sm'
                          type='button'
                          onClick={() => handleAddProduct(product.idProducto)}
                        >
                          <FaCartPlus size={20} className='fill-light-1' />
                        </Button>
                        <Button
                          variant='destructive'
                          size='sm'
                          type='button'
                          onClick={() =>
                            handleRemoveProduct(product.idProducto)
                          }
                        >
                          <FaCartArrowDown size={20} className='fill-light-1' />
                        </Button>
                      </>
                    ) : (
                      <p>No hay stock suficiente :(</p>
                    )}
                  </CardFooter>
                </Card>
              )
            }
          })}
        </div>

        <FormField
          control={sellProductForm.control}
          name='costoTotal'
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
                    'text-light-3': watchProductos.length <= 0
                  }
                )}
              >
                {/* {} <span className='text-light-3 mx-2'>x</span>
                {numberToCurrency(watchCostoUnitario)}
                <span className='text-light-3 mx-2'>=</span> */}
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
              <FormDescription>
                Precios unitarios x cantidad de productos
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={sellProductForm.control}
          name='descripcion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Detalles de la venta'
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
