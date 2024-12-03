import LoaderIcon from '@/components/icons/LoaderIcon'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryAllProducts } from '@/states/queries/hooks/queries'
import ProductCard from '@pages/products/components/ProductCard'
import { Input } from '@shadcn/input'
import { useMemo, useState } from 'react'
import { FaBoxOpen, FaSearch } from 'react-icons/fa'


const Products = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError
  } = useQueryAllProducts()

  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const filteredProducts = useMemo(
    () =>
      products?.filter(
        p =>
          p.nombre.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.categoria.toString().includes(debouncedValue) ||
          p.precioUnitario.toString().includes(debouncedValue) ||
          p.stock.toString().includes(debouncedValue) ||
          p.fechaVencimiento.toString().includes(debouncedValue) ||
          p.estado.toLowerCase().includes(debouncedValue.toLowerCase())
      ) ?? [],
    [debouncedValue, products]
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
          <FaSearch size={24} className='fill-light-3' />
          <Input
            type='search'
            placeholder='Buscar productos por nombre, precio, etc.'
            className='border-light-3'
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>
      {/* <div>
        {!isProductsLoading && !isProductsError && products != null && (
          <ProductDataTable products={products} />
        )}
      </div> */}
      {isProductsLoading && (
        <div className='w-full'>
          <LoaderIcon className='mx-auto' />
        </div>
      )}
      {isProductsError && (
        <p className='text-red-700 body-bold text-center w-full animate-pulse'>
          Hubo un error al cargar los productos
        </p>
      )}
      {isTyping &&
        !isProductsError &&
        !isProductsLoading &&
        products != null &&
        filteredProducts.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron productos
          </p>
        )}
      {!isTyping &&
        !isProductsError &&
        !isProductsLoading &&
        products != null &&
        products.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full animate-pulse'>
            No hay productos registrados
          </p>
        )}
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
        {isTyping &&
          !isProductsError &&
          !isProductsLoading &&
          filteredProducts.length > 0 &&
          filteredProducts.map(product => (
            <ProductCard
              key={product.idProducto}
              product={{
                ...product,
                fechaVencimiento: new Date(product.fechaVencimiento)
              }}
            />
          ))}

        {!isTyping &&
          !isProductsError &&
          !isProductsLoading &&
          products != null &&
          products.length > 0 &&
          products.map(product => (
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
