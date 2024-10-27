import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shadcn/button'
import { FaRegHandshake } from 'react-icons/fa6'
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
import CLIENTS_JSON from '@/mocks/clients.mock.json'
import { ICliente } from '@/types'
import { SellProductFormSchema } from '@/validations/sellProduct.schema'
import { PRIVATE_ROUTES, TYPE_PAYMENT_VALUES } from '@/values'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const clientData: ICliente[] = CLIENTS_JSON.map(client => client.data)

const SellProductForm = ({
  selectedProducts
}: {
  selectedProducts: Array<{
    id_producto: number
    cantidad: number
  }>
}) => {
  // const [products, setProducts] = useState<
  //   Array<{
  //     id_producto: number
  //     cantidad: number
  //   }>
  // >(selectedProducts)

  const { toast } = useToast()
  const navigate = useNavigate()

  const sellProductForm = useForm<z.infer<typeof SellProductFormSchema>>({
    resolver: zodResolver(SellProductFormSchema),
    defaultValues: {
      dni_cliente: 0,
      cantidad_total: 0,
      tipo_pago: undefined,
      productos: []
    }
  })

  const handleSellProductSubmit = async (
    value: z.infer<typeof SellProductFormSchema>
  ) => {
    try {
      console.log(value)
      toast({
        title: 'Producto vendido',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-900 p-4'>
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        )
      })
      navigate(PRIVATE_ROUTES.SELL_PRODUCT)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   sellProductForm.setValue(
  //     'cantidad_total',
  //     Number(
  //       sellProductForm.watch('cantidad') * sellProductForm.watch('cantidad')
  //     )
  //   )
  // }, [sellProductForm.watch('cantidad')])

  return (
    <Form {...sellProductForm}>
      <form
        onSubmit={sellProductForm.handleSubmit(handleSellProductSubmit)}
        className='flex flex-col gap-8 w-full max-w-5xl'
      >
        <FormField
          control={sellProductForm.control}
          name='dni_cliente'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Cliente</FormLabel>
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
                        ? clientData.find(
                            client => client.numero === field.value.toString()
                          )?.numero ?? 'Elige un cliente'
                        : 'Elige un cliente'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un cliente...' />
                    <CommandList>
                      <CommandEmpty>Cliente no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {clientData.map(client => (
                          <CommandItem
                            value={client.numero}
                            key={client.numero}
                            onSelect={() => {
                              sellProductForm.setValue(
                                'dni_cliente',
                                Number(client.numero)
                              )
                            }}
                          >
                            <BsCheck
                              className={cn(
                                'mr-2 h-4 w-4',
                                Number(client.numero) === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {client.nombre_completo}
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
          control={sellProductForm.control}
          name='tipo_pago'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Tipo de pago</FormLabel>
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
                        ? TYPE_PAYMENT_VALUES.find(
                            category => category === field.value
                          ) ?? 'Elige un tipo de pago'
                        : 'Elige un tipo de pago'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de comprobante...' />
                    <CommandList>
                      <CommandEmpty>Tipo de pago no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {TYPE_PAYMENT_VALUES.map(receiptType => (
                          <CommandItem
                            value={receiptType}
                            key={receiptType}
                            onSelect={() => {
                              sellProductForm.setValue('tipo_pago', receiptType)
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
        {/* <FormField
          control={sellProductForm.control}
          name='tipo_comprobante'
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
                          ) ?? 'Elige un tipo de comprobante'
                        : 'Elige un tipo de comprobante'}
                      <LuChevronsUpDown className='ml-2 h-4 w-4 shrink-0 fill-light-1' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                  <Command>
                    <CommandInput placeholder='Busca un tipo de comprobante...' />
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
                                    'tipo_comprobante',
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
        /> */}
        <div>
          <FormLabel className='shad-form_label'>Productos</FormLabel>
          <ul className='grid gap-2'>
            {products.map(product => (
              <li key={product.id_producto} className='flex items-center gap-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>{product.nombre}</CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className='flex flex-col gap-y-2 items-center'>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>
                          Precio unitario:{' '}
                        </span>
                        <span
                          className={cn('bg-dark-1 px-2 py-1 text-sm', {
                            'text-yellow-400': product. > 0
                          })}
                        >
                          S/{product.precioUnitario}
                        </span>
                      </li>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>Stock:</span>
                        <span
                          className={cn('bg-dark-1 px-2 py-1 text-sm', {
                            'text-blue-400': product.stock > 0,
                            'text-red-700': product.stock <= 0
                          })}
                        >
                          {product.stock} unidades
                        </span>
                      </li>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>Estado:</span>
                        <span
                          className={cn(
                            'bg-dark-1 px-2 py-1 rounded-md text-sm',
                            {
                              'text-green-400': product.estado === 'activo',
                              'text-red-400': product.estado === 'inactivo'
                            }
                          )}
                        >
                          {product.estado}
                        </span>
                      </li>

                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>Categoría:</span>
                        <span className='bg-dark-1 px-2 py-1 rounded-md text-sm'>
                          {product.categoria.nombre}
                        </span>
                      </li>
                      <li className='w-full inline-flex justify-between items-center'>
                        <span className='text-sm text-light-3'>
                          Fecha de vencimiento:
                        </span>
                        <span className='bg-dark-1 px-2 py-1 rounded-md text-sm'>
                          {
                            product.fechaVencimiento
                              .toLocaleString()
                              .split('T')[0]
                          }
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className='flex justify-center items-center'>
                    <Button variant='default'>Eliminar Producto</Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <FormField
          control={sellProductForm.control}
          name='cantidad_total'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Precio total</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  readOnly
                  placeholder='Cantidad total de productos a vender'
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
