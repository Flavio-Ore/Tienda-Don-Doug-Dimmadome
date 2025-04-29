import ReturnProductForm from '@/components/forms/ReturnProductForm'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryAllRefunds } from '@/states/doug-dimadon-tankstack-query/hooks/queries/refunds/useQueryAllRefunds'
import RefundCard from '@pages/return-product/components/RefundCard'
import { useMemo, useState } from 'react'
import { FaReceipt, FaSearch } from 'react-icons/fa'
import { FaHandHoldingDollar } from 'react-icons/fa6'

const ReturnProduct = () => {
  const {
    data: refunds,
    isLoading: isRefundsLoading,
    isError: isRefundsError
  } = useQueryAllRefunds()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedRefunds = useMemo(
    () =>
      refunds?.filter(
        p =>
          p.numeroSerie.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.cliente?.nombreCliente
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.proveedor?.nombre
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.fechaDevolucion
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.producto.nombre
            .toString()
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.cantidad.toString().includes(debouncedValue) ||
          p.tipoDevolucion.nombre
            .toLowerCase()
            .includes(debouncedValue.toLowerCase())
      ) ?? [],
    [debouncedValue, refunds]
  )
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
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

      <div className='common-inner_container'>
        <div className='common-container__title'>
          <FaReceipt size={56} className='fill-lime-500' />
          <div>
            <h2 className='text-light-2 text-2xl font-ubuntu'>
              Historial de devoluciones
            </h2>
            <p className='text-light-3 body-bold'>
              Las notas de crédito electrónicas generadas de devoluciones
              registradas hasta el {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
          <div className='flex items-center w-full max-w-5xl gap-y-6'>
            <h3 className='text-light-2 body-bold font-ubuntu'>
              Buscador de devoluciones
            </h3>
          </div>
          <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
            <FaSearch size={24} className='fill-light-3' />
            <Input
              type='search'
              placeholder='Buscar una devolución por producto, cliente, descripción, fecha, etc'
              className='border-light-3'
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isRefundsLoading && (
          <div className='w-full'>
            <LoaderIcon className='mx-auto' />
          </div>
        )}
        {isRefundsError && (
          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
            Hubo un error al cargar las devoluciones
          </p>
        )}
        {isTyping && refunds != null && searchedRefunds.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron devoluciones con el término de búsqueda "
            {debouncedValue}"
          </p>
        )}
        {!isTyping && refunds != null && refunds.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full animate-pulse'>
            No hay devoluciones registradas
          </p>
        )}
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
          {isTyping &&
            !isRefundsLoading &&
            !isRefundsError &&
            refunds != null &&
            searchedRefunds.length > 0 &&
            searchedRefunds.map(refund => (
              <RefundCard key={refund.numeroSerie} refund={refund} />
            ))}

          {!isTyping &&
            !isRefundsLoading &&
            !isRefundsError &&
            refunds != null &&
            refunds.length > 0 &&
            refunds.map(refund => (
              <RefundCard key={refund.numeroSerie} refund={refund} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ReturnProduct
