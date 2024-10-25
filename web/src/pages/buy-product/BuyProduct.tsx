import BuyProductForm from '@/components/forms/BuyProductForm'
import { FaTruckRampBox } from 'react-icons/fa6'

const BuyProduct = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <FaTruckRampBox size={56} className='fill-lime-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Comprar producto
          </h2>
          <p className='text-light-3 body-bold'>
            Registra una compra de producto hacia un proveedor.
          </p>
        </div>
      </div>
      <BuyProductForm />
    </div>
  )
}

export default BuyProduct
