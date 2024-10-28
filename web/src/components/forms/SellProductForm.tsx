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
import CLIENTS_JSON from '@/mocks/clients.mock.json'
import PRODUCTS_JSON from '@/mocks/product.mock.json'
import { ICliente, IProducto } from '@/types'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { PRIVATE_ROUTES, TYPE_PAYMENT_VALUES } from '@/values'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card'

const clientData: ICliente[] = CLIENTS_JSON.map(client => client.data)
const productsData: IProducto[] = PRODUCTS_JSON

const SellProductForm = () => {
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{
      producto: IProducto
      cantidad: number
    }>
  >([])
  const { toast } = useToast()
  const navigate = useNavigate()

  const sellProductForm = useForm<z.infer<typeof SellProductFormSchema>>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      dni_cliente: 0,
      cantidad_total: 0,
      tipo_pago: undefined,
      productos: []
    }
  })

  const handleAddProduct = (productId: number) => {
    const existingProduct = selectedProducts.find(
      p => p.producto.idProducto === productId
    )
    if (existingProduct != null) {
      setSelectedProducts(
        selectedProducts.map(p =>
          p.producto.idProducto === productId
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        )
      )
      toast({
        title: 'Producto agregado',
        description: `Se ha agregado una unidad de ${existingProduct.producto.nombre} a la venta`,
        variant: 'confirmation'
      })
      return
    }
    const product = productsData.find(p => p.idProducto === productId)
    if (product == null) {
      return
    }
    setSelectedProducts(prevProducts => [
      ...prevProducts,
      {
        producto: product,
        cantidad: 1
      }
    ])
    toast({
      title: 'Producto agregado',
      description: `Se ha agregado ${product.nombre} a la venta`,
      variant: 'accepted'
    })
  }

  const handleRemoveProduct = (productId: number) => {
    const existingProduct = selectedProducts.find(
      p => p.producto.idProducto === productId
    )

    if (existingProduct == null) {
      return
    }

    if (existingProduct.cantidad > 1) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.producto.idProducto === productId
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
      )
      toast({
        title: 'Producto eliminado',
        description: `Se ha eliminado una unidad de ${existingProduct.producto.nombre} de la venta`,
        variant: 'action'
      })
    } else {
      setSelectedProducts(prevState =>
        prevState.filter(p => p.producto.idProducto !== productId)
      )
      toast({
        title: 'Producto eliminado',
        description: `No hay más unidades de ${existingProduct.producto.nombre} en la venta`,
        variant: 'destructive'
      })
    }
  }

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

  useEffect(() => {
    const total = selectedProducts.reduce(
      (acc, product) =>
        acc + product.cantidad * product.producto.precioUnitario,
      0
    )
    sellProductForm.setValue('cantidad_total', total)
  }, [selectedProducts])

  return (
    <Form {...sellProductForm}>
      <form
        onSubmit={sellProductForm.handleSubmit(handleSellProductSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={sellProductForm.control}
          name='dni_cliente'
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
                        ? clientData.find(
                            client => client.numero === field.value.toString()
                          )?.numero ?? 'Elige un cliente'
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
                        {clientData.map(client => (
                          <CommandItem
                            value={client.numero}
                            key={client.numero}
                            onSelect={() => {
                              sellProductForm.setValue(
                                'dni_cliente',
                                Number(client.numero)
                              )
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                Number(client.numero) === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {client.nombre_completo}
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
          name='tipo_pago'
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
                      {field.value
                        ? TYPE_PAYMENT_VALUES.find(
                            category => category === field.value
                          ) ?? 'Elige un tipo de pago'
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
                        {TYPE_PAYMENT_VALUES.map(receiptType => (
                          <CommandItem
                            value={receiptType}
                            key={receiptType}
                            onSelect={() => {
                              sellProductForm.setValue('tipo_pago', receiptType)
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
                        !field.value && 'text-light-3'
                      )}
                    >
                      Elige un producto
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[700px]' align='start'>
                  <Command className='w-full max-w-3xl'>
                    <CommandInput placeholder='Busca un producto...' />
                    <CommandList className='w-full max-w-3xl max-h-[900px]'>
                      <CommandEmpty>Producto no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {productsData.map(product => (
                          <CommandItem
                            className='w-full'
                            value={product.nombre}
                            key={product.idProducto}
                            onSelect={() => {
                              sellProductForm.setValue(
                                'productos',
                                selectedProducts.map(p => ({
                                  id_producto: p.producto.idProducto,
                                  cantidad: p.cantidad
                                }))
                              )
                            }}
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
                                      S/{product.precioUnitario}
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
                                <Button
                                  variant='secondary'
                                  size='sm'
                                  onClick={() =>
                                    handleAddProduct(product.idProducto)
                                  }
                                >
                                  Agregar a la venta
                                </Button>
                                <Button
                                  variant='destructive'
                                  size='sm'
                                  onClick={() =>
                                    handleRemoveProduct(product.idProducto)
                                  }
                                >
                                  Eliminar Producto
                                </Button>
                              </CardFooter>
                            </Card>
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value.find(
                                  v => v.id_producto === product.idProducto
                                )
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
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
          {selectedProducts.map(product => {
            const selectedProduct = productsData.find(
              selectedData =>
                selectedData.idProducto === product.producto.idProducto
            )
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
                          S/{selectedProduct.precioUnitario}
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
                    <Button
                      variant='secondary'
                      size='sm'
                      onClick={() =>
                        handleAddProduct(product.producto.idProducto)
                      }
                    >
                      <FaCartPlus size={20} className='fill-light-1' />
                    </Button>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() =>
                        handleRemoveProduct(product.producto.idProducto)
                      }
                    >
                      <FaCartArrowDown size={20} className='fill-light-1' />
                    </Button>
                  </CardFooter>
                </Card>
              )
            }
          })}
        </div>
        <FormField
          control={sellProductForm.control}
          name='cantidad_total'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio total</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  readOnly
                  placeholder='Cantidad total de productos a vender'
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
