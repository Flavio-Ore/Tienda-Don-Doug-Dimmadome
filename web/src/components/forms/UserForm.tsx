import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { LuChevronsUpDown } from 'react-icons/lu'

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

import { useToast } from '@/hooks/use-toast'
import useInventory from '@/states/inventory/hooks/useInventory'
import { UserSchema } from '@/validations/forms/addUser.schema'
import { PRIVATE_ROUTES } from '@/values'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const UserForm = () => {
  const { addUser, userTypes } = useInventory()
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const userForm = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      nombre: '',
      email: '',
      contrasena: '',
      tipoUsuario: undefined
    }
  })
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const onSubmit = async (value: z.infer<typeof UserSchema>) => {
    try {
      console.log(value)
      await addUser(value)
      toast({
        title: 'Usuario creado exitosamente',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })
      navigate(PRIVATE_ROUTES.USERS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...userForm}>
      <form
        onSubmit={userForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={userForm.control}
          name='nombre'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Nombre</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre del usuario'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={userForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Correo</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Correo del usuario'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={userForm.control}
          name='contrasena'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Contraseña</FormLabel>
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
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={userForm.control}
          name='tipoUsuario'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Tipo de Usuario</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        {
                          'text-light-3': !field.value
                        }
                      )}
                    >
                      {field.value?.nombre != null
                        ? userTypes.find(
                            returnType =>
                              returnType.idTipoUsuario ===
                              field.value.idTipoUsuario
                          )?.nombre ?? 'Elige un tipo de usuario'
                        : 'Elige un tipo de usuario'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de devolución...' />
                    <CommandList>
                      <CommandEmpty>
                        Tipo de usuario no encontrado.
                      </CommandEmpty>
                      <CommandGroup>
                        {userTypes.map(userType => (
                          <CommandItem
                            value={userType.nombre}
                            key={userType.idTipoUsuario}
                            onSelect={() => {
                              userForm.setValue('tipoUsuario', userType)
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                userType === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {userType.nombre}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
            Crear Usuario
            <FaUserPlus
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
