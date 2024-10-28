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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegHandshake } from 'react-icons/fa6'

import { useToast } from '@/hooks/use-toast'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { PRIVATE_ROUTES } from '@/values'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { LuChevronsUpDown } from 'react-icons/lu'

import useInventory from '@/states/inventory/hooks/useInventory'
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

const BuyProductForm = () => {
  const { providers, products, users } = useInventory()
  const { toast } = useToast()
  const navigate = useNavigate()

  const buyProductForm = useForm<z.infer<typeof BuyProductSchema>>({
    resolver: zodResolver(BuyProductSchema),
    defaultValues: {
      idProducto: undefined,
      idUsuario: users[0].idUsuario,
      idProveedor: undefined,
      cantidad: 1,
      costo_unitario: 0,
      total: 0
    }
  })
  const watchCantidad = buyProductForm.watch('cantidad')
  const watchCostoUnitario = buyProductForm.watch('costo_unitario')
  const watchIdProducto = buyProductForm.watch('idProducto')
  const onSubmit = async (value: z.infer<typeof BuyProductSchema>) => {
    try {
      console.log(value)
      toast({
        title: 'Producto comprado',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })
      navigate(PRIVATE_ROUTES.BUY_PRODUCT)
    } catch (error) {
      console.error(error)
    }
  }

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
            <FormItem>
              <FormLabel className='shad-form_label'>Usuario</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  placeholder='Usuario'
                  value={
                    users.find(user => user.idUsuario === field.value)?.nombre
                  }
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
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
                      {products.find(
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
                        {products.map(product => {
                          return (
                            <CommandItem
                              value={product.idProducto.toString()}
                              key={product.idProducto}
                              onSelect={() => {
                                buyProductForm.setValue(
                                  'idProducto',
                                  product.idProducto
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
                        ? providers.find(
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
                      <CommandEmpty>No se encontraron proveedores</CommandEmpty>
                      <CommandGroup>
                        {providers.map(provider => (
                          <CommandItem
                            value={provider.nombre.toString()}
                            key={provider.nombre}
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
          name='costo_unitario'
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
            Comprar
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

export default BuyProductForm
