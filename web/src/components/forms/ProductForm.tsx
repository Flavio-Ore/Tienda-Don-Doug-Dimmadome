import { Button } from '@/components/ui/button'
import { GoPackage, GoPackageDependents } from 'react-icons/go'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { kardexValidationSchema } from '@/validations'
import { EXISTENCES_TYPES, MEASUREMENT_UNITS } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const ProductForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof kardexValidationSchema>>({
    resolver: zodResolver(kardexValidationSchema),
    defaultValues: {
      description: '',
      period: '',
      RUC: '',
      socialReason: '',
      typeExistence: 'Mercadería',
      unitMeasure: 'Unidad'
    }
  })

  const onSubmit = async (value: z.infer<typeof kardexValidationSchema>) => {
    try {
      console.log(value)
      navigate('/inventario')
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
  }, [productForm.watch('description')])
  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <div className='inline-flex gap-x-2'>
          <GoPackage size={56} className='fill-blue-300' />
          <div>
            <h2 className='text-light-2 text-2xl'>
              Crear Producto en Kardex de Inventario
            </h2>
            <p className='text-light-3 body-bold'>
              Llena los campos con la información del producto para la creación
              de una tabla Kardex.
            </p>
          </div>
        </div>
        <FormField
          control={productForm.control}
          name='period'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Periodo</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Duración del periodo'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='RUC'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label body-medium'>RUC</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Número de RUC de la empresa'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='socialReason'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label body-medium'>
                Razón Social
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre de la empresa'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={productForm.control}
          name='typeExistence'
          render={({ field }) => (
            <FormItem className='inline-flex w-full items-center justify-between'>
              <FormLabel htmlFor={field.name}>
                Tipo de Existencia del Producto
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value
                        ? EXISTENCES_TYPES.find(type => type === field.value)
                        : 'Elige un tipo de existencia'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  {EXISTENCES_TYPES.map(type => (
                    <Button
                      key={type}
                      variant='ghost'
                      onClick={() => {
                        field.onChange(type)
                      }}
                      className='w-full hover:bg-dark-4 break-words'
                    >
                      {type}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='unitMeasure'
          render={({ field }) => (
            <FormItem className='inline-flex w-full items-center justify-between'>
              <FormLabel htmlFor={field.name}>
                Tipo de Unidad de Medida
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value
                        ? MEASUREMENT_UNITS.find(type => type === field.value)
                        : 'Elige un tipo de medida'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  {MEASUREMENT_UNITS.map(type => (
                    <Button
                      key={type}
                      variant='ghost'
                      onClick={() => {
                        field.onChange(type)
                      }}
                      className='w-full hover:bg-dark-4'
                    >
                      {type}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción del producto'
                  {...field}
                  ref={textAreaRef}
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
