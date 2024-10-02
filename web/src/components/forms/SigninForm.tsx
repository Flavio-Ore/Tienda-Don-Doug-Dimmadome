import useInventory from '@/states/inventory/hooks/useInventory'
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
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const SigninForm = () => {
  const [isAuth, setIsAuth] = useState({
    isLogged: false,
    tryings: 0,
    message: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const { checkAuth } = useInventory()
  const nagivation = useNavigate()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  function onSubmit (values: z.infer<typeof signInSchema>) {
    console.log(values)
    const auth = {
      isLogged: checkAuth(values),
      tryings: isAuth.tryings + 1,
      message: ''
    }
    setIsAuth(auth)
    if (auth.isLogged) {
      nagivation('/inventario')
      return
    } else {
      setIsAuth({
        isLogged: false,
        message: 'Usuario o contraseña incorrectos.',
        tryings: auth.tryings
      })
    }
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
            name='password'
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
                    onClick={() => handleClickShowPassword()}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {isAuth.message !== '' && (
            <FormMessage className='text-red-500'>
              Usuario o contraseña incorrectos.
            </FormMessage>
          )}
          <Button variant={'default'} type='submit'>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
