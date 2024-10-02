import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/localStorage'
import data from '@/mocks/sql.mock.json'
import InventoryContext from '@/states/inventory/contexts/InventoryContext'
import { type Kardex, type MovimientoInventario } from '@/types'
import { DOCUMENTOS, OPERACIONES } from '@/values'
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
  const [kardexs, setkardexs] = useState<Kardex[]>(data.kardex)
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
    idProducto,
    idTipoExistenciaSunat,
    idUnidadMedida,
    ruc,
    razonSocial,
    periodoKardex,
    descripcion
  }: {
    idProducto: number
    idTipoExistenciaSunat: number
    idUnidadMedida: number
    ruc: string
    razonSocial: string
    periodoKardex: string
    descripcion: string
  }) => {
    const productExists = products.find(p => p.id_producto === idProducto)
    if (!productExists) {
      throw new Error('No existe el producto')
    }

    setkardexs([
      ...kardexs,
      {
        id_kardex: kardexs.length + 1,
        id_producto: idProducto,
        id_tipo_existencia_sunat: idTipoExistenciaSunat,
        id_unidad_medida: idUnidadMedida,
        ruc,
        razon_social: razonSocial,
        periodo_kardex: periodoKardex,
        descripcion
      }
    ])
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
    tipoComprobante: keyof typeof DOCUMENTOS
    tipoOperacion: keyof typeof OPERACIONES
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
      setkardexs([...kardexs.filter(k => k.id_kardex !== idKardex), newKardex])
    } else {
      throw new Error('No existe el kardex')
    }
  }

  const getKardex = ({ id }: { id: number }) => {
    return kardexs.filter(k => k.id_kardex === id)
  }
  const getMovements = ({ id }: { id: number }) => {
    return movementsInventory.filter(m => m.id_kardex === id) ?? []
  }
  const getProduct = ({ id }: { id: number }) => {
    return products.find(p => p.id_producto === id) ?? null
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
    setkardexs(prevKardex => {
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
        setLogin,
        checkAuth,
        products,
        kardexs,
        addKardex,
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
