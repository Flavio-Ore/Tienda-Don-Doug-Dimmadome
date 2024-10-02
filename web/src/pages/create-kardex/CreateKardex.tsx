import KardexForm from '@/components/forms/KardexForm'
import { TbTablePlus } from 'react-icons/tb'

const CreateKardex = () => {
  return (
    <section className='common-container'>
      <div className='common-container__title'>
        <TbTablePlus size={56} className='stroke-blue-400' />
        <div>
          <h2 className='text-light-2 text-2xl'>Crear Nuevo Kardex</h2>
          <p className='text-light-3 body-bold'>
            Llena los campos con la información del producto para la creación de
            un nuevo registro Kardex.
          </p>
        </div>
      </div>
      <KardexForm />
    </section>
  )
}

export default CreateKardex
