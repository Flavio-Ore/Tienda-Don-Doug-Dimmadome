import ProductForm from '@/components/forms/ProductForm'
import { TbCubePlus } from 'react-icons/tb'

const ProductRegistration = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <TbCubePlus size={56} className='stroke-blue-400' strokeWidth={1.5} />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Agrega un Producto al Inventario
          </h2>
          <p className='text-light-3 body-bold'>
            Llena los campos con la información del producto para la creación de
            una tabla Kardex.
          </p>
        </div>
      </div>
      <ProductForm />
    </div>
  )
}

export default ProductRegistration
