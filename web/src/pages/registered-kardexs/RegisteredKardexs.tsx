import { Input } from '@/components/ui/input'
import { Button } from '@shadcn/button'
import { CiSearch } from 'react-icons/ci'
import { TbTable } from 'react-icons/tb'

const RegisteredKardexs = () => {
  return (
    <div className='common-container'>
      <div className='common-container__title'>
        <TbTable size={56} className='stroke-blue-400' />
        <div>
          <h3 className='text-light-2 text-2xl'>
            Lista de Kardex de Inventario
          </h3>
          <p className='text-light-3 body-bold'>
            Lista de todos los kardex registrados hasta la fecha en el sistema.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
        <div className='flex items-center w-full max-w-5xl gap-y-6'>
          <h3 className='text-light-2 body-bold'>Búsqueda global de Kardex</h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar Kardex por producto, fecha, etc.'
            className='border-light-3'
          />
        </div>
      </div>
      <hr className='border-light-3 mt-5' />
      <div className='flex flex-col p-5 gap-y-2'>
        <h2 className='text-xl'>
          Producto:{' '}
          <span className='bg-dark-1 p-2 rounded-md'>
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
            Producto de la marca Gloria, contiene 12 latas de leche evaporada de
            400 gramos cada una.
          </span>
        </h4>

        {/* <Kardex columns={columns} data={inventory} /> */}
        <Button onClick={() => {}} variant='default' className='mt-4'>
          Refrescar Tabla
        </Button>
      </div>
      <hr className='border-light-3 mt-5' />
    </div>
  )
}

export default RegisteredKardexs
