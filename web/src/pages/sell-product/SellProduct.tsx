import SellProductForm from '@/components/forms/SellProductForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { IProducto } from '@/types'
import { FaMoneyBillTrendUp, FaSackDollar } from 'react-icons/fa6'

import { useToast } from '@/hooks/use-toast'
import { useDebounce } from '@/hooks/useDebounce'
import PRODUCTS_JSON from '@/mocks/product.mock.json'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'

const productsData: IProducto[] = PRODUCTS_JSON

const SellProduct = () => {
  const [selectedProducts, setSelectedProducts] = useState<
    Array<{
      producto: IProducto
      cantidad: number
    }>
  >([])
  const { toast } = useToast()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedProductsData = useMemo(() => {
    return productsData.filter(product => {
      const upperCaseValue = debouncedValue.toLowerCase()
      const { nombre, categoria, fechaVencimiento, precioUnitario, stock } =
        product
      return (
        nombre.toLowerCase().includes(upperCaseValue) ||
        categoria.nombre.toLowerCase().includes(upperCaseValue) ||
        fechaVencimiento.toString().includes(upperCaseValue) ||
        precioUnitario.toString().includes(upperCaseValue) ||
        stock.toString().includes(upperCaseValue)
      )
    })
  }, [debouncedValue])
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        <FaSackDollar size={56} strokeWidth={0} className='fill-lime-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Vender producto</h2>
          <p className='text-light-3 body-bold'>
            Registra la venta de un producto en el sistema.
          </p>
        </div>
      </div>
      <SellProductForm />
      <div className='inline-flex gap-x-2'>
        <FaMoneyBillTrendUp size={56} className='fill-lime-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Productos vendidos
          </h2>
          <p className='text-light-3 body-bold'>
            Seguimiento de productos vendidos en el sistema
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold font-ubuntu'>
            Lista de ventas
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar producto por nombre, categoría, fecha de vencimiento, precio unitario o stock'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isTyping && searchedProductsData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron productos
        </p>
      )}
      {!isTyping && productsData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay productos en stock
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
        {isTyping &&
          searchedProductsData.length > 0 &&
          searchedProductsData.map(product => (
            <Card key={product.idProducto}>
              <CardHeader>
                <CardTitle>{product.nombre}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='flex flex-col gap-y-2 items-center'>
                  <li className='w-full inline-flex justify-between items-center'>
                    <span className='text-sm text-light-3'>
                      Precio unitario:
                    </span>
                    <span
                      className={cn('bg-dark-1 px-2 py-1 text-sm', {
                        'text-yellow-400': product.precioUnitario > 0
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
                      className={cn('bg-dark-1 px-2 py-1 rounded-md text-sm', {
                        'text-green-400': product.estado === 'activo',
                        'text-red-400': product.estado === 'inactivo'
                      })}
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
                      {product.fechaVencimiento.toLocaleString().split('T')[0]}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className='flex w-full justify-between items-center'>
                <Button
                  variant='secondary'
                  size='sm'
                  // onClick={() => handleAddProduct(product.idProducto)}
                >
                  Agregar a la venta
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  // onClick={() => handleRemoveProduct(product.idProducto)}
                >
                  Eliminar Producto
                </Button>
              </CardFooter>
            </Card>
          ))}

        {!isTyping &&
          productsData.length > 0 &&
          productsData.map(product => (
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
                        'text-yellow-400': product.precioUnitario > 0
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
                      className={cn('bg-dark-1 px-2 py-1 rounded-md text-sm', {
                        'text-green-400': product.estado === 'activo',
                        'text-red-400': product.estado === 'inactivo'
                      })}
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
                      {product.fechaVencimiento.toLocaleString().split('T')[0]}
                    </span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className='flex w-full justify-between items-center'>
                <Button
                  variant='secondary'
                  size='sm'
                  // onClick={() => handleAddProduct(product.idProducto)}
                >
                  Agregar a la venta
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  // onClick={() => handleRemoveProduct(product.idProducto)}
                >
                  Eliminar Producto
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default SellProduct
