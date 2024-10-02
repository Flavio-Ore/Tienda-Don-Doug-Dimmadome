import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import useInventory from '@/states/inventory/hooks/useInventory'
import { Button } from '@shadcn/button'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { TbTable } from 'react-icons/tb'

const RegisteredKardexs = () => {
  const { getAllKardexs, searchKardex, products } = useInventory()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  const kardexs = getAllKardexs()
  const searchedKardexs = searchKardex({ searchTerm: debouncedValue })
  console.log({
    kardexs
  })
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
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
      </div>

      {kardexs.length === 0 && (
        <h2 className='text-light-2 text-2xl'>No hay Kardex registrados</h2>
      )}

      {isTyping &&
        searchedKardexs.map(kardex => (
          <div key={kardex.id_kardex} className='flex flex-col p-5 gap-y-2'>
            <h2 className='text-xl'>
              Producto:
              <span className='bg-dark-1 p-2 rounded-md'>
                {
                  products.find(
                    product => product.id_producto === kardex.id_producto
                  )?.nombre_producto
                }
              </span>
            </h2>
            <h4 className='text-lg'>
              Fecha de Inventario:{' '}
              <time className='bg-dark-1 p-2 rounded-md'>
                {kardex.periodo_kardex}
              </time>
            </h4>
            <h4 className='text-lg'>
              Descripción: <span className='text-sm'>{kardex.descripcion}</span>
            </h4>
            <Button onClick={() => {}} variant='default' className='mt-4'>
              Refrescar Tabla
            </Button>
          </div>
        ))}
      {!isTyping &&
        kardexs.map(kardex => (
          <div key={kardex.id_kardex} className='flex flex-col p-5 gap-y-2'>
            <h2 className='text-xl'>
              Producto:{' '}
              <span className='bg-dark-1 p-2 rounded-md'>
                {
                  products.find(
                    product => product.id_producto === kardex.id_producto
                  )?.nombre_producto
                }
              </span>
            </h2>
            <h4 className='text-lg'>
              Fecha de Inventario:{' '}
              <time className='bg-dark-1 p-2 rounded-md'>
                {kardex.periodo_kardex}
              </time>
            </h4>
            <h4 className='text-lg'>
              Descripción: <span className='text-sm'>{kardex.descripcion}</span>
            </h4>
            <Button onClick={() => {}} variant='default' className='mt-4'>
              Refrescar Tabla
            </Button>
            <hr className='border-light-3 mt-5' />
          </div>
        ))}
    </div>
  )
}

export default RegisteredKardexs
