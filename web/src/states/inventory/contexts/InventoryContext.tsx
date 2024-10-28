import { IInventoryContext } from '@/types'
import { createContext } from 'react'

const InventoryContext = createContext<IInventoryContext>({
  login: { isLogged: false, password: '', email: '' },
  kardexs: [],
  getKardexsByProducts: () => [],
  products: [],
  inactivateProduct: () => {},
  activateProduct: () => {},
  setProductStock: () => {},
  clients: [],
  providers: [],
  searchProviders: () => [],
  users: [],
  setLogin: () => {},
  checkAuth: () => false,
  getKardexById: () => [],
  getProduct: () => null,
  addProduct: () => {},
  setProductStatus: () => {},
  removeProduct: () => {},
  signOut: () => {},
  searchProducts: () => [],
  searchKardex: () => [],
  searchClients: () => []
})
InventoryContext.displayName = 'KardexContext'

export default InventoryContext
