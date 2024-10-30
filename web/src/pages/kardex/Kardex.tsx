import LoaderIcon from '@/components/icons/LoaderIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQueryAllKardexs } from '@/states/queries/hooks/queries'
import { type IKardex } from '@/types'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Fragment, useMemo } from 'react'
import { FaClipboardList, FaSearch } from 'react-icons/fa'
import { FaTableCellsRowLock } from 'react-icons/fa6'
import TableKardex from './components/TableKardex'

const columnHelper = createColumnHelper<IKardex>()

const Kardex = () => {
  const {
    data: kardexs,
    isLoading: isLoadingKardexs,
    isError: isErrorKardexs,
    refetch
  } = useQueryAllKardexs()
  const columns = useMemo<ColumnDef<IKardex>[]>(
    () => [
      columnHelper.group({
        id: 'idKardex',
        columns: [
          columnHelper.accessor('idKardex', {
            header: 'ID',
            cell: info => <span>{info.getValue()}</span>
          })
        ]
      }),
      columnHelper.group({
        id: 'documento',
        header: 'Datos de la Operación',
        columns: [
          columnHelper.accessor('fecha', {
            header: 'Fecha',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('empresa', {
            header: 'Empresa',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('producto', {
            header: 'Producto',
            cell: info => <span>{info.getValue().nombre}</span>
          })
        ]
      }),
      columnHelper.group({
        id: 'tipoOperacion',
        columns: [
          columnHelper.accessor('tipoOperacion', {
            header: 'Tipo de Operación',
            cell: info => <span>{info.getValue()}</span>
          })
        ]
      }),
      columnHelper.group({
        id: 'Entradas',
        header: () => <div className='text-center'>Entradas</div>,
        columns: [
          columnHelper.accessor('cantidadEntrada', {
            id: 'cantidadEntrada',
            header: 'CANT.',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoUnitarioEntrada', {
            id: 'costoUnitarioEntrada',
            header: 'C.U',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoTotalEntrada', {
            id: 'costoTotalEntrada',
            header: 'C.T',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Salidas',
        header: () => <div className='text-center'>Salidas</div>,
        columns: [
          columnHelper.accessor('cantidadSalida', {
            id: 'cantidadSalida',
            header: 'CANT.',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoUnitarioSalida', {
            id: 'costo_unitario_salidas',
            header: 'C.U',
            cell: info => {
              // if (info.row.original.tipoOperacion === 'Venta') {
              // }
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoTotalSalida', {
            id: 'costoTotalSalida',
            header: 'C.T',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Saldo',
        header: () => <div className='text-center'>Saldos</div>,
        columns: [
          columnHelper.accessor('cantidadSaldo', {
            id: 'cantidadSaldo',
            header: 'CANT.',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('costoUnitarioSaldo', {
            id: 'costoUnitarioSaldo',
            header: 'C.U',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('costoTotalSaldo', {
            id: 'costoTotalSaldo',
            header: 'C.T',
            cell: info => <span>{info.getValue()}</span>
          })
        ]
      })
    ],
    []
  )

  // const table = useReactTable<IKardex>({
  //   data: kardexs,
  //   columns,
  //   getCoreRowModel: getCoreRowModel()
  // })

  const filteredKardexsByProducts = useMemo(() => {
    const groupedKardexMap = new Map<number, IKardex[]>()

    kardexs?.forEach(kardex => {
      const productId = kardex.producto.idProducto
      if (!groupedKardexMap.has(productId)) {
        groupedKardexMap.set(productId, [])
      }
      groupedKardexMap.get(productId)?.push(kardex)
    })

    return Array.from(groupedKardexMap.values())
  }, [kardexs])

  console.log({
    filteredKardexsByProducts
  })

  return (
    <div className='common-container'>
      <div className='inline-flex gap-x-2'>
        {' '}
        <FaTableCellsRowLock size={56} className='fill-blue-500' />
        <div>
          <h3 className='text-light-2 text-2xl'>Productos en Inventario</h3>
          <p className='text-light-3 body-bold'>
            Tablas de Kardex de productos en inventario.
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center w-full max-w-5xl gap-y-2'>
        <div className='flex items-center w-full max-w-5xl gap-6'>
          <h3 className='text-light-2 body-bold'>
            Buscar productos en el inventario
          </h3>
        </div>
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-4'>
          <FaSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar productos por nombre'
            className='border-light-3'
          />
        </div>
      </div>
      {isErrorKardexs && (
        <p className='text-red-700 body-bold text-center w-full animate-pulse'>
          Hubo un error al cargar los kardexs de inventario
        </p>
      )}
      {isLoadingKardexs && (
        <div className='w-full'>
          <LoaderIcon className='mx-auto' />
        </div>
      )}
      {filteredKardexsByProducts.map((kardex, index) => (
        <Fragment key={index}>
          <section>
            <div className='flex flex-wrap justify-between items-center w-full mb-4 gap-x-4 gap-y-4'>
              <div className='inline-flex gap-x-4 items-center'>
                <FaClipboardList size={36} className='fill-blue-500' />
                <h3 className='text-light-2 font-ubuntu text-3xl'>
                  {kardex[0].producto.nombre}
                </h3>
              </div>
              <Button variant='secondary' onClick={() => refetch()}>
                Refrescar
              </Button>
            </div>
            <TableKardex columns={columns} data={kardex} />
          </section>
          <hr className='border-light-3 mt-5' />
        </Fragment>
      ))}
      {/* <TableKardex columns={columns} data={kardexs} />
      <hr className='border-light-3 mt-5' /> */}
    </div>
  )
}

export default Kardex
