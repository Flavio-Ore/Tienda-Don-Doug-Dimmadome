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
import { productValidationSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const ProductForm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof productValidationSchema>>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      description: '',
      name: '',
      provider: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof productValidationSchema>) => {
    try {
      console.log(value)
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
          {' '}
          <GoPackage size={56} className='fill-blue-300' />
          <div>
            <h2 className='text-light-2 text-2xl'>
              Agregar un nuevo producto al inventario
            </h2>
            <p className='text-light-3 body-bold'>
              Llena los campos con la información del producto para la creación
              de una tabla Kardex.
            </p>
          </div>
        </div>
        <FormField
          control={productForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Nombre</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre del producto'
                  {...field}
                />
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
        <FormField
          control={productForm.control}
          name='provider'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label body-medium'>
                Proveedor
              </FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre del proveedor'
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
            onClick={() => {
              navigate('/inventario')
            }}
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
