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
  addMovement: () => null,
  removeMovement: () => {},
  products: [],
  kardexs: []
})
InventoryContext.displayName = 'KardexContext'

export default InventoryContext
