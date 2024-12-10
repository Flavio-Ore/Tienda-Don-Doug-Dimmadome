import { cn } from '@/lib/utils'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
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
import { Textarea } from '@shadcn/textarea'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaCalendarAlt, FaParachuteBox } from 'react-icons/fa'
import { LuChevronsUpDown } from 'react-icons/lu'

import { useToast } from '@/hooks/use-toast'
import { useMutationAddProduct } from '@/states/queries/hooks/mutations'
import {
  useQueryAllProductsCategories,
  useQueryAllUnitMeasurements
} from '@/states/queries/hooks/queries'
import LoaderIcon from '@components/icons/LoaderIcon'
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
  const {
    data: productsCategory,
    isLoading: isLoadingProductsCategory,
    isError: isErrorProductsCategory
  } = useQueryAllProductsCategories()
  const {
    data: productsUnit,
    isLoading: isLoadingProductsUnit,
    isError: isErrorProductsUnit
  } = useQueryAllUnitMeasurements()
  const {
    mutateAsync: addProduct,
    isPending,
    isError
  } = useMutationAddProduct()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof AddProductFormSchema>>({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      nombre: '',
      precioUnitario: 0,
      stock: 0,
      fechaVencimiento: undefined,
      categoria: {
        idCategoria: 0
      },
      unidadMedida: {
        idUnidadMedida: 0
      }
    }
  })
  const watchName = productForm.watch('nombre')
  const onSubmit = async (value: z.infer<typeof AddProductFormSchema>) => {
    try {
      console.log(value)
      await addProduct(value)

      toast({
        title: 'Producto agregado',
        description: `El producto "${value.nombre}" ha sido agregado correctamente`
      })
    } catch (error) {
      console.error(error)
      if (isError) {
        toast({
          title: 'Error al agregar producto',
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Error al agregar producto',
          description:
            'Hubo un error al agregar el producto, por favor intenta de nuevo más tarde',
          variant: 'destructive'
        })
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <FormDescription>
                El identificador del producto en los registros
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='fechaVencimiento'
          render={({ field }) => (
            <FormItem className='w-full'>
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
                        {
                          'text-light-3': !field.value
                        }
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', {
                          locale: es
                        })
                      ) : (
                        <span>Elige una fecha</span>
                      )}
                      <FaCalendarAlt
                        strokeWidth={1.25}
                        className='ml-auto h-4 w-4 fill-violet-500'
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={
                      field.value == null ? undefined : new Date(field.value)
                    }
                    onSelect={date => {
                      if (date == null) field.onChange(undefined)
                      else {
                        const fixedDate = date.setDate(date.getDate() + 1)
                        field.onChange(
                          date == null
                            ? undefined
                            : format(fixedDate, 'yyyy-MM-dd')
                        )
                      }
                    }}
                    disabled={date => date < new Date()}
                    locale={es}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between w-full'>
          <FormField
            control={productForm.control}
            name='unidadMedida.idUnidadMedida'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='shad-form_label'>
                  Unidad de medida
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
                          ? productsUnit?.find(
                              unit => unit.idUnidadMedida === field.value
                            )?.nombre ?? 'Elige una unidad de medida'
                          : 'Elige una unidad de medida'}
                        <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                      <CommandInput placeholder='Busca una unidad de medida...' />
                      <CommandList>
                        <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                        <CommandGroup>
                          {isErrorProductsUnit && (
                            <p className='text-red-700 body-bold text-center w-full animate-pulse'>
                              Hubo un error al cargar las categorías
                            </p>
                          )}
                          {isLoadingProductsUnit && (
                            <div className='w-full'>
                              <LoaderIcon className='mx-auto' />
                            </div>
                          )}
                          {productsUnit != null &&
                            !isLoadingProductsUnit &&
                            !isErrorProductsUnit &&
                            productsUnit.map(unit => (
                              <CommandItem
                                value={unit.nombre}
                                key={unit.idUnidadMedida}
                                onSelect={() => {
                                  productForm.setValue(
                                    'unidadMedida.idUnidadMedida',
                                    unit.idUnidadMedida
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    unit.idUnidadMedida === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {unit.nombre}
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
            control={productForm.control}
            name='categoria.idCategoria'
            render={({ field }) => (
              <FormItem className='w-full'>
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
                        {field?.value
                          ? productsCategory?.find(
                              category => category?.idCategoria === field.value
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
                          {isErrorProductsCategory && (
                            <p className='text-red-700 body-bold text-center w-full animate-pulse'>
                              Hubo un error al cargar las categorías
                            </p>
                          )}
                          {isLoadingProductsCategory && (
                            <div className='w-full'>
                              <LoaderIcon className='mx-auto' />
                            </div>
                          )}
                          {productsCategory != null &&
                            !isLoadingProductsCategory &&
                            !isErrorProductsCategory &&
                            productsCategory.map(category => (
                              <CommandItem
                                value={category.nombre}
                                key={category.idCategoria}
                                onSelect={() => {
                                  productForm.setValue(
                                    'categoria.idCategoria',
                                    category.idCategoria
                                  )
                                }}
                              >
                                <BsCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    category.idCategoria === field.value
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
        </div>
        <div className='flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between w-full'>
          <FormField
            control={productForm.control}
            name='precioUnitario'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='shad-form_label'>
                  Precio de venta
                </FormLabel>
                <div className='inline-flex w-full items-center gap-x-0.5'>
                  <span className='p-2 bg-dark-1 rounded-md border border-light-3 text-sm'>
                    S/.
                  </span>
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
                </div>
                <FormMessage className='shad-form_message' />
                <FormDescription>
                  Nombre del producto que se mostrará en la tienda
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={productForm.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='shad-form_label'>Stock inicial</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Inventario inicial'
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage className='shad-form_message' />
                <FormDescription>
                  Inventario inicial del producto en el registro y en el almacén
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

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
            {!isPending && 'Agregar Producto'}
            {!isPending && (
              <FaParachuteBox
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

export default ProductForm
