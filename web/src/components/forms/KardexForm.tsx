import { Button } from '@shadcn/button'
import { GoPackageDependents } from 'react-icons/go'

import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import { KardexFormSchema } from '@/validations/kardex.schema'
import { EXISTENCES_TYPES, MEASUREMENT_UNIT_TYPES } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { Textarea } from '@shadcn/textarea'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const KardexForm = () => {
  const {} = useInventory()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof KardexFormSchema>>({
    resolver: zodResolver(KardexFormSchema),
    defaultValues: {
      description: '',
      period: '',
      RUC: '',
      socialReason: '',
      typeExistence: 'Mercadería',
      unitMeasure: 'Unidad'
    }
  })
  const watchDescription = productForm.watch('description')
  const onSubmit = async (value: z.infer<typeof KardexFormSchema>) => {
    try {
      console.log(value)
      navigate('/inventario/kardex-registrados')
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
  }, [watchDescription])

  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={productForm.control}
          name='period'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Periodo</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Periodo del Kardex'
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
              <FormLabel className='shad-form_label'>RUC</FormLabel>
              <FormControl>
                <Input type='text' placeholder='RUC de la empresa' {...field} />
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
              <FormLabel className='shad-form_label'>Razón Social</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Denominación de tu empresa'
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
                        ? MEASUREMENT_UNIT_TYPES.find(
                            type => type === field.value
                          )
                        : 'Elige un tipo de medida'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  {MEASUREMENT_UNIT_TYPES.map(type => (
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

export default KardexForm
