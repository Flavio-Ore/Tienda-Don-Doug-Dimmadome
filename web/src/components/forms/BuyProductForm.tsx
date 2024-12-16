import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
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
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegHandshake } from 'react-icons/fa6'

import { useToast } from '@/hooks/use-toast'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { ROUTES } from '@/values/routes'
import { Link, useNavigate } from 'react-router-dom'
import type { z } from 'zod'

import { cn, numberToCurrency } from '@/lib/utils'
import { LuChevronsUpDown } from 'react-icons/lu'

import { loadFromLocalStorage } from '@/lib/local-storage'
import { useMutationBuyProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllProducts,
  useQueryAllProviders,
  useQueryAllUsers
} from '@/states/queries/hooks/queries'
import type { IProducto, IUsuario } from '@/types'
import LoaderIcon from '@components/icons/LoaderIcon'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@shadcn/card'
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
import { FaMinus, FaPlus } from 'react-icons/fa'
interface IProductsToBeSold extends IProducto {
  cantidad: number
}
const BuyProductForm = () => {
  const [selectedProducts, setSelectedProducts] = useState<IProductsToBeSold[]>(
    []
  )
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts
  } = useQueryAllProducts()
  const {
    data: providers,
    isLoading: isLoadingProviders,
    isError: isErrorProviders
  } = useQueryAllProviders()
  const {
    data: users
    // isLoading: isLoadingUsers,
    // isError: isErrorUsers
  } = useQueryAllUsers()
  const {
    mutateAsync: buyProduct,
    isPending,
    isError
  } = useMutationBuyProduct()

  const storedUser = useMemo(
    () => loadFromLocalStorage<IUsuario>('CURRENT_USER'),
    []
  )

  const currentUser = useMemo(() => {
    return users?.find(user => user.idUsuario === storedUser?.idUsuario) ?? null
  }, [users, storedUser])

  const { toast } = useToast()
  const navigate = useNavigate()

  const buyProductForm = useForm<z.infer<typeof BuyProductSchema>>({
    resolver: zodResolver(BuyProductSchema),
    defaultValues: {
      productos: [],
      usuario: {
        idUsuario: 0
      },
      proveedor: {
        id: 0
      },
      total: 0,
      descripcion: ''
    }
  })
  const watchTotal = buyProductForm.watch('total')
  const watchProductos = buyProductForm.watch('productos')

  const handleAddProduct = (productId: number) => {
    const selectedProduct = selectedProducts.find(
      p => p.idProducto === productId
    )

    if (selectedProduct != null) {
      setSelectedProducts(prevProducts =>
        prevProducts.map(p =>
          p.idProducto === productId ? { ...p, cantidad: p.cantidad + 1 } : p
        )
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

      toast({
        title: 'Producto eliminado',
        description: `Se ha eliminado una unidad de ${wasProductSelected.nombre} de la compra`,
        variant: 'action'
      })
    } else {
      setSelectedProducts(prevState =>
        prevState.filter(p => p.idProducto !== productId)
      )

      toast({
        title: 'Producto eliminado',
        description: `No hay más unidades de ${wasProductSelected.nombre} en la compra`,
        variant: 'destructive'
      })
    }
  }

  const handleBuyProductsOnSubmit = async (
    value: z.infer<typeof BuyProductSchema>
  ) => {
    try {
      await buyProduct(value)
      toast({
        title: 'Producto vendido',
        description: (
          <p>
            Se compraron los siguientes productos:{' '}
            {selectedProducts.map(product => product.cantidad).join(', ')} al
            proveedor{' '}
            {providers?.find(provider => provider.id === value.proveedor.id)
              ?.nombre ?? 'Proveedor no encontrado'}{' '}
            por parte del usuario{' '}
            {users?.find(user => user.idUsuario === value.usuario.idUsuario)
              ?.nombre ?? 'Usuario no encontrado'}
          </p>
        )
      })
      setSelectedProducts([])
    } catch (error) {
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al realizar la compra',
          description: 'Contacta al administrador del sistema',
          variant: 'destructive'
        })
        return
      }
      toast({
        title: 'Error al comprar producto',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (currentUser != null) {
      buyProductForm.setValue('usuario.idUsuario', currentUser.idUsuario)
    }
  }, [currentUser])

  useEffect(() => {
    buyProductForm.setValue(
      'productos',
      selectedProducts.map(p => ({
        idProducto: p.idProducto,
        cantidad: p.cantidad,
        costoUnitario: p.precioUnitario
      }))
    )
  }, [selectedProducts, buyProductForm])

  useEffect(() => {
    if (watchProductos != null && watchProductos.length > 0) {
      const costoTotal = watchProductos.reduce(
        (acc, product) => acc + product.costoUnitario * product.cantidad,
        0
      )
      buyProductForm.setValue('total', costoTotal)
    }
    if (watchProductos.length <= 0) {
      buyProductForm.setValue('total', 0)
    }
  }, [watchProductos])

  return (
    <Form {...buyProductForm}>
      <form
        onSubmit={buyProductForm.handleSubmit(handleBuyProductsOnSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={buyProductForm.control}
          name='usuario.idUsuario'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormControl>
                <Input
                  readOnly
                  type='text'
                  placeholder='Usuario que realiza la compra'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={buyProductForm.control}
          name='proveedor.id'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Proovedor</FormLabel>
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
                        ? providers?.find(
                            provider => provider.id === field.value
                          )?.nombre ?? 'Elige un proveedor'
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
                        providers != null &&
                        providers.length > 0 && (
                          <CommandEmpty>
                            No se encontraron proveedores
                          </CommandEmpty>
                        )}
                      {!isErrorProviders &&
                        !isLoadingProviders &&
                        providers?.length === 0 && (
                          <CommandEmpty>Registra un proveedor</CommandEmpty>
                        )}
                      {providers != null &&
                        !isErrorProviders &&
                        !isLoadingProviders &&
                        providers?.length > 0 && (
                          <CommandEmpty>Proveedor no encontrado</CommandEmpty>
                        )}
                      {isErrorProviders && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse my-4'>
                          Hubo un error al cargar los proveedores
                        </CommandEmpty>
                      )}
                      {isLoadingProviders && (
                        <div className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </div>
                      )}
                      <CommandGroup>
                        {providers != null &&
                          !isLoadingProviders &&
                          !isErrorProviders &&
                          providers.map(provider => (
                            <CommandItem
                              value={provider.nombre}
                              key={provider.id}
                              onSelect={() => {
                                buyProductForm.setValue(
                                  'proveedor.id',
                                  provider.id
                                )
                              }}
                            >
                              <BsCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  provider.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {provider.nombre}
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
        <FormField
          control={buyProductForm.control}
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
                        products != null &&
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
                                        Precio de compra:
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
                                  </ul>
                                </CardContent>
                                <CardFooter className='flex w-full justify-between items-center'>
                                  {selectedProducts.find(
                                    p => p.idProducto === product.idProducto
                                  ) == null && (
                                    <Button
                                      variant='secondary'
                                      size='sm'
                                      type='button'
                                      onClick={() =>
                                        handleAddProduct(product.idProducto)
                                      }
                                    >
                                      Agregar a la compra
                                    </Button>
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
                                      Quitar de la compra
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
        <div className='w-full grid grid-cols-1 gap-7 max-w-5xl'>
          {selectedProducts.map(product => {
            const selectedProduct =
              products?.find(
                selectedData => selectedData.idProducto === product.idProducto
              ) ?? null
            if (selectedProduct != null) {
              return (
                <div
                  key={product.idProducto}
                  className='flex flex-row flex-wrap gap-y-4 justify-evenly items-center bg-dark-3 border border-light-4 p-4'
                >
                  <div className=''>
                    <p className='text-xl'>
                      {product.nombre}{' '}
                      <span className='text-yellow-400 textl-2xl px-2 py-1'>
                        {numberToCurrency(product.precioUnitario)}
                      </span>
                    </p>
                    <span className='text-sm text-light-3'>
                      {product.categoria.nombre}
                    </span>
                  </div>
                  <div className='flex flex-col items-center justify-between gap-y-2'>
                    <div className='inline-flex items-center justify-between gap-x-4'>
                      <Button
                        variant='outline'
                        size='sm'
                        type='button'
                        onClick={() => handleRemoveProduct(product.idProducto)}
                      >
                        <FaMinus className='fill-ligh-2' size={16} />
                      </Button>
                      <span>{product.cantidad}</span>
                      <Button
                        variant='outline'
                        size='sm'
                        type='button'
                        onClick={() => handleAddProduct(product.idProducto)}
                      >
                        <FaPlus className='fill-ligh-2' size={16} />
                      </Button>
                    </div>
                    <span className='text-sm text-light-3'>
                      Máx. {product.stock} unidades{' '}
                    </span>
                  </div>
                </div>
              )
            }
          })}
        </div>

        <FormField
          control={buyProductForm.control}
          name='total'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Precio total{' '}
                <span className='text-amber-600/50 text-xs'>
                  {' '}
                  No se puede modificar
                </span>
              </FormLabel>
              <p
                className={cn(
                  'flex h-10 max-h-auto w-full rounded-md border border-light-3 bg-dark-1 px-3 py-2 small-regular ring-offset-light-1 file:border-0 file:bg-transparent file:small-regular placeholder:text-light-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light-1 disabled:cursor-not-allowed disabled:opacity-50',
                  {
                    'text-light-3': watchTotal <= 0
                  }
                )}
              >
                {numberToCurrency(watchTotal)}
              </p>
              <FormControl>
                <Input
                  className='hidden'
                  readOnly
                  type='number'
                  min={0}
                  step={0.01}
                  disabled={watchProductos == null}
                  placeholder='Precio total'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
              <FormDescription>
                El precio total de la compra es la suma de los productos
                seleccionados
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
          name='descripcion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción de la compra'
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
            {!isPending && 'Comprar Producto'}
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

export default BuyProductForm
