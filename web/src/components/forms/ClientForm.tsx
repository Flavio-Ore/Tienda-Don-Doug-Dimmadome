import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'

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
import { useMutationAddClient } from '@/states/queries/hooks/mutations'
import { ClientFormSchema } from '@/validations/forms/addClient.schema'
import LoaderIcon from '@components/icons/LoaderIcon'
import { useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ClientForm = () => {
  const {
    mutateAsync: saveCliente,
    isPending,
    isError
  } = useMutationAddClient()
  const { toast } = useToast()
  const navigate = useNavigate()

  const addClientForm = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      dni: '',
      direccion: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof ClientFormSchema>) => {
    try {
      console.log(value)
      const savedClient = await saveCliente(value)
      if (savedClient.status >= 400) {
        toast({
          title: 'Error al registrar el cliente',
          description: 'Puede que el cliente ya exista, verifique',
          variant: 'action'
        })
        return
      }
      toast({
        title: 'Cliente registrado exitosamente',
        description: (
          <p>
            El cliente con DNI <b>{value.dni}</b> ha sido registrado
            exitosamente.
          </p>
        )
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error al registrar el cliente, puede que ya exista, verifique',
        variant: 'action'
      })
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error al registrar el cliente',
        variant: 'destructive'
      })
    }
  }, [isError])

  return (
    <Form {...addClientForm}>
      <form
        onSubmit={addClientForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={addClientForm.control}
          name='dni'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>DNI</FormLabel>
              <FormControl>
                <Input type='text' placeholder='DNI del cliente' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
              <FormDescription>Documento Nacional de Identidad</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={addClientForm.control}
          name='direccion'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Dirección</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Dirección del cliente'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
              <FormDescription>La direccion es opcional</FormDescription>
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
            {!isPending && 'Agregar Cliente'}
            {!isPending && (
              <FaUserPlus
                size={20}
                className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
              />
            )}
            {isPending && <LoaderIcon />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ClientForm
