import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import { KardexFormSchema } from '@/validations/kardex.schema'
import { MEASUREMENT_UNIT_VALUES, SUNAT_EXISTENCES_VALUES } from '@/values'
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
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { Textarea } from '@shadcn/textarea'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { TbTableExport } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const KardexForm = () => {
  const { products, addKardex } = useInventory()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof KardexFormSchema>>({
    resolver: zodResolver(KardexFormSchema),
    defaultValues: {
      productId: -1,
      description: '',
      period: '',
      ruc: '',
      socialReason: '',
      sunatExistenceType: 'Mercadería',
      unitMeasure: 'Unidades'
    }
  })
  const watchDescription = productForm.watch('description')
  const onSubmit = (value: z.infer<typeof KardexFormSchema>) => {
    try {
      console.log(value)
      addKardex({
        productId: value.productId,
        sunatExistenceType: value.sunatExistenceType,
        measurementUnit: value.unitMeasure,
        ruc: value.ruc,
        socialReason: value.socialReason,
        kardexPeriod: value.period,
        description: value.description
      })
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
          name='ruc'
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
          name='sunatExistenceType'
          render={({ field }) => (
            <FormItem className='inline-flex w-full items-center justify-between'>
              <FormLabel htmlFor={field.name}>
                Tipo de Existencia del Producto según SUNAT
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
                        ? SUNAT_EXISTENCES_VALUES.find(
                            type => type === field.value
                          )
                        : 'Elige un tipo de existencia'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  {SUNAT_EXISTENCES_VALUES.map(type => (
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
              <FormMessage className='shad-form_message' />
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
                        ? MEASUREMENT_UNIT_VALUES.find(
                            type => type === field.value
                          )
                        : 'Elige un tipo de medida'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  {MEASUREMENT_UNIT_VALUES.map(type => (
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
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='productId'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Producto</FormLabel>
              <FormControl>
                <Select
                  onValueChange={value => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Elige un producto' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map(product => (
                      <SelectItem
                        key={product.id_producto}
                        value={String(product.id_producto)}
                      >
                        {product.nombre_producto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className='shad-form_message' />
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
            Crear Kardex
            <TbTableExport
              size={20}
              className='ml-2 stroke-dark-1 group-focus-visible:stroke-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default KardexForm
