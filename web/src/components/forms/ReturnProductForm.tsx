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

import { ReturnProductFormSchema } from '@/validations/returnProduct.schema'
import { PRIVATE_ROUTES, TYPE_RETURNS_VALUES } from '@/values'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { BsCheck } from 'react-icons/bs'
import { GoPackageDependents } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '../ui/textarea'

const ReturnProductForm = () => {
  const navigate = useNavigate()

  const returnProductForm = useForm<z.infer<typeof ReturnProductFormSchema>>({
    resolver: zodResolver(ReturnProductFormSchema),
    defaultValues: {
      DNI: '',
      product: '',
      quantity: 1,
      typeReturn: undefined,
      description: ''
    }
  })

  const onSubmit = async (value: z.infer<typeof ReturnProductFormSchema>) => {
    try {
      console.log(value)
      navigate(PRIVATE_ROUTES.RETURN_PRODUCT)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...returnProductForm}>
      <form
        onSubmit={returnProductForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={returnProductForm.control}
          name='DNI'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>DNI</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='DNI del cliente o proveedor'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={returnProductForm.control}
          name='product'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Producto</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Nombre del producto a devolver'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={returnProductForm.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Cantidad de productos a devolver'
                  min={0}
                  {...field}
                  onChange={e => {
                    field.onChange(Number(e.target.value))
                  }}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />
        <FormField
          control={returnProductForm.control}
          name='typeReturn'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Tipo de Devolución
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
                        ? TYPE_RETURNS_VALUES.find(
                            returnType => returnType === field.value
                          ) ?? 'Elige un tipo de devolución'
                        : 'Elige un tipo de devolución'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de devolución...' />
                    <CommandList>
                      <CommandEmpty>
                        Tipo de devolución no encontrada.
                      </CommandEmpty>
                      <CommandGroup>
                        {TYPE_RETURNS_VALUES.map(receiptType => (
                          <CommandItem
                            value={receiptType}
                            key={receiptType}
                            onSelect={() => {
                              returnProductForm.setValue(
                                'typeReturn',
                                receiptType
                              )
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                receiptType === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {receiptType}
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
        <FormField
          control={returnProductForm.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción de la devolución'
                  {...field}
                  className='w-full h-40 resize-none bg-dark-1 text-light-1 p-3 rounded-md outline-none'
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
            Devolver Producto
            <GoPackageDependents
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ReturnProductForm
