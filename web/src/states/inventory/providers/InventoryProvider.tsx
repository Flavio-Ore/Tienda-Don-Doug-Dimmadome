import {
  loadFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/lib/local-storage'
import PRODUCTS_CATEGORY from '@/mocks/categoria-producto.mock.json'
import CLIENTS_JSON from '@/mocks/clients.mock.json'
import KARDEX_JSON from '@/mocks/kardex.mock.json'
import PRODUCTS_JSON from '@/mocks/product.mock.json'
import PROVIDERS_JSON from '@/mocks/providers.mock.json'
import USER_TYPES_JSON from '@/mocks/tipo-usuario.mock.json'
import USERS_JSON from '@/mocks/user.mock.json'
import InventoryContext from '@/states/inventory/contexts/InventoryContext'
import {
  ICategoriaProducto,
  ICliente,
  ITipoUsuario,
  type IKardex,
  type IProducto,
  type IProveedor,
  type IUsuario
} from '@/types'
import { AddProductFormSchema } from '@/validations/forms/addProduct.schema'
import { UserSchema } from '@/validations/forms/addUser.schema'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { z } from 'zod'
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
  const [kardexs, setKardexs] = useState<IKardex[]>(KARDEX_JSON)
  const [products, setProducts] = useState<IProducto[]>(PRODUCTS_JSON)
  const [productsCategory] = useState<ICategoriaProducto[]>(PRODUCTS_CATEGORY)
  const [clients] = useState<ICliente[]>(CLIENTS_JSON)
  const [users, setUsers] = useState<IUsuario[]>(USERS_JSON)
  const [userTypes] = useState<ITipoUsuario[]>(USER_TYPES_JSON)
  const [providers] = useState<IProveedor[]>(PROVIDERS_JSON)

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
      users.find(u => u.email === email && u.contrasena === password) != null

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

  const addProduct = (formProduct: z.infer<typeof AddProductFormSchema>) => {
    console.log({ formProduct_at_addProduct: formProduct })
    const newProduct: IProducto = {
      idProducto: products.length + 1,
      nombre: formProduct.nombre,
      precioUnitario: formProduct.precioUnitario,
      stock: formProduct.stock,
      fechaVencimiento: formProduct.fechaVencimiento,
      categoria: formProduct.categoria,
      estado: 'Activo'
    }
    console.log({ newProduct })

    const newKardex: IKardex = {
      idKardex: kardexs.length + 1,
      producto: newProduct,
      nombreProducto: newProduct.nombre,
      fecha: new Date().toISOString().split('T')[0], // Current date
      tipoOperacion: 'Inicial',
      empresa: '',
      cantidadEntrada: newProduct.stock,
      costoUnitarioEntrada: newProduct.precioUnitario,
      costoTotalEntrada: newProduct.stock * newProduct.precioUnitario,
      cantidadSalida: 0,
      costoUnitarioSalida: 0,
      costoTotalSalida: 0,
      cantidadSaldo: newProduct.stock,
      costoUnitarioSaldo: newProduct.precioUnitario,
      costoTotalSaldo: newProduct.stock * newProduct.precioUnitario
    }

    setKardexs([...kardexs, newKardex])

    setProducts([...products, newProduct])
  }
  const setProductStock = ({
    productId,
    stock
  }: {
    productId: number
    stock: number
  }) => {
    const product = products.find(p => p.idProducto === productId)
    if (product) {
      const newProduct = {
        ...product,
        stock
      }
      setProducts([
        ...products.filter(p => p.idProducto !== productId),
        newProduct
      ])
    }
  }

  const updateProductStatus = (productId: number, status: string) => {
    const product = products.find(p => p.idProducto === productId)
    if (product == null) {
      throw new Error('No existe el producto')
    }
    product.estado = status
    setProducts(prevProducts => {
      return prevProducts.map(p =>
        p.idProducto === productId ? { ...p, estado: status } : p
      )
    })
  }
  const inactivateProduct = ({ productId }: { productId: number }) => {
    updateProductStatus(productId, 'inactivo')
  }

  const activateProduct = ({ productId }: { productId: number }) => {
    updateProductStatus(productId, 'activo')
  }
  const removeProduct = ({ productId }: { productId: number }) => {
    const product = products.find(p => p.idProducto === productId)
    if (product == null) {
      throw new Error('No existe el producto')
    }
    product.estado = 'inactivo'
    setProducts(prevProducts => [
      ...prevProducts.filter(p => p.idProducto !== productId),
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
    const product = products.find(p => p.idProducto === productId)
    if (product) {
      const newProduct = {
        ...product,
        estado_producto: status
      }
      setProducts([
        ...products.filter(p => p.idProducto !== productId),
        newProduct
      ])
    }
  }

  const getKardexById = ({ id }: { id: number }) => {
    return kardexs.filter(k => k.idKardex === id)
  }

  const getKardexsByProducts = ({ productId }: { productId: number }) => {
    return kardexs.filter(k => k.producto.idProducto === productId)
  }

  const searchKardex = ({ searchTerm = '' }: { searchTerm: string }) => {
    const searchTermLowercase = searchTerm.toLowerCase()
    return kardexs.filter(
      k =>
        k.empresa.toLowerCase().includes(searchTermLowercase) ||
        k.fecha.toLowerCase().includes(searchTermLowercase) ||
        k.nombreProducto.toLowerCase().includes(searchTermLowercase) ||
        k.tipoOperacion.toLowerCase().includes(searchTermLowercase) ||
        k.nombreProducto.toLowerCase().includes(searchTermLowercase) ||
        k.tipoOperacion.toLowerCase().includes(searchTermLowercase)
    )
  }
  const getProduct = ({ id }: { id: number }) => {
    return products.find(p => p.idProducto === id) ?? null
  }
  const searchProducts = ({ searchTerm = '' }: { searchTerm: string }) => {
    return products.filter(
      p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.toString().includes(searchTerm) ||
        p.precioUnitario.toString().includes(searchTerm) ||
        p.stock.toString().includes(searchTerm) ||
        p.fechaVencimiento.toString().includes(searchTerm) ||
        p.estado.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  const searchClients = ({ searchTerm = '' }: { searchTerm: string }) => {
    return clients.filter(
      c =>
        c.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.numeroDocumento.toString().includes(searchTerm) ||
        c.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.fechaRegistro.toString().includes(searchTerm.toLowerCase()) ||
        c.estado.toString().includes
    )
  }

  const searchProviders = ({ searchTerm = '' }: { searchTerm: string }) => {
    return providers.filter(
      p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const searchUsers = ({ searchTerm = '' }: { searchTerm: string }) => {
    return users.filter(
      u =>
        u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.tipoUsuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.fechaCreacion.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const addUser = (user: z.infer<typeof UserSchema>) => {
    const newUser = {
      idUsuario: users.length + 1,
      nombre: user.nombre,
      email: user.email,
      contrasena: user.contrasena,
      tipoUsuario: user.tipoUsuario,
      estado: 'activo',
      fechaCreacion: format(new Date(), 'yyyy-MM-dd')
    }
    setUsers([...users, newUser])
  }

  return (
    <InventoryContext.Provider
      value={{
        login,
        products,
        searchProducts,
        inactivateProduct,
        activateProduct,
        setProductStock,
        productsCategory,
        kardexs,
        searchKardex,
        getKardexsByProducts,
        clients,
        searchClients,
        users,
        addUser,
        searchUsers,
        userTypes,
        providers,
        searchProviders,
        signOut,
        setLogin,
        checkAuth,
        addProduct,
        getProduct,
        removeProduct,
        setProductStatus,
        getKardexById
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

InventoryProvider.displayName = 'InventoryProvider'

export default InventoryProvider
