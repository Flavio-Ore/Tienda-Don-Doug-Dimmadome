import { Input } from '@/components/ui/input'
import useInventory from '@/states/inventory/hooks/useInventory'
import { type IKardex } from '@/types'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FaTableCellsRowLock } from 'react-icons/fa6'
import TableKardex from './components/TableKardex'

const columnHelper = createColumnHelper<IKardex>()

const Kardex = () => {
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
            header: 'Cantidad',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoUnitarioEntrada', {
            id: 'costoUnitarioEntrada',
            header: 'Costo Unitario',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoTotalEntrada', {
            id: 'costoTotalEntrada',
            header: 'Costo Total',
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
            header: 'Cantidad',
            cell: info => {
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoUnitarioSalida', {
            id: 'costo_unitario_salidas',
            header: 'Costo Unitario',
            cell: info => {
              // if (info.row.original.tipoOperacion === 'Venta') {
              // }
              return <span>{info.getValue()}</span>
            }
          }),
          columnHelper.accessor('costoTotalSalida', {
            id: 'costoTotalSalida',
            header: 'Costo Total',
            cell: info => {
              // if (info.row.original.tipoOperacion === 'Venta') {
              // }
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
            header: 'Cantidad',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('costoUnitarioSaldo', {
            id: 'costoUnitarioSaldo',
            header: 'Costo Unitario',
            cell: info => <span>{info.getValue()}</span>
          }),
          columnHelper.accessor('costoTotalSaldo', {
            id: 'costoTotalSaldo',
            header: 'Costo Total',
            cell: info => <span>{info.getValue()}</span>
          })
        ]
      })
    ],
    []
  )
  const { kardexs, getKardexsByProducts } = useInventory()
  // const table = useReactTable<IKardex>({
  //   data: kardexs,
  //   columns,
  //   getCoreRowModel: getCoreRowModel()
  // })
  const kardexByProduct = kardexs.map(kardex =>
    getKardexsByProducts({
      productId: kardex.producto.idProducto
    })
  )

  console.log({
    kardexByProduct
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
      <hr className='border-light-3 mt-5' />
      {kardexByProduct.map(kardex => {
        return (
          <div
            key={kardex
              .map(k => k.producto.idProducto + k.producto.nombre)
              .join()}
          >
            <div className='flex flex-col p-5 gap-y-2'>
              <h3 className='text-light-2 body-bold'>
                Kardex de {kardex[0].producto.nombre}
              </h3>
            </div>
            <TableKardex columns={columns} data={kardex} />
            <hr className='border-light-3 mt-5' />
          </div>
        )
      })}
      {/* <TableKardex columns={columns} data={kardexs} />
      <hr className='border-light-3 mt-5' /> */}
    </div>
  )
}

export default Kardex
