import { SigninFormSchema } from '@/dimadon/schemas/signIn.schema'
import useAuth from '@/dimadon/states/useAuth'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/utils/cn'
import LoaderIcon from '@components/icons/LoaderIcon'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import type { z } from 'zod'

const SigninForm = ({ className }: { className?: string }) => {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: '',
      contrasena: ''
    }
  })
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  async function onSubmit (values: z.infer<typeof SigninFormSchema>) {
    console.log(values)
    try {
      const isLogged = await login({
        email: values.email,
        contrasena: values.contrasena
      })
      if (isLogged) {
        navigate('/inventario')
      } else {
        toast({
          title: 'Credenciales incorrectas',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Ocurrió un error al iniciar sesión',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <div className={cn('flex flex-col sm:w-420 w-full p-5', className)}>
        <img
          src='/Stock_Image_of_Doug_Dimmadome_logo.png'
          alt='Doug Dimmadome'
          className='block w-24 h-full mx-auto'
        />
        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-9 font-ubuntu'>
          Iniciar Sesión
        </h2>
        <p className='text-light-3 small-medium md:base-regular'>
          Bienvenido de vuelta, por favor inicia sesión.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5 w-full mt-4'
          role='form'
          aria-label='
          Formulario de inicio de sesión
          '
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='usuario@dominio.com'
                    autoComplete='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contrasena'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <div className='relative inline-flex items-center w-full'>
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Super secreto'
                      autoComplete='off'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    variant='ghost'
                    type='button'
                    name='toggle-password'
                    aria-label='Mostrar contraseña'
                    onClick={() => handleClickShowPassword()}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={'default'} type='submit'>
            {isLoading ? <LoaderIcon /> : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
