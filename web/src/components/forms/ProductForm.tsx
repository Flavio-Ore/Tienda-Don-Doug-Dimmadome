import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import { ProductFormSchema } from '@/validations/product.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
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
import { Textarea } from '@shadcn/textarea'
import { format } from 'date-fns'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegCalendarAlt } from 'react-icons/fa'

import { PRIVATE_ROUTES } from '@/values'
import { Calendar } from '@shadcn/calendar'
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
import { GoPackageDependents } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const categories = ['Harina', 'Aceite', 'Arroz', 'Frijoles', 'Azúcar'] as const
const ProductForm = () => {
  const { addProduct } = useInventory()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      initialInventory: 0,
      expirationDate: new Date(),
      category: undefined
    }
  })
  const watchName = productForm.watch('name')
  const onSubmit = async (value: z.infer<typeof ProductFormSchema>) => {
    try {
      console.log(value)
      addProduct({
        nombreProducto: value.name,
        precioVentaProducto: value.price
      })
      navigate(PRIVATE_ROUTES.REGISTERED_PRODUCTS)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const formSubscription = productForm.watch(() => {
      if (textAreaRef.current != null) {
        textAreaRef.current.style.height = '40px'
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
      }
    })
    return () => {
      formSubscription.unsubscribe()
    }
  }, [watchName])

  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={productForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Nombre</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Nombre del producto'
                  {...field}
                  ref={textAreaRef}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio de Venta</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Precio del producto'
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
          control={productForm.control}
          name='initialInventory'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Inventario Inicial
              </FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Inventario Inicial'
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='expirationDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Fecha de Vencimiento
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      className={cn(
                        'w-full pl-3 outline outline-1 outline-light-3',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <FaRegCalendarAlt
                        strokeWidth={1.25}
                        className='ml-auto h-4 w-4 fill-light-1'
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={date =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Categoría del Producto
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
                        ? categories.find(
                            category => category === field.value
                          ) ?? 'Elige una categoría'
                        : 'Elige una categoría'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca una categoría...' />
                    <CommandList>
                      <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                      <CommandGroup>
                        {categories.map(category => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              productForm.setValue('category', category)
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                category === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category}
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
            Agregar Producto
            <GoPackageDependents
              size={20}
              className='ml-2 fill-dark-1 group-focus:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
