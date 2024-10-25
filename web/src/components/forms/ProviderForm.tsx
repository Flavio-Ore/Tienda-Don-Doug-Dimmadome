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
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { ProviderValidationSchema } from '@/validations/addProvider.schema'
import { PRIVATE_ROUTES, PRODUCT_CATEGORIES_VALUES } from '@/values'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { PhoneInput } from '@shadcn/phone-input'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useForm } from 'react-hook-form'
import { BsCheck } from 'react-icons/bs'
import { LuChevronsUpDown } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ProviderForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
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
    try {
      console.log(value)
      toast({
        title: 'Producto comprado',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
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
        <FormField
          control={providerForm.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Categoría del Proveedor
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
                      {field.value
                        ? PRODUCT_CATEGORIES_VALUES.find(
                            category => category === field.value
                          ) ?? 'Elige una categoría'
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
                        {PRODUCT_CATEGORIES_VALUES.map(category => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => {
                              providerForm.setValue('category', category)
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                category === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {category}
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
