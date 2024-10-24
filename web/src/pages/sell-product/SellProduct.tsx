import SellProductForm from '@/components/forms/SellProductForm'
import { GiReceiveMoney } from 'react-icons/gi'

const SellProduct = () => {
  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        <GiReceiveMoney size={56} strokeWidth={0} className='fill-blue-400' />

        <div>
          <h2 className='text-light-2 text-2xl font-ubuntu'>Vender</h2>
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
