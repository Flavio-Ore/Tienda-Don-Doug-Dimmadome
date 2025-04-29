import LoaderIcon from '@/components/icons/LoaderIcon'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'
import { cn, numberToCurrency } from '@/lib/utils'
import { useQueryAllKardexs } from '@/states/doug-dimadon-tankstack-query/hooks/queries'
import { type IKardex } from '@/types'
import TableKardex from '@pages/kardex/components/TableKardex'
import type { ColumnDef } from '@tanstack/react-table'
import { createColumnHelper } from '@tanstack/react-table'
import { Fragment, useMemo, useState } from 'react'
import { FaClipboardList, FaSearch } from 'react-icons/fa'
import { FaArrowRightArrowLeft, FaTableCellsRowLock } from 'react-icons/fa6'

const columnHelper = createColumnHelper<IKardex>()

const Kardex = () => {
  const {
    data: kardexs,
    isLoading: isLoadingKardexs,
    isError: isErrorKardexs
  } = useQueryAllKardexs()
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)

  const columns = useMemo<ColumnDef<IKardex>[]>(
    () => [
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
          columnHelper.accessor('descripcion', {
            header: () => (
              <span className='text-light-3 px-2'>Descripción</span>
            ),
            cell: info => <p className=''>{info.getValue()}</p>
          }),
          columnHelper.accessor('producto', {
            header: () => <span className='text-light-3 px-2'>Producto</span>,
            cell: info => {
              return <p className=''>{info.getValue().nombre}</p>
            }
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
      }),
      columnHelper.group({
        id: 'tipoOperacion',
        header: () => (
          <div className='w-full bg-yellow-500/5 py-4'>
            <FaArrowRightArrowLeft
              size={16}
              className='fill-yellow-600 mx-auto'
            />
          </div>
        ),
        columns: [
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
            kardex.descripcion
              .toLowerCase()
              .includes(debouncedValueLowerCase) ||
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
    <section className='common-container'>
      <div className='common-inner_container'>
        <div className='common-container__title'>
          <FaTableCellsRowLock size={56} className='fill-blue-500' />
          <div>
            <h3 className='text-light-2 text-2xl font-ubuntu'>
              Inventario Kardex
            </h3>
            <p className='text-light-3 body-bold'>
              Registro de movimientos de inventario de productos en almacén
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center w-full max-w-5xl gap-y-2 my-2'>
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
      </div>
      <div className='flex flex-col gap-y-16 max-w-7xl mx-auto w-full'>
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
        {kardexs != null &&
          !isLoadingKardexs &&
          !isErrorKardexs &&
          filteredKardexsByProducts.length === 0 && (
            <p className='text-light-3 body-bold text-center w-full'>
              No hay inventarios kardex registrados
            </p>
          )}
        {isTyping &&
          !isErrorKardexs &&
          !isLoadingKardexs &&
          searchedKardexs.length <= 0 && (
            <p className='text-light-3 body-bold text-center w-full animate-pulse'>
              No se encontraron inventarios kardex con el término de búsqueda "
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
                    <div>
                      <h3 className='text-light-2 font-ubuntu text-3xl'>
                        {kardex[0].producto.nombre}
                      </h3>
                      <p className='text-light-3'>
                        Fecha de inicio {kardex[0].fecha}
                      </p>
                    </div>
                    {/* <FaCircle
                      size={24}
                      className={cn({
                        'fill-green-500':
                          kardex[0].producto.estado === 'activo',
                        'fill-red-500': kardex[0].producto.estado === 'inactivo'
                      })}
                    /> */}
                  </div>
                </div>
                <TableKardex columns={columns} data={kardex} />
              </section>
            </Fragment>
          ))}
        {!isTyping &&
          !isErrorKardexs &&
          !isLoadingKardexs &&
          kardexs != null &&
          kardexs.length <= 0 && (
            <p className='text-light-3 body-bold text-center w-full'>
              No se han registrado kardexs de inventarios
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
                    <div>
                      <h3 className='text-light-2 font-ubuntu text-3xl'>
                        {kardex[0].producto.nombre}
                      </h3>
                      <p className='text-light-3'>
                        Fecha de inicio {kardex[0].fecha}
                      </p>
                    </div>

                    {/* <FaCircle
                      size={24}
                      className={cn({
                        'fill-green-500':
                          kardex[0].producto.estado === 'activo',
                        'fill-red-500': kardex[0].producto.estado === 'inactivo'
                      })}
                    /> */}
                  </div>
                </div>
                <TableKardex columns={columns} data={kardex} />
              </section>
            </Fragment>
          ))}
      </div>
    </section>
  )
}

export default Kardex
