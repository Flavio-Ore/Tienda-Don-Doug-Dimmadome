import SellProductForm from '@/components/forms/SellProductForm'
import { FaSackDollar } from 'react-icons/fa6'


const SellProduct = () => {
  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        <FaSackDollar  size={56} strokeWidth={0} className='fill-lime-500' />
        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Vender Producto</h2>
          <p className='text-light-3 body-bold'>
            Registra la venta de un producto en el sistema.
          </p>
        </div>
      </div>
      <SellProductForm />
    </div>
  )
}

export default SellProduct
