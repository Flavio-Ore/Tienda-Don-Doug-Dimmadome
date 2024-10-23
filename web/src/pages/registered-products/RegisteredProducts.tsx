import { useDebounce } from '@/hooks/useDebounce'
import ProductItem from '@/pages/registered-products/components/ProductItem'
import useInventory from '@/states/inventory/hooks/useInventory'
import { Input } from '@shadcn/input'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { TbPackages } from 'react-icons/tb'

const RegisteredProducts = () => {
  const { products, searchProducts } = useInventory()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  const searchedKardexs = searchProducts({ searchTerm: debouncedValue })
  console.log({
    searchProducts
  })
  return (
    <section className='common-container'>
      <div className='inline-flex gap-x-2'>
        <TbPackages size={56} strokeWidth={1.25} className='stroke-blue-400' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Productos Registrados</h2>
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
      {isTyping && searchedKardexs.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No se encontraron productos
        </p>
      )}
      {!isTyping && products.length <= 0 && (
        <p className='text-light-3 body-bold text-center w-full'>
          No hay productos registrados
        </p>
      )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
        {isTyping &&
          searchedKardexs.length > 0 &&
          searchedKardexs.map(product => (
            <ProductItem key={product.id_producto} product={product} />
          ))}

        {!isTyping &&
          products.length > 0 &&
          products.map(product => (
            <ProductItem key={product.id_producto} product={product} />
          ))}
      </div>
    </section>
  )
}

export default RegisteredProducts
