import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegHandshake } from 'react-icons/fa6'

import { useToast } from '@/hooks/use-toast'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { PRIVATE_ROUTES } from '@/values'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { LuChevronsUpDown } from 'react-icons/lu'

import { useMutationBuyProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllProducts,
  useQueryAllProviders,
  useQueryAllUsers
} from '@/states/queries/hooks/queries'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { BsCheck } from 'react-icons/bs'
import LoaderIcon from '../icons/LoaderIcon'

const BuyProductForm = () => {
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

  const currentUser = useMemo(() => {
    return users?.find(user => user.idUsuario === 2) ?? null
  }, [users])

  console.log({
    products,
    providers,
    users
  })

  const { toast } = useToast()
  const navigate = useNavigate()

  const buyProductForm = useForm<z.infer<typeof BuyProductSchema>>({
    resolver: zodResolver(BuyProductSchema),
    defaultValues: {
      producto: undefined,
      idUsuario: currentUser?.idUsuario ?? 0,
      idProveedor: undefined,
      cantidad: 1,
      costoUnitario: 0,
      total: 0
    }
  })
  const watchCantidad = buyProductForm.watch('cantidad')
  const watchCostoUnitario = buyProductForm.watch('costoUnitario')
  const watchIdProducto = buyProductForm.watch('producto')

  const onSubmit = async (value: z.infer<typeof BuyProductSchema>) => {
    try {
      console.log(value)
      await buyProduct(value)
      toast({
        title: 'Producto comprado',
        description: (
          <p>
            El producto <strong>{value.producto.nombreProducto}</strong> ha sido
            comprado exitosamente por el usuario{' '}
            <strong>{currentUser?.nombre}</strong>
          </p>
        )
      })
      navigate(PRIVATE_ROUTES.BUY_PRODUCT)
    } catch (error) {
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al comprar producto',
          description:
            value.idUsuario === 0 ? (
              <p>
                El usuario <strong>{value.idUsuario}</strong> no existe
              </p>
            ) : (
              <p>
                Hubo un error al comprar el producto{' '}
                <strong>{value.producto.nombreProducto}</strong>
              </p>
            ),
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
      buyProductForm.setValue('idUsuario', currentUser.idUsuario)
    }
  }, [currentUser])

  useEffect(() => {
    buyProductForm.setValue('total', Number(watchCantidad * watchCostoUnitario))
    console.log({
      watchCantidad,
      watchCostoUnitario,
      watchIdProducto
    })
  }, [watchCantidad, watchCostoUnitario, watchIdProducto])

  return (
    <Form {...buyProductForm}>
      <form
        onSubmit={buyProductForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={buyProductForm.control}
          name='idUsuario'
          render={({ field }) => (
            <FormItem className='hidden'>
              <FormLabel className='shad-form_label'>Usuario</FormLabel>
              {currentUser == null && (
                <div className='w-full'>
                  <LoaderIcon className='mx-auto' />
                </div>
              )}
              {currentUser != null && (
                <FormControl>
                  <Input
                    readOnly
                    type='text'
                    placeholder='Usuario que realiza la compra'
                    {...field}
                  />
                </FormControl>
              )}

              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
          name='producto'
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
                        {
                          'text-light-1': field.value,
                          'text-light-3': !field.value
                        }
                      )}
                    >
                      {field.value
                        ? products?.find(
                            product =>
                              product.idProducto === field.value.idProducto
                          )?.nombre ?? 'Elige un producto'
                        : 'Elige un producto'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un cliente...' />
                    <CommandList>
                      {!isLoadingProducts && !isErrorProducts && (
                        <CommandEmpty>Producto no encontrado.</CommandEmpty>
                      )}

                      {isErrorProducts && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse'>
                          Hubo un error al cargar los productos
                        </CommandEmpty>
                      )}
                      {isLoadingProducts && (
                        <CommandEmpty className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </CommandEmpty>
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
                                  buyProductForm.setValue('producto', {
                                    idProducto: product.idProducto,
                                    nombreProducto: product.nombre
                                  })
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    product.idProducto ===
                                      field.value?.idProducto
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
          control={buyProductForm.control}
          name='idProveedor'
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
                      {!isLoadingProviders && !isErrorProviders && (
                        <CommandEmpty>
                          No se encontraron proveedores
                        </CommandEmpty>
                      )}

                      {isErrorProviders && (
                        <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse'>
                          Hubo un error al cargar los proveedores
                        </CommandEmpty>
                      )}
                      {isLoadingProviders && (
                        <CommandEmpty className='w-full my-4'>
                          <LoaderIcon className='mx-auto' />
                        </CommandEmpty>
                      )}
                      <CommandGroup>
                        {isLoadingProviders && (
                          <div className='w-full'>
                            <LoaderIcon className='mx-auto' />
                          </div>
                        )}
                        {isErrorProviders && (
                          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
                            Hubo un error al cargar los proveedores
                          </p>
                        )}
                        {providers != null &&
                          !isLoadingProviders &&
                          !isErrorProviders &&
                          providers.map(provider => (
                            <CommandItem
                              value={provider.nombre}
                              key={provider.id}
                              onSelect={() => {
                                buyProductForm.setValue(
                                  'idProveedor',
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
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
          name='cantidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
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
          control={buyProductForm.control}
          name='costoUnitario'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio unitario</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Precio unitario'
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
          name='total'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio total</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  type='number'
                  placeholder='Precio total'
                  {...field}
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
