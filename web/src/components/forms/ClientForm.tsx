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

import { useToast } from '@/hooks/use-toast'
import { ClientFormSchema } from '@/validations/forms/addClient.schema'
import { PRIVATE_ROUTES } from '@/values'
import { FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ClientForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const addClientForm = useForm<z.infer<typeof ClientFormSchema>>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {
      numero_documento: '',
      nombre_cliente: '',
      direccion: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof ClientFormSchema>) => {
    try {
      console.log(value)
      toast({
        title: 'Cliente registrado exitosamente',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })
      navigate(PRIVATE_ROUTES.CLIENTS)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...addClientForm}>
      <form
        onSubmit={addClientForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={addClientForm.control}
          name='numero_documento'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>DNI</FormLabel>
              <FormControl>
                <Input type='text' placeholder='DNI del cliente' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={addClientForm.control}
          name='nombre_cliente'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Nombre completo</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre completo del cliente'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
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
            Agregar Cliente
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

export default ClientForm
