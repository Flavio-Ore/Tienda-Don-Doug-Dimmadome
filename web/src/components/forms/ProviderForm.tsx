import { Button } from '@/components/ui/button'
import { FaTruckArrowRight, FaTruckFast } from 'react-icons/fa6'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { providerValidationSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const ProviderForm = () => {
  const navigate = useNavigate()

  const productForm = useForm<z.infer<typeof providerValidationSchema>>({
    resolver: zodResolver(providerValidationSchema),
    defaultValues: {
      address: '',
      email: '',
      name: '',
      phone: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof providerValidationSchema>) => {
    try {
      console.log(value)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...productForm}>
      <form
        onSubmit={productForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <div className='inline-flex gap-x-2'>
          {' '}
          <FaTruckFast size={56} className='fill-red-600' />
          <div>
            <h2 className='text-light-2 text-2xl'>Nuevo Proveedor</h2>
            <p className='text-light-3 body-bold'>
              Al agregar un proveedor, podrá elegirlo en la lista de proveedores
              cuando realice un movimiento.
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
                  placeholder='Nombre del proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Teléfono</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Teléfono del proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Correo Electrónico
              </FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Correo del proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={productForm.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Dirección</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Dirección del proveedor'
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
              navigate('/inventario/proveedores')
            }}
          >
            Agregar Proveedor
            <FaTruckArrowRight
              size={20}
              className='ml-2 fill-dark-1 group-focus:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProviderForm
