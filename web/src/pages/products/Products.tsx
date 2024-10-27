import { useDebounce } from '@/hooks/useDebounce'
import PRODUCTS_JSON from '@/mocks/product.mock.json'
import ProductCard from '@pages/products/components/ProductCard'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaBoxOpen } from 'react-icons/fa'

const productsData = PRODUCTS_JSON

const Products = () => {
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const filteredProducts = useMemo(
    () =>
      productsData.filter(product => {
        const { nombre, precioUnitario, stock, estado } = product
        const searchValue = debouncedValue.toLowerCase()
        return (
          nombre.toLowerCase().includes(searchValue) ||
          precioUnitario.toString().includes(searchValue) ||
          stock.toString().includes(searchValue) ||
          estado.toLowerCase().includes(searchValue)
        )
      }),
    [debouncedValue]
  )

  const isTyping = searchValue !== ''
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  return (
    <section className='common-container'>
      <div className='inline-flex gap-x-2'>
        <FaBoxOpen size={56} strokeWidth={1.25} className='fill-violet-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Productos Registrados
          </h2>
          <p className='text-light-3 body-bold'>
            A continuación se muestra una lista de los productos que se tienen
            registrados en el sistema.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold font-ubuntu'>
            Búsqueda global de Productos
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar productos por nombre, precio, etc.'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {isTyping && filteredProducts.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron productos
        </p>
      )}
      {!isTyping && productsData.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay productos registrados
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
        {isTyping &&
          productsData.length > 0 &&
          productsData.map(product => (
            <ProductCard
              key={product.idProducto}
              product={{
                ...product,
                fechaVencimiento: new Date(product.fechaVencimiento)
              }}
            />
          ))}

        {!isTyping &&
          productsData.length > 0 &&
          productsData.map(product => (
            <ProductCard
              key={product.idProducto}
              product={{
                ...product,
                fechaVencimiento: new Date(product.fechaVencimiento)
              }}
            />
          ))}
      </div>
    </section>
  )
}

export default Products