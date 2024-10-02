import { Button } from '@shadcn/button'
import { GoPackageDependents } from 'react-icons/go'

import useInventory from '@/states/inventory/hooks/useInventory'
import { ProductFormSchema } from '@/validations/product.schema'
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
import { Textarea } from '@shadcn/textarea'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ProductForm = () => {
  const { addProduct } = useInventory()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      name: '',
      price: 1
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
      navigate('/inventario/registrar-producto')
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
