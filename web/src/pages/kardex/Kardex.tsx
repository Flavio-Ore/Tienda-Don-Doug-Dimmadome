import LoaderIcon from '@/components/icons/LoaderIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { cn, numberToCurrency } from '@/lib/utils'
import { useQueryAllKardexs } from '@/states/queries/hooks/queries'
import { type IKardex } from '@/types'
import TableKardex from '@pages/kardex/components/TableKardex'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'
import { FaCircle, FaClipboardList, FaSearch } from 'react-icons/fa'
import { FaTableCellsRowLock } from 'react-icons/fa6'

const columnHelper = createColumnHelper<IKardex>()

const Kardex = () => {
  const {
    data: kardexs,
    isLoading: isLoadingKardexs,
    isError: isErrorKardexs,
    refetch
  } = useQueryAllKardexs()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const columns = useMemo<ColumnDef<IKardex>[]>(
    () => [
      // columnHelper.group({
      //   id: 'idKardex',
      //   columns: [

      //   ]
      // }),
      columnHelper.group({
        id: 'documento',
        header: () => {
          return (
            <p className='text-light-2 bg-dark-3 size-full py-4 px-2'>
              Descripción
            </p>
          )
        },
        columns: [
          columnHelper.accessor('idKardex', {
            header: () => {
              return <span className='text-light-3 px-2'>ID</span>
            },
            cell: info => <p className='text-light-3'>{info.getValue()}</p>
          }),
          columnHelper.accessor('fecha', {
            header: () => <p className='text-light-3 px-2'>Fecha</p>,
            cell: info => <time className=''>{info.getValue()}</time>
          }),
          columnHelper.accessor('empresa', {
            header: () => <span className='text-light-3 px-2'>Empresa</span>,
            cell: info => <p className=''>{info.getValue()}</p>
          }),
          columnHelper.accessor('producto', {
            header: () => <span className='text-light-3 px-2'>Producto</span>,
            cell: info => {
              return <p className=''>{info.getValue().nombre}</p>
            }
          }),
          columnHelper.accessor('tipoOperacion', {
            header: () => <span className='text-light-3 px-2'>Operación</span>,
            cell: info => (
              <p
                className={cn('size-full p-2', {
                  'bg-green-500/5 text-green-500':
                    info.getValue() === 'Entrada',
                  'bg-red-500/5 text-red-500': info.getValue() === 'Salida'
                })}
              >
                {info.getValue()}
              </p>
            )
          })
        ]
      }),
      columnHelper.group({
        id: 'Entrada',
        header: () => (
          <p className='w-full bg-green-500/5 text-green-500 py-4'>Entradas</p>
        ),
        columns: [
          columnHelper.accessor('cantidadEntrada', {
            id: 'cantidadEntrada',
            header: () => {
              return <span className='text-light-3 px-2'>CANT.</span>
            },
            cell: info => {
              return <p className='bg-green-500/5 p-2'>{info.getValue()}</p>
            }
          }),
          columnHelper.accessor('costoUnitarioEntrada', {
            id: 'costoUnitarioEntrada',
            header: () => {
              return <span className='text-light-3 px-2'>C.U</span>
            },
            cell: info => {
              return (
                <p className='bg-green-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          }),

          columnHelper.accessor('costoTotalEntrada', {
            id: 'costoTotalEntrada',
            header: () => {
              return <span className='text-light-3 px-2'>C.T</span>
            },
            cell: info => {
              return (
                <p className='bg-green-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Salida',
        header: () => (
          <p className='w-full bg-red-500/5 text-red-500 py-4'>Salidas</p>
        ),
        columns: [
          columnHelper.accessor('cantidadSalida', {
            id: 'cantidadSalida',
            header: () => {
              return <span className='text-light-3 px-2'>CANT.</span>
            },
            cell: info => {
              return <p className='bg-red-500/5 p-2'>{info.getValue()}</p>
            }
          }),
          columnHelper.accessor('costoUnitarioSalida', {
            id: 'costoUnitarioSalida',
            header: () => {
              return <span className='text-light-3 px-2'>C.U</span>
            },
            cell: info => {
              return (
                <p className='bg-red-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          }),
          columnHelper.accessor('costoTotalSalida', {
            id: 'costoTotalSalida',
            header: () => {
              return <span className='text-light-3 px-2'>C.T</span>
            },
            cell: info => {
              return (
                <p className='bg-red-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          })
        ]
      }),
      columnHelper.group({
        id: 'Saldo',
        header: () => (
          <p className='w-full bg-blue-500/5 text-blue-500 py-4'>Saldos</p>
        ),
        columns: [
          columnHelper.accessor('cantidadSaldo', {
            id: 'cantidadSaldo',
            header: () => {
              return <span className='text-light-3 px-2'>CANT.</span>
            },
            cell: info => {
              return <p className='bg-blue-500/5 p-2'>{info.getValue()}</p>
            }
          }),
          columnHelper.accessor('costoUnitarioSaldo', {
            id: 'costoUnitarioSaldo',
            header: () => {
              return <span className='text-light-3 px-2'>C.U</span>
            },
            cell: info => {
              return (
                <p className='bg-blue-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          }),
          columnHelper.accessor('costoTotalSaldo', {
            id: 'costoTotalSaldo',
            header: () => {
              return <span className='text-light-3 px-2'>C.T</span>
            },
            cell: info => {
              return (
                <p className='bg-blue-500/5 p-2'>
                  {numberToCurrency(info.getValue())}
                </p>
              )
            }
          })
        ]
      })
    ],
    []
  )

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

  const searchedKardexs = useMemo(() => {
    const debouncedValueLowerCase = debouncedValue.toLowerCase()
    return (
      filteredKardexsByProducts.filter(record => {
        return record.some(kardex => {
          return (
            kardex.producto.nombre
              .toLowerCase()
              .includes(debouncedValueLowerCase) ||
            kardex.fecha.toLowerCase().includes(debouncedValueLowerCase) ||
            kardex.empresa.toLowerCase().includes(debouncedValueLowerCase) ||
            kardex.tipoOperacion
              .toLowerCase()
              .includes(debouncedValueLowerCase) ||
            kardex.cantidadEntrada
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.costoUnitarioEntrada
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.costoTotalEntrada
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.cantidadSalida
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.costoUnitarioSalida
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.costoTotalSalida
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.cantidadSaldo.toString().includes(debouncedValueLowerCase) ||
            kardex.costoUnitarioSaldo
              .toString()
              .includes(debouncedValueLowerCase) ||
            kardex.costoTotalSaldo.toString().includes(debouncedValueLowerCase)
          )
        })
      }) ?? []
    )
  }, [debouncedValue, filteredKardexsByProducts])
  const isTyping = searchValue !== ''
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }
  console.log({
    filteredKardexsByProducts
  })

  return (
    <div className='flex flex-col flex-1 gap-10 overflow-y-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar w-full'>
      <div className='inline-flex gap-x-2'>
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
        <div className='flex items-center gap-x-4 px-4 w-full rounded-lg bg-dark-1'>
          <FaSearch size={24} className='fill-light-3' />
          <Input
            type='search'
            placeholder='Buscar productos por nombre'
            className='border-light-3'
            onChange={handleSearch}
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
      {}
      {kardexs != null &&
        !isLoadingKardexs &&
        !isErrorKardexs &&
        filteredKardexsByProducts.length === 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron productos en el inventario
          </p>
        )}
      {isTyping &&
        !isErrorKardexs &&
        !isLoadingKardexs &&
        searchedKardexs.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full animate-pulse'>
            No se encontraron productos con el término de búsqueda "
            {debouncedValue}"
          </p>
        )}
      {isTyping &&
        !isErrorKardexs &&
        !isLoadingKardexs &&
        searchedKardexs.length > 0 &&
        searchedKardexs.map((kardex, index) => (
          <Fragment key={index}>
            <section>
              <div className='flex flex-wrap justify-between items-center w-full mb-4 gap-x-4 gap-y-4'>
                <div className='inline-flex gap-x-4 items-center'>
                  <FaClipboardList size={36} className='fill-blue-500' />
                  <h3 className='text-light-2 font-ubuntu text-3xl'>
                    {kardex[0].producto.nombre}
                  </h3>
                  <FaCircle
                    size={24}
                    className={cn({
                      'fill-green-500': kardex[0].producto.estado === 'activo',
                      'fill-red-500': kardex[0].producto.estado === 'inactivo'
                    })}
                  />
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
      {!isTyping &&
        !isErrorKardexs &&
        !isLoadingKardexs &&
        kardexs != null &&
        kardexs.length <= 0 && (
          <p className='text-light-3 body-bold text-center w-full'>
            No se encontraron productos
          </p>
        )}
      {!isTyping &&
        kardexs != null &&
        !isLoadingKardexs &&
        !isErrorKardexs &&
        filteredKardexsByProducts.length > 0 &&
        filteredKardexsByProducts.map((kardex, index) => (
          <Fragment key={index}>
            <section>
              <div className='flex flex-wrap justify-between items-center w-full mb-4 gap-x-4 gap-y-4'>
                <div className='inline-flex gap-x-4 items-center'>
                  <FaClipboardList size={36} className='fill-blue-500' />
                  <h3 className='text-light-2 font-ubuntu text-3xl'>
                    {kardex[0].producto.nombre}
                  </h3>
                  <FaCircle
                    size={24}
                    className={cn({
                      'fill-green-500': kardex[0].producto.estado === 'activo',
                      'fill-red-500': kardex[0].producto.estado === 'inactivo'
                    })}
                  />
                </div>
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
