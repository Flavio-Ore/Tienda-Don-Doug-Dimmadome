import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/lib/local-storage'
import data from '@/mocks/sql.mock.json'
import InventoryContext from '@/states/inventory/contexts/InventoryContext'
import {
  AllowedMeasurementUnits,
  AllowedSunatExistences,
  IProducto,
  type Kardex,
  type MovimientoInventario
} from '@/types'
import { DOCUMENT_TYPES, OPERATIONS_VALUES } from '@/values'
import { useEffect, useState } from 'react'

interface InventoryLogin {
  email: string
  password: string
  isLogged: boolean
}

const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
    isLogged: false
  })
  const [kardexs, setKardexs] = useState<Kardex[]>(data.kardex)
  const [movementsInventory, setMovementsInventory] = useState<
    MovimientoInventario[]
  >(data.movimiento_inventario)
  const [products, setProducts] = useState(data.producto)

  useEffect(() => {
    const wasLogged = loadFromLocalStorage<InventoryLogin>('login_dimadon')
    if (wasLogged != null && wasLogged.isLogged) {
      setLogin(wasLogged)
    }
  }, [])
  const signOut = () => {
    removeFromLocalStorage('login_dimadon')
    setLogin({ email: '', password: '', isLogged: false })
  }
  const checkAuth = ({
    email,
    password
  }: {
    email: string
    password: string
  }) => {
    const isLogged =
      data.usuario.find(u => u.email === email && u.contrasena === password) !=
      null

    console.log({
      isLogged
    })
    if (isLogged) {
      saveToLocalStorage('login_dimadon', {
        email,
        password,
        isLogged
      })
      setLogin({ email, password, isLogged: true })
      return isLogged
    }

    return false
  }

  const addProduct = ({
    nombreProducto,
    precioVentaProducto
  }: {
    nombreProducto: string
    precioVentaProducto: number
  }) => {
    setProducts([
      ...products,
      {
        id_producto: products.length + 1,
        estado_producto: false,
        nombre_producto: nombreProducto,
        precio_venta_producto: precioVentaProducto,
        stock_actual_producto: 0
      }
    ])
  }

  const setProductStock = ({
    productId,
    stock
  }: {
    productId: number
    stock: number
  }) => {
    const product = products.find(p => p.id_producto === productId)
    if (product) {
      const newProduct = {
        ...product,
        stock_actual_producto: stock
      }
      setProducts([
        ...products.filter(p => p.id_producto !== productId),
        newProduct
      ])
    }
  }
  const removeProduct = ({ productId }: { productId: number }) => {
    const product = products.find(p => p.id_producto === productId)
    if (product == null) {
      throw new Error('No existe el producto')
    }
    product.estado_producto = false
    setProducts(prevProducts => [
      ...prevProducts.filter(p => p.id_producto !== productId),
      product
    ])
  }
  const setProductStatus = ({
    productId,
    status
  }: {
    productId: number
    status: boolean
  }) => {
    const product = products.find(p => p.id_producto === productId)
    if (product) {
      const newProduct = {
        ...product,
        estado_producto: status
      }
      setProducts([
        ...products.filter(p => p.id_producto !== productId),
        newProduct
      ])
    }
  }
  const addKardex = ({
    productId,
    sunatExistenceType,
    measurementUnit,
    ruc,
    socialReason,
    kardexPeriod,
    description
  }: {
    productId: number
    sunatExistenceType: AllowedSunatExistences
    measurementUnit: AllowedMeasurementUnits
    ruc: string
    socialReason: string
    kardexPeriod: string
    description: string
  }) => {
    const productExists = products.find(p => p.id_producto === productId)
    if (!productExists) {
      throw new Error('No existe el producto')
    }
    const unitMeasureExists = data.unidad_medida.find(
      um => um.unidad === measurementUnit
    )

    if (!unitMeasureExists) {
      throw new Error('No existe la unidad de medida')
    }

    const sunatExistenceTypeExists = data.tipo_existencia_sunat.find(
      te => te.tipo_existencia === sunatExistenceType
    )
    if (!sunatExistenceTypeExists) {
      throw new Error('Este tipo de existencia no está registrada por la SUNAT')
    }
    console.log({
      productId,
      sunatExistenceTypeExists,
      unitMeasureExists,
      ruc,
      socialReason,
      kardexPeriod,
      description
    })
    setKardexs(prevKardexs => {
      return [
        ...prevKardexs,
        {
          id_kardex: kardexs.length + 1,
          id_producto: productId,
          id_tipo_existencia_sunat:
            sunatExistenceTypeExists.id_tipo_existencia_sunat,
          id_unidad_medida: unitMeasureExists.id_unidad_medida,
          ruc,
          razon_social: socialReason,
          periodo_kardex: kardexPeriod,
          descripcion: description
        }
      ]
    })
  }

  const getAllKardexs = () => {
    const completeKardexs: Array<
      Kardex & {
        producto: IProducto
        tipo_existencia_sunat: string
        unidad_medida: string
      }
    > = kardexs.map(kardex => {
      const product = products.find(p => p.id_producto === kardex.id_producto)
      if (!product) {
        throw new Error('No existe el producto')
      }
      const sunatExistence = data.tipo_existencia_sunat.find(
        te => te.id_tipo_existencia_sunat === kardex.id_tipo_existencia_sunat
      )
      if (!sunatExistence) {
        throw new Error('No existe el tipo de existencia en SUNAT')
      }
      const unitMeasure = data.unidad_medida.find(
        um => um.id_unidad_medida === kardex.id_unidad_medida
      )
      if (!unitMeasure) {
        throw new Error('No existe la unidad de medida')
      }
      return {
        ...kardex,
        producto: product,
        tipo_existencia_sunat: sunatExistence.tipo_existencia,
        unidad_medida: unitMeasure.unidad
      }
    })
    return completeKardexs
  }

  const addMovement = ({
    idKardex,
    tipoComprobante,
    tipoOperacion,
    cantidadProductos,
    costoUnitario,
    entrada,
    orden
  }: {
    idKardex: number
    tipoComprobante: keyof typeof DOCUMENT_TYPES
    tipoOperacion: keyof typeof OPERATIONS_VALUES
    cantidadProductos: number
    costoUnitario: number
    entrada: boolean
    orden: number
  }) => {
    const tipoComprobanteExists = data.tipo_comprobante.find(
      tc => tc.documento === tipoComprobante
    )
    if (!tipoComprobanteExists) {
      throw new Error('No existe el tipo de comprobante')
    }
    const tipoOperacionExists = data.tipo_operacion.find(
      to => to.operacion === tipoOperacion
    )
    if (!tipoOperacionExists) {
      throw new Error('No existe el tipo de operación')
    }
    setMovementsInventory(prevMovements => {
      return [
        ...prevMovements,
        {
          cantidad_productos: cantidadProductos,
          costo_unitario: costoUnitario,
          entrada,
          id_kardex: idKardex,
          id_movimiento_inventario: prevMovements.length + 1,
          id_tipo_comprobante: tipoComprobanteExists.id_tipo_comprobante,
          id_tipo_operacion: tipoOperacionExists.id_tipo_operacion,
          orden
        }
      ]
    })
    const prevKardex = kardexs.find(k => k.id_kardex === idKardex)
    if (prevKardex) {
      const newKardex = {
        ...prevKardex,
        periodo_kardex: new Date().toISOString()
      }
      setKardexs([...kardexs.filter(k => k.id_kardex !== idKardex), newKardex])
    } else {
      throw new Error('No existe el kardex')
    }
  }

  const getKardex = ({ id }: { id: number }) => {
    return kardexs.filter(k => k.id_kardex === id)
  }
  const searchKardex = ({ searchTerm = '' }: { searchTerm: string }) => {
    return kardexs
      .filter(
        k =>
          k.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          k.periodo_kardex.toLowerCase().includes(searchTerm.toLowerCase()) ||
          k.razon_social.toLowerCase().includes(searchTerm.toLowerCase()) ||
          k.ruc.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(k => {
        const product = products.find(p => p.id_producto === k.id_producto)
        if (!product) {
          throw new Error('No existe el producto')
        }
        const sunatExistence = data.tipo_existencia_sunat.find(
          te => te.id_tipo_existencia_sunat === k.id_tipo_existencia_sunat
        )
        if (!sunatExistence) {
          throw new Error('No existe el tipo de existencia en SUNAT')
        }
        const unitMeasure = data.unidad_medida.find(
          um => um.id_unidad_medida === k.id_unidad_medida
        )
        if (!unitMeasure) {
          throw new Error('No existe la unidad de medida')
        }
        return {
          ...k,
          producto: product,
          tipo_existencia_sunat: sunatExistence.tipo_existencia,
          unidad_medida: unitMeasure.unidad
        }
      })
  }

  const getMovements = ({ id }: { id: number }) => {
    return movementsInventory.filter(m => m.id_kardex === id) ?? []
  }
  const getProduct = ({ id }: { id: number }) => {
    return products.find(p => p.id_producto === id) ?? null
  }
  const searchProducts = ({ searchTerm = '' }: { searchTerm: string }) => {
    return products.filter(
      p =>
        p.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.precio_venta_producto.toString().includes(searchTerm)
    )
  }
  const removeMovement = ({ idMovimiento }: { idMovimiento: number }) => {
    const movement = movementsInventory.find(
      m => m.id_movimiento_inventario === idMovimiento
    )
    if (!movement) {
      throw new Error('No existe el movimiento')
    }
    setMovementsInventory(prevMovements =>
      prevMovements.filter(m => m.id_movimiento_inventario !== idMovimiento)
    )
    setKardexs(prevKardex => {
      const kardex = prevKardex.find(k => k.id_kardex === movement.id_kardex)
      if (kardex) {
        return [...prevKardex.filter(k => k.id_kardex !== movement.id_kardex)]
      }
      return prevKardex
    })
  }

  return (
    <InventoryContext.Provider
      value={{
        login,
        signOut,
        setLogin,
        checkAuth,
        products,
        searchProducts,
        getAllKardexs,
        addKardex,
        searchKardex,
        getProduct,
        addProduct,
        setProductStock,
        removeProduct,
        setProductStatus,
        addMovement,
        getKardex,
        getMovements,
        removeMovement
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

InventoryProvider.displayName = 'InventoryProvider'

export default InventoryProvider
