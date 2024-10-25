import ProductForm from '@/components/forms/ProductForm'
import { FaParachuteBox } from 'react-icons/fa'

const ProductRegistration = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <FaParachuteBox size={56} className='fill-violet-500' strokeWidth={1.5} />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Registra un producto
          </h2>
          <p className='text-light-3 body-bold'>
            Agregar un nuevo producto al sistema, el cual tendrá su propio control de stock y movimientos.
          </p>
        </div>
      </div>
      <ProductForm />
    </div>
  )
}

export default ProductRegistration
