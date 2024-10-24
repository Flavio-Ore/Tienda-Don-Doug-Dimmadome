import { Button } from '@/components/ui/button'
import { FaTruckArrowRight } from 'react-icons/fa6'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ProviderValidationSchema } from '@/validations/addProvider.schema'
import { PRIVATE_ROUTES } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import { PhoneInput } from '@shadcn/phone-input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
const ProviderForm = () => {
  const navigate = useNavigate()

  const providerForm = useForm<z.infer<typeof ProviderValidationSchema>>({
    resolver: zodResolver(ProviderValidationSchema),
    defaultValues: {
      socialReason: '',
      address: '',
      email: '',
      phone: '',
      category: undefined
    }
  })

  const onSubmit = async (value: z.infer<typeof ProviderValidationSchema>) => {
    console.log(value)
    try {
      navigate(PRIVATE_ROUTES.PROVIDERS)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Form {...providerForm}>
      <form
        onSubmit={providerForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={providerForm.control}
          name='socialReason'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Razón Social</FormLabel>
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
          control={providerForm.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Teléfono</FormLabel>
              <FormControl>
                {/* <Input
                  type='text'
                  placeholder='Teléfono del proveedor'
                  {...field}
                /> */}
                <PhoneInput {...field} defaultCountry='PE' international />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={providerForm.control}
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
          control={providerForm.control}
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
            variant='ghost'
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
            Agregar Proveedor
            <FaTruckArrowRight
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProviderForm
