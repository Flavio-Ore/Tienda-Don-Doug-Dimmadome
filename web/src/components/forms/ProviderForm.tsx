import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import useInventory from '@/states/inventory/hooks/useInventory'
import { useAddProvider } from '@/states/queries/hooks/mutations'
import { ProviderValidationSchema } from '@/validations/forms/addProvider.schema'
import { PRIVATE_ROUTES } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { PhoneInput } from '@shadcn/phone-input'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useForm } from 'react-hook-form'
import { BsCheck } from 'react-icons/bs'
import { FaTruckArrowRight } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import LoaderIcon from '../icons/LoaderIcon'

const ProviderForm = () => {
  const navigate = useNavigate()
  const { productsCategory } = useInventory()

  const { mutateAsync: addProvider, isPending } = useAddProvider()
  const { toast } = useToast()
  const providerForm = useForm<z.infer<typeof ProviderValidationSchema>>({
    resolver: zodResolver(ProviderValidationSchema),
    defaultValues: {
      nombre: '',
      direccion: '',
      contacto: '',
      categoria: {
        idCategoria: undefined
      }
    }
  })

  const onSubmit = async (value: z.infer<typeof ProviderValidationSchema>) => {
    try {
      console.log(value)
      await addProvider(value)
      toast({
        title: 'Proveedor agregado exitosamente',
        description: `Proovedor ${value.nombre} ha sido agregado correctamente.`,
        variant: 'confirmation'
      })
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
          name='nombre'
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
          name='contacto'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Teléfono</FormLabel>
              <FormControl>
                <PhoneInput
                  {...field}
                  defaultCountry='PE'
                  international
                  className='focus-visible:border focus-visible:border-light-1'
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={providerForm.control}
          name='direccion'
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
        <FormField
          control={providerForm.control}
          name='categoria'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Categoría del proveedor
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='ghost'
                      role='combobox'
                      className={cn(
                        'w-full justify-between outline outline-1 outline-light-3',
                        !field.value && 'text-light-3'
                      )}
                    >
                      {field.value?.idCategoria
                        ? productsCategory.find(
                            category =>
                              category?.idCategoria === field.value?.idCategoria
                          )?.nombre ?? 'Elige una categoría'
                        : 'Elige una categoría'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca una categoría...' />
                    <CommandList>
                      <CommandEmpty>Categoría no encontrada.</CommandEmpty>
                      <CommandGroup>
                        {productsCategory.map(category => (
                          <CommandItem
                            value={category.nombre}
                            key={category.idCategoria}
                            onSelect={() => {
                              providerForm.setValue('categoria', category)
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                category.idCategoria ===
                                  field.value?.idCategoria
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category.nombre}
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
            disabled={isPending}
            className='group focus-visible:bg-dark-3 focus-visible:text-light-1 '
          >
            {!isPending && 'Agregar Proveedor'}
            {!isPending && (
              <FaTruckArrowRight
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

export default ProviderForm
