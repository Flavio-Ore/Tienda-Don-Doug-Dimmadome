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
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegHandshake } from 'react-icons/fa6'

import { useToast } from '@/hooks/use-toast'
import { BuyProductSchema } from '@/validations/buyProduct.schema'
import { PRIVATE_ROUTES } from '@/values'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const BuyProductForm = () => {
  const { toast } = useToast()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const buyProductForm = useForm<z.infer<typeof BuyProductSchema>>({
    resolver: zodResolver(BuyProductSchema),
    defaultValues: {
      product: '',
      user: '1',
      provider: '1',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0
    }
  })

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
    buyProductForm.setValue(
      'totalPrice',
      Number(
        buyProductForm.watch('quantity') * buyProductForm.watch('unitPrice')
      )
    )
  }, [buyProductForm.watch('quantity'), buyProductForm.watch('unitPrice')])

  return (
    <Form {...buyProductForm}>
      <form
        onSubmit={buyProductForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={buyProductForm.control}
          name='product'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Producto</FormLabel>
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
          control={buyProductForm.control}
          name='provider'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Proveedor</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Seleccione el proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={buyProductForm.control}
          name='quantity'
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
          name='unitPrice'
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
          name='totalPrice'
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
