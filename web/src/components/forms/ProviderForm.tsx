import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useMutationAddProvider } from '@/states/queries/hooks/mutations'
import { useQueryAllProductsCategories } from '@/states/queries/hooks/queries'
import { ProviderFormSchema } from '@/validations/forms/addProvider.schema'
import { PRIVATE_ROUTES } from '@/values'
import LoaderIcon from '@components/icons/LoaderIcon'
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form'
import { Input } from '@shadcn/input'
import { PhoneInput } from '@shadcn/phone-input'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsCheck } from 'react-icons/bs'
import { FaTruckArrowRight } from 'react-icons/fa6'
import { LuChevronsUpDown } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const ProviderForm = () => {
  const {
    data: productsCategory,
    isLoading: isLoadingProductsCategory,
    isError: isErrorProductsCategory
  } = useQueryAllProductsCategories()
  const {
    mutateAsync: addProvider,
    isPending,
    isError
  } = useMutationAddProvider()
  const navigate = useNavigate()
  const { toast } = useToast()
  const providerForm = useForm<z.infer<typeof ProviderFormSchema>>({
    resolver: zodResolver(ProviderFormSchema),
    defaultValues: {
      nombre: '',
      direccion: '',
      contacto: '',
      categoria: undefined
    }
  })
  const onSubmit = async (value: z.infer<typeof ProviderFormSchema>) => {
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
      if (isError) {
        toast({
          title: 'Error al agregar proveedor',
          variant: 'destructive'
        })
      }
      toast({
        title: 'Error al agregar proveedor',
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error al agregar proveedor',
        variant: 'destructive'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  // useEffect(() => {
  //   console.log({
  //     watchCategory
  //   })
  //   if (watchCategory == null) {
  //     providerForm.setError('categoria', {
  //       type: 'required',
  //       message: 'La categoría es obligatoria'
  //     })
  //   }
  // }, [watchCategory])

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
              <FormLabel className='shad-form_label'>Razón social</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Identificación del proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
              <FormDescription>
                El nombre de la empresa o razón social del proveedor
              </FormDescription>
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-center justify-between w-full'>
          <FormField
            control={providerForm.control}
            name='contacto'
            render={({ field }) => (
              <FormItem className='w-full'>
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
                {/*<FormDescription>
                  Número de contacto del proveedor
                </FormDescription> */}
              </FormItem>
            )}
          />
          <FormField
            control={providerForm.control}
            name='categoria'
            render={({ field }) => (
              <FormItem className='w-full'>
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
                          ? productsCategory?.find(
                              category =>
                                category?.idCategoria ===
                                field.value?.idCategoria
                            )?.nombre ?? 'Elige una categoría'
                          : 'Elige una categoría'}
                        <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                      <CommandInput placeholder='Busca una categoría...' />
                      {!isErrorProductsCategory &&
                        !isLoadingProductsCategory && (
                          <CommandEmpty>
                            Tipo de pago no encontrado
                          </CommandEmpty>
                        )}
                      <CommandList>
                        {!isErrorProductsCategory &&
                          !isLoadingProductsCategory &&
                          productsCategory != null &&
                          productsCategory.length <= 0 && (
                            <CommandEmpty>
                              No hay categorías disponibles
                            </CommandEmpty>
                          )}
                        <CommandGroup>
                          {isErrorProductsCategory && (
                            <CommandEmpty className='text-red-700 body-bold text-center w-full animate-pulse'>
                              Hubo un error al cargar las categorías
                            </CommandEmpty>
                          )}
                          {isLoadingProductsCategory && (
                            <CommandEmpty className='w-full my-4'>
                              <LoaderIcon className='mx-auto' />
                            </CommandEmpty>
                          )}
                          {productsCategory != null &&
                            !isLoadingProductsCategory &&
                            !isErrorProductsCategory &&
                            productsCategory.map(category => (
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
                {/* <FormDescription>
                  La categoría de productos que provee el proveedor
                </FormDescription> */}
              </FormItem>
            )}
          />
        </div>
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
              <FormDescription>Dirección física</FormDescription>
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
