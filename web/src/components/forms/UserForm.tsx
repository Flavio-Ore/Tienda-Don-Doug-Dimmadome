import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { LuChevronsUpDown } from 'react-icons/lu'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { useForm } from 'react-hook-form'

import { useToast } from '@/hooks/use-toast'
import { useMutationAddUser } from '@/states/queries/hooks/mutations'
import { useQueryAllUserTypes } from '@/states/queries/hooks/queries'
import { UserFormSchema } from '@/validations/forms/addUser.schema'
import LoaderIcon from '@components/icons/LoaderIcon'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useEffect, useState } from 'react'
import { BsCheck } from 'react-icons/bs'
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import type { z } from 'zod'

const UserForm = () => {
  const {
    data: userTypes,
    isLoading: isLoadingUserTypes,
    isError: isErrorUserTypes
  } = useQueryAllUserTypes()
  const { mutateAsync: addUser, isPending, isError } = useMutationAddUser()
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const userForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
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
  const onSubmit = async (value: z.infer<typeof UserFormSchema>) => {
    try {
      console.log(value)
      await addUser(value)
      toast({
        title: 'Usuario creado exitosamente',
        description: (
          <p>
            El usuario <strong>{value.nombre}</strong> ha sido creado
            exitosamente.
          </p>
        )
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error al crear el usuario',
        description:
          'Ocurrió un error al intentar crear el usuario. Por favor, intenta de nuevo.'
      })
    }

  }, [isError])

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
              <FormDescription>
                El nombre del usuario debe ser único.
              </FormDescription>
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
                  placeholder='usuario@dominio.com'
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
              <FormDescription>
                Considere números, mayúsculas, minúsculas y caracteres
                especiales como @, #, $, %, etc.
              </FormDescription>
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
                      {field.value != null
                        ? userTypes?.find(
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
                      {!isLoadingUserTypes && !isErrorUserTypes && (
                        <CommandEmpty>
                          Tipo de usuario no encontrado.
                        </CommandEmpty>
                      )}
                      {isLoadingUserTypes && (
                        <CommandEmpty>
                          <LoaderIcon className='mx-auto' />
                        </CommandEmpty>
                      )}
                      <CommandGroup>
                        {isErrorUserTypes && (
                          <CommandEmpty className='text-red-700 text-sm text-center w-full animate-pulse'>
                            Hubo un error al cargar los tipos de usuario
                          </CommandEmpty>
                        )}
                        {userTypes != null &&
                          !isLoadingUserTypes &&
                          !isErrorUserTypes &&
                          userTypes.length > 0 &&
                          userTypes.map(userType => (
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
        <div className='flex gap-4 items-center justify-between'>
          <Button
            type='button'
            variant='destructive'
            className='shad-button_dark_4 bg-red-900'
            onClick={() => {
              userForm.reset()
            }}
          >
            Limpiar Formulario
          </Button>
          <div className='inline-flex gap-x-4 items-center'>
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
              disabled={isPending}
              className='group focus-visible:bg-dark-3 focus-visible:text-light-1 '
            >
              {!isPending && 'Crear Usuario'}
              {!isPending && (
                <FaUserPlus
                  size={20}
                  className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
                />
              )}
              {isPending && <LoaderIcon />}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default UserForm
