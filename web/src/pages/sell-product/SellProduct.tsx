import SellProductForm from '@/components/forms/SellProductForm'
import LoaderIcon from '@/components/icons/LoaderIcon'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryAllSales } from '@/states/queries/hooks/queries'
import SaleCard from '@pages/sell-product/components/SaleCard'
import { useMemo, useState } from 'react'
import { FaReceipt, FaSearch } from 'react-icons/fa'
import { FaSackDollar } from 'react-icons/fa6'

const SellProduct = () => {
  const {
    data: sales,
    isLoading: isSalesLoading,
    isError: isSalesError
  } = useQueryAllSales()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const isTyping = searchValue !== ''
  const searchedSales = useMemo(
    () =>
      sales?.filter(
        p =>
          p.numeroSerie.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.tipoPago.nombre
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.costoTotal
            .toString()
            .toLowerCase()
            .includes(debouncedValue.toLowerCase()) ||
          p.fechaVenta.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          p.items.some(i =>
            i.producto.nombre
              .toLowerCase()
              .includes(debouncedValue.toLowerCase())
          ) ||
          p.cliente.nombreCliente
            .toLowerCase()
            .includes(debouncedValue.toLowerCase())
      ) ?? [],
    [debouncedValue, sales]
  )
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  return (
    <div className='common-container'>
      <div className='common-inner_container'>
        <div className='common-container__title'>
          <FaSackDollar size={56} className='fill-lime-500' />
          <div>
            <h2 className='text-light-2 text-2xl font-ubuntu'>
              Vender producto
            </h2>
            <p className='text-light-3 body-bold'>
              Registra la venta de un producto en el sistema.
            </p>
          </div>
        </div>
      </div>
      <div className='common-inner_container'>
        <SellProductForm />
      </div>

      <div className='common-inner_container'>
        <div className='common-container__title'>
          <FaReceipt size={56} className='fill-lime-500' />
          <div>
            <h2 className='text-light-2 text-2xl font-ubuntu'>
              Historial de ventas
            </h2>
            <p className='text-light-3 body-bold'>
              Las boletas electrónicas de ventas registradas hasta el{' '}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
          <div className='flex items-center w-full max-w-5xl gap-y-6'>
            <h3 className='text-light-2 body-bold font-ubuntu'>
              Buscador de ventas
            </h3>
          </div>
          <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
            <FaSearch size={24} className='fill-light-3' />
            <Input
              type='search'
              placeholder='Buscar una venta por id, producto, cliente, descripción, etc'
              className='border-light-3'
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        </div>

        {isSalesLoading && (
          <div className='w-full'>
            <LoaderIcon className='mx-auto' />
          </div>
        )}
        {isSalesError && (
          <p className='text-red-700 body-bold text-center w-full animate-pulse'>
            Hubo un error al cargar las ventas
          </p>
        )}
        {isTyping && sales != null && searchedSales.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron boletas de venta con el término de búsqueda "
            {debouncedValue}"
          </p>
        )}
        {!isTyping && sales != null && sales.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full animate-pulse'>
            No hay ventas registradas
          </p>
        )}
        <div className='w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-7 max-w-5xl'>
          {isTyping &&
            !isSalesLoading &&
            !isSalesError &&
            sales != null &&
            searchedSales.length > 0 &&
            searchedSales.map(sale => (
              <SaleCard key={sale.numeroSerie} sale={sale} />
            ))}

          {!isTyping &&
            !isSalesLoading &&
            !isSalesError &&
            sales != null &&
            sales.length > 0 &&
            sales.map(sale => <SaleCard key={sale.numeroSerie} sale={sale} />)}
        </div>
      </div>
    </div>
  )
}

export default SellProduct
