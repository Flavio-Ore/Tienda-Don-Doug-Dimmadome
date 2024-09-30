import Kardex from '@/components/Kardex'
import { Input } from '@/components/ui/input'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { TbPackages } from 'react-icons/tb'

type TipoComprobante = 'Factura' | 'Recibo por honorarios' |'Boleta de venta'
type TipoOperacion = 'Compra' | 'Venta' | 'Devolución recibida' | 'Devolución entregada'
type InventoryItem = {
  item: string
  fecha: string
  tipo_comprobante: TipoComprobante
  serie: string
  numero: number
  tipo_operacion: TipoOperacion
  cantidad: number
  costo_unitario: number
  costo_total: number
}

const inventory: InventoryItem[] = [
  {
    item: 'K-01',
    fecha: '2021-10-01',
    tipo_comprobante: 'Factura',
    serie: 'A-01',
    numero: 1,
    tipo_operacion: 'Compra',
    cantidad: 10,
    costo_unitario: 100,
    costo_total: 1000
  },
  {
    item: 'K-02',
    fecha: '2021-10-05',
    tipo_comprobante: 'Factura',
    serie: 'A-02',
    numero: 2,
    tipo_operacion: 'Venta',
    cantidad: 5,
    costo_unitario: 120,
    costo_total: 600
  },
  {
    item: 'K-03',
    fecha: '2021-10-10',
    tipo_comprobante: 'Boleta de venta',
    serie: 'A-03',
    numero: 3,
    tipo_operacion: 'Compra',
    cantidad: 20,
    costo_unitario: 80,
    costo_total: 1600
  },
  {
    item: 'K-04',
    fecha: '2021-10-15',
    tipo_comprobante: 'Factura',
    serie: 'A-04',
    numero: 4,
    tipo_operacion: 'Devolución entregada',
    cantidad: -3,
    costo_unitario: 90,
    costo_total: 270
  },
  {
    item: 'K-05',
    fecha: '2021-10-20',
    tipo_comprobante: 'Factura',
    serie: 'A-05',
    numero: 5,
    tipo_operacion: 'Devolución entregada',
    cantidad: -15,
    costo_unitario: 110,
    costo_total: 1650
  },
  {
    item: 'K-06',
    fecha: '2021-10-25',
    tipo_comprobante: 'Factura',
    serie: 'A-06',
    numero: 6,
    tipo_operacion: 'Venta',
    cantidad: 8,
    costo_unitario: 130,
    costo_total: 1040
  }
]

const columnHelper = createColumnHelper<InventoryItem>()

const Inventory = () => {
  const columns = useMemo<ColumnDef<InventoryItem>[]>(
    () => [
      columnHelper.group({
        id: 'item',
        columns: [
          columnHelper.accessor('item', {
            header: 'Item',
            cell: info => info.getValue()
          })
        ]
      }),
      columnHelper.group({
        id: 'documento',
        header:
          'Documento de traslado, comprobante de pago, documento interno similar',
        columns: [
          columnHelper.accessor('fecha', {
            header: 'Fecha',
            cell: info => info.getValue()
          }),
          columnHelper.accessor('tipo_comprobante', {
            header: 'Tipo Comprobante',
            cell: info => info.getValue()
          }),
          columnHelper.accessor('serie', {
            header: 'Serie',
            cell: info => info.getValue()
          }),
          columnHelper.accessor('numero', {
            header: 'Número',
            cell: info => info.getValue()
          })
        ]
      }),
      columnHelper.group({
        id: 'tipo_operacion',
        columns: [
          columnHelper.accessor('tipo_operacion', {
            header: 'Tipo de Operación',
            cell: info => info.getValue()
          })
        ]
      }),

      columnHelper.group({
        id: 'Entradas',
        header: () => <div className='text-center'>Entradas</div>,
        columns: [
          columnHelper.accessor('cantidad', {
            id: 'cantidad_entradas',
            header: 'Cantidad',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Compra')) {
                return info.getValue()
              }
            }
          }),
          columnHelper.accessor('costo_unitario', {
            id: 'costo_unitario_entradas',
            header: 'Costo Unitario',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Compra')) {
                return info.getValue()
              }
            }
          }),
          columnHelper.accessor('costo_total', {
            id: 'costo_total_entradas',
            header: 'Costo Total',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Compra')) {
                return info.getValue()
              }
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Salidas',
        header: () => <div className='text-center'>Salidas</div>,
        columns: [
          columnHelper.accessor('cantidad', {
            id: 'cantidad_salidas',
            header: 'Cantidad',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Devolución')) {
                return info.getValue()
              }
            }
          }),
          columnHelper.accessor('costo_unitario', {
            id: 'costo_unitario_salidas',
            header: 'Costo Unitario',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Devolución')) {
                return info.getValue()
              }
            }
          }),
          columnHelper.accessor('costo_total', {
            id: 'costo_total_salidas',
            header: 'Costo Total',
            cell: info => {
              if (info.row.original.tipo_operacion.includes('Devolución')) {
                return info.getValue()
              }
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Saldo',
        header: () => <div className='text-center'>Saldo</div>,
        columns: [
          columnHelper.accessor('cantidad', {
            id: 'cantidad_saldo',
            header: 'Cantidad',
            cell: info => info.getValue()
          }),
          columnHelper.accessor('costo_unitario', {
            id: 'costo_unitario_saldo',
            header: 'Costo Unitario',
            cell: info => info.getValue()
          }),
          columnHelper.accessor('costo_total', {
            id: 'costo_total_saldo',
            header: 'Costo Total',
            cell: info => info.getValue()
          })
        ]
        
      })      
    ],
    []
  )
  const [data] = useState(() => [...inventory])
  return (
    <div className='flex flex-col p-10 gap-y-4'>
      <div className='inline-flex gap-x-2'>
        {' '}
        <TbPackages
          size={56}
          className='stroke-blue-400'
          strokeWidth={1}
        />{' '}
        <div>
          <h3 className='text-light-2 text-2xl'>Kardexs de Inventario</h3>
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
          <CiSearch size={24} />
          <Input
            type='search'
            placeholder='Buscar productos por nombre'
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

        <Kardex columns={columns} data={data} />
      </div>
      <hr className='border-light-3 mt-5' />
    </div>
  )
}

export default Inventory
