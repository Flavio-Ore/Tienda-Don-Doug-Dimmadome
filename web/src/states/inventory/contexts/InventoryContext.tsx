import { type InventoryContext } from '@/types/inventoryContext'
import { createContext } from 'react'

const InventoryContext = createContext<InventoryContext>({
  login: { isLogged: false, password: '', email: '' },
  setLogin: () => {},
  checkAuth: () => false,
  getKardex: () => [],
  getMovements: () => [],
  getProduct: () => null,
  addProduct: () => {},
  setProductStock: () => {},
  setProductStatus: () => {},
  removeProduct: () => {},
  addKardex: () => {},
  signOut: () => {},
  addMovement: () => null,
  removeMovement: () => {},
  products: [],
  searchProducts: () => [],
  searchKardex: () => [],
  getAllKardexs: () => []
})
InventoryContext.displayName = 'KardexContext'

export default InventoryContext
