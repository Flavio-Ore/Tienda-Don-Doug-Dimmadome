
import ProductForm from '@/components/forms/ProductForm'

const NewProduct = () => {
  return (
    <div className='common-container'>
      <ProductForm />
      <div className='w-full'>
        <h2 className='text-light-2 text-2xl'>Productos en Inventario</h2>
        <h4 className='text-light-3 body-bold'>
          A continuación se muestra una lista de los productos que se tienen
          registrados en el sistema.
        </h4>
        <div className='flex flex-col p-5 gap-y-2'>
          <h2 className='text-xl'>
            Producto:
            <span className='bg-dark-1 p-2 rounded-md'>
              {' '}
              Paquete de Latas Leche Gloria
            </span>
          </h2>
          <h4 className='text-lg'>
            Fecha de Inventario:{' '}
            <time className='bg-dark-1 p-2 rounded-md'>2021-10-30</time>
          </h4>
          <h4 className='text-lg'>
            Descripción:{' '}
            <span className='text-sm'>
              Producto de la marca Gloria, contiene 12 latas de leche evaporada
              de 400 gramos cada una.
            </span>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
