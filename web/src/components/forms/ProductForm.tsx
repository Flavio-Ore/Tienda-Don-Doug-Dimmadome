import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
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
import { Textarea } from '@shadcn/textarea'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaParachuteBox, FaRegCalendarAlt } from 'react-icons/fa'
import { LuChevronsUpDown } from 'react-icons/lu'

import { useToast } from '@/hooks/use-toast'
import { PRIVATE_ROUTES, PRODUCT_CATEGORIES_VALUES } from '@/values'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const ProductForm = () => {
  const { addProduct } = useInventory()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      nombre: '',
      precio_unitario: 0,
      stock: 0,
      fecha_expiracion: new Date(),
      categoria: undefined
    }
  })
  const watchName = productForm.watch('nombre')
  const onSubmit = async (value: z.infer<typeof AddProductFormSchema>) => {
    try {
      console.log(value)
      addProduct({
        nombreProducto: value.nombre,
        precioVentaProducto: value.precio_unitario
      })
      toast({
        title: 'Producto agregado',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })

      navigate(PRIVATE_ROUTES.PRODUCTS)
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
          name='nombre'
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
          name='precio_unitario'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio de venta</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Precio del producto'
                  min={0}
                  step={0.01}
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
          name='stock'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Inventario inicial
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
          name='fecha_expiracion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Fecha de vencimiento
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
                        format(field.value, 'PPP', {
                          locale: es
                        })
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
                    locale={es}
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
          name='categoria'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Categoría del producto
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
                      {field.value?.nombre
                        ? PRODUCT_CATEGORIES_VALUES.find(
                            category =>
                              category?.idCategoria === field.value?.idCategoria
                          )?.nombre ?? 'Elige una categoría'
                        : 'Elige una categoría'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca una categoría...' />
                    <CommandList>
                      <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                      <CommandGroup>
                        {PRODUCT_CATEGORIES_VALUES.map(category => (
                          <CommandItem
                            value={category.nombre}
                            key={category.idCategoria}
                            onSelect={() => {
                              productForm.setValue('categoria', category)
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                category.nombre === field.value?.nombre &&
                                  category.idCategoria ===
                                    field.value?.idCategoria
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category.nombre}
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
            className='group focus-visible:bg-dark-3 focus-visible:text-light-1'
          >
            Agregar Producto
            <FaParachuteBox 
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
