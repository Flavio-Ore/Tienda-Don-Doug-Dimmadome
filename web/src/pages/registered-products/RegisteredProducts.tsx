import useInventory from '@/states/inventory/hooks/useInventory'
import { TbPackages } from 'react-icons/tb'
import ProductItem from './components/ProductItem'
const RegisteredProducts = () => {
  const { products } = useInventory()
  return (
    <section className='common-container'>
      <div className='inline-flex gap-x-2'>
        <TbPackages size={56} strokeWidth={1.25} className='stroke-blue-400' />
        <div>
          <h2 className='text-light-2 text-2xl'>Productos Registrados</h2>
          <p className='text-light-3 body-bold'>
            A continuación se muestra una lista de los productos que se tienen
            registrados en el sistema.
          </p>
          {products.length <= 0 && (
            <p className='text-light-3 body-bold'>
              No hay productos registrados
            </p>
          )}
        </div>
      </div>
      <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
        {products.map(product => (
          <ProductItem key={product.id_producto} product={product} />
        ))}
      </div>
    </section>
  )
}

export default RegisteredProducts
