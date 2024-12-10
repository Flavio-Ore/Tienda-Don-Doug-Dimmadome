import ReturnProductForm from '@/components/forms/ReturnProductForm'
import { FaHandHoldingDollar } from 'react-icons/fa6'

const ReturnProduct = () => {
  return (
    <div className='common-container'>
      <div className='max-w-5xl w-full mx-auto'>
        <div className='common-container__title'>
          <FaHandHoldingDollar size={56} className='min-w-14 fill-lime-500' />
          <div>
            <h2 className='text-light-2 text-2xl font-ubuntu'>
              Devolución de Producto
            </h2>
            <p className='text-light-3 body-bold'>
              Puede realizar dos tipos de devoluciones: una devolución recibida
              de producto por parte del cliente o una devolución entregada de
              producto a proveedor.
            </p>
          </div>
        </div>
      </div>
      <div className='common-inner_container'>
        <ReturnProductForm />
      </div>
    </div>
  )
}

export default ReturnProduct
