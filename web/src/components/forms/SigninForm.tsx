import { signInSchema } from '@/validations'
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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SigninForm = () => {
  const nagivation = useNavigate()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  function onSubmit (values: z.infer<typeof signInSchema>) {
    console.log(values)
    nagivation('/inventario')
  }
  return (
    <Form {...form}>
      <div className='flex flex-col sm:w-420 w-full p-5'>
        <img
          src='/Stock_Image_of_Doug_Dimmadome_logo.png'
          alt='Doug Dimmadome'
          className='block w-24 h-full mx-auto'
        />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-9'>Iniciar Sesión</h2>
        <p className='text-light-3 small-medium md:base-regular'>
          Bienvenido de vuelta, por favor inicia sesión.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input placeholder='*Nombre de usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'default'} type='submit'>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
