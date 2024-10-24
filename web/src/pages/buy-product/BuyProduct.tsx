import BuyProductForm from '@/components/forms/BuyProductForm'
import { BsCartPlus } from 'react-icons/bs'

const BuyProduct = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <BsCartPlus size={56} className='fill-blue-400' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>
            Registrar Compra de Producto
          </h2>
          <p className='text-light-3 body-bold'>
            Registra la compra realizada por un cliente o proovedor en el sistema.
          </p>
        </div>
      </div>
      <BuyProductForm />
    </div>
  )
}

export default BuyProduct
