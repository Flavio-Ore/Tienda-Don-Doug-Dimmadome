import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shadcn/button';
import { FaRegHandshake } from "react-icons/fa6";
import { LuChevronsUpDown } from 'react-icons/lu';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@shadcn/form';
import { Input } from '@shadcn/input';
import { useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';
import { SellProductFormSchema } from '@/validations/sellProduct.schema';
import { PRIVATE_ROUTES, TYPE_RECEIPT, TYPE_RECEIPT_VALUES } from '@/values';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover';
import { BsCheck } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const SellProductForm = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const sellProductForm = useForm<z.infer<typeof SellProductFormSchema>>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      DNI: '',
      quantity: 1,
      typeReceipt: undefined
    }
  })

  const onSubmit = async (value: z.infer<typeof SellProductFormSchema>) => {
    console.log(value)
    try {
      toast({
        title: 'Venta exitosa',
        description: JSON.stringify(value),
      })
      navigate(PRIVATE_ROUTES.SELL_PRODUCT)
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...sellProductForm}>
      <form
        onSubmit={sellProductForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={sellProductForm.control}
          name='DNI'
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
          control={sellProductForm.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cantidad</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Cantidad de productos a vender'
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
          control={sellProductForm.control}
          name='typeReceipt'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>
                Tipo de Comprobante
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
                        ? TYPE_RECEIPT_VALUES.find(
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
                        {TYPE_RECEIPT_VALUES.map(
                          receiptType =>
                            (receiptType === TYPE_RECEIPT.BOLETA ||
                              receiptType === TYPE_RECEIPT.FACTURA) && (
                              <CommandItem
                                value={receiptType}
                                key={receiptType}
                                onSelect={() => {
                                  sellProductForm.setValue(
                                    'typeReceipt',
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
                            )
                        )}
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
            Vender
            <FaRegHandshake
              size={20}
              className='ml-2 fill-dark-1 group-focus-visible:fill-light-1'
            />
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SellProductForm
